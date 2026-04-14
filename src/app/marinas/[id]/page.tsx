import Link from "next/link";
import { notFound } from "next/navigation";
import { unified, stateList } from "@/data/all-marinas";
import MarinaMapWrapper from "@/components/MarinaMapWrapper";
import FeaturedArticle from "@/components/FeaturedArticle";
import type { Metadata } from "next";

export function generateStaticParams() {
  return unified.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const marina = unified.find((m) => m.id === id);
  if (!marina) return { title: "Marina Not Found" };
  const stateName = stateList.find((s) => s.code === marina.state)?.name || marina.state;
  return {
    title: `${marina.name} — ${marina.city ? marina.city + ", " : ""}${stateName} | MarinaSeeker`,
    description: `${marina.name} in ${marina.city ? marina.city + ", " : ""}${stateName}. GPS coordinates, amenities, and contact info. Free on MarinaSeeker.`,
    alternates: { canonical: `https://marinaseeker.com/marinas/${marina.id}` },
  };
}

const amenityLabels: Record<string, { icon: string; label: string }> = {
  fuel: { icon: "\u26FD", label: "Fuel" },
  electricity: { icon: "\u26A1", label: "Electric" },
  pump_out: { icon: "\u{1F6B0}", label: "Pump-Out" },
  toilets: { icon: "\u{1F6BB}", label: "Restrooms" },
  showers: { icon: "\u{1F6BF}", label: "Showers" },
  laundry: { icon: "\u{1F9FA}", label: "Laundry" },
  wifi: { icon: "\u{1F4F6}", label: "WiFi" },
  restaurant: { icon: "\u{1F37D}", label: "Restaurant" },
  slipway: { icon: "\u{1F6A4}", label: "Boat Launch" },
  boat_rental: { icon: "\u26F5", label: "Boat Rental" },
};

export default async function MarinaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const marina = unified.find((m) => m.id === id);
  if (!marina) notFound();

  const stateName = stateList.find((s) => s.code === marina.state)?.name || marina.state;
  const stateSlug = stateList.find((s) => s.code === marina.state)?.slug || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: marina.name,
    description: marina.description || `Marina in ${marina.city ? marina.city + ", " : ""}${stateName}`,
    url: `https://marinaseeker.com/marinas/${marina.id}`,
    geo: { "@type": "GeoCoordinates", latitude: marina.lat, longitude: marina.lng },
    address: { "@type": "PostalAddress", addressLocality: marina.city, addressRegion: marina.state, addressCountry: "US" },
    ...(marina.phone && { telephone: marina.phone }),
    ...(marina.website && { url: marina.website }),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://marinaseeker.com" },
          { "@type": "ListItem", position: 2, name: stateName, item: `https://marinaseeker.com/${stateSlug}` },
          ...(marina.city ? [{ "@type": "ListItem", position: 3, name: marina.city }] : []),
          { "@type": "ListItem", position: marina.city ? 4 : 3, name: marina.name },
        ],
      }) }} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
          {stateSlug && <><Link href={`/${stateSlug}`} className="hover:text-[#1B3A5C] transition">{stateName}</Link><span>/</span></>}
          <span className="text-[#1A1A1A] font-medium">{marina.name}</span>
        </nav>

        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">{marina.name}</h1>
        <p className="text-gray-500 mb-6">{marina.city ? `${marina.city}, ` : ""}{stateName}</p>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mb-8">
          {marina.website && (
            <a href={marina.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1B3A5C] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0F2A47] transition">
              \{"D83CDF10"} Visit Website
            </a>
          )}
          {marina.phone && (
            <a href={`tel:${marina.phone}`} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#1A1A1A] px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-[#1B3A5C] transition">
              \{"📞"} {marina.phone}
            </a>
          )}
          {marina.email && (
            <a href={`mailto:${marina.email}`} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#1A1A1A] px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-[#1B3A5C] transition">
              \{"✉"} Email
            </a>
          )}
        </div>

        {/* Map */}
        <div className="mb-8">
          <MarinaMapWrapper marinas={[{ id: marina.id, name: marina.name, lat: marina.lat, lng: marina.lng, city: marina.city, state: marina.state }]} center={[marina.lat, marina.lng]} zoom={14} height="350px" />
          <p className="text-center mt-2 text-xs text-gray-400">GPS: {marina.lat.toFixed(4)}, {marina.lng.toFixed(4)} &middot; <a href={`https://www.google.com/maps?q=${marina.lat},${marina.lng}`} target="_blank" rel="noopener noreferrer" className="text-[#C4924B] hover:underline">Open in Google Maps</a></p>
        </div>

        {/* Amenities */}
        {marina.amenities.length > 0 && (
          <section className="mb-8">
            <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {marina.amenities.map((a) => {
                const info = amenityLabels[a] || { icon: "\u2713", label: a };
                return (
                  <div key={a} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-lg">{info.icon}</span>
                    <span className="text-sm font-medium text-[#1A1A1A]">{info.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* About This Marina — unique content */}
        <section className="mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">About {marina.name}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {marina.name} is a marina located in {marina.city ? `${marina.city}, ` : ""}{stateName}. {marina.amenities.length > 0 ? `Amenities include ${marina.amenities.slice(0, 4).map(a => (amenityLabels[a]?.label || a).toLowerCase()).join(", ")}.` : ""} {marina.operator ? `Operated by ${marina.operator}.` : ""} GPS coordinates: {marina.lat.toFixed(4)}, {marina.lng.toFixed(4)}.
            </p>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="font-[Cabin] font-bold text-[#1B3A5C] mb-3">Tips for Visiting {marina.name}</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Call ahead to check slip availability, especially during peak season.</li>
              <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Ask about transient rates if you&apos;re just passing through.</li>
              <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Check fuel prices before arrival &mdash; marina fuel can vary significantly.</li>
              <li className="flex items-start gap-2"><span className="text-[#1B3A5C] mt-0.5">&#10003;</span> Read our <Link href="/blog/what-to-look-for-choosing-marina" className="text-[#1B3A5C] hover:underline">guide to choosing a marina</Link> for more advice.</li>
            </ul>
          </div>
        </section>

        {/* Marinas in State */}
        {(() => {
          const stateCount = unified.filter(m => m.state === marina.state).length;
          return (
            <section className="mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">Marinas in {stateName}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {stateName} has {stateCount.toLocaleString()} marinas listed on MarinaSeeker. Whether you need a full-service marina with fuel and electric, or a simple dock for the night, {stateName} has options for every boater. {stateSlug && <Link href={`/${stateSlug}`} className="text-[#1B3A5C] hover:underline">Browse all {stateCount.toLocaleString()} marinas in {stateName}</Link>}.
                </p>
              </div>
            </section>
          );
        })()}

        {/* FAQ */}
        <section className="mb-8">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: `Where is ${marina.name}?`, acceptedAnswer: { "@type": "Answer", text: `${marina.name} is in ${marina.city ? marina.city + ", " : ""}${stateName}. GPS: ${marina.lat.toFixed(4)}, ${marina.lng.toFixed(4)}.` } },
            { "@type": "Question", name: `Does ${marina.name} have fuel?`, acceptedAnswer: { "@type": "Answer", text: marina.amenities.includes("fuel") ? "Yes, fuel is available at this marina." : "Fuel availability is not confirmed. Call ahead to check." } },
            { "@type": "Question", name: `How do I get to ${marina.name}?`, acceptedAnswer: { "@type": "Answer", text: "Click the 'Open in Google Maps' link above for turn-by-turn directions." } },
          ] }) }} />
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: `Where is ${marina.name}?`, a: `${marina.name} is in ${marina.city ? marina.city + ", " : ""}${stateName}. GPS: ${marina.lat.toFixed(4)}, ${marina.lng.toFixed(4)}.` },
              { q: `Does ${marina.name} have fuel?`, a: marina.amenities.includes("fuel") ? "Yes, fuel is available at this marina." : "Fuel availability is not confirmed. Call ahead to check." },
              { q: `How do I get to ${marina.name}?`, a: "Click the 'Open in Google Maps' link above for turn-by-turn directions." },
            ].map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#1B3A5C] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-8">
          <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">Related Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/blog/what-to-look-for-choosing-marina", title: "Choosing a Marina", desc: "What to look for in a marina" },
              { href: "/blog/marina-etiquette", title: "Marina Etiquette", desc: "Be a good neighbor at the dock" },
              { href: "/blog/seasonal-vs-annual-slip-rental", title: "Slip Rentals", desc: "Seasonal vs annual: which is better?" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <p className="font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition text-sm">{g.title}</p>
                <p className="text-gray-400 text-xs mt-1">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Details */}
        {(marina.operator || marina.capacity || marina.description) && (
          <section className="mb-8">
            <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Details</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              {marina.operator && <p className="text-sm"><span className="font-semibold text-[#1A1A1A]">Operator:</span> <span className="text-gray-600">{marina.operator}</span></p>}
              {marina.capacity && <p className="text-sm"><span className="font-semibold text-[#1A1A1A]">Capacity:</span> <span className="text-gray-600">{marina.capacity} slips</span></p>}
              {marina.description && <p className="text-sm text-gray-600">{marina.description}</p>}
            </div>
          </section>
        )}

        {/* Nearby Marinas */}
        {(() => {
          const nearbyData = (() => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              const data = require("@/data/nearby.json");
              return (data[marina.id] || []).slice(0, 5);
            } catch { return []; }
          })();
          if (nearbyData.length === 0) return null;
          return (
            <section className="mb-8">
              <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Nearby Marinas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nearbyData.map((n: { id: string; name: string; distance: number; city: string; state: string }) => (
                  <Link key={n.id} href={`/marinas/${n.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-[#1B3A5C]">
                    <p className="font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition text-sm">{n.name}</p>
                    <p className="text-gray-500 text-xs">{n.city}{n.city && n.state ? ", " : ""}{n.state} &middot; {n.distance} mi</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Cross-links */}
        <section className="mb-8">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Nearby Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href={`https://rampseeker.com/${stateSlug || ""}`} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#1B3A5C] transition">
              <p className="font-bold text-[#1A1A1A] text-sm">\{"{1F6A4}"} Nearby Boat Ramps</p>
              <p className="text-gray-400 text-xs">Find boat ramps near {marina.city || stateName} on RampSeeker</p>
            </a>
            <a href={`https://pierseeker.com/${stateSlug || ""}`} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#1B3A5C] transition">
              <p className="font-bold text-[#1A1A1A] text-sm">\{"{1F3A3}"} Nearby Fishing Piers</p>
              <p className="text-gray-400 text-xs">Find fishing piers near {marina.city || stateName} on PierSeeker</p>
            </a>
          </div>
        </section>
        <FeaturedArticle listingSlug={marina.id} />

        {/* Claim Listing CTA */}
        {/* Nearby Cities */}
        {marina.city && (() => {
          const otherCities = unified.filter(m => m.state === marina.state && m.city && m.city !== marina.city);
          const uniqueCities = Array.from(new Set(otherCities.map(m => m.city))).slice(0, 6);
          if (uniqueCities.length === 0) return null;
          return (
            <section className="mb-8">
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">Nearby Cities with Marinas</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueCities.map(city => (
                  <Link key={city} href={`/cities/${stateSlug}-${city.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#1B3A5C] hover:border-[#1B3A5C] transition">
                    {city}, {marina.state}
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* People Also Search For */}
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3 text-sm">People Also Search For</h3>
          <div className="flex flex-wrap gap-2">
            {marina.city && <Link href={`/cities/${stateSlug}-${marina.city.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#1B3A5C] hover:border-[#1B3A5C] transition">Marinas near {marina.city}</Link>}
            {stateSlug && <Link href={`/${stateSlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#1B3A5C] hover:border-[#1B3A5C] transition">Marinas in {stateName}</Link>}
            {marina.city && <Link href={`/cities/${stateSlug}-${marina.city.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#1B3A5C] hover:border-[#1B3A5C] transition">Boat slips in {marina.city}</Link>}
            <Link href="/blog/what-to-look-for-choosing-marina" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#1B3A5C] hover:border-[#1B3A5C] transition">How to choose a marina</Link>
          </div>
        </section>

        <section className="bg-[#F0F4F8] rounded-xl p-6 border border-[#D4D8DD] mb-8">
          <h3 className="font-[Cabin] text-lg font-bold text-[#1A1A1A] mb-2">Own or manage this marina?</h3>
          <p className="text-gray-500 text-sm mb-4">Claim your free listing to update slip availability, amenities, contact info, and fuel prices.</p>
          <Link href={`/claim?marina=${encodeURIComponent(marina.id)}&name=${encodeURIComponent(marina.name)}`} className="inline-block bg-[#C4924B] hover:bg-[#b5833e] text-white font-bold px-6 py-3 rounded-lg transition text-sm">
            Claim This Marina &mdash; It&apos;s Free
          </Link>
        </section>
      </div>
    </div>
  );
}
