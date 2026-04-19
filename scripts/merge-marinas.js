/**
 * merge-marinas.js — Merge existing marinas.json + yelp-marinas.json + osm-marinas-grid.json
 * into a single unified marinas.json.
 *
 * Dedup key: lower(name) + | + lower(city) + | + state
 * Preference when a duplicate is found: Yelp > existing > OSM-grid
 *   (Yelp has phone, rating, review_count — highest-value data)
 *
 * For OSM-grid records without state: infer from lat/lng using state bboxes.
 * US-only: records outside rough US bounds are dropped.
 */
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "src", "data");
const EXISTING_PATH = path.join(DATA, "marinas.json");
const YELP_PATH = path.join(DATA, "yelp-marinas.json");
const OSM_PATH = path.join(DATA, "osm-marinas-grid.json");
const OUT_PATH = EXISTING_PATH; // overwrite

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function norm(s) { return (s || "").toLowerCase().trim(); }
function key(name, city, state) { return `${norm(name)}|${norm(city)}|${(state || "").toUpperCase()}`; }

// US state bounding boxes [minLat, maxLat, minLon, maxLon] — approximate, for lat/lng → state inference.
// Source: rough USGS state extents. Imperfect near borders but serviceable for OSM marina geocoding.
const STATE_BBOX = {
  AL:[30.1,35.1,-88.5,-84.9], AK:[51,72,-180,-130], AZ:[31.3,37.1,-114.9,-109.0],
  AR:[33.0,36.5,-94.6,-89.6], CA:[32.5,42.1,-124.5,-114.1], CO:[36.9,41.1,-109.1,-102.0],
  CT:[40.9,42.1,-73.8,-71.7], DE:[38.4,39.9,-75.8,-75.0], FL:[24.4,31.1,-87.7,-80.0],
  GA:[30.3,35.1,-85.7,-80.8], HI:[18.9,22.3,-160.3,-154.8], ID:[41.9,49.1,-117.3,-111.0],
  IL:[36.9,42.6,-91.6,-87.4], IN:[37.7,41.8,-88.1,-84.7], IA:[40.3,43.6,-96.7,-90.1],
  KS:[36.9,40.1,-102.1,-94.5], KY:[36.4,39.2,-89.6,-81.9], LA:[28.9,33.1,-94.1,-88.8],
  ME:[43.0,47.5,-71.1,-66.9], MD:[37.9,39.8,-79.5,-75.0], MA:[41.2,42.9,-73.6,-69.9],
  MI:[41.6,48.3,-90.5,-82.4], MN:[43.4,49.5,-97.3,-89.4], MS:[30.1,35.1,-91.7,-88.0],
  MO:[35.9,40.7,-95.8,-89.0], MT:[44.3,49.1,-116.1,-104.0], NE:[39.9,43.1,-104.1,-95.3],
  NV:[34.9,42.1,-120.1,-114.0], NH:[42.6,45.4,-72.6,-70.5], NJ:[38.9,41.4,-75.6,-73.8],
  NM:[31.3,37.1,-109.1,-103.0], NY:[40.4,45.1,-79.9,-71.8], NC:[33.7,36.6,-84.4,-75.4],
  ND:[45.9,49.1,-104.1,-96.5], OH:[38.4,42.0,-84.9,-80.5], OK:[33.6,37.1,-103.1,-94.4],
  OR:[41.9,46.3,-124.6,-116.4], PA:[39.7,42.3,-80.6,-74.6], RI:[41.1,42.1,-71.9,-71.1],
  SC:[32.0,35.3,-83.4,-78.5], SD:[42.4,45.9,-104.1,-96.4], TN:[34.9,36.7,-90.4,-81.6],
  TX:[25.8,36.6,-106.7,-93.4], UT:[36.9,42.1,-114.1,-108.9], VT:[42.7,45.1,-73.5,-71.4],
  VA:[36.5,39.5,-83.7,-75.2], WA:[45.5,49.1,-124.9,-116.9], WV:[37.1,40.7,-82.7,-77.7],
  WI:[42.4,47.1,-92.9,-86.7], WY:[40.9,45.1,-111.1,-104.0],
};

function stateFromLatLng(lat, lng) {
  if (lat == null || lng == null) return "";
  for (const [code, [la0, la1, lo0, lo1]] of Object.entries(STATE_BBOX)) {
    if (lat >= la0 && lat <= la1 && lng >= lo0 && lng <= lo1) return code;
  }
  return "";
}

function loadJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { return fallback; }
}

function main() {
  const existing = loadJson(EXISTING_PATH, []);
  const yelp = loadJson(YELP_PATH, []);
  const osm = loadJson(OSM_PATH, []);

  console.log(`Input counts:`);
  console.log(`  existing: ${existing.length}`);
  console.log(`  yelp:     ${yelp.length}`);
  console.log(`  osm-grid: ${osm.length}`);

  // Keep ALL existing records (stable IDs for existing URLs).
  // Build a lookup set for dedup against new Yelp/OSM, but don't collapse existing dupes.
  const allRecords = [...existing];
  const existingKeys = new Set(existing.map((m) => key(m.name, m.city, m.state)));
  console.log(`\nExisting kept intact: ${allRecords.length} (with ${existing.length - existingKeys.size} internal dupes preserved for URL stability)`);

  // 2. Overlay Yelp — enrich existing (in place) and add new
  const existingIndexByKey = new Map();
  existing.forEach((m, i) => { existingIndexByKey.set(key(m.name, m.city, m.state), i); });

  const newKeys = new Set();
  let yelpAdded = 0, yelpMerged = 0, yelpSkipped = 0;
  for (const y of yelp) {
    if (!y.latitude || !y.longitude || !y.state) { yelpSkipped++; continue; }
    const k = key(y.name, y.city, y.state);
    if (existingIndexByKey.has(k)) {
      // Enrich FIRST matching existing record with Yelp commercial fields
      const idx = existingIndexByKey.get(k);
      const cur = allRecords[idx];
      allRecords[idx] = {
        ...cur,
        phone: cur.phone || y.phone || "",
        rating: y.rating ?? cur.rating,
        review_count: y.review_count ?? cur.review_count,
        yelp_url: y.yelp_url || cur.yelp_url,
      };
      yelpMerged++;
    } else if (newKeys.has(k)) {
      // Already added a new record with this key this run; skip to avoid intra-new dupes
      yelpMerged++;
    } else {
      allRecords.push({
        id: `marina-${slugify(y.state)}-${slugify(y.name)}-y${yelpAdded}`,
        name: y.name,
        slug: slugify(y.name),
        lat: y.latitude,
        lng: y.longitude,
        state: y.state,
        city: y.city || "",
        source: "yelp",
        amenities: [],
        website: "",
        phone: y.phone || "",
        email: "",
        capacity: null,
        operator: "",
        description: "",
        categories: [],
        rating: y.rating,
        review_count: y.review_count,
        yelp_url: y.yelp_url,
      });
      newKeys.add(k);
      yelpAdded++;
    }
  }
  console.log(`Yelp: +${yelpAdded} new, ${yelpMerged} merged/dupes, ${yelpSkipped} skipped (missing lat/lng/state)`);

  // 3. Overlay OSM grid — only add if not duplicate
  let osmAdded = 0, osmMerged = 0, osmSkipped = 0, osmInferredState = 0;
  for (const o of osm) {
    if (!o.lat || !o.lng || !o.name) { osmSkipped++; continue; }
    let state = (o.state || "").toUpperCase();
    if (!state || state.length !== 2) {
      state = stateFromLatLng(o.lat, o.lng);
      if (!state) { osmSkipped++; continue; } // outside US
      osmInferredState++;
    }
    const k = key(o.name, o.city, state);
    if (existingIndexByKey.has(k) || newKeys.has(k)) { osmMerged++; continue; }
    allRecords.push({
      id: `marina-${slugify(state)}-${slugify(o.name)}-o${osmAdded}`,
      name: o.name,
      slug: slugify(o.name),
      lat: o.lat,
      lng: o.lng,
      state,
      city: o.city || "",
      source: "osm-grid",
      amenities: [],
      website: o.website || "",
      phone: o.phone || "",
      email: "",
      capacity: null,
      operator: o.operator || "",
      description: "",
      categories: [],
    });
    newKeys.add(k);
    osmAdded++;
  }
  console.log(`OSM grid: +${osmAdded} new, ${osmMerged} dupes skipped, ${osmSkipped} skipped (outside US or missing data), ${osmInferredState} had state inferred from lat/lng`);

  const merged = allRecords;
  const byState = {};
  for (const m of merged) byState[m.state] = (byState[m.state] || 0) + 1;

  console.log(`\n=== Final ===`);
  console.log(`Total unique marinas: ${merged.length}`);
  console.log(`States covered: ${Object.keys(byState).length}`);
  console.log(`Top 10 states:`);
  Object.entries(byState).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([s, c]) => {
    console.log(`  ${s}: ${c}`);
  });

  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2));
  console.log(`\nWrote ${OUT_PATH}`);
}

main();
