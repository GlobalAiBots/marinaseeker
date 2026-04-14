/**
 * Offline state assignment using lat/lng bounding boxes.
 * No API calls needed — assigns US state based on coordinate ranges.
 * Won't get city names, but will assign state codes accurately for ~95% of records.
 */
const fs = require("fs");
const path = require("path");

// State bounding boxes [minLat, maxLat, minLng, maxLng]
// Ordered by area (smallest first) so smaller states match before larger overlapping ones
const STATES = [
  ["DC", 38.79, 38.995, -77.12, -76.91],
  ["RI", 41.09, 42.02, -71.91, -71.12],
  ["DE", 38.45, 39.84, -75.79, -75.05],
  ["CT", 40.98, 42.05, -73.73, -71.79],
  ["NJ", 38.92, 41.36, -75.56, -73.89],
  ["NH", 42.7, 45.31, -72.56, -70.7],
  ["VT", 42.73, 45.02, -73.44, -71.5],
  ["MA", 41.24, 42.89, -73.51, -69.93],
  ["HI", 18.91, 22.24, -160.25, -154.8],
  ["MD", 37.91, 39.72, -79.49, -75.05],
  ["WV", 37.2, 40.64, -82.64, -77.72],
  ["SC", 32.03, 35.22, -83.35, -78.54],
  ["IN", 37.77, 41.76, -88.1, -84.78],
  ["KY", 36.5, 39.15, -89.57, -81.96],
  ["TN", 34.98, 36.68, -90.31, -81.65],
  ["VA", 36.54, 39.47, -83.68, -75.24],
  ["OH", 38.4, 42.32, -84.82, -80.52],
  ["PA", 39.72, 42.27, -80.52, -74.69],
  ["MS", 30.17, 35.0, -91.66, -88.1],
  ["LA", 28.93, 33.02, -94.04, -88.82],
  ["AL", 30.22, 35.01, -88.47, -84.89],
  ["GA", 30.36, 35.0, -85.61, -80.84],
  ["FL", 24.52, 31.0, -87.63, -80.03],
  ["NC", 33.84, 36.59, -84.32, -75.46],
  ["AR", 33.0, 36.5, -94.62, -89.64],
  ["IL", 36.97, 42.51, -91.51, -87.02],
  ["IA", 40.38, 43.5, -96.64, -90.14],
  ["MO", 35.99, 40.61, -95.77, -89.1],
  ["OK", 33.62, 37.0, -103.0, -94.43],
  ["KS", 36.99, 40.0, -102.05, -94.59],
  ["NE", 39.99, 43.0, -104.05, -95.31],
  ["SD", 42.48, 45.95, -104.06, -96.44],
  ["ND", 45.93, 49.0, -104.05, -96.55],
  ["MN", 43.5, 49.38, -97.24, -89.49],
  ["WI", 42.49, 47.31, -92.89, -86.25],
  ["MI", 41.7, 48.31, -90.42, -82.12],
  ["NY", 40.5, 45.02, -79.76, -71.86],
  ["ME", 43.06, 47.46, -71.08, -66.95],
  ["TX", 25.84, 36.5, -106.65, -93.51],
  ["NM", 31.33, 37.0, -109.05, -103.0],
  ["CO", 36.99, 41.0, -109.06, -102.04],
  ["WY", 40.99, 45.01, -111.06, -104.05],
  ["MT", 44.36, 49.0, -116.05, -104.04],
  ["ID", 41.99, 49.0, -117.24, -111.04],
  ["UT", 36.99, 42.0, -114.05, -109.04],
  ["AZ", 31.33, 37.0, -114.82, -109.04],
  ["NV", 35.0, 42.0, -120.0, -114.04],
  ["WA", 45.54, 49.0, -124.85, -116.92],
  ["OR", 41.99, 46.29, -124.57, -116.46],
  ["CA", 32.53, 42.01, -124.41, -114.13],
  ["AK", 51.21, 71.39, -179.15, -129.98],
];

function getState(lat, lng) {
  for (const [code, minLat, maxLat, minLng, maxLng] of STATES) {
    if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) {
      return code;
    }
  }
  return null;
}

const DATA_FILE = path.join(__dirname, "output", "marinas-compiled.json");
const shops = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
const need = shops.filter(s => !s.state && s.lat && s.lng);

console.log(`Total: ${shops.length}, Need state: ${need.length}`);

let assigned = 0, missed = 0;
for (const shop of need) {
  const state = getState(shop.lat, shop.lng);
  if (state) {
    shop.state = state;
    assigned++;
  } else {
    missed++;
  }
}

fs.writeFileSync(DATA_FILE, JSON.stringify(shops));
const finalWithState = shops.filter(s => s.state).length;
console.log(`Assigned: ${assigned}, Missed: ${missed}`);
console.log(`Total with state: ${finalWithState}/${shops.length} (${Math.round(finalWithState/shops.length*100)}%)`);
