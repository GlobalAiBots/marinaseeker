"""Fetch marina data from additional free sources."""
import requests
import json
import os
import time

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {"User-Agent": "MarinaSeeker/1.0 (admin@globalaibots.com)"}


def fetch_usfws_boat_access():
    """Try US Fish & Wildlife Service boat access/launch data."""
    marinas = []
    print("=== US Fish & Wildlife Service ===")
    try:
        url = "https://services.arcgis.com/QVENGdaPbd4LUkLV/arcgis/rest/services/FWSInterest_Simplified/FeatureServer/0/query"
        params = {
            "where": "FTYPE LIKE '%Marina%' OR FTYPE LIKE '%Boat%'",
            "outFields": "*",
            "f": "json",
            "resultRecordCount": 2000,
            "outSR": 4326,
        }
        resp = requests.get(url, params=params, headers=HEADERS, timeout=30)
        if resp.status_code == 200:
            data = resp.json()
            features = data.get("features", [])
            print(f"  Found {len(features)} features")
            for feat in features:
                attrs = feat.get("attributes", {})
                geom = feat.get("geometry", {})
                name = attrs.get("ORGNAME", attrs.get("NAME", ""))
                if not name or not geom:
                    continue
                lat = geom.get("y", None)
                lng = geom.get("x", None)
                if lat and lng:
                    marinas.append({
                        "name": name,
                        "lat": lat,
                        "lng": lng,
                        "state": attrs.get("STATE", ""),
                        "source": "usfws",
                        "source_id": str(attrs.get("OBJECTID", "")),
                        "raw_attrs": attrs,
                    })
        else:
            print(f"  HTTP {resp.status_code}")
    except Exception as e:
        print(f"  Error: {e}")
    return marinas


def fetch_coast_guard():
    """Try Coast Guard facility data."""
    marinas = []
    print("\n=== Coast Guard ===")
    try:
        # USCG ArcGIS services
        url = "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/USCG_Facilities_Public/FeatureServer/0/query"
        params = {
            "where": "1=1",
            "outFields": "*",
            "f": "json",
            "resultRecordCount": 2000,
            "outSR": 4326,
        }
        resp = requests.get(url, params=params, headers=HEADERS, timeout=30)
        if resp.status_code == 200:
            data = resp.json()
            features = data.get("features", [])
            print(f"  Found {len(features)} USCG features")
        else:
            print(f"  HTTP {resp.status_code} - endpoint may not be publicly available")
    except Exception as e:
        print(f"  Error: {e}")
    return marinas


def fetch_rec_gov():
    """Try Recreation.gov facilities API for marina-type recreation areas."""
    marinas = []
    print("\n=== Recreation.gov ===")
    try:
        # Recreation.gov RIDB API
        url = "https://ridb.recreation.gov/api/v1/facilities"
        params = {
            "query": "marina",
            "limit": 50,
            "offset": 0,
        }
        resp = requests.get(url, params=params, headers={
            **HEADERS,
            "accept": "application/json",
            "apikey": "",  # Public API may work without key for basic queries
        }, timeout=15)
        if resp.status_code == 200:
            data = resp.json()
            results = data.get("RECDATA", [])
            print(f"  Found {len(results)} recreation facilities with 'marina'")
            for r in results:
                name = r.get("FacilityName", "")
                lat = r.get("FacilityLatitude", None)
                lng = r.get("FacilityLongitude", None)
                if name and lat and lng:
                    marinas.append({
                        "name": name,
                        "lat": float(lat),
                        "lng": float(lng),
                        "state": r.get("GEOJSON", {}).get("PROPERTIES", {}).get("state", ""),
                        "source": "recreation_gov",
                        "source_id": str(r.get("FacilityID", "")),
                        "description": r.get("FacilityDescription", ""),
                    })
        elif resp.status_code == 401:
            print("  Requires API key - skipping")
        else:
            print(f"  HTTP {resp.status_code}")
    except Exception as e:
        print(f"  Error: {e}")
    return marinas


def main():
    all_marinas = []

    fws = fetch_usfws_boat_access()
    all_marinas.extend(fws)

    cg = fetch_coast_guard()
    all_marinas.extend(cg)

    rec = fetch_rec_gov()
    all_marinas.extend(rec)

    output_file = os.path.join(OUTPUT_DIR, "additional-marinas-raw.json")
    with open(output_file, "w") as f:
        json.dump(all_marinas, f, indent=2)

    print(f"\nTotal from additional sources: {len(all_marinas)}")
    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()
