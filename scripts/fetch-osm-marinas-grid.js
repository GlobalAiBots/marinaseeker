/**
 * fetch-osm-marinas-grid.js — Grid-based Overpass query for US marinas.
 *
 * Subdivides the US into a grid of bounding boxes and queries each separately.
 * This catches marinas that a single big-box query might time out on or miss.
 *
 * Tags queried: leisure=marina, amenity=marina, waterway=dock (dock=marina),
 *               harbour:type=marina.
 *
 * Writes src/data/osm-marinas-grid.json. Resumable — re-running skips completed tiles.
 */
const fs = require("fs");
const path = require("path");

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const OUT_PATH = path.join(__dirname, "..", "src", "data", "osm-marinas-grid.json");
const STATE_PATH = path.join(__dirname, "..", "src", "data", "osm-marinas-grid.state.json");
const EXISTING_PATH = path.join(__dirname, "..", "src", "data", "marinas.json");

// Continental US + AK + HI in 5-degree tiles.
// This produces ~70 tiles covering every marina-bearing US coastline and lake.
const BOUNDS = [
  // Continental US: lat 24-49, lon -125 to -66, 5-deg grid
  { name: "USA", lat0: 24, lat1: 49, lon0: -125, lon1: -66, step: 5 },
  // Alaska (big but sparse)
  { name: "AK", lat0: 51, lat1: 71, lon0: -180, lon1: -130, step: 10 },
  // Hawaii
  { name: "HI", lat0: 18, lat1: 23, lon0: -161, lon1: -154, step: 5 },
];

const TIMEOUT = 180; // seconds per Overpass query
const RETRY_DELAY = 30000; // 30s between retries
const MAX_RETRIES = 3;
const INTER_QUERY_DELAY = 4000; // be nice to Overpass (it's a shared public resource)

function makeTiles() {
  const tiles = [];
  for (const region of BOUNDS) {
    for (let lat = region.lat0; lat < region.lat1; lat += region.step) {
      for (let lon = region.lon0; lon < region.lon1; lon += region.step) {
        const latN = Math.min(lat + region.step, region.lat1);
        const lonE = Math.min(lon + region.step, region.lon1);
        tiles.push({
          id: `${region.name}:${lat},${lon}`,
          bbox: `${lat},${lon},${latN},${lonE}`,
        });
      }
    }
  }
  return tiles;
}

function query(bbox) {
  return `[out:json][timeout:${TIMEOUT}];
(
  node["leisure"="marina"](${bbox});
  way["leisure"="marina"](${bbox});
  relation["leisure"="marina"](${bbox});
  node["amenity"="marina"](${bbox});
  way["amenity"="marina"](${bbox});
  node["waterway"="dock"]["dock"="marina"](${bbox});
  way["waterway"="dock"]["dock"="marina"](${bbox});
  node["harbour:type"="marina"](${bbox});
  way["harbour:type"="marina"](${bbox});
);
out center tags;`;
}

async function overpass(bbox, attempt = 1) {
  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      "User-Agent": "marinaseeker-grid/1.0 (contact: admin@marinaseeker.com)",
    },
    body: "data=" + encodeURIComponent(query(bbox)),
  });
  if (!res.ok) {
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
      console.log(`    HTTP ${res.status}, retrying in ${RETRY_DELAY / 1000}s...`);
      await new Promise((r) => setTimeout(r, RETRY_DELAY));
      return overpass(bbox, attempt + 1);
    }
    throw new Error(`Overpass HTTP ${res.status}`);
  }
  return res.json();
}

function centerOf(el) {
  if (el.type === "node") return [el.lat, el.lon];
  if (el.center) return [el.center.lat, el.center.lon];
  return [null, null];
}

function extract(elements) {
  const out = [];
  for (const el of elements) {
    const [lat, lng] = centerOf(el);
    if (lat == null || lng == null) continue;
    const t = el.tags || {};
    const name = t.name || t["name:en"] || t.operator || "";
    if (!name) continue;
    out.push({
      osm_id: `${el.type}/${el.id}`,
      name,
      lat,
      lng,
      city: t["addr:city"] || "",
      state: t["addr:state"] || "",
      address: [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" "),
      zip: t["addr:postcode"] || "",
      website: t.website || t["contact:website"] || "",
      phone: t.phone || t["contact:phone"] || "",
      operator: t.operator || "",
      source: "osm-grid",
      tags_raw: t,
    });
  }
  return out;
}

function loadJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { return fallback; }
}

async function main() {
  const tiles = makeTiles();
  console.log(`=== OSM grid fetch: ${tiles.length} tiles ===\n`);

  const state = loadJson(STATE_PATH, { done: [] });
  const doneSet = new Set(state.done);

  const existing = loadJson(EXISTING_PATH, []);
  const existingKeys = new Set(existing.map((r) => `${(r.name || "").toLowerCase().trim()}|${(r.city || "").toLowerCase().trim()}`));
  console.log(`Loaded ${existing.length} existing marinas for dedup\n`);

  const prior = loadJson(OUT_PATH, []);
  const byOsmId = new Map(prior.map((r) => [r.osm_id, r]));

  let apiCalls = 0;
  let newThisRun = 0;
  let dupeVsExisting = 0;

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (doneSet.has(tile.id)) {
      process.stdout.write(`  ${i + 1}/${tiles.length} ${tile.id} (cached)\n`);
      continue;
    }
    process.stdout.write(`  ${i + 1}/${tiles.length} ${tile.id} ... `);

    try {
      const data = await overpass(tile.bbox);
      apiCalls++;
      const marinas = extract(data.elements || []);
      let added = 0;
      let dupes = 0;
      for (const m of marinas) {
        if (byOsmId.has(m.osm_id)) continue;
        const key = `${m.name.toLowerCase().trim()}|${(m.city || "").toLowerCase().trim()}`;
        if (existingKeys.has(key)) { dupes++; dupeVsExisting++; continue; }
        byOsmId.set(m.osm_id, m);
        added++;
        newThisRun++;
      }
      console.log(`${marinas.length} raw, +${added} new, ${dupes} dupe`);
      doneSet.add(tile.id);
      fs.writeFileSync(OUT_PATH, JSON.stringify(Array.from(byOsmId.values()), null, 2));
      fs.writeFileSync(STATE_PATH, JSON.stringify({ done: Array.from(doneSet) }, null, 2));
    } catch (err) {
      console.log(`ERROR ${err.message.slice(0, 100)}`);
    }
    await new Promise((r) => setTimeout(r, INTER_QUERY_DELAY));
  }

  console.log(`\n=== Done ===`);
  console.log(`Tiles queried this run: ${apiCalls}`);
  console.log(`New marinas this run: ${newThisRun}`);
  console.log(`Total OSM-grid marinas: ${byOsmId.size}`);
  console.log(`Duplicates vs existing: ${dupeVsExisting}`);
  console.log(`Output: ${OUT_PATH}`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
