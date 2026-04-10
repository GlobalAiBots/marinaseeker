const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "output", "marinas-compiled.json");
const API_KEY = "pk.95179142d59d80b5ebbe23bd403bf346";
const API_URL = "https://us1.locationiq.com/v1/reverse";
const RATE_MS = 550; // 2 req/sec on free tier

const STATE_ABBREVS = {"alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY","north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","west virginia":"WV","wisconsin":"WI","wyoming":"WY"};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function geocode(lat, lon) {
  const url = `${API_URL}?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url);
  if (res.status === 429) {
    console.log("    Rate limited, waiting 60s...");
    await sleep(60000);
    return geocode(lat, lon);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.address) return null;
  const a = data.address;
  const st = STATE_ABBREVS[(a.state || "").toLowerCase()] || "";
  const city = a.city || a.town || a.village || a.hamlet || a.county || "";
  return { state: st, city };
}

async function main() {
  const marinas = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const need = marinas.filter(m => !m.state && m.lat && m.lng);
  console.log(`Total: ${marinas.length}, Need geocoding: ${need.length}`);

  let done = 0, fail = 0;
  for (let i = 0; i < need.length; i++) {
    try {
      const r = await geocode(need[i].lat, need[i].lng);
      if (r && r.state) {
        need[i].state = r.state;
        if (!need[i].city && r.city) need[i].city = r.city;
        done++;
      } else { fail++; }
    } catch (e) { fail++; }

    if ((i + 1) % 100 === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(marinas, null, 2));
      console.log(`  ${i + 1}/${need.length} — done: ${done}, fail: ${fail}`);
    }
    await sleep(RATE_MS);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(marinas, null, 2));
  console.log(`\nFINISHED: ${done} geocoded, ${fail} failed`);
  console.log(`Total with state: ${marinas.filter(m => m.state).length}/${marinas.length}`);
}

main().catch(console.error);
