"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-marinas";

export default function Home() {
  const [query, setQuery] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const m of unified) map[m.state] = (map[m.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(
    () => stateList.map((s) => ({ ...s, count: stateCounts[s.code] || 0 })).sort((a, b) => b.count - a.count),
    [stateCounts]
  );

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: { type: string; label: string; href: string }[] = [];
    stateList.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 4).forEach((s) => {
      results.push({ type: "State", label: s.name, href: `/${s.slug}` });
    });
    unified.filter((m) => m.name.toLowerCase().includes(q)).slice(0, 5).forEach((m) => {
      results.push({ type: "Marina", label: `${m.name} (${m.state})`, href: `/marinas/${m.id}` });
    });
    return results.slice(0, 8);
  }, [query]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "MarinaSeeker", url: "https://marinaseeker.com",
        description: `Find marinas across the United States. ${unified.length.toLocaleString()}+ marinas with GPS coordinates and amenities.`,
        potentialAction: { "@type": "SearchAction", target: "https://marinaseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />

      {/* HERO */}
      <section className="relative py-20 md:py-32 text-center px-4 text-white overflow-hidden min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-marina.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E33]/80 via-[#1B3A5C]/70 to-[#0B1E33]/85" />
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">Marina Directory</p>
          <h1 className="font-[Cabin] text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl mx-auto">Every Marina in America</h1>
          <p className="text-white/60 mt-4 max-w-lg mx-auto">{unified.length.toLocaleString()}+ marinas across {statesWithCounts.filter(s => s.count > 0).length} states. Find your slip.</p>

          <div className="max-w-xl mx-auto mt-8 relative">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by state, city, or marina name..." className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 text-[#1A1A1A] outline-none focus:border-[#C4924B] focus:ring-2 focus:ring-[#C4924B]/20 transition shadow-2xl text-sm" />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                {suggestions.map((s, i) => (
                  <Link key={i} href={s.href} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1B3A5C]/5 transition border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{s.type}</span>
                    <span className="text-sm text-[#1A1A1A]">{s.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-center mt-6 flex-wrap max-w-2xl mx-auto">
            {statesWithCounts.slice(0, 6).map((s) => (
              <Link key={s.code} href={`/${s.slug}`} className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2 rounded-lg transition text-xs backdrop-blur-sm border border-white/10">{s.name} ({s.count})</Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center mt-12">
            {[{ value: unified.length.toLocaleString(), label: "Marinas" }, { value: String(statesWithCounts.filter(s => s.count > 0).length), label: "States" }, { value: "Free", label: "& Updated" }, { value: "GPS", label: "Verified" }].map((s) => (
              <div key={s.label}><p className="font-[Cabin] text-2xl font-bold text-white">{s.value}</p><p className="text-white/50 text-xs mt-0.5">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY STATE */}
      <section id="browse-states" className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-6">Browse by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {statesWithCounts.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#1B3A5C] hover:shadow-sm transition">
              <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#1B3A5C] transition">{s.name}</p>
              <p className="text-gray-400 text-xs">{s.count} marina{s.count !== 1 ? "s" : ""}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY MARINASEEKER */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] text-center mb-8">Why MarinaSeeker</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "\u{1F4CD}", title: "GPS Coordinates", desc: "Exact location for every marina. Navigate directly from your phone." },
            { icon: "\u2693", title: "Amenity Info", desc: "Fuel, electric, pump-out, showers, wifi, restaurants \u2014 all listed." },
            { icon: "\u{1F512}", title: "Free Forever", desc: "No login. No account. No fees. Just find your marina and go." },
            { icon: "\u{1F30E}", title: "Coast to Coast", desc: "Marinas in every coastal and inland state across America." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
              <p className="text-2xl mb-2">{f.icon}</p>
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-sm mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="py-12" style={{ background: "#1B3A5C" }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-white mb-2">Get Marina Updates</h2>
          <p className="text-white/60 text-sm mb-6">Slip availability, fuel prices, new marinas, and seasonal updates &mdash; delivered to your inbox.</p>
          <a href="mailto:admin@globalaibots.com?subject=MarinaSeeker%20Newsletter%20Signup&body=Please%20add%20me%20to%20the%20MarinaSeeker%20email%20list." className="inline-block bg-[#C4924B] hover:bg-[#b5833e] text-white font-bold px-8 py-3.5 rounded-xl transition text-sm">Sign Up for Updates</a>
          <p className="text-white/30 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* SUBMIT */}
      <section className="max-w-2xl mx-auto px-4 pb-20 pt-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-2">Know a marina we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete marina directory in America.</p>
          <a href="mailto:hello@marinaseeker.com?subject=New%20Marina%20Submission" className="bg-[#C4924B] hover:bg-[#b5833e] text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Marina</a>
        </div>
      </section>
    </div>
  );
}
