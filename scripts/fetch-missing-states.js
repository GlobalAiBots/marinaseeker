const fs = require("fs");
const path = require("path");

const STATES = [
  { code: "CT", name: "Connecticut" },
  { code: "MA", name: "Massachusetts" },
  { code: "ME", name: "Maine" },
  { code: "ND", name: "North Dakota" },
  { code: "NH", name: "New Hampshire" },
  { code: "NY", name: "New York" },
  { code: "RI", name: "Rhode Island" },
  { code: "VT", name: "Vermont" },
];

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

async function fetchState(stateName) {
  const query = `[out:json][timeout:120];
area["name"="${stateName}"]["admin_level"="4"]->.state;
(
  node["leisure"="marina"](area.state);
  way["leisure"="marina"](area.state);
  relation["leisure"="marina"](area.state);
);
out center tags;`;

  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    body: `data=${encodeURIComponent(query)}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${stateName}`);
  const data = await res.json();
  return data.elements || [];
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const allNew = [];

  for (const state of STATES) {
    console.log(`Fetching ${state.name}...`);
    try {
      const elements = await fetchState(state.name);
      console.log(`  Found ${elements.length} marinas`);

      for (const el of elements) {
        const lat = el.lat || el.center?.lat;
        const lng = el.lon || el.center?.lon;
        if (!lat || !lng) continue;

        const tags = el.tags || {};
        allNew.push({
          osm_id: el.id,
          name: tags.name || tags["name:en"] || "Marina",
          lat,
          lng,
          state: state.code,
          city: "",
          phone: tags.phone || tags["contact:phone"] || "",
          website: tags.website || tags["contact:website"] || "",
          email: tags.email || tags["contact:email"] || "",
          operator: tags.operator || "",
          capacity: tags.capacity ? parseInt(tags.capacity) : null,
          description: tags.description || "",
          amenities: [],
          address: tags["addr:street"] ? `${tags["addr:housenumber"] || ""} ${tags["addr:street"]}`.trim() : "",
        });

        // Detect amenities from tags
        const m = allNew[allNew.length - 1];
        if (tags.fuel === "yes" || tags["seamark:small_craft_facility:category"]?.includes("fuel")) m.amenities.push("fuel");
        if (tags.electricity === "yes" || tags.power_supply === "yes") m.amenities.push("electricity");
        if (tags.sanitary_dump_station === "yes" || tags.pump_out === "yes") m.amenities.push("pump_out");
        if (tags.toilets === "yes") m.amenities.push("toilets");
        if (tags.shower === "yes" || tags.showers === "yes") m.amenities.push("showers");
        if (tags.laundry === "yes") m.amenities.push("laundry");
        if (tags.internet_access === "yes" || tags.internet_access === "wlan") m.amenities.push("wifi");
        if (tags.restaurant === "yes" || tags.cuisine) m.amenities.push("restaurant");
      }
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
    await sleep(5000); // Be nice to Overpass
  }

  console.log(`\nTotal new marinas: ${allNew.length}`);

  // Merge with existing compiled data
  const compiledPath = path.join(__dirname, "output", "marinas-compiled.json");
  const existing = JSON.parse(fs.readFileSync(compiledPath, "utf8"));
  const existingIds = new Set(existing.map(m => m.osm_id));
  const deduped = allNew.filter(m => !existingIds.has(m.osm_id));
  console.log(`After dedup: ${deduped.length} new (${allNew.length - deduped.length} already existed)`);

  existing.push(...deduped);
  fs.writeFileSync(compiledPath, JSON.stringify(existing));
  console.log(`Compiled total: ${existing.length}`);
}

main().catch(console.error);
