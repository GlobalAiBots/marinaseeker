// Enrich marinas.json with Yelp ratings.
// Only touches records where rating is null or 0. Keeps existing data on no-match.
//
// Run: node --env-file=.env.local scripts/enrich-marinas-yelp.js
// Optional: MAX_RECORDS=500 node --env-file=.env.local scripts/enrich-marinas-yelp.js

import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.YELP_API_KEY;
if (!API_KEY) { console.error("Missing YELP_API_KEY"); process.exit(1); }

const DATA_PATH = path.resolve("src/data/marinas.json");
const CATEGORY = "marinas";
const SLEEP_MS = 200;
const SAVE_EVERY = 50;
const NAME_THRESHOLD = 0.8;
const MAX_MILES = 15;
const MAX_RECORDS = parseInt(process.env.MAX_RECORDS || "999999", 10);

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "&", "of", "for", "at", "on",
  "inc", "llc", "co", "ltd", "corp", "corporation", "company",
  "marina", "marinas", "harbor", "harbour", "dock", "docks", "pier", "piers",
  "yacht", "club", "resort", "boat", "boats", "boating", "boating's",
  "lake", "river", "bay", "cove", "point", "landing",
]);

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP_WORDS.has(w))
    .join(" ")
    .trim();
}

function bigrams(s) {
  const set = new Set();
  const t = s.replace(/\s/g, "");
  for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
  return set;
}

function dice(a, b) {
  const an = normalize(a);
  const bn = normalize(b);
  if (!an || !bn) return 0;
  if (an === bn) return 1;
  const aB = bigrams(an);
  const bB = bigrams(bn);
  if (aB.size === 0 || bB.size === 0) return 0;
  let inter = 0;
  for (const x of aB) if (bB.has(x)) inter++;
  return (2 * inter) / (aB.size + bB.size);
}

function milesBetween(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return Infinity;
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function yelpSearch({ term, location, category, limit = 3 }) {
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("term", term);
  url.searchParams.set("location", location);
  url.searchParams.set("categories", category);
  url.searchParams.set("limit", String(limit));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (res.status === 400) return { businesses: [] };
  if (!res.ok) { const t = await res.text(); throw new Error(`Yelp ${res.status}: ${t.slice(0, 200)}`); }
  return res.json();
}

async function main() {
  console.log(`Loading ${DATA_PATH}...`);
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const needs = data
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => (r.rating == null || r.rating === 0) && r.city && r.name && r.state);
  console.log(`Total marinas: ${data.length}`);
  console.log(`Need enrichment: ${needs.length}`);
  console.log(`Max this run: ${Math.min(MAX_RECORDS, needs.length)}`);
  console.log("");

  let enriched = 0, noMatch = 0, errors = 0, processed = 0;
  const startedAt = Date.now();
  const toProcess = needs.slice(0, MAX_RECORDS);

  for (let n = 0; n < toProcess.length; n++) {
    const { r, i } = toProcess[n];
    processed = n + 1;

    try {
      const json = await yelpSearch({
        term: r.name,
        location: `${r.city}, ${r.state}`,
        category: CATEGORY,
        limit: 3,
      });
      const candidates = json.businesses || [];

      let best = null, bestScore = 0;
      for (const c of candidates) {
        const score = dice(r.name, c.name);
        const miles = milesBetween(r.lat, r.lng, c.coordinates?.latitude, c.coordinates?.longitude);
        if (score > bestScore && miles <= MAX_MILES) {
          best = c; bestScore = score;
        }
      }

      if (best && bestScore >= NAME_THRESHOLD) {
        data[i].rating = best.rating ?? 0;
        data[i].reviewCount = best.review_count ?? 0;
        if (!data[i].phone && best.display_phone) data[i].phone = best.display_phone;
        if (!data[i].phone && best.phone) data[i].phone = best.phone;
        if (!data[i].website && best.url) data[i].website = best.url.split("?")[0];
        data[i].yelpMatched = true;
        data[i].yelpMatchScore = Number(bestScore.toFixed(2));
        enriched++;
      } else {
        noMatch++;
      }
    } catch (e) {
      if (e.message === "RATE_LIMIT") {
        console.log(`\nYelp rate limit hit after ${processed} processed. Saving progress and stopping.`);
        break;
      }
      errors++;
      if (errors <= 3) console.log(`  error on "${r.name}" (${r.city}, ${r.state}): ${e.message}`);
    }

    if (processed % SAVE_EVERY === 0) {
      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
      console.log(`[${processed}/${toProcess.length}] enriched=${enriched} noMatch=${noMatch} errors=${errors} (${elapsed}s)`);
    }

    await sleep(SLEEP_MS);
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
  console.log(`\n=== MARINAS ENRICHMENT DONE ===`);
  console.log(`Processed: ${processed}`);
  console.log(`Enriched: ${enriched}`);
  console.log(`No match: ${noMatch}`);
  console.log(`Errors: ${errors}`);
  console.log(`Elapsed: ${elapsed}s`);
  console.log(`Remaining unenriched in file: ${needs.length - enriched}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
