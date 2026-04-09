"""Fetch marina data from US Army Corps of Engineers open data."""
import requests
import json
import os
import time

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {"User-Agent": "MarinaSeeker/1.0 (admin@globalaibots.com)"}


def fetch_usace_recreation():
    """Try USACE ArcGIS open data for recreation/marina facilities."""
    marinas = []

    urls_to_try = [
        # USACE Recreation facilities
        (
            "https://services3.arcgis.com/UOLGJyOjmGEMnLQf/arcgis/rest/services/"
            "USACE_Managed_Recreation_Areas/FeatureServer/0/query"
        ),
        # USACE open data hub
        (
            "https://opendata.arcgis.com/api/v3/datasets?"
            "q=marina%20usace&sort=-modified"
        ),
    ]

    # Try the feature service first
    print("  Trying USACE Recreation Areas feature service...")
    try:
        params = {
            "where": "FacilityType LIKE '%marina%' OR FacilityType LIKE '%Marina%' OR FacilityName LIKE '%Marina%'",
            "outFields": "*",
            "f": "json",
            "resultRecordCount": 2000,
            "outSR": 4326,
        }
        resp = requests.get(urls_to_try[0], params=params, headers=HEADERS, timeout=30)
        if resp.status_code == 200:
            data = resp.json()
            features = data.get("features", [])
            print(f"    Found {len(features)} marina features")
            for feat in features:
                attrs = feat.get("attributes", {})
                geom = feat.get("geometry", {})
                name = attrs.get("FacilityName", attrs.get("RecAreaName", ""))
                if not name:
                    continue
                lat = geom.get("y", None)
                lng = geom.get("x", None)
                if lat is None or lng is None:
                    continue
                marinas.append({
                    "name": name,
                    "lat": lat,
                    "lng": lng,
                    "state": attrs.get("State", ""),
                    "lake": attrs.get("ProjectName", attrs.get("WaterBody", "")),
                    "operator": "US Army Corps of Engineers",
                    "source": "usace",
                    "source_id": str(attrs.get("OBJECTID", "")),
                    "raw_attrs": attrs,
                })
        else:
            print(f"    HTTP {resp.status_code}")
    except Exception as e:
        print(f"    Error: {e}")

    # Also try a broader query without the marina filter
    if len(marinas) == 0:
        print("  Trying broader USACE query...")
        try:
            params = {
                "where": "1=1",
                "outFields": "FacilityName,FacilityType,State,ProjectName",
                "f": "json",
                "resultRecordCount": 5000,
                "outSR": 4326,
            }
            resp = requests.get(urls_to_try[0], params=params, headers=HEADERS, timeout=30)
            if resp.status_code == 200:
                data = resp.json()
                features = data.get("features", [])
                print(f"    Total USACE recreation features: {len(features)}")
                marina_features = [
                    f for f in features
                    if "marina" in str(f.get("attributes", {})).lower()
                ]
                print(f"    Marina-related: {len(marina_features)}")
                for feat in marina_features:
                    attrs = feat.get("attributes", {})
                    geom = feat.get("geometry", {})
                    name = attrs.get("FacilityName", "")
                    lat = geom.get("y", None) if geom else None
                    lng = geom.get("x", None) if geom else None
                    if name and lat and lng:
                        marinas.append({
                            "name": name,
                            "lat": lat,
                            "lng": lng,
                            "state": attrs.get("State", ""),
                            "lake": attrs.get("ProjectName", ""),
                            "operator": "US Army Corps of Engineers",
                            "source": "usace",
                            "source_id": str(attrs.get("OBJECTID", "")),
                            "raw_attrs": attrs,
                        })
            else:
                print(f"    HTTP {resp.status_code}")
        except Exception as e:
            print(f"    Error: {e}")

    return marinas


def main():
    print("=== USACE Recreation Areas ===")
    marinas = fetch_usace_recreation()

    output_file = os.path.join(OUTPUT_DIR, "usace-marinas-raw.json")
    with open(output_file, "w") as f:
        json.dump(marinas, f, indent=2)

    print(f"\nTotal marinas from USACE: {len(marinas)}")
    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()
