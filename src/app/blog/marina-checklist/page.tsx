import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marina Checklist: 10 Things to Inspect Before Signing a Lease | MarinaSeeker",
  description: "Before signing a marina slip lease, walk the docks and check these 10 items. Electrical condition, dock stability, security, fuel access, depth at low tide, and more.",
  openGraph: { title: "Marina Checklist: 10 Things to Inspect Before Signing a Lease", url: "https://marinaseeker.com/blog/marina-checklist", siteName: "MarinaSeeker" },
  twitter: { card: "summary", title: "Marina Checklist: 10 Things to Inspect Before Signing a Lease | MarinaSeeker" },
  alternates: { canonical: "https://marinaseeker.com/blog/marina-checklist" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Marina Checklist: 10 Things to Inspect Before Signing a Lease",
  datePublished: "2026-04-19",
  author: { "@type": "Organization", name: "MarinaSeeker" },
  publisher: { "@type": "Organization", name: "MarinaSeeker", url: "https://marinaseeker.com" },
};

export default function MarinaChecklist() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <Link href="/blog" className="hover:text-[#1B3A5C] transition">Blog</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Marina Checklist</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">Marina Checklist: 10 Things to Inspect Before Signing a Lease</h1>
      <p className="text-gray-400 text-sm mb-8">April 19, 2026 &middot; 9 min read</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Signing a marina slip lease is a bigger commitment than most boaters realize. You are agreeing to trust your vessel, sometimes for years, to a facility you may have only seen from the parking lot. Before you put pen to paper, spend a couple of hours walking the docks with a critical eye. The difference between a great marina and a mediocre one is often hidden in small details that are easy to miss during a sales pitch. Here are the ten things every boater should inspect before committing to a slip.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">1. Electrical Pedestal Condition</h2>
        <p>
          The power pedestal at your slip is a piece of infrastructure you will interact with every single day, and it is also one of the most common failure points in older marinas. Look for pedestals with clean, undamaged outlets, tight covers, and clear amperage labeling. Corroded receptacles, cracked housings, or exposed wiring are red flags that point to deferred maintenance across the facility.
        </p>
        <p>
          Ask whether pedestals have 30-amp, 50-amp, or both available, and confirm the power matches what your boat needs. Also ask about metered versus included electricity &mdash; some marinas bill usage separately, and a hot summer of running air conditioning can add hundreds of dollars to your monthly cost. A well-maintained marina will have breakers that trip cleanly, ground fault protection that actually works, and a clear process for reporting electrical issues.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">2. Dock Stability and Fasteners</h2>
        <p>
          Walk the full length of the dock you will be assigned to and pay attention to how it feels underfoot. Floating docks should flex slightly with your weight but not sway excessively. Fixed docks should feel solid, with no give at the pilings. Bounce on the dock boards and listen for rattles, squeaks, or sections that feel loose &mdash; those are signs that fasteners are failing or structural members are rotting.
        </p>
        <p>
          Inspect the cleats at your specific slip. They should be bolted through the dock, not lag-screwed into rotting wood. Check the condition of bull rails, pilings, and any wood that is in constant contact with water. A dock in poor repair is not just an inconvenience &mdash; it is a liability, and a storm can turn a weak dock into a hazard for every boat tied to it.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">3. Security Measures</h2>
        <p>
          Ask specific questions about security rather than accepting vague assurances. Does the marina have a gated entrance that actually locks, or is access essentially open? Are there cameras covering the docks, parking lot, and fuel area, and is the footage retained for a meaningful period? Is there a night watchman, or does the marina rely entirely on electronic monitoring?
        </p>
        <p>
          Look for lighting coverage along the docks after dark &mdash; a walkthrough at night tells you more than any marketing brochure. Theft from boats is a real problem at marinas with weak security, and the losses can range from outboard motors and electronics to the entire vessel. Confirm what the marina&apos;s responsibility is if something is stolen or vandalized, and check whether your own insurance policy requires specific security features.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">4. Fuel Dock Proximity and Pricing</h2>
        <p>
          Having a fuel dock on-site is a major convenience, especially if you run a larger vessel or use your boat frequently. Check the posted fuel prices and compare them to nearby fuel docks and gas stations. Some marinas price fuel aggressively as a loyalty benefit for slip holders, while others charge a premium that adds up quickly over a season.
        </p>
        <p>
          If the marina does not have its own fuel dock, find out how far you have to travel to fuel up. An extra 20-minute detour each way before every trip gets old fast, and it can change the economics of your boating. Also ask about ethanol-free gas availability if your engine requires it &mdash; not every fuel dock offers it, and running the wrong fuel in a sensitive outboard can cause expensive damage.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">5. Pump-Out Station Availability</h2>
        <p>
          Any marina that hosts boats with holding tanks should offer a functional pump-out station, and many states require it by law. Locate the pump-out before you sign and check whether it is free for slip holders or billed per use. Ask how often it is serviced and what happens when it breaks down &mdash; a pump-out that has been out of commission for six months is a strong signal that the marina does not take environmental compliance seriously.
        </p>
        <p>
          If the pump-out is located far from your slip, factor in the hassle of repositioning your boat each time you need to use it. Some marinas offer mobile pump-out service where a staff member brings the equipment to your slip for a fee, which is a huge convenience for liveaboards and frequent users.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">6. Depth at Low Tide</h2>
        <p>
          Charted depths and slip depths are not always the same thing. Marinas silt in over time, and the number on the brochure may reflect conditions from a dredging that happened five years ago. Ask to see the marina at dead low tide, or better yet, check the depth at your specific slip with a sounding pole during the lowest tide of the month.
        </p>
        <p>
          Your boat needs meaningful clearance beneath the keel at low water &mdash; not just enough to float, but enough to remain safely afloat if a strong wind blows the water out of the basin. Running aground repeatedly at your own slip damages your hull, strains your running gear, and destroys any resale value on the boat. When was the marina last dredged, and is there a dredging schedule? These are questions you should ask before signing.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">7. Fetch and Wake Exposure</h2>
        <p>
          Fetch is the distance across open water that wind can travel before reaching your boat, and it determines how rough the marina gets in bad weather. A marina tucked into a protected cove behaves very differently from one facing a long stretch of open bay. Ask current slip holders about how the marina feels during summer thunderstorms or sustained wind events, and look at the orientation of the slips relative to prevailing winds.
        </p>
        <p>
          Wake exposure from passing boat traffic is the other half of this equation. Marinas located near busy channels or waterways with heavy commercial traffic can experience near-constant rocking, even on calm days. That takes a toll on dock lines, fenders, and your boat&apos;s systems over time. Visit on a weekend afternoon to see what the traffic actually looks like before you commit.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">8. Hurricane and Storm Plan</h2>
        <p>
          Every marina in a hurricane-prone region should have a written storm plan, and every slip holder should understand what it requires of them. Ask for a copy of the plan before signing. Some marinas mandate that all boats leave the facility when a hurricane warning is issued. Others allow you to stay but require specific line configurations, additional fenders, and sometimes stripping of canvas and sails.
        </p>
        <p>
          Find out whether the marina offers haul-out services, whether space is reserved for slip holders, and how the queue works when a storm is approaching. A marina with no plan and no dry storage is essentially telling you that your boat is on its own when the weather turns bad. That may be acceptable in some regions, but it should be a conscious decision, not a surprise.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">9. WiFi, Trash, and Restroom Amenities</h2>
        <p>
          The quality of amenities is a strong proxy for how the marina is managed overall. Test the WiFi at your slip &mdash; not in the clubhouse, where the signal is always strong. Look at the restrooms and showers. Are they clean, well-lit, and properly supplied? Or do they look like they have not been cleaned in weeks? Check the trash and recycling situation. Overflowing dumpsters attract vermin and create unpleasant odors that carry across the entire marina.
        </p>
        <p>
          Ask about laundry facilities, ice availability, a ship store, courtesy carts for hauling gear to your boat, and any other amenities you rely on. These features are worth real money when you use them frequently, and their absence &mdash; or worse, their presence-but-broken status &mdash; is a quality-of-life issue you will face every single visit.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">10. Lease Terms and Hidden Fees</h2>
        <p>
          Finally, read the lease carefully before you sign. Look beyond the headline slip fee for automatic annual escalators, pass-through charges for utilities, mandatory liability insurance minimums, pet deposits, guest fees, live-aboard surcharges, and early-termination penalties. A slip that looked like a bargain can turn into the most expensive option on the water once the add-ons are included.
        </p>
        <p>
          Ask whether the lease is annual or month-to-month, whether it auto-renews, and how far in advance you need to give notice to cancel. Understand what happens to your prepaid fees if you need to leave mid-term. The best marinas are transparent about costs and flexible with their policies &mdash; if you are getting evasive answers to straightforward questions, that is a signal to walk away.
        </p>

        <p>
          A marina slip is a long-term relationship, and the worst time to discover a problem is after you have signed the paperwork and moved your boat in. Take the time to inspect thoroughly, ask the hard questions, and talk to current slip holders about their experience. For more on being a good neighbor once you are settled, read our guide to <Link href="/blog/marina-etiquette" className="text-[#1B3A5C] hover:underline font-semibold">marina etiquette</Link>, and if you are still weighing options, our piece on <Link href="/blog/what-to-look-for-choosing-marina" className="text-[#1B3A5C] hover:underline font-semibold">what to look for when choosing a marina</Link> will help you narrow the field.
        </p>
      </div>
    </article>
  );
}
