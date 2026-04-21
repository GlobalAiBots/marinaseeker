import Link from "next/link";
import type { Metadata } from "next";

const TITLE = "Marina Slip vs Mooring Ball vs Private Dock: Which is Right for You?";
const DESC = "Full cost + access comparison: slips $10-25/ft, moorings $100-400/mo, private docks $1K-5K/mo. Which makes sense for your boat, budget, and weather exposure.";
const URL = "https://www.marinaseeker.com/blog/marina-vs-mooring-vs-dock";

export const metadata: Metadata = {
  title: `${TITLE} | MarinaSeeker`,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, siteName: "MarinaSeeker" },
  twitter: { card: "summary", title: TITLE },
  alternates: { canonical: URL },
};

const faqs = [
  { q: "Is a mooring ball cheaper than a marina slip?", a: "Yes, significantly — moorings typically run $100-$400/month vs slip rates of $10-$25 per foot per month ($300-$800 for a 30-foot boat). But moorings require a dinghy for access and usually include no amenities, so the cost gap narrows when you factor in dinghy fuel, launch fees, and wasted time." },
  { q: "Can I liveaboard on a mooring?", a: "In some harbors yes, in most harbors no. Municipal mooring fields frequently prohibit continuous occupancy; Coast Guard and harbormaster regulations may limit nights per year. If you want to liveaboard, a slip is almost always the right answer — and not every marina allows liveaboards even then." },
  { q: "What's safer in a hurricane — slip, mooring, or dock?", a: "None are safe in a direct hit, but in order of survivability: a well-constructed private hurricane hole dock with proper mooring gear > a marina slip with floating docks > a mooring ball > a marina slip with fixed docks. Most serious owners haul out or travel to a protected hurricane hole." },
  { q: "Do I need a boat lift at a private dock?", a: "In brackish or saltwater, strongly recommended. Leaving a boat in salt water shortens bottom paint life (from 5-7 years to 2-3), and zinc anodes erode faster. A lift adds $5,000-$20,000 to install but pays for itself in bottom paint, hull integrity, and resale value within 5 years." },
  { q: "How do I find mooring balls for rent?", a: "Municipal harbormasters keep waitlists (some multi-year). Private yacht clubs and marinas rent short-term moorings by reservation. Cruising services like Dockwa list transient moorings. For a permanent rental, start with the local harbormaster's office." },
];

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESC, datePublished: "2026-04-21", dateModified: "2026-04-21", author: { "@type": "Organization", name: "MarinaSeeker" }, publisher: { "@type": "Organization", name: "MarinaSeeker", url: "https://www.marinaseeker.com" }, mainEntityOfPage: URL }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.marinaseeker.com" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.marinaseeker.com/blog" }, { "@type": "ListItem", position: 3, name: "Slip vs Mooring vs Dock", item: URL }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex gap-2"><Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-[#1B3A5C] transition">Blog</Link><span>/</span><span className="text-[#1A1A1A]">Slip vs Mooring vs Dock</span></nav>

      <header className="mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1B3A5C] mb-3">Dockage</span>
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-3">{TITLE}</h1>
        <p className="text-gray-500 text-sm">Updated April 21, 2026 &middot; 9 min read &middot; MarinaSeeker Team</p>
      </header>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>Three ways to keep a boat in the water: a marina slip, a mooring ball, or a private dock. Each has a dramatically different price, daily hassle factor, and failure mode. The best option depends on boat size, how often you use it, whether you&apos;ll liveaboard, and how paranoid you are about hurricanes.</p>
        <p>This guide lays out the actual numbers for each, the less-obvious costs, and which situations match which solution.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">The Quick Comparison</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Factor</th>
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Marina Slip</th>
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Mooring Ball</th>
                <th className="text-left py-2 font-bold text-[#1A1A1A]">Private Dock</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Monthly cost (30 ft boat)</td><td className="py-2 pr-4">$300-$800</td><td className="py-2 pr-4">$100-$400</td><td className="py-2">$0 (owned) / $1K-$5K rent</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Access</td><td className="py-2 pr-4">Walk down dock</td><td className="py-2 pr-4">Dinghy required</td><td className="py-2">Direct from shore</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Shore power</td><td className="py-2 pr-4">Standard</td><td className="py-2 pr-4">Never</td><td className="py-2">If you install it</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Fresh water</td><td className="py-2 pr-4">Standard</td><td className="py-2 pr-4">Never</td><td className="py-2">If you install it</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Pumpout</td><td className="py-2 pr-4">On-site at most</td><td className="py-2 pr-4">Dinghy to harbor</td><td className="py-2">None (unless installed)</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Security / watchful eyes</td><td className="py-2 pr-4">High</td><td className="py-2 pr-4">Low</td><td className="py-2">Depends on location</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Hurricane survivability</td><td className="py-2 pr-4">Moderate</td><td className="py-2 pr-4">Low-moderate</td><td className="py-2">Varies wildly</td></tr>
              <tr><td className="py-2 pr-4 font-semibold">Liveaboard allowed</td><td className="py-2 pr-4">Often</td><td className="py-2 pr-4">Rarely</td><td className="py-2">Yes (your dock)</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Marina Slip: The Default Choice for Most Owners</h2>
        <p>A marina slip puts your boat against a dock with cleats, water, electricity, and a short walk to your car, restrooms, and usually some kind of club or ship store. It&apos;s the highest-cost option and also the highest-convenience one &mdash; the right trade for most owners who use their boat on weekends and don&apos;t want a project.</p>
        <p><strong className="text-[#1A1A1A]">Costs vary by region dramatically.</strong> Gulf of Mexico and Great Lakes typically $10-$18 per foot per month. Northeast and California coastal, $15-$25+. Florida premium locations (Miami, Keys, Palm Beach), $20-$35. Add electricity sub-metering ($30-$80/mo typical), pump-out fees on some marinas, and parking for trailered boats if that&apos;s relevant.</p>
        <p>For a deeper breakdown, see our <Link href="/blog/marina-slip-costs-by-state" className="text-[#1B3A5C] hover:underline">state-by-state slip cost guide</Link>. Bundle deals (slip + storage + club dues) often knock 10-20% off when negotiated at year-end &mdash; see <Link href="/blog/how-to-negotiate-slip-rental" className="text-[#1B3A5C] hover:underline">how to negotiate slip rental</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Mooring Ball: Cheap, Quiet, Dinghy-Dependent</h2>
        <p>A mooring is a permanent anchor (usually a mushroom or helix) on the harbor floor connected to a pennant that surfaces at a ball. You tie the bow of your boat to the pennant and float freely, facing into the wind as it shifts. No shore connection.</p>
        <p><strong className="text-[#1A1A1A]">Cost:</strong> Typical $100-$400/month for seasonal or year-round. Dramatically cheaper than a slip.</p>
        <p><strong className="text-[#1A1A1A]">The hidden costs:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Dinghy required.</strong> A decent used dinghy + outboard runs $1,500-$4,000. Plus fuel and maintenance.</li>
          <li><strong>Dinghy storage / launch.</strong> Many harbors charge a launch fee or require you to pay for dinghy dockage.</li>
          <li><strong>Harbor commute time.</strong> 5-15 minutes each way to reach your boat. On a windy day with chop, this is miserable.</li>
          <li><strong>No shore power.</strong> Fridge, lights, battery top-off: all from solar, wind gen, or running the engine.</li>
          <li><strong>Mooring inspection.</strong> Some harbors require annual diver inspection, $100-$300.</li>
        </ul>
        <p>Mooring is the right answer for boaters who (a) only day-sail, (b) love the ritual of the dinghy commute, (c) want the lowest dockage cost available, and (d) don&apos;t need shore power. For cruising sailors and day-sailers, it&apos;s idyllic. For weekenders who want to run the air conditioning, it isn&apos;t.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Private Dock: Freedom With a Capital Expense</h2>
        <p>Owning (or renting) your own dock &mdash; at your waterfront home, or a leased private dock on someone else&apos;s waterfront &mdash; is the premium tier. No walking, no dinghy, boat is 50 feet from the back door.</p>
        <p><strong className="text-[#1A1A1A]">Owned dock (you own the waterfront):</strong> effectively free to use after you build the dock ($20K-$150K+ depending on length, material, and water depth). Maintenance is typical $500-$2,000/year on a wood dock, far less on aluminum/composite.</p>
        <p><strong className="text-[#1A1A1A]">Rented private dock (leasing someone else&apos;s):</strong> highly variable. In rural lake country, $200-$800/month. In south Florida or California coastal, $1,500-$5,000/month for prime locations. Craigslist and local marine classifieds list these.</p>
        <p><strong className="text-[#1A1A1A]">The real consideration:</strong> storm exposure. Private docks in a wide-open bay are sitting ducks during named storms; private docks in a protected creek or behind a seawall are among the safest options. If you&apos;re in hurricane country, the geography of the dock matters more than the dock itself.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Which Is Right for You?</h2>
        <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-6">Weekender with a 20-35 ft boat</h3>
        <p>Marina slip, almost always. Use matters most: you want to show up on Saturday morning and go. The mooring commute will wear you down by mid-summer.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-6">Day-sailer with a 25-40 ft sailboat</h3>
        <p>Mooring wins on cost and aesthetics. Sailing culture defaults to moorings in classic New England, Pacific Northwest, and Great Lakes harbors. Budget matters, and you&apos;re going to the boat to sail, not to stay aboard.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-6">Liveaboard couple</h3>
        <p>Slip &mdash; and specifically a liveaboard-approved slip. Moorings rarely allow continuous occupancy and private docks are hard to get approvals/utilities on. See <Link href="/blog/liveaboard-guide" className="text-[#1B3A5C] hover:underline">our liveaboard guide</Link>.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-6">Waterfront homeowner</h3>
        <p>Private dock if you have the waterfront, by far. The construction cost amortizes fast vs 10-20 years of slip rent. Add a lift if you&apos;re in salt water.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-6">Performance sailor / racer</h3>
        <p>Depends on fleet location. Most one-design fleets are marina-based; some classic fleets are mooring-based. Match the fleet.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">The 10-Year Cost Picture</h2>
        <p>For a 32-foot boat in a mid-cost region, over 10 years:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-[#1A1A1A]">Marina slip:</strong> ~$60,000 ($500/mo average)</li>
          <li><strong className="text-[#1A1A1A]">Mooring:</strong> ~$24,000 ($200/mo) + $3,000 dinghy + $5,000 dinghy fuel/maintenance = ~$32,000</li>
          <li><strong className="text-[#1A1A1A]">Private dock (build + maintain):</strong> ~$50,000 one-time + $10,000 maintenance = ~$60,000 (but you own an asset)</li>
        </ul>
        <p>Mooring wins on raw dollars. Slip wins on hassle. Private dock wins if you own the land.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-lg">{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Related Reading</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><Link href="/blog/marina-slip-costs-by-state" className="text-[#1B3A5C] hover:underline">Marina Slip Costs by State (2026)</Link></li>
          <li><Link href="/blog/how-to-negotiate-slip-rental" className="text-[#1B3A5C] hover:underline">How to Negotiate a Marina Slip Rental</Link></li>
          <li><Link href="/blog/liveaboard-guide" className="text-[#1B3A5C] hover:underline">Liveaboard Guide</Link></li>
          <li><Link href="/blog/choosing-a-marina-checklist" className="text-[#1B3A5C] hover:underline">10 Things to Check Before Choosing a Marina</Link></li>
        </ul>
      </div>
    </article>
  );
}
