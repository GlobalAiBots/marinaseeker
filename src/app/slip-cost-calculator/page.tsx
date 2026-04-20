"use client";

import { useState } from "react";
import Link from "next/link";

const stateRates: Record<string, { low: number; high: number; label: string }> = {
  AL: { low: 8, high: 15, label: "Alabama" },
  AK: { low: 12, high: 25, label: "Alaska" },
  CA: { low: 20, high: 40, label: "California" },
  CT: { low: 25, high: 50, label: "Connecticut" },
  DE: { low: 12, high: 22, label: "Delaware" },
  FL: { low: 15, high: 25, label: "Florida" },
  GA: { low: 10, high: 18, label: "Georgia" },
  HI: { low: 18, high: 35, label: "Hawaii" },
  IL: { low: 10, high: 20, label: "Illinois" },
  IN: { low: 8, high: 15, label: "Indiana" },
  LA: { low: 8, high: 18, label: "Louisiana" },
  ME: { low: 18, high: 35, label: "Maine" },
  MD: { low: 15, high: 30, label: "Maryland" },
  MA: { low: 25, high: 50, label: "Massachusetts" },
  MI: { low: 10, high: 22, label: "Michigan" },
  MN: { low: 8, high: 18, label: "Minnesota" },
  MS: { low: 8, high: 15, label: "Mississippi" },
  NH: { low: 20, high: 40, label: "New Hampshire" },
  NJ: { low: 20, high: 45, label: "New Jersey" },
  NY: { low: 25, high: 55, label: "New York" },
  NC: { low: 10, high: 20, label: "North Carolina" },
  OH: { low: 8, high: 18, label: "Ohio" },
  OR: { low: 12, high: 25, label: "Oregon" },
  PA: { low: 10, high: 20, label: "Pennsylvania" },
  RI: { low: 22, high: 45, label: "Rhode Island" },
  SC: { low: 10, high: 18, label: "South Carolina" },
  TN: { low: 6, high: 14, label: "Tennessee" },
  TX: { low: 10, high: 20, label: "Texas" },
  VA: { low: 12, high: 25, label: "Virginia" },
  WA: { low: 15, high: 30, label: "Washington" },
  WI: { low: 8, high: 18, label: "Wisconsin" },
};

const boatLengths = [20, 25, 30, 35, 40, 45, 50];
const slipTypes: { value: string; label: string; multiplier: number }[] = [
  { value: "wet", label: "Wet Slip", multiplier: 1.0 },
  { value: "dry", label: "Dry Stack", multiplier: 0.75 },
  { value: "mooring", label: "Mooring", multiplier: 0.5 },
];

export default function SlipCostCalculator() {
  const [state, setState] = useState("");
  const [length, setLength] = useState(30);
  const [slipType, setSlipType] = useState("wet");
  const [duration, setDuration] = useState<"monthly" | "annual">("monthly");

  const rate = stateRates[state];
  const typeMultiplier = slipTypes.find(t => t.value === slipType)?.multiplier || 1;
  const annualDiscount = duration === "annual" ? 0.85 : 1;

  const lowMonthly = rate ? Math.round(rate.low * length * typeMultiplier * annualDiscount) : 0;
  const highMonthly = rate ? Math.round(rate.high * length * typeMultiplier * annualDiscount) : 0;
  const lowAnnual = lowMonthly * 12;
  const highAnnual = highMonthly * 12;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.marinaseeker.com" },
          { "@type": "ListItem", position: 2, name: "Slip Cost Calculator", item: "https://www.marinaseeker.com/slip-cost-calculator" },
        ]},
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
          { "@type": "Question", name: "How much does a marina slip cost?", acceptedAnswer: { "@type": "Answer", text: "Marina slip costs vary widely by location, boat size, and slip type. Expect $8-55 per foot per month. A 30-foot boat in Florida costs roughly $450-750/month, while the same boat in New York could be $750-1,650/month. Annual contracts typically save 10-15%." } },
          { "@type": "Question", name: "Is dry stack storage cheaper than a wet slip?", acceptedAnswer: { "@type": "Answer", text: "Yes, dry stack storage is typically 20-25% cheaper than a wet slip. Your boat is stored on racks in a covered building and launched by forklift when you want to use it. Benefits include less hull fouling, protection from storms, and lower maintenance costs." } },
          { "@type": "Question", name: "What's included in marina slip fees?", acceptedAnswer: { "@type": "Answer", text: "Basic slip fees typically include the slip itself, water access, and basic dock infrastructure. Electric hookup, pump-out, WiFi, parking, and amenities like showers and laundry are sometimes extra. Always ask what's included before signing a contract." } },
        ]},
      ]) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Slip Cost Calculator</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3 leading-tight">How Much Does a Marina Slip Cost?</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">Get an estimated monthly and annual cost for marina dockage based on your state, boat size, and slip type.</p>

      {/* Calculator */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 mb-10" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A1A] text-sm outline-none focus:border-[#1B3A5C] transition bg-white">
              <option value="">Select a state...</option>
              {Object.entries(stateRates).sort((a, b) => a[1].label.localeCompare(b[1].label)).map(([code, s]) => (
                <option key={code} value={code}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Boat Length</label>
            <select value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A1A] text-sm outline-none focus:border-[#1B3A5C] transition bg-white">
              {boatLengths.map((l) => (
                <option key={l} value={l}>{l === 50 ? "50+ ft" : `${l} ft`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Slip Type</label>
            <div className="flex gap-2">
              {slipTypes.map((t) => (
                <button key={t.value} onClick={() => setSlipType(t.value)} className={`flex-1 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${slipType === t.value ? "bg-[#1B3A5C] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{t.label}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Duration</label>
            <div className="flex gap-2">
              <button onClick={() => setDuration("monthly")} className={`flex-1 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${duration === "monthly" ? "bg-[#1B3A5C] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>Monthly</button>
              <button onClick={() => setDuration("annual")} className={`flex-1 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${duration === "annual" ? "bg-[#1B3A5C] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>Annual <span className="text-[10px] opacity-75">(-15%)</span></button>
            </div>
          </div>
        </div>

        {/* Results */}
        {state && rate ? (
          <div className="bg-[#F0F7FF] rounded-xl p-6 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Estimated Cost for a {length}ft {slipTypes.find(t => t.value === slipType)?.label} in {rate.label}</p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <p className="text-[40px] md:text-[48px] font-extrabold text-[#1B3A5C] leading-none">${lowMonthly.toLocaleString()}</p>
              <span className="text-gray-400 text-2xl">–</span>
              <p className="text-[40px] md:text-[48px] font-extrabold text-[#1B3A5C] leading-none">${highMonthly.toLocaleString()}</p>
            </div>
            <p className="text-gray-500 text-sm">per month {duration === "annual" ? "(annual contract)" : ""}</p>
            <div className="mt-4 pt-4 border-t border-[#1B3A5C]/10">
              <p className="text-gray-400 text-xs">Annual total: <strong className="text-[#1A1A1A]">${lowAnnual.toLocaleString()} – ${highAnnual.toLocaleString()}</strong></p>
              <p className="text-gray-400 text-xs mt-1">Rate: ${rate.low}–${rate.high}/ft/month {slipType !== "wet" ? `(${slipTypes.find(t => t.value === slipType)?.label} adjusted)` : ""}</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Select a state to see estimated costs</p>
          </div>
        )}
      </div>

      {/* Context */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">What Affects Marina Slip Costs?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div><strong className="text-[#1A1A1A]">Location.</strong> Coastal metros (NYC, Miami, San Diego) cost 2-3x more than rural or inland marinas.</div>
          <div><strong className="text-[#1A1A1A]">Boat size.</strong> Marinas charge per foot. A 40ft boat costs roughly 33% more than a 30ft boat.</div>
          <div><strong className="text-[#1A1A1A]">Slip type.</strong> Wet slips cost most. Dry stacks save 20-25%. Moorings save up to 50%.</div>
          <div><strong className="text-[#1A1A1A]">Season.</strong> Summer rates are higher in the Northeast. Florida rates are highest in winter.</div>
          <div><strong className="text-[#1A1A1A]">Amenities.</strong> Full-service marinas with fuel, pump-out, WiFi, pool, and restaurant charge premium rates.</div>
          <div><strong className="text-[#1A1A1A]">Contract length.</strong> Annual contracts save 10-15% vs monthly rates. Some marinas require annual minimum.</div>
        </div>
      </div>

      <div className="bg-[#C4924B]/5 border border-[#C4924B]/15 rounded-xl p-5 mb-8">
        <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">Tips for Saving on Marina Costs</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-[#C4924B] font-bold">&#10003;</span> Sign an annual contract &mdash; most marinas offer 10-15% discounts.</li>
          <li className="flex items-start gap-2"><span className="text-[#C4924B] font-bold">&#10003;</span> Consider dry stack storage &mdash; cheaper, less maintenance, protected from storms.</li>
          <li className="flex items-start gap-2"><span className="text-[#C4924B] font-bold">&#10003;</span> Look for municipal marinas &mdash; city-run facilities are often 30-50% cheaper than private.</li>
          <li className="flex items-start gap-2"><span className="text-[#C4924B] font-bold">&#10003;</span> Join a yacht club &mdash; some offer reciprocal docking privileges at hundreds of marinas.</li>
          <li className="flex items-start gap-2"><span className="text-[#C4924B] font-bold">&#10003;</span> Use a mooring &mdash; cheapest option if you&apos;re comfortable dinghying to your boat.</li>
        </ul>
      </div>

      {/* FAQ */}
      <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2 mb-10">
        {[
          { q: "How much does a marina slip cost?", a: "Marina slip costs range from $8-55 per foot per month depending on location. A 30-foot boat in Florida costs roughly $450-750/month, while the same boat in New York could be $750-1,650/month." },
          { q: "Is dry stack cheaper than a wet slip?", a: "Yes, dry stack storage is typically 20-25% cheaper. Your boat is stored on racks and launched by forklift. Benefits include less hull maintenance and storm protection." },
          { q: "What's included in marina slip fees?", a: "Basic fees include the slip, water, and dock access. Electric, pump-out, WiFi, and amenities may cost extra. Always ask before signing." },
        ].map((f, i) => (
          <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
            <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#1B3A5C] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
            <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>

      {/* Related */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/blog/marina-slip-costs" className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-[#1B3A5C] transition">
          <p className="font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition text-sm">Marina Slip Costs by State</p>
          <p className="text-gray-400 text-xs mt-1">Detailed state-by-state breakdown</p>
        </Link>
        <Link href="/blog/liveaboard-marinas" className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-[#1B3A5C] transition">
          <p className="font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition text-sm">Liveaboard Guide</p>
          <p className="text-gray-400 text-xs mt-1">Best marinas for living on your boat</p>
        </Link>
      </div>

      <p className="text-gray-300 text-xs mt-8 text-center">Estimates based on 2026 regional averages. Actual costs vary by marina. Contact marinas directly for current rates.</p>
    </div>
  );
}
