import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Best Liveaboard Marinas in America (2026) | MarinaSeeker",
  description: "Discover the best liveaboard marinas in America for 2026. Compare slip fees, amenities, and regulations for living full-time on your boat at a marina.",
  openGraph: { title: "Best Liveaboard Marinas in America (2026)", url: "https://marinaseeker.com/liveaboard", siteName: "MarinaSeeker" },
  twitter: { card: "summary", title: "Best Liveaboard Marinas in America (2026) | MarinaSeeker" },
  alternates: { canonical: "https://marinaseeker.com/liveaboard" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://marinaseeker.com" },
    { "@type": "ListItem", position: 2, name: "Liveaboard Marinas", item: "https://marinaseeker.com/liveaboard" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to live on a boat at a marina?",
      acceptedAnswer: { "@type": "Answer", text: "Liveaboard slip fees typically range from $800 to $2,000 per month depending on location, boat size, and marina amenities. This is often significantly less than apartment rent in the same area, which can run $1,500 to $3,000 or more in coastal cities." },
    },
    {
      "@type": "Question",
      name: "Do all marinas allow liveaboards?",
      acceptedAnswer: { "@type": "Answer", text: "No. Many marinas do not permit liveaboard tenants, and some that do limit the number of liveaboard slips to comply with local zoning laws. You will also need to check whether your city or county requires a separate liveaboard permit." },
    },
    {
      "@type": "Question",
      name: "What amenities should I look for in a liveaboard marina?",
      acceptedAnswer: { "@type": "Answer", text: "Essential amenities include shower and laundry facilities, reliable electrical hookups (30A or 50A), potable water, mail and package service, on-site parking, Wi-Fi, pump-out stations, and a pet-friendly policy if you have animals aboard." },
    },
  ],
};

const marinas = [
  { name: "Sunset Marina", city: "Key West", state: "FL", rate: "$1,200-1,800/mo", amenities: "30A/50A power, laundry, showers, fuel dock, pet-friendly", why: "Year-round tropical weather with walking distance to restaurants and nightlife. One of the most iconic liveaboard destinations in America." },
  { name: "Shilshole Bay Marina", city: "Seattle", state: "WA", rate: "$900-1,500/mo", amenities: "30A/50A power, laundry, showers, Wi-Fi, pump-out, parking", why: "Protected Puget Sound location with stunning mountain views. Large liveaboard community and easy access to downtown Seattle." },
  { name: "Marina del Rey", city: "Los Angeles", state: "CA", rate: "$1,400-2,000/mo", amenities: "50A power, laundry, showers, pool, fitness center, fuel dock", why: "The largest man-made small-craft harbor in North America. Walking distance to beaches, shops, and restaurants in LA's Westside." },
  { name: "Herrington Harbour", city: "Deale", state: "MD", rate: "$800-1,200/mo", amenities: "30A/50A power, laundry, showers, pool, restaurant, ship store", why: "Award-winning Chesapeake Bay marina with a tight-knit liveaboard community and excellent sailing waters." },
  { name: "Rockport Harbor", city: "Rockport", state: "TX", rate: "$700-1,000/mo", amenities: "30A/50A power, laundry, showers, fish-cleaning station, parking", why: "Affordable Texas Gulf Coast living with mild winters, great fishing, and a laid-back coastal town atmosphere." },
  { name: "Pier 39 Marina", city: "San Francisco", state: "CA", rate: "$1,600-2,200/mo", amenities: "50A power, laundry, showers, security, pump-out, Wi-Fi", why: "Iconic waterfront location on San Francisco Bay with views of the Golden Gate Bridge and Alcatraz. Premium liveaboard experience." },
  { name: "Fort Myers Yacht Basin", city: "Fort Myers", state: "FL", rate: "$900-1,400/mo", amenities: "30A/50A power, laundry, showers, fuel dock, pump-out, Wi-Fi", why: "Downtown Fort Myers location on the Caloosahatchee River with access to the Gulf of Mexico and the Okeechobee Waterway." },
  { name: "Dinner Key Marina", city: "Miami", state: "FL", rate: "$1,100-1,600/mo", amenities: "30A/50A power, laundry, showers, pump-out, dinghy dock, parking", why: "One of the largest marinas in South Florida with a well-established liveaboard community and proximity to Coconut Grove." },
  { name: "Foss Harbor Marina", city: "Tacoma", state: "WA", rate: "$800-1,200/mo", amenities: "30A/50A power, laundry, showers, Wi-Fi, pump-out, parking", why: "Affordable Pacific Northwest option on Commencement Bay with easy access to Tacoma's revitalized waterfront district." },
  { name: "Kemah Boardwalk Marina", city: "Kemah", state: "TX", rate: "$750-1,100/mo", amenities: "30A/50A power, laundry, showers, fuel dock, restaurants, parking", why: "Family-friendly Texas Gulf Coast location next to the Kemah Boardwalk entertainment district with access to Galveston Bay." },
];

export default function LiveaboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Liveaboard Marinas</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">Best Liveaboard Marinas in America (2026)</h1>
      <p className="text-gray-500 text-sm mb-10">Updated April 2026 &middot; 10 min read</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">What Does Liveaboard Mean?</h2>
        <p>
          A liveaboard is someone who lives full-time on their boat at a marina. Instead of a house or apartment, your vessel is your primary residence, and the marina is your neighborhood. You sleep, cook, work, and relax on your boat while enjoying access to the marina&apos;s shore-side facilities like showers, laundry, and parking. For thousands of Americans, liveaboard life is not a compromise but a deliberate lifestyle choice that offers freedom, waterfront living, and a tight-knit community that is hard to find anywhere else.
        </p>
        <p>
          Living aboard is not the same as cruising. Liveaboards typically stay in one marina for months or years at a time, paying a monthly slip fee that covers their berth and basic utilities. Some liveaboards rarely leave the dock, while others take regular weekend trips and return to the same slip. The common thread is that the boat is home base, not a vacation vehicle.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Regulations and Permits</h2>
        <p>
          Not all marinas allow liveaboards. Many facilities restrict the number of liveaboard slips they offer, sometimes capping them at 10 to 15 percent of total slips to comply with local zoning and environmental regulations. Cities and counties often require a separate liveaboard permit, and some jurisdictions have waiting lists that can stretch for years. Before committing to a marina, verify that liveaboard status is permitted and ask about any local permits you will need. California, Florida, and Washington have some of the most established liveaboard regulations, while other states may have little formal guidance.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Cost Comparison: Marina Slip vs. Apartment</h2>
        <p>
          One of the biggest draws of liveaboard life is the cost savings. Monthly liveaboard slip fees across the country range from about $800 to $2,000 per month, depending on location, boat length, and amenities. Compare that to apartment rent in the same coastal cities, which typically runs $1,500 to $3,000 or more per month. In expensive markets like San Francisco, Seattle, and Miami, a liveaboard slip can cost 30 to 50 percent less than a one-bedroom apartment within walking distance of the water.
        </p>
        <p>
          Keep in mind that slip fees usually include water and sometimes basic electricity, but you will pay extra for higher electrical usage, internet, and any storage space on shore. Even with those extras, the total cost of living aboard typically comes in well below comparable housing in the same area. Use our <Link href="/slip-cost-calculator" className="text-[#1B3A5C] hover:underline font-semibold">slip cost calculator</Link> to estimate your monthly expenses at different marinas.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">What to Look for in a Liveaboard Marina</h2>
        <p>
          Not every marina is suited for full-time living. When evaluating a liveaboard marina, prioritize these amenities and features:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Shower and laundry facilities</strong> &mdash; Clean, well-maintained restrooms and laundry rooms are essential for daily comfort.</li>
          <li><strong>Electrical hookups</strong> &mdash; Most liveaboards need at least a 30-amp connection, and larger boats require 50-amp service for air conditioning, heating, and appliances.</li>
          <li><strong>Mail and package service</strong> &mdash; A marina that accepts mail and packages on your behalf makes liveaboard logistics much easier.</li>
          <li><strong>Parking</strong> &mdash; Dedicated parking near your slip is important since you will likely still own a car.</li>
          <li><strong>Pet policy</strong> &mdash; If you have a dog or cat aboard, confirm that the marina allows pets and has a designated pet area on shore.</li>
          <li><strong>Wi-Fi and connectivity</strong> &mdash; Reliable internet is critical if you work remotely from your boat.</li>
          <li><strong>Pump-out station</strong> &mdash; Convenient access to a pump-out station for your holding tank is a necessity.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Best Regions for Liveaboard Living</h2>
        <p>
          Some regions of the country are far more liveaboard-friendly than others, both in terms of climate and regulation. <strong>South Florida</strong> is the most popular liveaboard destination thanks to year-round warm weather and a large number of marinas that welcome full-time residents. The <strong>Pacific Northwest</strong>, particularly Seattle and Portland, has a thriving liveaboard culture with more affordable slip rates than you might expect. The <strong>Chesapeake Bay</strong> region in Maryland offers excellent sailing and a strong boating community. The <strong>Texas Gulf Coast</strong> around Kemah, Rockport, and Corpus Christi provides some of the lowest liveaboard costs in the country. And <strong>California</strong>, despite higher prices, remains a top destination for liveaboards who want world-class weather and waterfront access in cities like San Diego, Los Angeles, and San Francisco.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Top 10 Liveaboard-Friendly Marinas</h2>
        <p>
          These marinas stand out for their liveaboard policies, amenities, community, and overall quality of life. Monthly rates are approximate and vary by boat length and slip availability.
        </p>

        <div className="space-y-8 mt-6">
          {marinas.map((m, i) => (
            <div key={i} className="bg-[#FAF8F5] border border-gray-200 rounded-xl p-6">
              <h3 className="font-[Cabin] text-xl font-bold text-[#1B3A5C] mb-1">{i + 1}. {m.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{m.city}, {m.state} &middot; <span className="text-[#C4924B] font-semibold">{m.rate}</span></p>
              <p className="text-sm text-[#1A1A1A] mb-2"><strong>Key amenities:</strong> {m.amenities}</p>
              <p className="text-sm text-[#1A1A1A]">{m.why}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Frequently Asked Questions</h2>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">How much does it cost to live on a boat at a marina?</h3>
        <p>
          Liveaboard slip fees typically range from $800 to $2,000 per month depending on location, boat size, and marina amenities. This is often significantly less than apartment rent in the same area, which can run $1,500 to $3,000 or more in coastal cities.
        </p>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">Do all marinas allow liveaboards?</h3>
        <p>
          No. Many marinas do not permit liveaboard tenants, and some that do limit the number of liveaboard slips to comply with local zoning laws. You will also need to check whether your city or county requires a separate liveaboard permit.
        </p>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">What amenities should I look for in a liveaboard marina?</h3>
        <p>
          Essential amenities include shower and laundry facilities, reliable electrical hookups (30A or 50A), potable water, mail and package service, on-site parking, Wi-Fi, pump-out stations, and a pet-friendly policy if you have animals aboard.
        </p>

        <GearRecommendation section="dock-essentials" />

        <GearRecommendation section="comfort" />

        <div className="mt-12 bg-[#FAF8F5] border border-gray-200 rounded-xl p-8 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Ready to Find Your Liveaboard Marina?</h2>
          <p className="text-gray-500 mb-6">Browse thousands of marinas across America and filter by liveaboard availability, amenities, and location.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="bg-[#C4924B] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition inline-block">Search Marinas</Link>
            <Link href="/slip-cost-calculator" className="bg-[#1B3A5C] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition inline-block">Slip Cost Calculator</Link>
          </div>
        </div>

        <p className="mt-8">
          For more on liveaboard life, read our <Link href="/blog/liveaboard-marinas" className="text-[#1B3A5C] hover:underline font-semibold">in-depth liveaboard marina guide</Link> on the blog. You can also browse marinas by state to find liveaboard-friendly facilities near you: <Link href="/florida" className="text-[#1B3A5C] hover:underline font-semibold">Florida</Link>, <Link href="/washington" className="text-[#1B3A5C] hover:underline font-semibold">Washington</Link>, <Link href="/california" className="text-[#1B3A5C] hover:underline font-semibold">California</Link>, <Link href="/maryland" className="text-[#1B3A5C] hover:underline font-semibold">Maryland</Link>, and <Link href="/texas" className="text-[#1B3A5C] hover:underline font-semibold">Texas</Link>.
        </p>
      </div>
    </div>
  );
}
