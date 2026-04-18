import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Marina Etiquette: 10 Rules Every Boater Should Know | MarinaSeeker",
  description: "Unwritten rules that will make you a welcome member of any marina community. Learn proper dock etiquette, speed rules, and how to be a great marina neighbor.",
  openGraph: { title: "Marina Etiquette: 10 Rules Every Boater Should Know", url: "https://marinaseeker.com/blog/marina-etiquette", siteName: "MarinaSeeker" },
  twitter: { card: "summary", title: "Marina Etiquette: 10 Rules Every Boater Should Know | MarinaSeeker" },
  alternates: { canonical: "https://marinaseeker.com/blog/marina-etiquette" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Marina Etiquette: 10 Rules Every Boater Should Know",
  datePublished: "2026-04-09",
  author: { "@type": "Organization", name: "MarinaSeeker" },
  publisher: { "@type": "Organization", name: "MarinaSeeker", url: "https://marinaseeker.com" },
};

export default function MarinaEtiquette() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <Link href="/blog" className="hover:text-[#1B3A5C] transition">Blog</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Marina Etiquette</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">Marina Etiquette: 10 Rules Every Boater Should Know</h1>
      <p className="text-gray-400 text-sm mb-8">April 9, 2026 &middot; 8 min read</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          A marina is a shared space, and like any shared space, it works best when everyone follows a set of unwritten rules. Whether you are new to boating or a seasoned captain who just moved to a new facility, understanding marina etiquette is essential. These ten rules will keep you on good terms with your dock neighbors, the marina staff, and the broader boating community. Most of them come down to common sense and consideration, but you would be surprised how often they get overlooked.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">1. Respect Quiet Hours</h2>
        <p>
          Every marina has designated quiet hours, typically from 10 PM to 7 AM, though the exact times vary by facility. These hours exist because sound carries incredibly well over water. What feels like a normal-volume conversation on your aft deck can sound like a loudspeaker to the boater three slips down. Generators, music, power tools, and loud parties during quiet hours are the fastest way to earn a reputation as the person everyone wishes would leave.
        </p>
        <p>
          This does not mean marinas are silent monasteries. Plenty of socializing happens at marinas, and that&apos;s part of the appeal. But when quiet hours hit, bring the volume down, move conversations inside the cabin, and save the generator use for daytime. If you are returning from a late-night cruise, dock quietly and keep your voices low. Your neighbors will appreciate it, and they will be far more willing to lend a hand when you need it.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">2. Manage Your Dock Lines Properly</h2>
        <p>
          Sloppy dock lines are more than an eyesore &mdash; they are a safety hazard. Lines that drape across the dock create tripping risks, especially at night when visibility is limited. Keep your spring lines, bow lines, and stern lines properly coiled and secured when not under tension. Replace chafed or fraying lines before they fail during a storm, which can send your boat drifting into a neighbor&apos;s hull.
        </p>
        <p>
          Equally important is using the correct cleats and dock hardware. Never tie off to a power pedestal, a water spigot, or another boater&apos;s cleat. Use only the cleats assigned to your slip, and make sure your lines are long enough to allow for tidal changes without going slack or pulling your boat hard against the dock.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">3. Maintain Slow Speed in the Marina Basin</h2>
        <p>
          The no-wake zone inside a marina exists for critical reasons. Wake from a fast-moving boat slams other vessels against the dock, stresses dock lines, can damage fenders and gel coat, and creates dangerous conditions for anyone stepping on or off a boat. The rule is simple: idle speed only inside the marina basin, no exceptions.
        </p>
        <p>
          This applies to dinghies and jet skis too, not just larger vessels. Even a small wake in the confined space of a marina can cause significant rocking, and that rocking can knock unsecured items off tables, spill drinks, and make life miserable for anyone trying to relax on their boat. Get in the habit of shifting to neutral and coasting the last 50 feet to your slip. Your neighbors will notice &mdash; and they will thank you for it.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">4. Clean Up After Yourself</h2>
        <p>
          This seems obvious, but it bears repeating because the evidence of its neglect is visible at nearly every marina. Fish-cleaning stations should be left spotless when you are done. Trash goes in the dumpster, not on the dock or in the water. If you change your oil or perform engine maintenance, dispose of fluids properly at the marina&apos;s designated waste station. Spilled fuel should be addressed immediately with absorbent pads.
        </p>
        <p>
          Keep your dock area tidy as well. Your slip is not a storage locker. Coolers, chairs, fishing gear, and other items cluttering the dock create obstacles for everyone walking by, and they present a poor image of the marina to visitors and prospective slip renters. Most marinas include dock box storage or offer locker rentals for overflow gear.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">5. Don&apos;t Block the Fuel Dock</h2>
        <p>
          The fuel dock is a shared resource, and monopolizing it is a cardinal sin of marina life. Pull up, fuel your boat, pay, and move along. If you need to run inside to use the restroom or grab supplies from the ship store, do that before or after fueling &mdash; not while your boat sits on the fuel dock and three other vessels are circling in the basin waiting for a turn.
        </p>
        <p>
          The same principle applies to the launch ramp if your marina has one. Load and unload your boat away from the ramp, prep your vessel in the staging area, and keep the ramp itself free for active launches and retrievals. Weekend mornings at a busy ramp are stressful enough without someone blocking the lane to adjust their trailer.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">6. Respect Others&apos; Space</h2>
        <p>
          Boats are close together in a marina, but that does not mean your neighbor&apos;s boat is an extension of your living room. Never board another person&apos;s boat without explicit permission, even if you are just stepping across the bow to reach the dock. Do not tie your dinghy to someone else&apos;s swim platform. Do not use another boater&apos;s power or water hookups. And resist the temptation to peek into open hatches or cabins &mdash; privacy is limited enough on a boat without curious neighbors adding to the problem.
        </p>
        <p>
          If you have guests visiting, brief them on these boundaries too. Non-boaters may not realize that stepping onto someone else&apos;s boat uninvited is the maritime equivalent of walking into a stranger&apos;s house. Keep your parties and gatherings contained to your own boat and your own dock space.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">7. Be Careful with Fenders</h2>
        <p>
          Fenders protect your boat and your neighbor&apos;s boat from contact damage, and they need to be deployed properly whenever you are in your slip. Adjust your fenders so they sit at the correct height to protect the widest part of your hull. If a storm is coming, add extra fenders and check that your existing ones haven&apos;t ridden up out of position.
        </p>
        <p>
          When leaving the marina for a cruise, pull your fenders in. Cruising with fenders hanging over the side is the boating equivalent of driving with your turn signal on for 50 miles &mdash; it marks you as someone who does not pay attention to details, and experienced boaters will notice immediately. Stow them on deck or in a fender rack.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">8. Handle Waste Properly</h2>
        <p>
          Federal law prohibits discharging untreated sewage into navigable waters, and marina basins are no exception. Use the marina&apos;s pump-out station to empty your holding tank, and never dump anything overboard while in the marina &mdash; not sewage, not gray water, not food scraps. Even seemingly harmless substances like soapy dishwater introduce chemicals and nutrients into the water that degrade the marina environment.
        </p>
        <p>
          If your marina does not have a pump-out station, many areas offer free mobile pump-out services. Check with the harbormaster or search your state&apos;s clean vessel program. Proper waste handling protects the water, preserves the marina&apos;s appearance, and keeps you on the right side of environmental regulations that carry substantial fines for violations.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">9. Follow Channel Markers Entering and Leaving</h2>
        <p>
          The approach to most marinas involves a marked channel, and those markers are there for a reason. Cutting corners to save 30 seconds can put you in shallow water, damage submerged infrastructure, or put you on a collision course with another vessel that is following the proper route. Stay within the marked channel, maintain proper speeds, and follow the local rules of the road.
        </p>
        <p>
          When returning to the marina and entering the basin, announce your intentions on the VHF radio if the marina monitors a channel, or make clear visual signals to other boaters. Do not race another boat to the basin entrance &mdash; right of way goes to the vessel that is already in the channel. If two boats approach the entrance simultaneously, the vessel leaving the marina typically has the right of way because they have less maneuverability in the confined space.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">10. Introduce Yourself to Your Neighbors</h2>
        <p>
          This last rule is less about obligation and more about the tremendous upside of being part of a marina community. Walk down the dock, introduce yourself to the boaters on either side of you, and exchange phone numbers. Your dock neighbors are the people who will notice if your bilge pump is running nonstop, if your lines are chafing in a storm, or if something looks off on your boat when you are not there. That kind of informal watch system is invaluable.
        </p>
        <p>
          Marina communities are remarkably generous. Experienced boaters share tools, offer advice, help with docking in bad weather, and invite new arrivals to social events. But you have to meet them first. A simple introduction and a friendly attitude will open doors that no amount of expensive gear ever will.
        </p>

        <p>
          Looking for a marina where you can put these rules into practice? Browse thousands of marinas across America on our <Link href="/marinas" className="text-[#1B3A5C] hover:underline font-semibold">marina directory</Link> to find the right fit for your boat and your boating style. The best marina experience starts with being a great marina neighbor.
        </p>

        <GearRecommendation section="dock-essentials" />
      </div>
    </article>
  );
}
