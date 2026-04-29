"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-marinas";
import cityPages from "@/data/city-pages.json";
import NearMeButton from "@/components/NearMeButton";
import CletusAd from "@/components/CletusAd";
import GearRecommendation from "@/components/GearRecommendation";
import SeasonalPicks from "@/components/SeasonalPicks";

export default function Home() {
  const [query, setQuery] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const m of unified) map[m.state] = (map[m.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(
    () => stateList
      .map((s) => ({ ...s, count: stateCounts[s.code] || 0 }))
      .filter((s) => s.count > 0)
      .sort((a, b) => b.count - a.count),
    [stateCounts]
  );

  const [expanded, setExpanded] = useState(false);
  const showToggle = statesWithCounts.length > 15;

  const topCities = useMemo(() => {
    return [...(cityPages as Array<{ city: string; citySlug: string; count: number; stateSlug: string; stateName: string; state: string }>)]
      .filter(c => c.count >= 2)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, []);

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

  const faqItems = [
    { q: "How much does a marina slip typically cost?", a: "Slip costs vary by region and amenities. Expect $50-150 per foot per year on the East Coast and Great Lakes, $80-300 per foot in high-demand areas (South Florida, Southern California, Pacific Northwest). Transient slips usually run $1.50-$5 per foot per night." },
    { q: "What's a transient slip and how do I book one?", a: "A transient slip is a short-term dock rental for boats traveling through. Most marinas accept reservations via phone or Dockwa, with same-day availability common at smaller marinas. Always confirm depth at the slip before arrival." },
    { q: "What amenities should I expect at a full-service marina?", a: "Full-service marinas typically include fuel dock, pump-out, restrooms and showers, on-site mechanic, ship store, and often a restaurant. Many also offer drystack storage, haul-out and yard services, and seasonal events. MarinaSeeker lists verified amenities per location." },
    { q: "Can I live aboard my boat at any marina?", a: "Liveaboard policies vary. Many marinas restrict liveaboards entirely, others permit them with limits or premium fees. Some municipalities regulate liveaboard density. Confirm in writing before signing — verbal permissions don't survive new ownership or management." },
    { q: "Is MarinaSeeker free to use?", a: "Yes, completely free. No login, no account, no paid tier. We're funded by display advertising and listing partnerships. Find your marina and go." },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "MarinaSeeker", url: "https://www.marinaseeker.com",
        description: `Find marinas across the United States. ${unified.length.toLocaleString()}+ marinas with GPS coordinates and amenities.`,
        potentialAction: { "@type": "SearchAction", target: "https://www.marinaseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "How to Choose a Marina: The Complete Guide",
        description: "Practical guide to evaluating marinas — slip costs, fee inclusions, liveaboard and drystack options, amenity priorities, and contract questions every boater should ask.",
        author: { "@type": "Organization", name: "MarinaSeeker Editorial", url: "https://www.marinaseeker.com" },
        publisher: { "@type": "Organization", name: "MarinaSeeker", url: "https://www.marinaseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.marinaseeker.com" },
        articleSection: "Boating",
        keywords: ["how to choose a marina", "marina slip costs", "transient slip", "liveaboard marina", "drystack storage", "marina amenities", "slip agreement"],
      }) }} />

      {/* HERO — Full-bleed dramatic */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-marina.jpg" alt={`Boats moored at a marina at golden hour — find ${unified.length.toLocaleString()}+ marinas across America on MarinaSeeker`} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,58,92,0.85) 0%, rgba(27,58,92,0.4) 50%, transparent 100%)' }} />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-8">
          <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">Marina Directory</p>
          <h1 className="font-[Cabin] text-5xl md:text-7xl font-bold text-white leading-tight">Every Marina in America</h1>
          <p className="text-white/80 mt-4 max-w-lg mx-auto text-lg">{unified.length.toLocaleString()}+ marinas across {statesWithCounts.filter(s => s.count > 0).length} states. Find your slip.</p>

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

          <div className="flex justify-center mt-4">
            <NearMeButton label="Find Marinas Near Me" color="#C4924B" />
          </div>

          <div className="flex gap-2 justify-center mt-4 flex-wrap max-w-2xl mx-auto">
            {statesWithCounts.slice(0, 6).map((s) => (
              <Link key={s.code} href={`/${s.slug}`} className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2 rounded-lg transition text-xs backdrop-blur-sm border border-white/10">{s.name} ({s.count})</Link>
            ))}
          </div>
        </div>

        {/* Hero footer: seasonal accent strip + integrated stats bar */}
        <div className="relative z-10 w-full mt-auto">
          <div className="bg-[#C4924B]/90 backdrop-blur-sm py-2.5 text-center">
            <Link href={(() => { const m = new Date().getMonth(); if (m >= 2 && m <= 4) return "/blog/marina-checklist"; if (m >= 5 && m <= 7) return "/blog/marina-amenities-checklist"; if (m >= 8 && m <= 10) return "/blog/seasonal-vs-annual-slip-rental"; return "/blog/winter-boat-storage-at-marinas"; })()} className="text-white font-bold text-sm hover:underline transition">
              {(() => { const m = new Date().getMonth(); if (m >= 2 && m <= 4) return "⛵ Spring Launch Season: Find Your Marina →"; if (m >= 5 && m <= 7) return "🌊 Peak Boating Season: Compare Marinas →"; if (m >= 8 && m <= 10) return "⚓ Fall Boating: Last Calls of the Season →"; return "❄️ Winterize Your Boat: Find Storage →"; })()}
            </Link>
          </div>
          <div className="bg-[#1B3A5C]/85 backdrop-blur-sm border-t border-white/10 py-6">
            <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              {[{ value: unified.length.toLocaleString(), label: "Marinas" }, { value: "27,700+", label: "Boat Ramps" }, { value: "35,000+", label: "Fishing Piers" }, { value: "51", label: "States" }].map((s) => (
                <div key={s.label}><p className="font-[Cabin] text-3xl md:text-4xl font-bold text-white">{s.value}</p><p className="text-white/50 text-xs uppercase tracking-wider mt-1">{s.label}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YOUR COMPLETE BOATING HUB */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-[28px] md:text-[36px] font-extrabold text-[#1A1A1A] text-center mb-3">Your Complete Boating Hub</h2>
        <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">Marinas, boat ramps, and fishing piers &mdash; everything you need on the water.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link href="#browse-states" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #EFF6FF, #BFDBFE)', border: '2px solid rgba(27,58,92,0.2)' }}>
            <span className="text-5xl block mb-3">&#9875;</span>
            <h3 className="font-[Cabin] font-extrabold text-[#1A1A1A] text-xl mb-1">Marinas</h3>
            <p className="font-extrabold text-[28px] text-[#1B3A5C] leading-none mb-2">{unified.length.toLocaleString()}</p>
            <p className="text-gray-500 text-xs mb-4">Slips, fuel, repair, and docking across the US.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #2D5F8A, #1B3A5C)', boxShadow: '0 4px 12px rgba(27,58,92,0.25)' }}>Find a Marina &rarr;</span>
          </Link>
          <a href="https://rampseeker.com" target="_blank" rel="noopener noreferrer" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #F0FFF4, #C6F6D5)', border: '2px solid rgba(45,106,79,0.2)' }}>
            <span className="text-5xl block mb-3">&#9981;</span>
            <h3 className="font-[Cabin] font-extrabold text-[#1A1A1A] text-xl mb-1">Boat Ramps</h3>
            <p className="font-extrabold text-[28px] text-[#2D6A4F] leading-none mb-2">27,700+</p>
            <p className="text-gray-500 text-xs mb-4">Public launch sites with GPS and directions.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #40916C, #2D6A4F)', boxShadow: '0 4px 12px rgba(45,106,79,0.25)' }}>Find a Ramp &rarr;</span>
          </a>
          <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #FFF7ED, #FDE68A)', border: '2px solid rgba(196,146,75,0.2)' }}>
            <span className="text-5xl block mb-3">&#127907;</span>
            <h3 className="font-[Cabin] font-extrabold text-[#1A1A1A] text-xl mb-1">Fishing Piers</h3>
            <p className="font-extrabold text-[28px] text-[#C4924B] leading-none mb-2">35,000+</p>
            <p className="text-gray-500 text-xs mb-4">Public piers, jetties, and shore fishing spots.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #D4A84B, #C4924B)', boxShadow: '0 4px 12px rgba(196,146,75,0.25)' }}>Find a Pier &rarr;</span>
          </a>
        </div>
      </section>

      {/* ARTICLE HEADER */}
      <article id="marina-guide" className="max-w-3xl mx-auto px-4 pt-12 pb-8">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">How to Choose a Marina: The Complete Guide</h1>
        <div className="text-gray-700 leading-relaxed space-y-5">
          <p>Choosing a marina is one of the most consequential decisions a boat owner makes. The right marina is your second home &mdash; somewhere you can leave your boat with confidence, fuel up without a 30-minute wait, get repairs from a mechanic who knows your engine, and tie up next to people who become friends. The wrong marina is a recurring headache: dock space that floods at high tide, a fuel dock that&apos;s always closed, a slip neighbor who plays music until midnight, and a yard manager who can&apos;t find your boat.</p>
          <p>MarinaSeeker indexes marinas across the U.S. coastline, the Great Lakes, and major inland waterways &mdash; covering everything from full-service marinas with restaurants and ship stores to bare-bones county-run facilities with a fuel dock and a pump-out. We track slip availability signals, transient policies, fuel and pump-out access, hauling capacity, and the amenity details that matter to liveaboards, weekend cruisers, and first-time slip renters.</p>
          <p>Below is MarinaSeeker&apos;s directory of marinas organized by state. Continue reading below the directory for the complete guide to evaluating slip costs and contracts, understanding what&apos;s included (and what&apos;s not), reading marina reviews critically, and the questions every boater should ask before signing a slip agreement.</p>
        </div>
      </article>

      {/* BROWSE BY STATE */}
      <section id="browse-states" className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-6">Browse by State</h2>
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 ${showToggle ? "mb-6" : "mb-0"}`}>
          {statesWithCounts.map((s, index) => {
            const hideThis = !expanded && index >= 15;
            return (
              <Link key={s.code} href={`/${s.slug}`} className={`group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#1B3A5C] hover:shadow-sm transition${hideThis ? " hidden" : ""}`}>
                <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#1B3A5C] transition">{s.name}</p>
                <p className="text-gray-400 text-xs">{s.count} marina{s.count !== 1 ? "s" : ""}</p>
              </Link>
            );
          })}
        </div>
        {showToggle && (
          <div className="text-center">
            <button onClick={() => setExpanded(!expanded)} className="text-[#1B3A5C] hover:text-[#C4924B] font-semibold text-sm transition">
              {expanded ? "Show fewer ↑" : `Show all ${statesWithCounts.length} states ↓`}
            </button>
          </div>
        )}
      </section>

      {/* ARTICLE CONTINUATION */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="border-t border-[#1B3A5C]/30 pt-6 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-[Cabin]">Complete Guide Continues</p>
        </div>
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-2 mb-3">Why Choosing the Right Marina Matters</h2>
          <p>Marina selection is one of the most expensive decisions in boat ownership. A standard slip in a mid-tier East Coast marina runs $3,000 to $6,000 a year. South Florida, Southern California, and the Pacific Northwest can push that to $10,000 or more for a 30-foot slip. Over a decade of ownership, the cumulative cost difference between two marinas a mile apart can exceed the purchase price of the boat itself.</p>
          <p>But cost is just the start. The right marina is convenient to your home, has a fuel dock that&apos;s actually open when you need it, employs mechanics who know your engine, and houses a community of boaters you actually want to spend Saturday afternoons with. The wrong marina is a chronic headache &mdash; slip neighbors who run generators at 3am, an absentee yard manager, sketchy security, and a fuel pricing scheme that quietly costs you a thousand dollars a season. Picking right matters more than picking the boat itself for a lot of owners. Get the marina wrong and you&apos;ll resent the boat by year two.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Understanding Slip Costs: Annual, Monthly, Transient</h2>
          <p>Annual slip rentals are almost always the best per-foot rate, typically priced at $50 to $150 per linear foot per year on the East Coast and Great Lakes, $80 to $300 per foot in high-demand markets. The trade-off is a 12-month commitment, often with a security deposit and limited refund if you sell the boat or change marinas mid-year.</p>
          <p>Monthly rates run 20 to 40 percent higher than annual on a per-foot basis, but the flexibility matters if you&apos;re new to the marina or boat. Many owners sign monthly for a season before committing annually &mdash; it lets you evaluate the marina in real conditions before locking in.</p>
          <p>Transient slips serve traveling boaters and run $1.50 to $5+ per foot per night. Reservations are mandatory at popular destinations during summer; a few smaller marinas still take walk-up dockage if space is open. Dockwa and SnagASlip are the standard reservation platforms now, replacing phone calls at most full-service marinas. Always confirm what fees are in addition to the slip rate. Electric, water, internet, pump-out, and parking are common adders.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">What&apos;s Included in Slip Fees (and What&apos;s Almost Never Included)</h2>
          <p>Most slip contracts include the dock space itself, water hookup at the slip, basic 24-hour security (gate, cameras, sometimes a watchman), and access to common amenities &mdash; restrooms, showers, parking. Anything beyond that is usually billed separately or sold as an add-on package.</p>
          <p>Electric is almost always metered or flat-rate billed separately. Expect $30 to $150 per month depending on amperage (30A vs. 50A) and how much shore power you draw. Pump-out service is usually free at full-service marinas but billed per use at smaller facilities. Internet and TV are sometimes free, often $20-50 a month. Dinghy storage on a rack costs $100-300 a year. Trailer storage in the lot is usually billed seasonally.</p>
          <p>Read the contract before signing. Marinas that bury fees in the fine print (winter haul-out at &quot;winter rates&quot; that double the slip cost, mandatory shrink-wrap surcharges, late payment penalties) often do this consistently across customers. Ask the dockmaster directly: what do most boats my size pay total per year, including everything? An honest answer, given quickly, is itself a useful signal.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Liveaboard, Drystack, and Long-Term Storage Options</h2>
          <p>Liveaboard policies are the most-misunderstood part of marina selection. Many marinas restrict liveaboards entirely, often because of municipal regulations on residential density or sewage. Others permit them with limits &mdash; for example, &quot;up to 20 percent of slips can be liveaboards&quot; &mdash; and charge a $200 to $500 monthly premium. A few marinas openly cater to liveaboards with full-time hookups, mail service, and parking. Confirm liveaboard status in writing before signing; verbal permissions don&apos;t survive a change in management.</p>
          <p>Drystack storage (indoor rack storage with valet launch) is increasingly the default for power boats under 35 feet in coastal markets. Annual costs typically run between wet-slip and dry-trailer storage, but the boat stays out of the water &mdash; extending hull life and reducing maintenance. Most drystacks launch on a few hours&apos; notice during business hours; advance scheduling is required during peak season weekends.</p>
          <p>Wet slip with off-season haul-out is the cheapest annual setup in cold-climate states. The boat lives in the slip from May to October and on the hard from November to April. Verify what the haul-out, winterization, and shrink-wrap costs total &mdash; they add up to $1,000 to $3,000 in most yards.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Marina Amenities That Actually Matter</h2>
          <p>Restaurants and pools are nice. Reliable mechanics and a working pump-out are critical. Optimize for the second category first.</p>
          <p>A good fuel dock is open the hours its hours say it&apos;s open. Fuel pricing should be within 20 cents of the area average &mdash; significantly higher means the marina is using fuel as a profit center. Pump-out should be free or low-cost and actually working most days. Restrooms and showers should be cleaned daily during the season. Trash dumpsters should be unlocked during business hours, not so full they overflow.</p>
          <p>On-site mechanic with manufacturer training (Yamaha, Mercury, Volvo Penta) saves you from trailering to an outside shop every time something breaks. Verify certifications during the marina tour; the mechanic should be willing to talk about what they specialize in. A working ladder at every slip &mdash; not just at the corner &mdash; matters when you fall in or need to come back aboard from the water. Ice machines, ship stores, and laundry facilities round out the practical list. Restaurants and pools are pleasant but should never be the primary reason you pick a marina.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Questions to Ask Before Signing a Slip Agreement</h2>
          <p>Most marinas will rent you a slip without telling you the things you actually need to know. Ask directly. The answers, and how they&apos;re delivered, reveal management quality.</p>
          <p>What&apos;s the no-fault termination clause if I sell the boat or move? Standard answer: 30 days notice, prorated refund. Anything worse is worth questioning. What&apos;s the storm or hurricane policy? Coastal marinas should have a written plan covering storm-watch protocols, mandatory haul-out triggers, and liability allocation. Verbal answers are not enforceable when the storm comes.</p>
          <p>Are there liveaboard fees if I overnight occasionally? Most marinas allow 1-3 nights a week as &quot;guest stays&quot; without triggering liveaboard pricing &mdash; confirm the threshold. What&apos;s the fuel discount for slip holders? Most full-service marinas offer 5-15 cents off pump price; if there&apos;s no discount, you&apos;re effectively paying retail at your home marina.</p>
          <p>What&apos;s the policy on guests, pets, dinghies tied to your slip, working on your own boat in the slip vs. having to use the yard? These vary widely and matter daily once you&apos;re using the marina. A dockmaster who answers them directly is signaling that the place runs on clear rules &mdash; that&apos;s exactly the marina you want.</p>
        </div>
      </article>

      {/* POPULAR CITIES */}
      {topCities.length > 0 && (
        <section className="py-10" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFB 100%)' }}>
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A]">Popular Marina Cities</h2>
                <p className="text-gray-400 text-sm">Cities with the most marinas on MarinaSeeker.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {topCities.map((c) => (
                <Link key={`${c.stateSlug}-${c.citySlug}`} href={`/cities/${c.stateSlug}-${c.citySlug}`} className="group bg-white rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-[#C4924B]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition text-sm">{c.city}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold bg-[#1B3A5C]/10 text-[#1B3A5C] px-2 py-0.5 rounded">{c.count} marinas</span>
                    <span className="text-gray-400 text-xs">&middot; {c.stateName}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* SEASONAL PICKS (rotates by month) */}
      <section className="max-w-5xl mx-auto px-4 py-2">
        <SeasonalPicks />
      </section>

      {/* ESSENTIAL GEAR SECTIONS */}
      <section className="max-w-5xl mx-auto px-4 py-2">
        <GearRecommendation section="dock-essentials" />
        <GearRecommendation section="maintenance" />
        <GearRecommendation section="comfort" />
      </section>

      {/* GEAR UP FOR THE MARINA */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1E33 0%, #1B3A5C 60%, #2D6A4F 100%)" }}>
          <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Gear Up for the Marina &#128674;</h3>
              <p className="text-white/80 text-sm max-w-md">Top-rated marina and docking gear for every boater.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "https://www.amazon.com/dp/B001GQ2A6O?tag=babymydog03-20", label: "Dock Lines" },
                { href: "https://www.amazon.com/dp/B000ALQ7VO?tag=babymydog03-20", label: "Boat Fenders" },
                { href: "https://www.amazon.com/dp/B00K59MPMW?tag=babymydog03-20", label: "Marine Battery" },
                { href: "https://www.amazon.com/dp/B0084V43ZE?tag=babymydog03-20", label: "Dock Step" },
              ].map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-2 rounded-lg transition">{p.label}</a>
              ))}
              <a href="https://www.amazon.com/dp/B01DO8B7RK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="bg-white text-[#1B3A5C] font-bold text-xs px-4 py-2 rounded-lg hover:shadow-lg transition">Boat Covers &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* BOAT INSURANCE CTA */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-[#FAF8F5] border-2 border-[#C4924B] rounded-2xl p-6 md:p-8 text-center">
          <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-2">Protect Your Investment &#9973;</h3>
          <p className="text-gray-500 text-sm mb-4 max-w-lg mx-auto">Boat insurance protects against theft, storm damage, and liability. Compare plans from top marine insurance providers.</p>
          <span className="inline-block bg-[#C4924B] text-white font-bold text-sm px-6 py-3 rounded-xl cursor-default opacity-75">Compare Boat Insurance Plans &mdash; Coming Soon</span>
          <p className="text-gray-400 text-xs mt-3">Affiliate partnerships with BoatUS, Progressive Marine &amp; Geico Boat in progress.</p>
        </div>
      </section>

      {/* BLOG */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A]">Boating Tips &amp; Guides</h2>
          <Link href="/blog" className="text-sm font-semibold text-[#C4924B] hover:text-[#b5833e] transition">All posts &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { slug: "what-to-look-for-choosing-marina", title: "What to Look for When Choosing a Marina", category: "Guide", gradient: "linear-gradient(135deg, #1B3A5C 0%, #0D9488 100%)" },
            { slug: "marina-etiquette", title: "Marina Etiquette: Be a Good Neighbor at the Dock", category: "Tips", gradient: "linear-gradient(135deg, #C4924B 0%, #E8B87C 100%)" },
            { slug: "seasonal-vs-annual-slip-rental", title: "Seasonal vs Annual Slip Rental: Which Is Better?", category: "Guide", gradient: "linear-gradient(135deg, #0B1E33 0%, #1B3A5C 100%)" },
          ].map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="aspect-[16/9] flex items-center justify-center" style={{ background: p.gradient }}>
                <span className="text-white/30 text-4xl font-bold font-[Cabin]">{p.category}</span>
              </div>
              <div className="p-4">
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition text-sm">{p.title}</h3>
                <span className="text-[#C4924B] text-xs font-semibold mt-2 inline-block">Read More &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="py-16" style={{ background: "#1B3A5C" }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-white mb-2">Get Marina Updates &#9973;</h2>
          <p className="text-white/70 text-sm mb-6">Slip availability, fuel prices, new marinas, and seasonal updates &mdash; delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-[#C4924B] transition" />
            <button className="bg-[#C4924B] hover:bg-[#b5833e] text-white font-bold px-7 py-3.5 rounded-xl transition text-sm whitespace-nowrap">Subscribe Free</button>
          </div>
          <p className="text-white/30 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#1B3A5C] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>

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
