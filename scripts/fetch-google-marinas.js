/**
 * fetch-google-marinas.js — Google Places Text Search for "marinas in {city}, {state}"
 * across a curated list of ~280 coastal + lake cities.
 *
 * Uses GOOGLE_PLACES_API_KEY from .env.local. Run with:
 *   node --env-file=.env.local scripts/fetch-google-marinas.js
 *
 * Writes src/data/google-marinas.json. Resumable (skips city if already queried).
 */
const fs = require("fs");
const path = require("path");
const cities = require("./coastal-marina-cities");

// Load .env.local manually so `node scripts/fetch-google-marinas.js` works without --env-file.
function loadDotEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const txt = fs.readFileSync(envPath, "utf-8");
  for (const line of txt.split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    if (!(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
}
loadDotEnv();

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
if (!API_KEY) {
  console.error("ERROR: GOOGLE_PLACES_API_KEY missing from .env.local");
  process.exit(1);
}

const OUT_PATH = path.join(__dirname, "..", "src", "data", "google-marinas.json");
const STATE_PATH = path.join(__dirname, "..", "src", "data", "google-marinas.state.json");
const EXISTING_PATH = path.join(__dirname, "..", "src", "data", "marinas.json");

const TEXT_SEARCH = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const INTER_REQUEST_DELAY = 300; // ms between calls — Google allows ~10 QPS
const MAX_PAGES_PER_CITY = 1; // first-page only to cap cost at ~$5 per 1000 calls

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => (s || "").toLowerCase().trim();
const key = (name, city, state) => `${norm(name)}|${norm(city)}|${(state || "").toUpperCase()}`;

function loadJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { return fallback; }
}

function parseCityState(formatted_address) {
  // "123 Main St, Miami, FL 33101, USA" -> { city: "Miami", state: "FL", zip: "33101" }
  if (!formatted_address) return { city: "", state: "", zip: "" };
  const parts = formatted_address.split(",").map((s) => s.trim());
  if (parts.length < 3) return { city: "", state: "", zip: "" };
  const city = parts[parts.length - 3] || "";
  const stateZip = parts[parts.length - 2] || "";
  const m = stateZip.match(/([A-Z]{2})(?:\s+(\d{5}))?/);
  return { city, state: m ? m[1] : "", zip: m && m[2] ? m[2] : "" };
}

async function textSearch(query, pageToken) {
  const url = new URL(TEXT_SEARCH);
  if (pageToken) {
    url.searchParams.set("pagetoken", pageToken);
  } else {
    url.searchParams.set("query", query);
  }
  url.searchParams.set("key", API_KEY);
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function main() {
  console.log(`=== Google Places fetch: ${cities.length} cities, marinas query ===\n`);

  const state = loadJson(STATE_PATH, { done: [] });
  const doneSet = new Set(state.done);

  const existing = loadJson(EXISTING_PATH, []);
  const existingKeys = new Set(existing.map((r) => key(r.name, r.city, r.state)));
  console.log(`Loaded ${existing.length} existing marinas for dedup\n`);

  const prior = loadJson(OUT_PATH, []);
  const byPlaceId = new Map(prior.map((r) => [r.place_id, r]));

  let apiCalls = 0, newThisRun = 0, existingDupes = 0, errors = 0;

  for (let i = 0; i < cities.length; i++) {
    const [city, st] = cities[i];
    const cityKey = `${city},${st}`;
    if (doneSet.has(cityKey)) {
      process.stdout.write(`  ${i + 1}/${cities.length} ${city}, ${st} (cached)\n`);
      continue;
    }
    process.stdout.write(`  ${i + 1}/${cities.length} ${city}, ${st} ... `);

    try {
      let pageToken = null;
      let cityResults = 0;
      let cityAdded = 0;
      let cityDupes = 0;

      for (let page = 0; page < MAX_PAGES_PER_CITY; page++) {
        const data = await textSearch(`marinas in ${city}, ${st}`, pageToken);
        apiCalls++;

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
          process.stdout.write(`[status:${data.status}] `);
          if (data.status === "OVER_QUERY_LIMIT" || data.status === "REQUEST_DENIED") {
            console.log(`\n!! ${data.status} — stopping.`);
            return;
          }
          break;
        }

        const results = data.results || [];
        cityResults += results.length;

        for (const r of results) {
          if (byPlaceId.has(r.place_id)) continue;
          const parsed = parseCityState(r.formatted_address);
          const rec = {
            place_id: r.place_id,
            name: r.name,
            formatted_address: r.formatted_address || "",
            lat: r.geometry?.location?.lat,
            lng: r.geometry?.location?.lng,
            city: parsed.city || city,
            state: parsed.state || st,
            zip: parsed.zip || "",
            rating: r.rating,
            user_ratings_total: r.user_ratings_total,
            types: r.types || [],
            business_status: r.business_status || "",
            source: "google-places",
          };
          // Sanity: only keep results that look like actual marinas (name or types hint)
          const isMarina = /marina|yacht club|harbor/i.test(rec.name) ||
                          (rec.types || []).some((t) => /marina/i.test(t));
          if (!isMarina) continue;

          const k = key(rec.name, rec.city, rec.state);
          if (existingKeys.has(k)) { existingDupes++; cityDupes++; continue; }
          byPlaceId.set(r.place_id, rec);
          newThisRun++;
          cityAdded++;
        }

        pageToken = data.next_page_token;
        if (!pageToken) break;
        await sleep(2500); // Google requires ~2s wait before next_page_token is valid
      }

      console.log(`${cityResults} results, +${cityAdded} new, ${cityDupes} dupe (calls: ${apiCalls})`);
      doneSet.add(cityKey);
      fs.writeFileSync(OUT_PATH, JSON.stringify(Array.from(byPlaceId.values()), null, 2));
      fs.writeFileSync(STATE_PATH, JSON.stringify({ done: Array.from(doneSet) }, null, 2));
    } catch (err) {
      console.log(`ERROR ${err.status || ""} ${err.message.slice(0, 100)}`);
      errors++;
    }
    await sleep(INTER_REQUEST_DELAY);
  }

  console.log(`\n=== Done ===`);
  console.log(`API calls: ${apiCalls}`);
  console.log(`Google marinas saved (cumulative): ${byPlaceId.size}`);
  console.log(`New this run: ${newThisRun}`);
  console.log(`Duplicates vs existing: ${existingDupes}`);
  console.log(`Errors: ${errors}`);
  console.log(`Est. cost: $${(apiCalls * 0.017).toFixed(2)} (text-search @ $17/1000)`);
  console.log(`Output: ${OUT_PATH}`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
