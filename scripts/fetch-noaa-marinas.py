"""Fetch marina data from NOAA and other federal maritime sources."""
import requests
import json
import os
import time

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {"User-Agent": "MarinaSeeker/1.0 (admin@globalaibots.com)"}


def fetch_noaa_enc_facilities():
    """Try NOAA ENC feature services for harbour/marina data."""
    marinas = []

    # NOAA ArcGIS REST services for maritime facilities
    urls_to_try = [
        # NOAA Office of Coast Survey
        "https://gis.charttools.noaa.gov/arcgis/rest/services/MCS/ENCOnline/MapServer/12/query",
        # NOAA Coastal Services
        "https://coast.noaa.gov/arcgis/rest/services/MarineCadastre/MarineTransportation/MapServer/0/query",
    ]

    for url in urls_to_try:
        print(f"  Trying: {url[:80]}...")
        try:
            params = {
                "where": "1=1",
                "outFields": "*",
                "f": "json",
                "resultRecordCount": 5000,
                "outSR": 4326,
            }
            resp = requests.get(url, params=params, headers=HEADERS, timeout=30)
            if resp.status_code == 200:
                data = resp.json()
                features = data.get("features", [])
                if features:
                    print(f"    Found {len(features)} features")
                    for feat in features:
                        attrs = feat.get("attributes", {})
                        geom = feat.get("geometry", {})
                        name = attrs.get("OBJNAM", attrs.get("NAME", attrs.get("name", "")))
                        if not name:
                            continue
                        lat = geom.get("y", geom.get("lat", None))
                        lng = geom.get("x", geom.get("lon", None))
                        if lat is None or lng is None:
                            continue
                        marinas.append({
                            "name": name,
                            "lat": lat,
                            "lng": lng,
                            "source": "noaa",
                            "source_id": str(attrs.get("OBJECTID", attrs.get("FID", ""))),
                            "raw_attrs": attrs,
                        })
                else:
                    print("    No features returned")
            else:
                print(f"    HTTP {resp.status_code}")
        except Exception as e:
            print(f"    Error: {e}")
        time.sleep(2)

    return marinas


def fetch_data_gov_marinas():
    """Search data.gov for marina datasets."""
    marinas = []
    print("\n  Searching data.gov for marina datasets...")
    try:
        resp = requests.get(
            "https://catalog.data.gov/api/3/action/package_search",
            params={"q": "marina boat", "rows": 20},
            headers=HEADERS,
            timeout=15,
        )
        if resp.status_code == 200:
            data = resp.json()
            results = data.get("result", {}).get("results", [])
            print(f"    Found {len(results)} datasets on data.gov")
            for ds in results[:5]:
                print(f"    - {ds.get('title', 'Untitled')}")
                for res in ds.get("resources", []):
                    if res.get("format", "").lower() in ("csv", "json", "geojson"):
                        print(f"      Resource: {res.get('url', '')[:80]}")
        else:
            print(f"    HTTP {resp.status_code}")
    except Exception as e:
        print(f"    Error: {e}")

    return marinas


def main():
    print("=== NOAA ENC Facilities ===")
    noaa_marinas = fetch_noaa_enc_facilities()

    print("\n=== Data.gov Search ===")
    datagov_marinas = fetch_data_gov_marinas()

    all_marinas = noaa_marinas + datagov_marinas

    output_file = os.path.join(OUTPUT_DIR, "noaa-marinas-raw.json")
    with open(output_file, "w") as f:
        json.dump(all_marinas, f, indent=2)

    print(f"\nTotal marinas from NOAA/federal sources: {len(all_marinas)}")
    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()
