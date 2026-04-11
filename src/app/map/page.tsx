"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { unified, stateList } from "@/data/all-marinas";

const MarinaMap = dynamic(() => import("@/components/MarinaMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 500 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

const mapMarinas = unified.map(m => ({ id: m.id, name: m.name, lat: m.lat, lng: m.lng, city: m.city || "" }));

export default function MapPage() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"marinas" | "name">("marinas");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const m of unified) map[m.state] = (map[m.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(() =>
    stateList.map(s => ({ ...s, count: stateCounts[s.code] || 0 })),
  [stateCounts]);

  const displayed = useMemo(() => {
    let list = statesWithCounts;
    if (filter) list = list.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
    return sortBy === "marinas" ? [...list].sort((a, b) => b.count - a.count) : [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [statesWithCounts, filter, sortBy]);

  const filteredMarinas = useMemo(() => {
    if (!filter) return mapMarinas;
    const q = filter.toLowerCase();
    const matchingCodes = stateList.filter(s => s.name.toLowerCase().includes(q)).map(s => s.code);
    if (matchingCodes.length > 0) return mapMarinas.filter(m => {
      const marina = unified.find(u => u.id === m.id);
      return marina && matchingCodes.includes(marina.state);
    });
    return mapMarinas.filter(m => m.name.toLowerCase().includes(q) || (m.city && m.city.toLowerCase().includes(q)));
  }, [filter]);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-1">US Marina Map</h1>
        <p className="text-gray-500 mb-4">{unified.length.toLocaleString()}+ marinas across {statesWithCounts.filter(s => s.count > 0).length} states. Click a marker to explore.</p>

        <div className="mb-4">
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter by state or city..." className="w-full max-w-md px-4 py-3 rounded-xl bg-white border border-gray-200 text-charcoal outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition text-sm" />
          {filter && <p className="text-xs text-gray-400 mt-2">Showing {filteredMarinas.length.toLocaleString()} of {mapMarinas.length.toLocaleString()} marinas</p>}
        </div>

        <MarinaMap marinas={filteredMarinas} height="500px" />

        <div className="flex items-center justify-between mb-4 mt-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">All States</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setSortBy("marinas")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "marinas" ? "bg-white text-charcoal shadow-sm" : "text-gray-500"}`}>Most Marinas</button>
            <button onClick={() => setSortBy("name")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "name" ? "bg-white text-charcoal shadow-sm" : "text-gray-500"}`}>A-Z</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {displayed.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-navy hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-navy">
              <div className="flex items-start justify-between">
                <p className="font-bold text-charcoal text-sm group-hover:text-navy transition">{s.name}</p>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{s.code}</span>
              </div>
              <span className="inline-block mt-1 text-xs font-semibold bg-navy/10 text-navy px-2 py-0.5 rounded">{s.count} marina{s.count !== 1 ? "s" : ""}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
