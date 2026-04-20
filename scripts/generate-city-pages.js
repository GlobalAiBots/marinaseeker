const fs = require("fs");
const path = require("path");

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

const STATE_NAMES = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
const STATE_SLUGS = {};
Object.entries(STATE_NAMES).forEach(([c, n]) => { STATE_SLUGS[c] = slugify(n); });

const marinas = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "marinas.json"), "utf8"));

const cityGroups = {};
marinas.forEach(m => {
  if (!m.city || !m.city.trim() || m.city.trim().length < 2 || !m.state) return;
  const key = `${m.state}|${m.city.trim()}`;
  if (!cityGroups[key]) cityGroups[key] = { state: m.state, city: m.city.trim(), lats: [], lngs: [], count: 0 };
  cityGroups[key].count++;
  cityGroups[key].lats.push(m.lat);
  cityGroups[key].lngs.push(m.lng);
});

const cities = Object.values(cityGroups).filter(c => c.count >= 1).map(c => ({
  state: c.state, stateName: STATE_NAMES[c.state] || c.state, stateSlug: STATE_SLUGS[c.state] || slugify(c.state),
  city: c.city, citySlug: slugify(c.city), count: c.count,
  lat: c.lats.reduce((a, b) => a + b, 0) / c.lats.length,
  lng: c.lngs.reduce((a, b) => a + b, 0) / c.lngs.length,
})).sort((a, b) => b.count - a.count);

fs.writeFileSync(path.join(__dirname, "..", "src", "data", "city-pages.json"), JSON.stringify(cities, null, 2));

const sitemapLines = cities.map(c => `  <url><loc>https://www.marinaseeker.com/cities/${c.stateSlug}-${c.citySlug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-cities.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapLines.join("\n")}\n</urlset>`);

console.log(`City pages: ${cities.length}`);
console.log("\nTop 20:");
cities.slice(0, 20).forEach(c => console.log(`  ${c.city}, ${c.state}: ${c.count} marinas`));
