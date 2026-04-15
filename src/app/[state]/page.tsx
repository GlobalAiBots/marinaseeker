"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { unified, stateList } from "@/data/all-marinas";
import FeaturedArticle from "@/components/FeaturedArticle";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How many marinas are in ${stateInfo.name}?`, acceptedAnswer: { "@type": "Answer", text: `There are ${stateMarinas.length} marinas in ${stateInfo.name}. MarinaSeeker has mapped every marina with GPS coordinates and amenity details.` } },
          { "@type": "Question", name: `How much does a boat slip cost in ${stateInfo.name}?`, acceptedAnswer: { "@type": "Answer", text: `Boat slip costs in ${stateInfo.name} vary by location, size, and season. Expect $200-$800/month for a standard slip. Contact individual marinas for current rates.` } },
          { "@type": "Question", name: `Are there marinas with fuel in ${stateInfo.name}?`, acceptedAnswer: { "@type": "Answer", text: `Yes, many marinas in ${stateInfo.name} offer fuel docks. Browse MarinaSeeker listings and filter for marinas with fuel availability.` } },
          { "@type": "Question", name: `Can I live on my boat at a marina in ${stateInfo.name}?`, acceptedAnswer: { "@type": "Answer", text: `Some marinas in ${stateInfo.name} allow liveaboards. Policies vary by marina — contact them directly about liveaboard regulations and fees.` } },
          { "@type": "Question", name: `How do I find marinas near me in ${stateInfo.name}?`, acceptedAnswer: { "@type": "Answer", text: `Use MarinaSeeker to browse all ${stateMarinas.length} marinas in ${stateInfo.name} by city. Each listing includes a map, contact info, and amenities.` } },
        ],
      }) }} />
      <section className="py-16 md:py-24 text-center px-4" style={{ background: "#FAF8F5", backgroundImage: "radial-gradient(circle at 20% 80%, rgba(27,58,92,0.06) 0%, transparent 50%)" }}>
        <p className="text-[#1B3A5C] text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{stateInfo.name} Marina Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight max-w-3xl mx-auto">Marinas in {stateInfo.name}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stateMarinas.length} marinas across {stateInfo.name}. GPS coordinates, amenities, and contact information.</p>
      </section>

      {/* State intro + tips */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">Marinas in {stateInfo.name}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {stateInfo.name} has {stateMarinas.length} marinas listed on MarinaSeeker, offering everything from full-service facilities with fuel, electric, and pump-out to simple docks and boat launches. Whether you&apos;re looking for a transient slip, seasonal rental, or liveaboard berth, browse by city below to find the right marina.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-[#1B3A5C] mb-3">Tips for Finding a Marina in {stateInfo.name}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Call ahead to check slip availability, especially during peak boating season.</li>
            <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Compare transient vs. seasonal rates &mdash; longer stays usually get better pricing.</li>
            <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Check if the marina has the amenities you need: fuel, electric hookup, pump-out, WiFi.</li>
            <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Ask about liveaboard policies if you plan to stay on your boat.</li>
            <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Read our <Link href="/blog/what-to-look-for-choosing-marina" className="text-[#1B3A5C] hover:underline">guide to choosing a marina</Link>.</li>
          </ul>
        </div>
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
              <Link
                key={city}
                href={`/cities/${stateInfo.slug}-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-[#1B3A5C] hover:shadow-sm transition"
              >
                <p className="font-bold text-[#1A1A1A] text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} marina{count !== 1 ? "s" : ""}</p>
              </Link>
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

      {/* Visible FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: `How many marinas are in ${stateInfo.name}?`, a: `There are ${stateMarinas.length} marinas in ${stateInfo.name} on MarinaSeeker with GPS coordinates, amenities, and contact details.` },
            { q: `How much does a boat slip cost in ${stateInfo.name}?`, a: `Boat slip costs in ${stateInfo.name} vary from $200-$800/month depending on location, size, and season. Contact individual marinas for current rates.` },
            { q: `Are there marinas with fuel in ${stateInfo.name}?`, a: `Yes, many marinas in ${stateInfo.name} offer fuel docks. Check individual marina listings on MarinaSeeker for fuel availability.` },
            { q: `Can I live on my boat in ${stateInfo.name}?`, a: `Some marinas in ${stateInfo.name} allow liveaboards. Policies and fees vary — contact the marina directly about liveaboard regulations.` },
            { q: `When is the best time to boat in ${stateInfo.name}?`, a: `Boating season varies by region. In ${stateInfo.name}, peak season is typically May through October, though southern states enjoy year-round access.` },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#1B3A5C] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <FeaturedArticle listingSlug={`state-${state}`} />
      </div>
    </div>
  );
}
