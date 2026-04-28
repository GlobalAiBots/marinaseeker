"use client";

import { use, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { unified } from "@/data/all-marinas";
import cityPages from "@/data/city-pages.json";
import FeaturedArticle from "@/components/FeaturedArticle";

const MarinaMap = dynamic(() => import("@/components/MarinaMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

interface CityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = cityPages as CityPage[];

export default function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const cityInfo = allCityPages.find((c) => `${c.stateSlug}-${c.citySlug}` === slug);

  const marinas = useMemo(() => {
    if (!cityInfo) return [];
    return unified.filter((m) => m.state === cityInfo.state && m.city?.trim() === cityInfo.city);
  }, [cityInfo]);

  const mapMarinas = useMemo(() => marinas.map(m => ({ id: m.id, name: m.name, lat: m.lat, lng: m.lng, city: m.city })), [marinas]);
  const center = useMemo<[number, number]>(() => marinas.length ? [marinas.reduce((s, m) => s + m.lat, 0) / marinas.length, marinas.reduce((s, m) => s + m.lng, 0) / marinas.length] : [39.8, -98.5], [marinas]);

  const [search, setSearch] = useState("");
  const filtered = search.length >= 2
    ? marinas.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    : marinas;

  const nearbyCities = useMemo(() => {
    if (!cityInfo) return [];
    return allCityPages
      .filter((c) => c !== cityInfo)
      .map((c) => ({ ...c, dist: Math.sqrt(Math.pow(c.lat - cityInfo.lat, 2) + Math.pow(c.lng - cityInfo.lng, 2)) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 5);
  }, [cityInfo]);

  if (!cityInfo) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">City Not Found</h1>
        <Link href="/" className="text-[#1B3A5C] hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How many marinas are in ${cityInfo.city}, ${cityInfo.stateName}?`, acceptedAnswer: { "@type": "Answer", text: `There are ${marinas.length} marinas in ${cityInfo.city}, ${cityInfo.stateName} listed on MarinaSeeker with maps, amenity details, and contact info for each location.` } },
          { "@type": "Question", name: `Are transient slips available at ${cityInfo.city} marinas?`, acceptedAnswer: { "@type": "Answer", text: `Many marinas in ${cityInfo.city} offer transient slips for visiting boaters, though availability tightens during summer weekends and holiday weeks. Call ahead a few days in advance to confirm space and lock in a rate.` } },
          { "@type": "Question", name: `Do ${cityInfo.city} marinas have fuel docks and pump-out stations?`, acceptedAnswer: { "@type": "Answer", text: `Several marinas near ${cityInfo.city} operate fuel docks (gas and/or diesel) and pump-out stations. Fuel hours and pump-out availability vary by marina — check each listing for posted services before fueling up.` } },
          { "@type": "Question", name: `What amenities do marinas in ${cityInfo.city} typically offer?`, acceptedAnswer: { "@type": "Answer", text: `Marinas near ${cityInfo.city} commonly offer slip rentals, dry storage, fuel, pump-out service, restrooms, showers, and on-site repair. Larger marinas may add ship stores, restaurants, and ramp access — see each listing for the exact amenity list.` } },
          { "@type": "Question", name: `Is MarinaSeeker free to use?`, acceptedAnswer: { "@type": "Answer", text: `Yes. MarinaSeeker is 100% free for boaters. Browse all ${marinas.length} marinas in ${cityInfo.city}, save GPS coordinates, and get directions — no account required.` } },
        ],
      }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <Link href={`/${cityInfo.stateSlug}`} className="hover:text-[#1B3A5C] transition">{cityInfo.stateName}</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">{cityInfo.city}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">Marinas in {cityInfo.city}, {cityInfo.stateName}</h1>
      <p className="text-gray-500 mb-6">{marinas.length} marina{marinas.length !== 1 ? "s" : ""} in {cityInfo.city}, {cityInfo.stateName}. Slip info, fuel, amenities, and maps.</p>

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

      {/* Intro */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">Marinas in {cityInfo.city}, {cityInfo.stateName}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {cityInfo.city}, {cityInfo.stateName} offers {marinas.length} marina{marinas.length !== 1 ? "s" : ""} for local boat owners and transient cruisers. {cityInfo.city} provides slip access, fuel, pump-out service, and dockside amenities depending on the location &mdash; from full-service yacht harbors to small public docks. Whether you&apos;re shopping for a seasonal slip, planning an overnight stop on a longer cruise, or just need a reliable fuel dock and ship store, the {marinas.length} marina{marinas.length !== 1 ? "s" : ""} below serve {cityInfo.city} and the surrounding waterfront with verified GPS coordinates, amenity lists, and turn-by-turn directions. Slip availability tightens during summer and holiday weekends &mdash; calling ahead is always a good idea before you cast off.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-[#1B3A5C] mb-3">Tips for Visiting Marinas in {cityInfo.city}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Call ahead to confirm slip availability &mdash; especially on peak summer weekends and during fishing tournaments. <Link href={`/${cityInfo.stateSlug}`} className="text-[#1B3A5C] hover:underline">See all {cityInfo.stateName} marinas</Link>.</li>
          <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Verify fuel hours before you commit to a destination &mdash; many small-marina fuel docks close earlier than the marina office.</li>
          <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Ask about pump-out availability and any environmental restrictions on holding-tank discharge.</li>
          <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Confirm transient slip rates, electric/water hookup, and any minimum-night stays before booking.</li>
          <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Monitor VHF channel 16 (or the marina&apos;s posted channel) on approach to coordinate dock assignment.</li>
        </ul>
      </div>

      {/* Visible FAQ */}
      <div className="mb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: `How many marinas are in ${cityInfo.city}, ${cityInfo.stateName}?`, a: `There are ${marinas.length} marinas in ${cityInfo.city}, ${cityInfo.stateName} listed on MarinaSeeker with maps, amenity details, and contact info for each location.` },
            { q: `Are transient slips available at ${cityInfo.city} marinas?`, a: `Many marinas in ${cityInfo.city} offer transient slips for visiting boaters, though availability tightens during summer weekends and holiday weeks. Call ahead a few days in advance to confirm space and lock in a rate.` },
            { q: `Do ${cityInfo.city} marinas have fuel docks and pump-out stations?`, a: `Several marinas near ${cityInfo.city} operate fuel docks (gas and/or diesel) and pump-out stations. Fuel hours and pump-out availability vary by marina — check each listing for posted services before fueling up.` },
            { q: `What amenities do marinas in ${cityInfo.city} typically offer?`, a: `Marinas near ${cityInfo.city} commonly offer slip rentals, dry storage, fuel, pump-out service, restrooms, showers, and on-site repair. Larger marinas may add ship stores, restaurants, and ramp access — see each listing for the exact amenity list.` },
            { q: `Is MarinaSeeker free to use?`, a: `Yes. MarinaSeeker is 100% free for boaters. Browse all ${marinas.length} marinas in ${cityInfo.city}, save GPS coordinates, and get directions — no account required.` },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#1B3A5C] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      <FeaturedArticle listingSlug={`city-${slug}`} />

      {/* Back to state */}
      <div className="text-center py-4">
        <Link href={`/${cityInfo.stateSlug}`} className="text-[#1B3A5C] hover:underline font-semibold text-sm">Browse all {cityInfo.stateName} marinas &rarr;</Link>
      </div>

      {nearbyCities.length > 0 && (
        <section>
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Nearby Cities with Marinas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {nearbyCities.map((c) => (
              <Link key={`${c.stateSlug}-${c.citySlug}`} href={`/cities/${c.stateSlug}-${c.citySlug}`} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[#1B3A5C] transition">
                <p className="font-bold text-[#1A1A1A] text-sm">{c.city}</p>
                <p className="text-gray-400 text-xs">{c.count} marinas &middot; {c.stateName}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
