/**
 * fetch-yelp-marinas-coastal.js — Run Yelp Fusion "marinas" search against
 * the curated coastal/lake cities list (small towns the top-250 sweep missed).
 *
 * Dedupes against both existing marinas.json and the earlier yelp-marinas.json run.
 * Appends to yelp-marinas.json (same file as the first run) so a follow-up merge
 * picks up everything in one pass.
 */
const fs = require("fs");
const path = require("path");
const cities = require("./coastal-marina-cities");

const API_KEY = "mb5HrCvOXTKx4RCDd78BsWclu_UR2whJPCyO5iC5pDMaPnJalk0sn4CzAatb-NzuqP8Q-OuVtKyHlPxXJUlAieL5y7hvj_JNkMp0J4DCFaO9O7DFNPCDAez9ri7gaXYx";
const CATEGORY = "marinas";
const OUT_PATH = path.join(__dirname, "..", "src", "data", "yelp-marinas.json");
const EXISTING_PATH = path.join(__dirname, "..", "src", "data", "marinas.json");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normKey = (name, city) => `${(name || "").toLowerCase().trim()}|${(city || "").toLowerCase().trim()}`;

async function yelpSearch(city, state, offset = 0) {
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("categories", CATEGORY);
  url.searchParams.set("location", `${city}, ${state}`);
  url.searchParams.set("limit", "50");
  url.searchParams.set("offset", String(offset));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function main() {
  console.log(`=== Yelp ${CATEGORY} coastal sweep: ${cities.length} towns ===\n`);

  let existingMarinas = [];
  try { existingMarinas = JSON.parse(fs.readFileSync(EXISTING_PATH, "utf-8")); } catch { /* ignore */ }
  const existingKeys = new Set(existingMarinas.map((r) => normKey(r.name, r.city)));
  console.log(`Loaded ${existingMarinas.length} existing marinas for dedup`);

  let prior = [];
  try { prior = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")); } catch { /* ignore */ }
  const byId = new Map(prior.map((r) => [r.id, r]));
  const seenKeys = new Set(prior.map((r) => normKey(r.name, r.city)));
  console.log(`Prior Yelp run had ${prior.length} records; resuming\n`);

  const startingSize = byId.size;
  let apiCalls = 0;
  let added = 0;
  let existingDupes = 0;

  for (let i = 0; i < cities.length; i++) {
    const [city, state] = cities[i];
    process.stdout.write(`  ${i + 1}/${cities.length} ${city}, ${state} ... `);

    try {
      const data = await yelpSearch(city, state, 0);
      apiCalls++;
      const biz = data.businesses || [];
      let cityAdded = 0;
      let cityDupes = 0;

      for (const b of biz) {
        if (byId.has(b.id)) continue;
        const key = normKey(b.name, b.location?.city || city);
        if (existingKeys.has(key) || seenKeys.has(key)) { existingDupes++; cityDupes++; continue; }

        const rec = {
          id: b.id,
          name: b.name,
          address: (b.location?.display_address || []).join(", "),
          city: b.location?.city || city,
          state: b.location?.state || state,
          zip: b.location?.zip_code || "",
          latitude: b.coordinates?.latitude,
          longitude: b.coordinates?.longitude,
          phone: b.display_phone || b.phone || "",
          rating: b.rating,
          review_count: b.review_count,
          yelp_url: b.url,
          source: "yelp",
        };
        byId.set(b.id, rec);
        seenKeys.add(key);
        cityAdded++;
        added++;
      }

      console.log(`${biz.length} biz, +${cityAdded} new, ${cityDupes} dupe (calls: ${apiCalls})`);
      fs.writeFileSync(OUT_PATH, JSON.stringify(Array.from(byId.values()), null, 2));
    } catch (err) {
      console.log(`ERROR ${err.status || ""} ${err.message.slice(0, 80)}`);
      if (err.status === 429) {
        console.log("\n!! Rate limit hit — stopping. Resume tomorrow.");
        break;
      }
    }
    await sleep(1000);
  }

  console.log(`\n=== Done ===`);
  console.log(`API calls this run: ${apiCalls}`);
  console.log(`New this run: ${added}`);
  console.log(`Duplicates vs existing/prior: ${existingDupes}`);
  console.log(`Total Yelp marinas in file: ${byId.size} (was ${startingSize} before coastal sweep)`);
  console.log(`Output: ${OUT_PATH}`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
