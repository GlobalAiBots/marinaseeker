const fs = require("fs");
const path = require("path");

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const marinas = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "marinas.json"), "utf8"));
console.log(`Loaded ${marinas.length} marinas`);
marinas.sort((a, b) => a.lat - b.lat);

const nearby = {};
const LAT_WINDOW = 0.75;
let comparisons = 0;

for (let i = 0; i < marinas.length; i++) {
  const m = marinas[i];
  const candidates = [];
  for (let j = i - 1; j >= 0 && marinas[j].lat >= m.lat - LAT_WINDOW; j--) {
    const dist = haversine(m.lat, m.lng, marinas[j].lat, marinas[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= 50) candidates.push({ id: marinas[j].id, name: marinas[j].name, distance: Math.round(dist * 10) / 10, city: marinas[j].city, state: marinas[j].state });
  }
  for (let j = i + 1; j < marinas.length && marinas[j].lat <= m.lat + LAT_WINDOW; j++) {
    const dist = haversine(m.lat, m.lng, marinas[j].lat, marinas[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= 50) candidates.push({ id: marinas[j].id, name: marinas[j].name, distance: Math.round(dist * 10) / 10, city: marinas[j].city, state: marinas[j].state });
  }
  candidates.sort((a, b) => a.distance - b.distance);
  if (candidates.length > 0) nearby[m.id] = candidates.slice(0, 5);
  if ((i + 1) % 1000 === 0) console.log(`  ${i + 1}/${marinas.length}`);
}

fs.writeFileSync(path.join(__dirname, "..", "src", "data", "nearby.json"), JSON.stringify(nearby));
console.log(`\nDone: ${comparisons.toLocaleString()} comparisons`);
console.log(`Marinas with nearby: ${Object.keys(nearby).length}/${marinas.length}`);
console.log(`File: ${(fs.statSync(path.join(__dirname, "..", "src", "data", "nearby.json")).size / 1024 / 1024).toFixed(1)}MB`);
