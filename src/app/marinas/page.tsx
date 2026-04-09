"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-marinas";

export default function MarinasPage() {
  const [stateFilter, setStateFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let results = unified;
    if (stateFilter) results = results.filter((m) => m.state === stateFilter);
    if (search.length >= 2) {
      const q = search.toLowerCase();
      results = results.filter((m) => m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q));
    }
    return results.slice(0, 100);
  }, [stateFilter, search]);

  const stateCodes = useMemo(() => {
    const codes = new Set(unified.map((m) => m.state));
    return stateList.filter((s) => codes.has(s.code));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">Browse All Marinas</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or city..." className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1B3A5C] transition" />
        <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1B3A5C] transition bg-white">
          <option value="">All States</option>
          {stateCodes.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
      </div>

      <p className="text-gray-400 text-sm mb-4">Showing {filtered.length}{filtered.length === 100 ? "+" : ""} of {unified.length.toLocaleString()} marinas</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((m) => (
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
    </div>
  );
}
