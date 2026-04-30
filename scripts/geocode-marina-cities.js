#!/usr/bin/env node
/* eslint-disable */
/**
 * Reverse geocode marina records that have lat/lng but missing city.
 * Resumable, daily-quota-aware (4,900/day cap), retry-with-backoff
 * on rate-limit (429) and DNS / network errors.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = process.env.LOCATIONIQ_API_KEY;
if (!API_KEY) { console.error("Set LOCATIONIQ_API_KEY"); process.exit(1); }

const DATA_FILE = path.join(__dirname, "..", "src", "data", "marinas.json");
const PROGRESS_FILE = path.join(__dirname, ".geocode-progress.json");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function reverseGeocode(lat, lng) {
  return new Promise((resolve, reject) => {
    const url = `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${lat}&lon=${lng}&format=json&zoom=10`;
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.error) reject(new Error(json.error));
          else resolve(json);
        } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

function extractCity(geocodeResponse) {
  const a = geocodeResponse.address || {};
  return a.city || a.town || a.village || a.hamlet || a.suburb || a.county || null;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  let progress = {};
  if (fs.existsSync(PROGRESS_FILE)) {
    progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
  }
  progress.done = progress.done || {};

  const dailyLimit = 4900;
  let sessionCount = 0;
  let geocoded = 0;

  for (let i = 0; i < data.length; i++) {
    const m = data[i];
    const id = m.id || `idx-${i}`;
    if (progress.done[id]) continue;

    const hasCity = m.city && String(m.city).trim();
    const lat = parseFloat(m.lat ?? m.latitude);
    const lng = parseFloat(m.lng ?? m.lon ?? m.longitude);
    if (hasCity || !Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    if (sessionCount >= dailyLimit) {
      console.log(`Daily limit (${dailyLimit}). Saving progress.`);
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
      return;
    }

    let attempts = 0;
    let success = false;
    while (attempts < 3 && !success) {
      attempts++;
      try {
        const result = await reverseGeocode(lat, lng);
        const city = extractCity(result);
        if (city) {
          data[i].city = city;
          geocoded++;
        }
        progress.done[id] = true;
        sessionCount++;
        if (sessionCount % 100 === 0) {
          console.log(`  ${sessionCount} attempts (${geocoded} populated) — at idx ${i}`);
          fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
          fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
        }
        success = true;
        await sleep(1100);
      } catch (e) {
        const isRate = /rate limit|429|minute/i.test(e.message);
        const isNet = /ENOTFOUND|ETIMEDOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|getaddrinfo/i.test(e.message);
        if ((isRate || isNet) && attempts < 3) {
          const wait = isRate ? 65000 : 5000;
          console.log(`  ${isRate ? "rate-limit" : "network"} retry ${attempts}/3 at idx ${i} — ${wait}ms`);
          fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
          fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
          await sleep(wait);
          continue;
        }
        console.error(`  ERR idx ${i} (${lat},${lng}): ${e.message}`);
        if (!isNet && !isRate) progress.done[id] = true;
        sessionCount++;
        break;
      }
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
  console.log(`Done. Geocoded this session: ${geocoded} (attempts: ${sessionCount})`);
}

main().catch((e) => { console.error(e); process.exit(1); });
