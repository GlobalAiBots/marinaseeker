/**
 * merge-marinas.js — Merge 4 sources into a unified marinas.json:
 *   1. existing marinas.json     (OSM-originated baseline, stable URLs)
 *   2. google-marinas.json       (cleanest addresses, place_id)
 *   3. yelp-marinas.json         (ratings, review_count, phone)
 *   4. osm-marinas-grid.json     (broader OSM sweep)
 *
 * Dedup key: lower(name) + | + lower(city) + | + state
 * Priority:  Google > Yelp > existing > OSM-grid
 *
 * Strategy:
 *   - Existing records keep their IDs (URL stability).
 *   - New records added once per unique key, first source wins on identity,
 *     later sources enrich fields that are empty/missing.
 *   - Order of processing: Google (first — adds new + enriches existing),
 *                          Yelp (enriches rating/reviews/phone),
 *                          OSM-grid (adds new only, no override).
 *
 * Missing state on OSM: inferred from lat/lng via state bbox table.
 */
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "src", "data");
const EXISTING_PATH = path.join(DATA, "marinas.json");
const YELP_PATH = path.join(DATA, "yelp-marinas.json");
const GOOGLE_PATH = path.join(DATA, "google-marinas.json");
const OSM_PATH = path.join(DATA, "osm-marinas-grid.json");
const OUT_PATH = EXISTING_PATH;

function slugify(s) { return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function norm(s) { return (s || "").toLowerCase().trim(); }
function key(name, city, state) { return `${norm(name)}|${norm(city)}|${(state || "").toUpperCase()}`; }

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
  const google = loadJson(GOOGLE_PATH, []);
  const yelp = loadJson(YELP_PATH, []);
  const osm = loadJson(OSM_PATH, []);

  console.log("Input counts:");
  console.log(`  existing: ${existing.length}`);
  console.log(`  google:   ${google.length}`);
  console.log(`  yelp:     ${yelp.length}`);
  console.log(`  osm-grid: ${osm.length}`);

  // Keep existing intact, track by key for enrichment
  const allRecords = [...existing];
  const indexByKey = new Map();
  existing.forEach((m, i) => {
    const k = key(m.name, m.city, m.state);
    if (!indexByKey.has(k)) indexByKey.set(k, { idx: i, source: "existing" });
  });
  console.log(`\nExisting seeded: ${allRecords.length} records, ${indexByKey.size} unique keys`);

  // --- Pass 1: Google (priority 1 — adds new + enriches existing with clean address) ---
  let gAdded = 0, gEnriched = 0, gSkipped = 0;
  for (const g of google) {
    if (!g.lat || !g.lng || !g.state) { gSkipped++; continue; }
    const k = key(g.name, g.city, g.state);
    const match = indexByKey.get(k);
    if (match) {
      const cur = allRecords[match.idx];
      allRecords[match.idx] = {
        ...cur,
        // Google is authoritative on address formatting
        formatted_address: g.formatted_address || cur.formatted_address,
        google_place_id: g.place_id,
        // Only fill blanks
        phone: cur.phone || (g.formatted_phone_number || ""),
        rating: cur.rating ?? g.rating,
        review_count: cur.review_count ?? g.user_ratings_total,
      };
      gEnriched++;
    } else {
      const rec = {
        id: `marina-${slugify(g.state)}-${slugify(g.name)}-g${gAdded}`,
        name: g.name,
        slug: slugify(g.name),
        lat: g.lat,
        lng: g.lng,
        state: g.state,
        city: g.city || "",
        source: "google-places",
        amenities: [],
        website: "",
        phone: "",
        email: "",
        capacity: null,
        operator: "",
        description: "",
        categories: [],
        formatted_address: g.formatted_address || "",
        google_place_id: g.place_id,
        rating: g.rating,
        review_count: g.user_ratings_total,
      };
      const newIdx = allRecords.length;
      allRecords.push(rec);
      indexByKey.set(k, { idx: newIdx, source: "google" });
      gAdded++;
    }
  }
  console.log(`Google: +${gAdded} new, ${gEnriched} enriched existing, ${gSkipped} skipped`);

  // --- Pass 2: Yelp (priority 2 — enriches rating/reviews/phone, adds if missing) ---
  let yAdded = 0, yEnriched = 0, ySkipped = 0;
  for (const y of yelp) {
    if (!y.latitude || !y.longitude || !y.state) { ySkipped++; continue; }
    const k = key(y.name, y.city, y.state);
    const match = indexByKey.get(k);
    if (match) {
      const cur = allRecords[match.idx];
      allRecords[match.idx] = {
        ...cur,
        phone: cur.phone || y.phone || "",
        // Yelp overrides Google on rating since Yelp ratings are more trusted by boaters
        rating: y.rating ?? cur.rating,
        review_count: y.review_count ?? cur.review_count,
        yelp_url: y.yelp_url || cur.yelp_url,
      };
      yEnriched++;
    } else {
      const rec = {
        id: `marina-${slugify(y.state)}-${slugify(y.name)}-y${yAdded}`,
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
      };
      const newIdx = allRecords.length;
      allRecords.push(rec);
      indexByKey.set(k, { idx: newIdx, source: "yelp" });
      yAdded++;
    }
  }
  console.log(`Yelp: +${yAdded} new, ${yEnriched} enriched, ${ySkipped} skipped`);

  // --- Pass 3: OSM grid (priority 4 — adds new only, does NOT override) ---
  let oAdded = 0, oSkipped = 0, oDupe = 0, oInferred = 0;
  for (const o of osm) {
    if (!o.lat || !o.lng || !o.name) { oSkipped++; continue; }
    let state = (o.state || "").toUpperCase();
    if (!state || state.length !== 2) {
      state = stateFromLatLng(o.lat, o.lng);
      if (!state) { oSkipped++; continue; }
      oInferred++;
    }
    const k = key(o.name, o.city, state);
    if (indexByKey.has(k)) { oDupe++; continue; }
    const rec = {
      id: `marina-${slugify(state)}-${slugify(o.name)}-o${oAdded}`,
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
    };
    const newIdx = allRecords.length;
    allRecords.push(rec);
    indexByKey.set(k, { idx: newIdx, source: "osm" });
    oAdded++;
  }
  console.log(`OSM grid: +${oAdded} new, ${oDupe} dupes, ${oSkipped} skipped, ${oInferred} had state inferred`);

  // Stats
  const byState = {};
  for (const m of allRecords) byState[m.state] = (byState[m.state] || 0) + 1;

  console.log(`\n=== Final ===`);
  console.log(`Total marinas: ${allRecords.length}`);
  console.log(`States covered: ${Object.keys(byState).length}`);
  console.log(`Top 15 states:`);
  Object.entries(byState).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([s, c]) => {
    console.log(`  ${s}: ${c}`);
  });

  fs.writeFileSync(OUT_PATH, JSON.stringify(allRecords, null, 2));
  console.log(`\nWrote ${OUT_PATH}`);
}

main();
