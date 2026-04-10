import Link from "next/link";
import { notFound } from "next/navigation";
import { unified, stateList } from "@/data/all-marinas";
import MarinaMapWrapper from "@/components/MarinaMapWrapper";
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
      </div>
    </div>
  );
}
