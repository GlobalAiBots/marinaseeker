import Link from "next/link";
import { notFound } from "next/navigation";
import { unified, stateList } from "@/data/all-marinas";
import FeaturedArticle from "@/components/FeaturedArticle";
import GearRecommendation from "@/components/GearRecommendation";
import StateMap from "./StateMap";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import marinaTotals from "@/data/state-marina-totals.json";
import { getStateEditorial } from "@/data/state-editorial";

interface PrecomputedCity {
  city: string;
  citySlug: string;
  slug: string;
  count: number;
  lat: number;
  lng: number;
}

export const dynamicParams = true;

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const stateInfo = stateList.find((s) => s.slug === state);
  if (!stateInfo) notFound();

  const stateMarinas = unified.filter((m) => m.state === stateInfo.code);

  const cities = ((precomputedCities as unknown) as Record<string, PrecomputedCity[]>)[state] || [];
  const stateTotal = ((marinaTotals as unknown) as Record<string, number>)[state] || 0;
  const editorial = getStateEditorial(state);

  const mapCenter: [number, number] = stateMarinas.length === 0
    ? [39.8, -98.5]
    : [
        stateMarinas.reduce((s, m) => s + m.lat, 0) / stateMarinas.length,
        stateMarinas.reduce((s, m) => s + m.lng, 0) / stateMarinas.length,
      ];

  const baseFaqs = [
    { q: `How many marinas are in ${stateInfo.name}?`, a: `There are ${stateTotal.toLocaleString()} marinas in ${stateInfo.name} on MarinaSeeker with GPS coordinates, amenities, and contact details.` },
    { q: `How much does a boat slip cost in ${stateInfo.name}?`, a: `Boat slip costs in ${stateInfo.name} vary from $200-$800/month depending on location, size, and season. Contact individual marinas for current rates.` },
    { q: `Are there marinas with fuel in ${stateInfo.name}?`, a: `Yes, many marinas in ${stateInfo.name} offer fuel docks. Check individual marina listings on MarinaSeeker for fuel availability.` },
    { q: `Can I live on my boat in ${stateInfo.name}?`, a: `Some marinas in ${stateInfo.name} allow liveaboards. Policies and fees vary — contact the marina directly about liveaboard regulations.` },
    { q: `When is the best time to boat in ${stateInfo.name}?`, a: `Boating season varies by region. In ${stateInfo.name}, peak season is typically May through October, though southern states enjoy year-round access.` },
  ];
  const faqs = [...baseFaqs, ...(editorial?.faqExtra || [])];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      {editorial && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Marinas in ${stateInfo.name}: The Complete Guide`,
          description: editorial.introOverride,
          datePublished: "2026-04-30",
          dateModified: "2026-04-30",
          author: { "@type": "Organization", name: "MarinaSeeker Editorial" },
          publisher: { "@type": "Organization", name: "MarinaSeeker" },
          articleSection: "Marinas",
          keywords: ["marina", stateInfo.name, "boating", "dockage", "slip rental"],
        }) }} />
      )}
      <section className="py-16 md:py-24 text-center px-4" style={{ background: "#FAF8F5", backgroundImage: "radial-gradient(circle at 20% 80%, rgba(27,58,92,0.06) 0%, transparent 50%)" }}>
        <p className="text-[#1B3A5C] text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{stateInfo.name} Marina Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight max-w-3xl mx-auto">Marinas in {stateInfo.name}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stateTotal.toLocaleString()} marinas across {stateInfo.name}. GPS coordinates, amenities, and contact information.</p>
      </section>

      {/* Brief intro */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          {editorial?.introOverride
            ? editorial.introOverride
            : `${stateInfo.name} has ${stateTotal.toLocaleString()} marinas listed on MarinaSeeker, offering everything from full-service facilities with fuel, electric, and pump-out to simple docks and boat launches. Whether you're looking for a transient slip, seasonal rental, or liveaboard berth, browse by city below to find the right marina.`}
        </p>
      </section>

      {/* Map */}
      {stateMarinas.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <StateMap marinas={stateMarinas} center={mapCenter} />
        </section>
      )}

      {/* City sub-grid */}
      {cities.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cities.slice(0, 16).map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-[#1B3A5C] hover:shadow-sm transition"
              >
                <p className="font-bold text-[#1A1A1A] text-sm">{c.city}</p>
                <p className="text-gray-400 text-xs">{c.count} marina{c.count !== 1 ? "s" : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {editorial && (
        <section className="max-w-3xl mx-auto my-12 px-4">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-6 text-center font-[Cabin]">
            The Complete Guide
          </div>
          {editorial.h2Blocks.map((block, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="font-[Cabin] text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
                {block.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {block.body}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Marina List */}
      <section id="marina-list" className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stateMarinas.map((m) => (
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

      {/* Tips (moved below MarinaList per directory-first hierarchy) */}
      <section className="max-w-4xl mx-auto px-4 pt-4 pb-2">
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

      {/* Gear (moved below Tips per directory-first hierarchy) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="dock-essentials" />
      </section>

      {/* Visible FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
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
