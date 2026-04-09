"""Fetch all US marinas from OpenStreetMap via Overpass API."""
import requests
import json
import time
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

regions = [
    ("Northeast", "40.5,-80,47.5,-66.9"),
    ("Southeast", "24.5,-91.7,40.5,-75"),
    ("Midwest", "36,-104.5,49,-80"),
    ("Southwest", "25,-124.5,42,-104.5"),
    ("Northwest", "42,-124.5,49,-104.5"),
    ("Alaska", "51,-180,71.5,-129.9"),
    ("Hawaii", "18.5,-161,22.5,-154.5"),
    ("Gulf Coast", "24.5,-97.5,31,-80"),
]

QUERY_TEMPLATE = """[out:json][timeout:300];
(
  node["leisure"="marina"]({bbox});
  way["leisure"="marina"]({bbox});
  relation["leisure"="marina"]({bbox});
  node["waterway"="dock"]["dock"="marina"]({bbox});
  way["waterway"="dock"]["dock"="marina"]({bbox});
  node["harbour:type"="marina"]({bbox});
  way["harbour:type"="marina"]({bbox});
  node["seamark:type"="harbour"]["seamark:harbour:category"="marina"]({bbox});
  way["seamark:type"="harbour"]["seamark:harbour:category"="marina"]({bbox});
);
out center tags;"""


def get_coords(el):
    if "lat" in el and "lon" in el:
        return el["lat"], el["lon"]
    if "center" in el:
        return el["center"]["lat"], el["center"]["lon"]
    return None, None


def query_region(name, bbox):
    query = QUERY_TEMPLATE.format(bbox=bbox)
    print(f"  Querying {name} ({bbox})...")
    for attempt in range(3):
        try:
            resp = requests.post(
                OVERPASS_URL,
                data={"data": query},
                headers={"User-Agent": "MarinaSeeker/1.0 (admin@globalaibots.com)"},
                timeout=120,
            )
            if resp.status_code == 429:
                wait = (attempt + 1) * 15
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if resp.status_code == 504:
                wait = (attempt + 1) * 20
                print(f"    Timeout, waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            data = resp.json()
            return data.get("elements", [])
        except Exception as e:
            print(f"    Error attempt {attempt+1}: {e}")
            time.sleep(10)
    return []


def main():
    all_marinas = []
    seen_ids = set()

    for name, bbox in regions:
        elements = query_region(name, bbox)
        count = 0
        for el in elements:
            osm_id = f"{el['type']}_{el['id']}"
            if osm_id in seen_ids:
                continue
            seen_ids.add(osm_id)

            tags = el.get("tags", {})
            marina_name = tags.get("name", "")
            if not marina_name:
                continue

            lat, lng = get_coords(el)
            if lat is None:
                continue

            marina = {
                "osm_id": osm_id,
                "osm_type": el["type"],
                "name": marina_name,
                "lat": lat,
                "lng": lng,
                "website": tags.get("website", tags.get("contact:website", "")),
                "phone": tags.get("phone", tags.get("contact:phone", "")),
                "email": tags.get("email", tags.get("contact:email", "")),
                "capacity": tags.get("capacity", None),
                "operator": tags.get("operator", ""),
                "description": tags.get("description", ""),
                "opening_hours": tags.get("opening_hours", ""),
                "address": {
                    "street": tags.get("addr:street", ""),
                    "city": tags.get("addr:city", ""),
                    "state": tags.get("addr:state", ""),
                    "postcode": tags.get("addr:postcode", ""),
                },
                "amenities": {
                    "fuel": tags.get("fuel", tags.get("seamark:small_craft_facility:category", "")) != "",
                    "electricity": "power_supply" in tags or tags.get("electricity", "") != "",
                    "pump_out": tags.get("sanitary_dump_station", "") != "" or "pump" in str(tags).lower(),
                    "toilets": tags.get("toilets", "") == "yes",
                    "showers": tags.get("shower", tags.get("showers", "")) == "yes",
                    "laundry": tags.get("laundry", "") == "yes",
                    "wifi": tags.get("internet_access", "") in ("yes", "wlan"),
                    "restaurant": "restaurant" in str(tags).lower(),
                    "slipway": tags.get("slipway", "") == "yes" or "slipway" in str(tags).lower(),
                    "boat_rental": "rental" in str(tags).lower(),
                },
                "access": tags.get("access", ""),
                "raw_tags": tags,
                "source": "osm",
                "region": name,
            }
            all_marinas.append(marina)
            count += 1

        print(f"  {name}: {len(elements)} elements, {count} named marinas")
        time.sleep(5)

    output_file = os.path.join(OUTPUT_DIR, "osm-marinas-raw.json")
    with open(output_file, "w") as f:
        json.dump(all_marinas, f, indent=2)

    print(f"\nTotal named marinas from OSM: {len(all_marinas)}")
    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()
