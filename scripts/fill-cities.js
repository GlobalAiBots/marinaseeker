const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "output", "marinas-compiled.json");
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";
const USER_AGENT = "MarinaSeeker/1.0 (admin@globalaibots.com)";
const RATE_LIMIT_MS = 1100;

const STATE_ABBREVS = {
  "alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA",
  "colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA",
  "hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS",
  "kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA",
  "michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT",
  "nebraska":"NE","nevada":"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM",
  "new york":"NY","north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK",
  "oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC",
  "south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT",
  "virginia":"VA","washington":"WA","west virginia":"WV","wisconsin":"WI","wyoming":"WY",
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

async function reverseGeocode(lat, lon) {
  const url = `${NOMINATIM_URL}?lat=${lat}&lon=${lon}&format=json&zoom=10`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) {
    if (res.status === 429) {
      console.log("    Rate limited, waiting 5s...");
      await sleep(5000);
      return reverseGeocode(lat, lon);
    }
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  if (!data.address) return null;
  const a = data.address;
  const stateRaw = a.state || "";
  const stateAbbr = STATE_ABBREVS[stateRaw.toLowerCase()] || stateRaw;
  const city = a.city || a.town || a.village || a.hamlet || a.county || "";
  const country = a.country_code || "";
  return { state: stateAbbr, city, country };
}

async function main() {
  const marinas = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const needGeocode = marinas.filter(m => !m.state && m.lat && m.lng);

  console.log(`Total marinas: ${marinas.length}`);
  console.log(`Need geocoding: ${needGeocode.length}`);

  let updated = 0, failed = 0, nonUS = 0;

  for (let i = 0; i < needGeocode.length; i++) {
    const m = needGeocode[i];
    try {
      const result = await reverseGeocode(m.lat, m.lng);
      if (result) {
        if (result.country && result.country !== "us") {
          nonUS++;
        } else {
          m.state = result.state;
          if (!m.city && result.city) m.city = result.city;
          // Regenerate slug with state
          if (m.state) {
            m.id = `marina-${slugify(m.state)}-${slugify(m.name)}-${marinas.indexOf(m)}`;
          }
          updated++;
        }
      } else {
        failed++;
      }
    } catch (e) {
      failed++;
    }

    if ((i + 1) % 50 === 0) {
      console.log(`  ${i + 1}/${needGeocode.length} processed (${updated} updated, ${failed} failed, ${nonUS} non-US)`);
    }

    // Save every 100 records
    if ((i + 1) % 100 === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(marinas, null, 2));
      console.log(`  Saved progress at ${i + 1}`);
    }

    await sleep(RATE_LIMIT_MS);
  }

  // Final save
  fs.writeFileSync(DATA_FILE, JSON.stringify(marinas, null, 2));

  // Report
  const withState = marinas.filter(m => m.state).length;
  const withCity = marinas.filter(m => m.city).length;
  const stateCounts = {};
  marinas.forEach(m => { if (m.state) stateCounts[m.state] = (stateCounts[m.state] || 0) + 1; });

  console.log(`\n=== GEOCODING REPORT ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Non-US (skipped): ${nonUS}`);
  console.log(`Total with state: ${withState}/${marinas.length}`);
  console.log(`Total with city: ${withCity}/${marinas.length}`);
  console.log(`\nTop 20 states:`);
  Object.entries(stateCounts).sort((a,b) => b[1]-a[1]).slice(0,20).forEach(([st,c]) => console.log(`  ${st}: ${c}`));
}

main().catch(console.error);
