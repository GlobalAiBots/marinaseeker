import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Find Marina Fuel Docks Near You | MarinaSeeker",
  description: "Find marinas with fuel docks across America. Compare marine fuel prices by region and learn tips for saving money on gas and diesel at the dock.",
  openGraph: { title: "Find Marina Fuel Docks Near You", url: "https://marinaseeker.com/fuel", siteName: "MarinaSeeker" },
  twitter: { card: "summary", title: "Find Marina Fuel Docks Near You | MarinaSeeker" },
  alternates: { canonical: "https://marinaseeker.com/fuel" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://marinaseeker.com" },
    { "@type": "ListItem", position: 2, name: "Fuel Docks", item: "https://marinaseeker.com/fuel" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does marina fuel cost?",
      acceptedAnswer: { "@type": "Answer", text: "Marine fuel prices vary by region. As of 2026, expect to pay roughly $3.50-4.50 per gallon on the Gulf Coast, $4-5.50 on the East Coast, $5-6.50 on the West Coast, and $4-5 on the Great Lakes. Marina fuel is typically more expensive than roadside gas stations due to delivery costs and waterfront overhead." },
    },
    {
      "@type": "Question",
      name: "Can I bring my own gas to a marina?",
      acceptedAnswer: { "@type": "Answer", text: "In most cases, yes. Many boaters fill portable fuel containers at a land-based gas station and carry them to the dock. This can save $1-2 per gallon compared to marina fuel dock prices. However, some marinas restrict the transport of portable fuel containers on their docks for safety reasons, so check the marina's policy first." },
    },
    {
      "@type": "Question",
      name: "Do all marinas have fuel docks?",
      acceptedAnswer: { "@type": "Answer", text: "No. Many smaller marinas, especially those focused on sailboats or dry storage, do not have fuel docks. Use MarinaSeeker's directory to filter marinas by amenities and find facilities with fuel docks near your cruising route." },
    },
  ],
};

const regions = [
  { name: "Gulf Coast", range: "$3.50-4.50/gal", note: "Lowest prices thanks to proximity to refineries" },
  { name: "East Coast", range: "$4.00-5.50/gal", note: "Higher in the Northeast, moderate in the Southeast" },
  { name: "West Coast", range: "$5.00-6.50/gal", note: "Highest prices nationally, especially in California" },
  { name: "Great Lakes", range: "$4.00-5.00/gal", note: "Moderate pricing with seasonal availability" },
];

export default function FuelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Fuel Docks</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">Find Marina Fuel Docks Near You</h1>
      <p className="text-gray-500 text-sm mb-10">Updated April 2026 &middot; 5 min read</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Whether you are heading out for a weekend cruise or refueling after a long passage, finding a marina with a fuel dock is one of the most practical concerns for any boater. Most marinas that operate fuel docks offer both gasoline and diesel, though smaller facilities may carry only one or the other. Knowing where to fuel up, what prices to expect, and how to save money at the pump can make a real difference over the course of a boating season.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">How to Find Fuel Docks</h2>
        <p>
          The easiest way to locate a marina with fuel is to use MarinaSeeker&apos;s directory and filter by amenities. Individual state pages list every marina we track in that state, and you can filter by fuel availability, pump-out stations, and other amenities that matter to you. Planning your fuel stops before a long cruise is especially important in areas where marinas are spread far apart, such as remote stretches of the Intracoastal Waterway or the upper Great Lakes.
        </p>
        <p>
          When in doubt, call the marina before you arrive. Fuel docks occasionally close for maintenance, run out of diesel during peak season, or adjust their operating hours seasonally. A quick phone call can save you from arriving at a closed fuel dock with a near-empty tank.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Average Marine Fuel Prices by Region (2026)</h2>
        <p>
          Marine fuel prices vary significantly by region, and they are almost always higher than what you pay at a roadside gas station. Delivery logistics, waterfront real estate costs, and lower sales volume all contribute to the premium. Here is what you can expect in 2026:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {regions.map((r) => (
            <div key={r.name} className="bg-[#FAF8F5] border border-gray-200 rounded-xl p-5">
              <h3 className="font-[Cabin] font-bold text-[#1B3A5C] text-lg mb-1">{r.name}</h3>
              <p className="text-[#C4924B] font-semibold text-lg mb-2">{r.range}</p>
              <p className="text-sm text-gray-500">{r.note}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 italic">
          Prices are approximate averages for 2026 and include both gasoline and diesel. Actual prices vary by marina, season, and fuel type.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Tips for Saving on Marine Fuel</h2>
        <p>
          Fuel is often the single biggest variable expense in boating. Here are several ways to reduce what you spend at the dock:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Fill up at land gas stations when possible.</strong> If your boat uses portable tanks or you can trailer to a gas station, roadside fuel is typically $1 to $2 per gallon cheaper than marina fuel.</li>
          <li><strong>Fuel in the morning.</strong> Fuel is denser when it is cool, so you get slightly more energy per gallon when you fill up early in the day before the sun heats the storage tanks.</li>
          <li><strong>Join fuel discount programs.</strong> Some marina chains and boating clubs offer fuel discount cards that save 5 to 15 cents per gallon. Over a full season, those savings add up quickly.</li>
          <li><strong>Slow down.</strong> Fuel consumption increases dramatically at higher speeds. Cruising at displacement speed instead of planing speed can cut fuel usage by 50 percent or more on powerboats.</li>
          <li><strong>Keep your hull clean.</strong> A fouled bottom creates drag that forces your engine to work harder. Regular bottom cleaning or antifouling paint keeps your fuel efficiency where it should be.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Frequently Asked Questions</h2>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">How much does marina fuel cost?</h3>
        <p>
          Marine fuel prices vary by region. As of 2026, expect to pay roughly $3.50 to $4.50 per gallon on the Gulf Coast, $4 to $5.50 on the East Coast, $5 to $6.50 on the West Coast, and $4 to $5 on the Great Lakes. Marina fuel is typically more expensive than roadside gas stations due to delivery costs and waterfront overhead.
        </p>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">Can I bring my own gas to a marina?</h3>
        <p>
          In most cases, yes. Many boaters fill portable fuel containers at a land-based gas station and carry them to the dock. This can save $1 to $2 per gallon compared to marina fuel dock prices. However, some marinas restrict the transport of portable fuel containers on their docks for safety reasons, so check the marina&apos;s policy first.
        </p>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">Do all marinas have fuel docks?</h3>
        <p>
          No. Many smaller marinas, especially those focused on sailboats or dry storage, do not have fuel docks. Use MarinaSeeker&apos;s directory to filter marinas by amenities and find facilities with fuel docks near your cruising route.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          Filter marinas by amenities on individual state pages to find fuel docks near you.
        </p>

        <GearRecommendation section="maintenance" />

        <div className="mt-12 bg-[#FAF8F5] border border-gray-200 rounded-xl p-8 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Find Marinas with Fuel</h2>
          <p className="text-gray-500 mb-6">Search our directory of marinas across America and filter by fuel availability, location, and other amenities.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="bg-[#C4924B] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition inline-block">Search Marinas</Link>
            <Link href="/slip-cost-calculator" className="bg-[#1B3A5C] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition inline-block">Slip Cost Calculator</Link>
          </div>
        </div>

        <p className="mt-8">
          Browse marinas by state to find fuel docks in your area: <Link href="/florida" className="text-[#1B3A5C] hover:underline font-semibold">Florida</Link>, <Link href="/texas" className="text-[#1B3A5C] hover:underline font-semibold">Texas</Link>, <Link href="/california" className="text-[#1B3A5C] hover:underline font-semibold">California</Link>, <Link href="/michigan" className="text-[#1B3A5C] hover:underline font-semibold">Michigan</Link>, and <Link href="/maryland" className="text-[#1B3A5C] hover:underline font-semibold">Maryland</Link>.
        </p>
      </div>
    </div>
  );
}
