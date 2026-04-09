"""Compile all marina data sources, deduplicate, enrich, and categorize."""
import json
import os
import math
import re
import time
import requests
from difflib import SequenceMatcher

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")

NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse"
NOMINATIM_HEADERS = {"User-Agent": "MarinaSeeker/1.0 (admin@globalaibots.com)"}

# US state abbreviation lookup
STATE_ABBREVS = {
    "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR",
    "california": "CA", "colorado": "CO", "connecticut": "CT", "delaware": "DE",
    "florida": "FL", "georgia": "GA", "hawaii": "HI", "idaho": "ID",
    "illinois": "IL", "indiana": "IN", "iowa": "IA", "kansas": "KS",
    "kentucky": "KY", "louisiana": "LA", "maine": "ME", "maryland": "MD",
    "massachusetts": "MA", "michigan": "MI", "minnesota": "MN", "mississippi": "MS",
    "missouri": "MO", "montana": "MT", "nebraska": "NE", "nevada": "NV",
    "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
    "north carolina": "NC", "north dakota": "ND", "ohio": "OH", "oklahoma": "OK",
    "oregon": "OR", "pennsylvania": "PA", "rhode island": "RI", "south carolina": "SC",
    "south dakota": "SD", "tennessee": "TN", "texas": "TX", "utah": "UT",
    "vermont": "VT", "virginia": "VA", "washington": "WA", "west virginia": "WV",
    "wisconsin": "WI", "wyoming": "WY",
}
ABBREV_TO_STATE = {v: k.title() for k, v in STATE_ABBREVS.items()}


def haversine_meters(lat1, lon1, lat2, lon2):
    R = 6371000
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def fuzzy_match(s1, s2):
    return SequenceMatcher(None, s1.lower().strip(), s2.lower().strip()).ratio()


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def normalize_record(raw, source):
    """Convert raw record to standard format."""
    rec = {
        "name": "",
        "lat": None,
        "lng": None,
        "state": "",
        "city": "",
        "source": source,
        "source_id": "",
        "amenities": [],
        "website": "",
        "phone": "",
        "email": "",
        "capacity": None,
        "operator": "",
        "description": "",
        "raw_tags": {},
    }

    if source == "osm":
        rec["name"] = raw.get("name", "")
        rec["lat"] = raw.get("lat")
        rec["lng"] = raw.get("lng")
        rec["source_id"] = raw.get("osm_id", "")
        rec["website"] = raw.get("website", "")
        rec["phone"] = raw.get("phone", "")
        rec["email"] = raw.get("email", "")
        rec["capacity"] = raw.get("capacity")
        rec["operator"] = raw.get("operator", "")
        rec["description"] = raw.get("description", "")
        rec["city"] = raw.get("address", {}).get("city", "")
        rec["state"] = raw.get("address", {}).get("state", "")
        # Convert amenity booleans to list
        am = raw.get("amenities", {})
        for k, v in am.items():
            if v:
                rec["amenities"].append(k)
        rec["raw_tags"] = raw.get("raw_tags", {})

    elif source in ("noaa", "usace", "usfws", "recreation_gov"):
        rec["name"] = raw.get("name", "")
        rec["lat"] = raw.get("lat")
        rec["lng"] = raw.get("lng")
        rec["source_id"] = raw.get("source_id", "")
        rec["state"] = raw.get("state", "")
        rec["operator"] = raw.get("operator", "")
        rec["description"] = raw.get("description", "")
        rec["raw_tags"] = raw.get("raw_attrs", {})

    return rec


def load_source(filename, source_name):
    filepath = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  {filename}: NOT FOUND (skipping)")
        return []
    with open(filepath) as f:
        data = json.load(f)
    print(f"  {filename}: {len(data)} records")
    return [normalize_record(r, r.get("source", source_name)) for r in data]


def deduplicate(records):
    """Remove duplicates by proximity (200m) + fuzzy name match (>70%)."""
    unique = []
    merged_count = 0

    for rec in records:
        if not rec["name"] or rec["lat"] is None:
            continue

        found_match = False
        for existing in unique:
            dist = haversine_meters(rec["lat"], rec["lng"], existing["lat"], existing["lng"])
            if dist < 200:
                name_sim = fuzzy_match(rec["name"], existing["name"])
                if name_sim > 0.7:
                    # Merge: keep richest data
                    if len(rec["amenities"]) > len(existing["amenities"]):
                        existing["amenities"] = rec["amenities"]
                    if not existing["website"] and rec["website"]:
                        existing["website"] = rec["website"]
                    if not existing["phone"] and rec["phone"]:
                        existing["phone"] = rec["phone"]
                    if not existing["email"] and rec["email"]:
                        existing["email"] = rec["email"]
                    if not existing["operator"] and rec["operator"]:
                        existing["operator"] = rec["operator"]
                    if not existing["capacity"] and rec["capacity"]:
                        existing["capacity"] = rec["capacity"]
                    existing.setdefault("sources", [existing["source"]])
                    if rec["source"] not in existing["sources"]:
                        existing["sources"].append(rec["source"])
                    found_match = True
                    merged_count += 1
                    break

        if not found_match:
            rec["sources"] = [rec["source"]]
            unique.append(rec)

    return unique, merged_count


def reverse_geocode_batch(records, batch_size=50):
    """Fill in missing state/city via Nominatim reverse geocoding."""
    need_geocode = [r for r in records if not r["state"]]
    print(f"\n  Reverse geocoding {len(need_geocode)} records (capped at {batch_size})...")

    geocoded = 0
    for r in need_geocode[:batch_size]:
        try:
            resp = requests.get(
                NOMINATIM_URL,
                params={"lat": r["lat"], "lon": r["lng"], "format": "json", "zoom": 10},
                headers=NOMINATIM_HEADERS,
                timeout=10,
            )
            if resp.status_code == 200:
                data = resp.json()
                addr = data.get("address", {})
                state = addr.get("state", "")
                city = addr.get("city", addr.get("town", addr.get("village", addr.get("county", ""))))
                if state:
                    state_lower = state.lower()
                    r["state"] = STATE_ABBREVS.get(state_lower, state)
                if city and not r["city"]:
                    r["city"] = city
                geocoded += 1
        except Exception:
            pass
        time.sleep(1.1)

    print(f"  Geocoded {geocoded} records")
    return records


def categorize(rec):
    """Assign marina category based on amenities and tags."""
    categories = []
    am = set(rec.get("amenities", []))
    tags_str = json.dumps(rec.get("raw_tags", {})).lower()

    if {"fuel", "electricity", "pump_out"}.issubset(am):
        categories.append("full_service")
    elif len(am) == 0:
        categories.append("basic")

    if "dry" in tags_str and "storage" in tags_str:
        categories.append("dry_storage")
    if "liveaboard" in tags_str:
        categories.append("liveaboard")
    if rec.get("access") == "private" or "members" in tags_str or "private" in tags_str:
        categories.append("private")
    elif "public" in rec.get("operator", "").lower() or "government" in tags_str:
        categories.append("public")

    if not categories:
        categories.append("basic")

    return categories


def main():
    print("=== Loading raw data ===")
    all_records = []

    osm = load_source("osm-marinas-raw.json", "osm")
    all_records.extend(osm)

    noaa = load_source("noaa-marinas-raw.json", "noaa")
    all_records.extend(noaa)

    usace = load_source("usace-marinas-raw.json", "usace")
    all_records.extend(usace)

    additional = load_source("additional-marinas-raw.json", "additional")
    all_records.extend(additional)

    total_raw = len(all_records)
    print(f"\nTotal raw records: {total_raw}")

    # Filter out records without name or coordinates
    valid = [r for r in all_records if r["name"] and r["lat"] is not None and r["lng"] is not None]
    excluded = total_raw - len(valid)
    print(f"Excluded (no name or coords): {excluded}")

    # Deduplicate
    print("\n=== Deduplicating ===")
    unique, merged = deduplicate(valid)
    print(f"Duplicates merged: {merged}")
    print(f"Unique marinas: {len(unique)}")

    # Reverse geocode missing states
    print("\n=== Enrichment ===")
    unique = reverse_geocode_batch(unique, batch_size=100)

    # Categorize
    for rec in unique:
        rec["categories"] = categorize(rec)

    # Assign IDs and slugs
    for i, rec in enumerate(unique):
        state = rec.get("state", "US")
        rec["id"] = f"marina-{slugify(state)}-{slugify(rec['name'])}-{i}"
        rec["slug"] = slugify(rec["name"])

    # Save
    output_file = os.path.join(OUTPUT_DIR, "marinas-compiled.json")
    with open(output_file, "w") as f:
        json.dump(unique, f, indent=2)

    # === REPORT ===
    print("\n" + "=" * 60)
    print("MARINA DATA COMPILATION REPORT")
    print("=" * 60)

    # Per source
    source_counts = {}
    for r in all_records:
        s = r.get("source", "unknown")
        source_counts[s] = source_counts.get(s, 0) + 1
    print("\nRaw records per source:")
    for s, c in sorted(source_counts.items(), key=lambda x: -x[1]):
        print(f"  {s}: {c}")

    print(f"\nDuplicates found and merged: {merged}")
    print(f"Records excluded (no name/coords): {excluded}")
    print(f"Final unique marinas: {len(unique)}")

    # By state
    state_counts = {}
    for r in unique:
        st = r.get("state", "Unknown")
        state_counts[st] = state_counts.get(st, 0) + 1
    print("\nTop 20 states by marina count:")
    for st, c in sorted(state_counts.items(), key=lambda x: -x[1])[:20]:
        name = ABBREV_TO_STATE.get(st, st)
        print(f"  {st} ({name}): {c}")

    # By category
    cat_counts = {}
    for r in unique:
        for cat in r.get("categories", []):
            cat_counts[cat] = cat_counts.get(cat, 0) + 1
    print("\nBy category:")
    for cat, c in sorted(cat_counts.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {c}")

    # Amenity coverage
    with_website = sum(1 for r in unique if r.get("website"))
    with_phone = sum(1 for r in unique if r.get("phone"))
    with_amenities = sum(1 for r in unique if len(r.get("amenities", [])) > 0)
    print(f"\nData richness:")
    print(f"  With website: {with_website} ({100*with_website//max(len(unique),1)}%)")
    print(f"  With phone: {with_phone} ({100*with_phone//max(len(unique),1)}%)")
    print(f"  With amenities listed: {with_amenities} ({100*with_amenities//max(len(unique),1)}%)")

    print(f"\nSaved to {output_file}")


if __name__ == "__main__":
    main()
