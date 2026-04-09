/**
 * Convert marinas-compiled.json into src/data/marinas.json for the site.
 * Filters to US-only, ensures all have state codes, and creates clean format.
 */
const fs = require("fs");
const path = require("path");

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const compiled = JSON.parse(
  fs.readFileSync(path.join(__dirname, "output", "marinas-compiled.json"), "utf8")
);

// Filter: must have name, coordinates, and a US state code (2 chars)
const usMarinas = compiled.filter((m) => {
  if (!m.name || !m.lat || !m.lng) return false;
  if (!m.state || m.state.length !== 2) return false;
  return true;
});

// Clean up for the site
const siteData = usMarinas.map((m, i) => ({
  id: `marina-${slugify(m.state)}-${slugify(m.name)}-${i}`,
  name: m.name,
  slug: slugify(m.name),
  lat: m.lat,
  lng: m.lng,
  state: m.state,
  city: m.city || "",
  source: m.source || "osm",
  amenities: m.amenities || [],
  website: m.website || "",
  phone: m.phone || "",
  email: m.email || "",
  capacity: m.capacity || null,
  operator: m.operator || "",
  description: m.description || "",
  categories: m.categories || [],
}));

const output = path.join(__dirname, "..", "src", "data", "marinas.json");
fs.writeFileSync(output, JSON.stringify(siteData, null, 2));

// Stats
const stateCounts = {};
siteData.forEach((m) => {
  stateCounts[m.state] = (stateCounts[m.state] || 0) + 1;
});

console.log(`Total marinas for site: ${siteData.length}`);
console.log(`States represented: ${Object.keys(stateCounts).length}`);
console.log("\nTop 15 states:");
Object.entries(stateCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([st, c]) => console.log(`  ${st}: ${c}`));
console.log(`\nSaved to ${output}`);
