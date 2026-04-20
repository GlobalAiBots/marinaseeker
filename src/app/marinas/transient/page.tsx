import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Transient Dockage: Find Overnight Marina Slips Anywhere | MarinaSeeker",
  description: "Find transient marina slips for overnight or short-term stays. How much transient dockage costs, how to book, and what to expect when cruising.",
  openGraph: { title: "Transient Dockage: Find Overnight Marina Slips Anywhere", url: "https://www.marinaseeker.com/marinas/transient", siteName: "MarinaSeeker" },
  twitter: { card: "summary", title: "Transient Dockage: Find Overnight Marina Slips Anywhere | MarinaSeeker" },
  alternates: { canonical: "https://www.marinaseeker.com/marinas/transient" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.marinaseeker.com" },
    { "@type": "ListItem", position: 2, name: "Transient Dockage", item: "https://www.marinaseeker.com/marinas/transient" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does transient dockage cost?",
      acceptedAnswer: { "@type": "Answer", text: "Transient dockage typically runs $2 to $5 per foot per night across most of the United States, with higher rates of $4 to $8 per foot in premium markets like New York City, Miami, and the Florida Keys. Weekly rates are almost always discounted — many marinas charge the equivalent of 5 nights for a 7-night stay. Power and water are usually included; metered electric is sometimes billed separately." },
    },
    {
      "@type": "Question",
      name: "How do I reserve a transient slip?",
      acceptedAnswer: { "@type": "Answer", text: "The easiest options are booking apps like Dockwa and Snag-A-Slip, which let you search availability, reserve, and pay for transient slips at participating marinas. You can also call the marina directly, which is still the most reliable approach for smaller facilities that don't use the apps. For popular weekends and holiday cruising, book as far in advance as possible." },
    },
    {
      "@type": "Question",
      name: "What's the difference between transient and monthly dockage?",
      acceptedAnswer: { "@type": "Answer", text: "Transient dockage is a short-term rental — one night to a few weeks — at nightly or weekly rates, aimed at cruisers passing through. Monthly dockage is a longer-term lease at a lower per-day rate aimed at boaters who keep their boat at the same marina. Transient rates are roughly 3x to 5x higher per day than monthly rates, but transient slips are booked on demand rather than requiring a commitment." },
    },
  ],
};

export default function TransientDockagePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Transient Dockage</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">Transient Dockage: Find Overnight Marina Slips Anywhere</h1>
      <p className="text-gray-500 text-sm mb-10">Updated April 2026 &middot; 6 min read</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Transient dockage is what lets you actually go somewhere on your boat. Whether you&apos;re cruising the Intracoastal Waterway from Maine to Florida, working the Great Loop, or just spending a weekend in the next harbor over, transient slips are the hotel rooms of the water. This page covers how transient rates work, how to reserve a slip, what to expect when you arrive, and how to be the kind of transient boater marinas actually want to see come back.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">What Is Transient Dockage?</h2>
        <p>
          Transient dockage is a short-term slip rental at a marina, typically priced by the night or by the week. The guest list is cruisers passing through &mdash; boaters on a delivery, a weekend trip, a multi-week cruise, or a long-distance passage who need a place to tie up, rest, and resupply before moving on. Most marinas set aside a portion of their total slips specifically for transients, and some marinas are transient-only operations that don&apos;t offer monthly or annual dockage at all.
        </p>
        <p>
          The practical difference between transient and monthly dockage is flexibility versus cost. Transient rates are roughly 3x to 5x higher per day than monthly rates, but you&apos;re not committing to anything beyond the nights you book. That flexibility is exactly what you need when you&apos;re cruising.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">How Transient Rates Work</h2>
        <p>
          Transient dockage is almost always priced per foot per night, applied to your boat&apos;s LOA (length overall, including bow pulpits and swim platforms). The typical national range is $2 to $5 per foot per night, which works out to $60 to $150 per night for a 30-foot boat and $100 to $250 for a 50-footer. Premium markets push higher: New York City transient rates regularly exceed $5 to $8 per foot, and the Florida Keys during high season can hit similar numbers.
        </p>
        <p>
          Weekly rates are almost always discounted. A common structure is &ldquo;pay for five, stay for seven,&rdquo; which effectively gives you two free nights on a week-long stay. Monthly transient rates exist at some marinas and bridge the gap between nightly pricing and a true monthly lease. What&apos;s usually included in the transient rate: water at the slip, 30-amp shore power, and Wi-Fi. What&apos;s usually extra: 50-amp power (often a $10 to $20 per night upgrade), metered electricity at hotter destinations, pump-outs at some marinas, and laundry. Always ask what&apos;s included before confirming the reservation so there are no surprises at check-out.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">How to Book Transient Dockage</h2>
        <p>
          There are three ways most cruisers book transient slips:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Dockwa.</strong> The most widely used booking app in the US, Dockwa partners with thousands of marinas and lets you request a reservation, pay, and communicate with the dock master from your phone. Works especially well on the ICW, in New England, and on the Great Lakes.</li>
          <li><strong>Snag-A-Slip.</strong> A competing app with a similar model and a slightly different marina network. Worth installing alongside Dockwa to cover gaps in coverage.</li>
          <li><strong>Calling the marina directly.</strong> Still the most reliable method for smaller marinas, and often the fastest way to get a confirmed slip for a same-day arrival. VHF Channel 16 and 9 work in a pinch if you can&apos;t reach them by phone.</li>
        </ul>
        <p>
          For popular destinations and peak weekends &mdash; Fourth of July, Memorial Day, Labor Day, and most summer weekends in New England and the Great Lakes &mdash; book as far in advance as possible. Mid-season weekdays, by contrast, you can usually show up and find a slip with a phone call an hour ahead. For a deeper walk-through of the booking and check-in process, see our <Link href="/blog/transient-dockage-guide" className="text-[#1B3A5C] hover:underline font-semibold">transient dockage guide</Link>.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">What Transient Boaters Should Expect</h2>
        <p>
          A typical transient stay looks like this. Check-in is usually early afternoon, sometimes as early as noon and sometimes as late as 3 PM. You&apos;ll hail the dock master on VHF 16 or 9 as you approach and they&apos;ll direct you to your assigned slip and, ideally, meet you on the dock to catch lines. Check-out is typically 11 AM to noon, though many marinas are flexible if you ask.
        </p>
        <p>
          What you&apos;ll typically find at a transient-friendly marina: pump-out access (sometimes included, sometimes $5 to $15), a fuel dock for topping off before you leave, a ship&apos;s store stocked with enough provisions for a quick resupply, laundry machines, clean showers, and often a courtesy car or shuttle to the nearest grocery store. Higher-end facilities add restaurants on-site, pools, and concierge services. The good transient marinas know that cruisers talk, and they treat transients as well as they treat their monthly tenants.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Transient Dockage Etiquette</h2>
        <p>
          A few things that make you a welcome transient guest:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Arrive before dark.</strong> Plan your day so you&apos;re tied up by late afternoon. Arriving after dark in an unfamiliar harbor is hard on you, hard on the dock master, and hard on the boats around you.</li>
          <li><strong>Call the dock master on VHF 16 or 9.</strong> Switch to the marina&apos;s working channel, announce your approach, and confirm slip assignment before you enter the basin.</li>
          <li><strong>Respect quiet hours.</strong> Transient boaters have a reputation in some harbors for being louder than tenants. Don&apos;t contribute to it. Our <Link href="/blog/marina-etiquette" className="text-[#1B3A5C] hover:underline font-semibold">marina etiquette guide</Link> covers the full list.</li>
          <li><strong>Settle up before you leave.</strong> Pay any balance, pump out if needed, and let the dock master know when you&apos;re departing so they can allocate the slip for the next night.</li>
          <li><strong>Leave a good review.</strong> Marinas that work hard for transients deserve the visibility, and your review helps the next cruiser.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Regional Transient Scenes</h2>
        <p>
          Transient boating in the United States happens on four main &ldquo;highways&rdquo; &mdash; each with its own rhythm, favorite stops, and best cruising seasons.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>The Intracoastal Waterway.</strong> A 1,000-plus mile protected route from Maine to Florida, with transient marinas in nearly every coastal town. Spring and fall are the migration seasons as boats move south for winter and north for summer. ICW marinas book up well in advance during those windows.</li>
          <li><strong>The Great Loop.</strong> A roughly 6,000-mile circuit through the ICW, Great Lakes, and inland rivers. Loopers rely on transient dockage at every stop, and certain marinas have built reputations specifically as Looper-friendly facilities.</li>
          <li><strong>The Great Lakes.</strong> Summer cruising across Lake Michigan, Lake Huron, Lake Erie, and the North Channel. Short season &mdash; mid-June through early September &mdash; but deep networks of transient-friendly marinas in popular harbors.</li>
          <li><strong>The Pacific Northwest.</strong> Puget Sound, the San Juans, and up into British Columbia. Protected waters, cool summers, and a strong network of transient moorage. Many of the best cruising destinations here are state marine parks with mooring buoys and linear docks rather than traditional marinas.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">Frequently Asked Questions</h2>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">How much does transient dockage cost?</h3>
        <p>
          Transient dockage typically runs $2 to $5 per foot per night across most of the United States, with higher rates of $4 to $8 per foot in premium markets like New York City, Miami, and the Florida Keys. Weekly rates are almost always discounted &mdash; many marinas charge the equivalent of 5 nights for a 7-night stay. Power and water are usually included; metered electric is sometimes billed separately.
        </p>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">How do I reserve a transient slip?</h3>
        <p>
          The easiest options are booking apps like Dockwa and Snag-A-Slip, which let you search availability, reserve, and pay for transient slips at participating marinas. You can also call the marina directly, which is still the most reliable approach for smaller facilities that don&apos;t use the apps. For popular weekends and holiday cruising, book as far in advance as possible.
        </p>

        <h3 className="text-lg font-bold text-[#1A1A1A] mt-6 mb-2 font-[Cabin]">What&apos;s the difference between transient and monthly dockage?</h3>
        <p>
          Transient dockage is a short-term rental &mdash; one night to a few weeks &mdash; at nightly or weekly rates, aimed at cruisers passing through. Monthly dockage is a longer-term lease at a lower per-day rate aimed at boaters who keep their boat at the same marina. Transient rates are roughly 3x to 5x higher per day than monthly rates, but transient slips are booked on demand rather than requiring a commitment.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          Before your next trip, our <Link href="/blog/choosing-a-marina-checklist" className="text-[#1B3A5C] hover:underline font-semibold">choosing a marina checklist</Link> walks through what to look for when evaluating a transient stop.
        </p>

        <GearRecommendation section="dock-essentials" />

        <div className="mt-12 bg-[#FAF8F5] border border-gray-200 rounded-xl p-8 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Find Transient Marinas on Your Route</h2>
          <p className="text-gray-500 mb-6">Search our directory of marinas across America and filter by transient availability, amenities, and location.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="bg-[#C4924B] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition inline-block">Search Marinas</Link>
            <Link href="/slip-cost-calculator" className="bg-[#1B3A5C] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition inline-block">Slip Cost Calculator</Link>
          </div>
        </div>

        <p className="mt-8">
          Browse transient-friendly marinas by state: <Link href="/florida" className="text-[#1B3A5C] hover:underline font-semibold">Florida</Link>, <Link href="/michigan" className="text-[#1B3A5C] hover:underline font-semibold">Michigan</Link>, <Link href="/new-york" className="text-[#1B3A5C] hover:underline font-semibold">New York</Link>, <Link href="/massachusetts" className="text-[#1B3A5C] hover:underline font-semibold">Massachusetts</Link>, and <Link href="/california" className="text-[#1B3A5C] hover:underline font-semibold">California</Link>.
        </p>
      </div>
    </div>
  );
}
