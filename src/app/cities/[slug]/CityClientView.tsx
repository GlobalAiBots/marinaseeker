"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const MarinaMap = dynamic(() => import("@/components/MarinaMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

interface ClientMarina { id: string; name: string; lat: number; lng: number; city: string; state: string; amenities: string[]; }

export default function CityClientView({ marinas, center }: { marinas: ClientMarina[]; center: [number, number] }) {
  const [search, setSearch] = useState("");
  const filtered = search.length >= 2
    ? marinas.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    : marinas;
  const mapMarinas = marinas.map(m => ({ id: m.id, name: m.name, lat: m.lat, lng: m.lng, city: m.city }));

  return (
    <>
      {marinas.length > 5 && (
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search marinas in this city..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C4924B] transition mb-6" />
      )}

      {marinas.length > 0 && <div className="mb-8"><MarinaMap marinas={mapMarinas} center={center} zoom={12} height="350px" /></div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {filtered.map((m) => (
          <Link key={m.id} href={`/marinas/${m.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition">{m.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{m.city}, {m.state}</p>
            {m.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {m.amenities.slice(0, 3).map((a) => (
                  <span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            )}
            <span className="text-sm font-semibold text-[#C4924B] mt-2 inline-block">View Details &rarr;</span>
          </Link>
        ))}
      </div>
    </>
  );
}
