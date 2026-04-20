"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-marinas";
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
        "@context": "https://schema.org", "@type": "WebSite", name: "MarinaSeeker", url: "https://www.marinaseeker.com",
        description: `Find marinas across the United States. ${unified.length.toLocaleString()}+ marinas with GPS coordinates and amenities.`,
        potentialAction: { "@type": "SearchAction", target: "https://www.marinaseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
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

          <div className="flex justify-center mt-4">
            <NearMeButton label="Find Marinas Near Me" color="#C4924B" />
          </div>

          <div className="flex gap-2 justify-center mt-4 flex-wrap max-w-2xl mx-auto">
            {statesWithCounts.slice(0, 6).map((s) => (
              <Link key={s.code} href={`/${s.slug}`} className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2 rounded-lg transition text-xs backdrop-blur-sm border border-white/10">{s.name} ({s.count})</Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center mt-12">
            {[{ value: unified.length.toLocaleString(), label: "Marinas" }, { value: "27,700+", label: "Boat Ramps" }, { value: "35,000+", label: "Fishing Piers" }, { value: "51", label: "States" }].map((s) => (
              <div key={s.label}><p className="font-[Cabin] text-3xl md:text-4xl font-bold text-white">{s.value}</p><p className="text-white/50 text-xs uppercase tracking-wider mt-1">{s.label}</p></div>
            ))}
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

      {/* BROWSE BY STATE */}
      <section id="browse-states" className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-6">Browse by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {statesWithCounts.filter(s => s.count > 0).map((s) => (
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
          mainEntity: [
            { "@type": "Question", name: "How many marinas does MarinaSeeker list?", acceptedAnswer: { "@type": "Answer", text: `MarinaSeeker lists ${unified.length.toLocaleString()}+ marinas across ${statesWithCounts.filter(s => s.count > 0).length} states with GPS coordinates, amenities, and contact details.` } },
            { "@type": "Question", name: "Is MarinaSeeker free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No login, no account, no fees. Just find your marina and go." } },
            { "@type": "Question", name: "How do I find a marina near me?", acceptedAnswer: { "@type": "Answer", text: "Click the 'Find Marinas Near Me' button or browse by state. MarinaSeeker will show the closest marinas with slip info, fuel, and amenities." } },
            { "@type": "Question", name: "How much does a boat slip cost?", acceptedAnswer: { "@type": "Answer", text: "Boat slip costs vary by location and size. Expect $200-$800/month for a standard slip. Contact individual marinas for current rates." } },
            { "@type": "Question", name: "Can I claim my marina listing?", acceptedAnswer: { "@type": "Answer", text: "Yes! If you own or manage a marina, visit our Claim page to update your amenities, contact info, and slip availability for free." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: `How many marinas does MarinaSeeker list?`, a: `MarinaSeeker lists ${unified.length.toLocaleString()}+ marinas across ${statesWithCounts.filter(s => s.count > 0).length} states with GPS coordinates, amenities, and contact details.` },
            { q: "Is MarinaSeeker free?", a: "Yes, completely free. No login, no account, no fees. Just find your marina and go." },
            { q: "How do I find a marina near me?", a: "Click the \"Find Marinas Near Me\" button or browse by state. MarinaSeeker will show the closest marinas with slip info, fuel, and amenities." },
            { q: "How much does a boat slip cost?", a: "Boat slip costs vary by location and size. Expect $200-$800/month for a standard slip. Contact individual marinas for current rates." },
            { q: "Can I claim my marina listing?", a: "Yes! If you own or manage a marina, visit our Claim page to update your amenities, contact info, and slip availability for free." },
          ].map((f, i) => (
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
