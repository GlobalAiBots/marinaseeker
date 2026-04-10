const fs = require("fs");
const path = require("path");

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

const STATE_NAMES = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
const STATE_SLUGS = {};
Object.entries(STATE_NAMES).forEach(([c, n]) => { STATE_SLUGS[c] = slugify(n); });

const marinas = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "marinas.json"), "utf8"));

function groupByState(list) {
  const byState = {};
  list.forEach(m => {
    const st = m.state || "Unknown";
    if (!byState[st]) byState[st] = { code: st, name: STATE_NAMES[st] || st, slug: STATE_SLUGS[st] || slugify(st), count: 0 };
    byState[st].count++;
  });
  return Object.values(byState).sort((a, b) => b.count - a.count);
}

const catDefs = [
  { slug: "yacht-clubs", title: "Yacht Clubs & Sailing Clubs", desc: "Private and semi-private yacht clubs and sailing clubs with membership-based marina access.",
    match: m => { const n = (m.name||"").toLowerCase(); return n.includes("yacht") || n.includes("sailing") || n.includes("sail club"); } },
  { slug: "with-pump-out", title: "Marinas with Pump-Out Stations", desc: "Marinas equipped with pump-out stations for proper waste disposal \u2014 required for responsible boating.",
    match: m => (m.amenities||[]).includes("pump_out") },
  { slug: "with-electric", title: "Marinas with Shore Power", desc: "Marinas offering electrical hookups at the dock so you can plug in and keep systems running.",
    match: m => (m.amenities||[]).includes("electricity") },
  { slug: "with-wifi", title: "Marinas with WiFi", desc: "Marinas offering wireless internet access at the docks \u2014 essential for liveaboards and remote workers.",
    match: m => (m.amenities||[]).includes("wifi") },
  { slug: "municipal", title: "Municipal & Public Marinas", desc: "Government-owned public marinas typically offering lower slip rates and transient docking.",
    match: m => { const n = (m.name||"").toLowerCase(); return n.includes("municipal") || n.includes("public") || n.includes("city") || n.includes("county") || (m.categories||[]).includes("public"); } },
  { slug: "resort-marinas", title: "Resort Marinas", desc: "Marinas at waterfront resorts offering full amenities, dining, and accommodation alongside docking.",
    match: m => { const n = (m.name||"").toLowerCase(); return n.includes("resort") || n.includes("lodge") || n.includes("hotel"); } },
  { slug: "boat-rental", title: "Marinas with Boat Rentals", desc: "Marinas offering boat rentals so you can get on the water without owning a vessel.",
    match: m => (m.amenities||[]).includes("boat_rental") },
];

const categories = catDefs.map(def => {
  const matching = marinas.filter(def.match);
  return { slug: def.slug, title: def.title, description: def.desc, totalCount: matching.length, states: groupByState(matching) };
}).filter(c => c.totalCount >= 5);

console.log("Categories:");
categories.forEach(c => console.log(`  ${c.slug}: ${c.totalCount} marinas`));

fs.writeFileSync(path.join(__dirname, "..", "src", "data", "categories.json"), JSON.stringify(categories, null, 2));

const sitemapLines = categories.map(c => `  <url><loc>https://marinaseeker.com/category/${c.slug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-categories.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapLines.join("\n")}\n</urlset>`);

console.log(`\nTotal: ${categories.length} categories`);
