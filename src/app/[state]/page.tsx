"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { unified, stateList } from "@/data/all-marinas";

const MarinaMap = dynamic(() => import("@/components/MarinaMap"), { ssr: false });

export default function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = use(params);
  const stateInfo = stateList.find((s) => s.slug === state);
  const stateMarinas = useMemo(
    () => (stateInfo ? unified.filter((m) => m.state === stateInfo.code) : []),
    [stateInfo]
  );

  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of stateMarinas) {
      const c = r.city?.trim();
      if (c && c.length > 1) m[c] = (m[c] || 0) + 1;
    }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [stateMarinas]);

  const filteredMarinas = selectedCity
    ? stateMarinas.filter((m) => m.city?.trim() === selectedCity)
    : stateMarinas;

  const mapCenter = useMemo((): [number, number] => {
    if (stateMarinas.length === 0) return [39.8, -98.5];
    const avgLat = stateMarinas.reduce((s, m) => s + m.lat, 0) / stateMarinas.length;
    const avgLng = stateMarinas.reduce((s, m) => s + m.lng, 0) / stateMarinas.length;
    return [avgLat, avgLng];
  }, [stateMarinas]);

  if (!stateInfo) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">State Not Found</h1>
        <Link href="/" className="text-[#1B3A5C] hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4" style={{ background: "#FAF8F5", backgroundImage: "radial-gradient(circle at 20% 80%, rgba(27,58,92,0.06) 0%, transparent 50%)" }}>
        <p className="text-[#1B3A5C] text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{stateInfo.name} Marina Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight max-w-3xl mx-auto">Marinas in {stateInfo.name}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stateMarinas.length} marinas across {stateInfo.name}. GPS coordinates, amenities, and contact information.</p>
      </section>

      {/* Map */}
      {stateMarinas.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <MarinaMap marinas={stateMarinas} center={mapCenter} zoom={7} height="400px" />
        </section>
      )}

      {/* City Filter */}
      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityMap.slice(0, 16).map(([city, count]) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city === selectedCity ? null : city);
                  document.getElementById("marina-list")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`text-left bg-white border rounded-lg p-3 hover:border-[#1B3A5C] hover:bg-blue-50 transition cursor-pointer ${selectedCity === city ? "border-[#1B3A5C] bg-blue-50 ring-2 ring-[#1B3A5C]" : "border-gray-200"}`}
              >
                <p className="font-bold text-[#1A1A1A] text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} marina{count !== 1 ? "s" : ""}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Marina List */}
      <section id="marina-list" className="max-w-6xl mx-auto px-4 py-8">
        {selectedCity && (
          <div className="pb-4">
            <button onClick={() => setSelectedCity(null)} className="text-sm text-[#1B3A5C] hover:underline">&larr; Show all {stateMarinas.length} marinas</button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMarinas.map((m) => (
            <Link key={m.id} href={`/marinas/${m.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition">{m.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{m.city ? `${m.city}, ` : ""}{m.state}</p>
              {m.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {m.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              )}
              <span className="text-sm font-semibold text-[#C4924B] mt-2 inline-block">View Details &rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
