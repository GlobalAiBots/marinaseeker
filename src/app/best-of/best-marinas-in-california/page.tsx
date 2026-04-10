import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Marinas in California — Top 10 | MarinaSeeker",
  description:
    "Discover the top 10 best marinas in California, from San Francisco Bay to Southern California harbors. Expert picks for slips, sailing, and waterfront living on the Pacific coast.",
  alternates: {
    canonical: "https://marinaseeker.com/best-of/best-marinas-in-california",
  },
};

export default function BestMarinasCalifornia() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://marinaseeker.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Best Of",
        item: "https://marinaseeker.com/best-of",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Best Marinas in California",
        item: "https://marinaseeker.com/best-of/best-marinas-in-california",
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best marina in California for sailing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Marina Bay in Richmond offers outstanding sailing conditions on San Francisco Bay with consistent afternoon winds, a protected harbor, and easy access to Angel Island, Sausalito, and the Golden Gate. It is a top choice for both racing and cruising sailors.",
        },
      },
      {
        "@type": "Question",
        name: "Are there affordable marinas in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Owl Harbor Marina in Isleton and Docktown Marina in Redwood City tend to offer more affordable slip rates compared to premium Bay Area and Southern California locations. Delta marinas in particular provide excellent value for boaters willing to be farther from the coast.",
        },
      },
      {
        "@type": "Question",
        name: "Which California marinas allow liveaboards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Several California marinas accommodate liveaboard boaters, including Waldo Point Harbor in Marin City and Docktown Marina in Redwood City. Liveaboard permits are regulated by local jurisdictions, so boaters should confirm availability and waitlist status directly with each marina.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/" className="text-[#1B3A5C] hover:underline font-semibold">
            Home
          </Link>{" "}
          &rsaquo;{" "}
          <span>Best Of</span> &rsaquo;{" "}
          <span>Best Marinas in California</span>
        </nav>

        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-6 font-[Cabin]">
          Best Marinas in California &mdash; Top 10
        </h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          California&apos;s 840 miles of Pacific coastline, combined with the
          sprawling San Francisco Bay and the Sacramento&ndash;San Joaquin River
          Delta, create some of the most diverse boating environments in the
          country. From world-class sailing on the Bay to laid-back Delta
          cruising and Southern California harbor hopping, the Golden State has
          a marina for every type of boater. We&apos;ve selected ten standout
          facilities based on location, amenities, sailing conditions, and value.
        </p>

        {/* Pick 1 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          1. Marina Bay &mdash; Richmond
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Marina Bay in Richmond occupies a prime spot on the eastern shore of
          San Francisco Bay, offering panoramic views of the Golden Gate Bridge,
          Angel Island, and the Marin Headlands. The marina features hundreds
          of slips for vessels of all sizes, a modern fuel dock, pump-out
          stations, and a kayak launch. Consistent westerly winds make it a
          sailor&apos;s dream during summer months, while the surrounding
          waterfront development includes restaurants, a hotel, and paved trails
          along the shoreline. Its central Bay location provides quick access to
          Sausalito, Tiburon, and the open Pacific.
        </p>
        <p>
          <Link href="/marinas/marina-ca-marina-bay-1926" className="text-[#1B3A5C] hover:underline font-semibold">
            View Marina Bay on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 2 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          2. Redwood City Yacht Harbor &mdash; Redwood City
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Redwood City Yacht Harbor sits at the southern end of San Francisco
          Bay along Redwood Creek. The harbor provides affordable slip rates by
          Bay Area standards, making it a favorite among cost-conscious boaters
          who still want access to the entire Bay. Full-service amenities include
          shore power, water, restrooms, and a nearby boat yard for haul-outs
          and repairs. The surrounding Port of Redwood City area has seen
          significant development, with new dining options and waterfront parks
          adding value beyond the dock.
        </p>
        <p>
          <Link href="/marinas/marina-ca-redwood-city-yacht-harbor-1935" className="text-[#1B3A5C] hover:underline font-semibold">
            View Redwood City Yacht Harbor on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 3 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          3. Point San Pablo Yacht Harbor
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Tucked into the Richmond shoreline near the San Pablo Bay, Point San
          Pablo Yacht Harbor has an old-school waterfront character that feels
          worlds away from Silicon Valley. The marina caters to fishing boats,
          sailboats, and modest cruisers, with a bait shop, launching
          facilities, and a restaurant perched over the water. Halibut, striped
          bass, and sturgeon fishing in San Pablo Bay draws anglers year-round.
          The harbor&apos;s no-nonsense approach and affordable rates appeal to
          boaters who value function over flash.
        </p>
        <p>
          <Link href="/marinas/marina-ca-point-san-pablo-yacht-harbor-1930" className="text-[#1B3A5C] hover:underline font-semibold">
            View Point San Pablo Yacht Harbor on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 4 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          4. Docktown Marina &mdash; Redwood City
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Docktown Marina is one of the Bay Area&apos;s most well-known
          liveaboard communities, offering a unique floating-home lifestyle on
          Redwood Creek. The marina provides slips for both traditional vessels
          and houseboats, with a tight-knit community that organizes potlucks,
          dock parties, and holiday events. For boaters considering full-time
          life on the water, Docktown is a proven model of how a liveaboard
          marina can function as a genuine neighborhood. Waitlists can be long,
          so prospective residents should apply early.
        </p>
        <p>
          <Link href="/marinas/marina-ca-docktown-marina-1934" className="text-[#1B3A5C] hover:underline font-semibold">
            View Docktown Marina on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 5 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          5. Owl Harbor Marina &mdash; Isleton
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Owl Harbor Marina in Isleton is a hidden gem in the Sacramento&ndash;San
          Joaquin Delta, where hundreds of miles of waterways wind through
          farmland and levee-lined channels. The marina offers covered and
          uncovered slips, fuel, a pump-out station, and a small ship store.
          Delta boating is all about relaxation &mdash; think lazy river cruises,
          wakeboarding on glassy sloughs, and tying up at sandbar beaches. Owl
          Harbor&apos;s peaceful setting and lower costs make it an attractive
          alternative to pricier coastal marinas.
        </p>
        <p>
          <Link href="/marinas/marina-ca-owl-harbor-marina-1937" className="text-[#1B3A5C] hover:underline font-semibold">
            View Owl Harbor Marina on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 6 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          6. Glen Cove Marina &mdash; Vallejo
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Glen Cove Marina in Vallejo occupies a strategic position where the
          Carquinez Strait meets San Pablo Bay, giving boaters access to both
          the Bay and the Delta in a single outing. The marina features well-
          maintained slips, laundry facilities, showers, and a waterfront park.
          Vallejo itself is experiencing a renaissance, with new restaurants and
          a ferry service to San Francisco that makes the city an increasingly
          popular choice for commuters who want to keep their boat close to home.
        </p>
        <p>
          <Link href="/marinas/marina-ca-glen-cove-marina-1925" className="text-[#1B3A5C] hover:underline font-semibold">
            View Glen Cove Marina on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 7 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          7. Leeward Bay Marina &mdash; Los Angeles
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Leeward Bay Marina brings Southern California glamour to the boating
          experience. Located in the greater Los Angeles harbor area, the marina
          provides slips with views of the Pacific and quick access to Catalina
          Island, the Channel Islands, and Santa Monica Bay. SoCal&apos;s year-round
          sunshine means virtually unlimited boating days, and the marina&apos;s
          proximity to LA&apos;s dining and entertainment scene adds a cosmopolitan
          edge that few marinas can match. Slip demand is high, so early
          reservations are strongly recommended.
        </p>
        <p>
          <Link href="/marinas/marina-ca-leeward-bay-marina-1933" className="text-[#1B3A5C] hover:underline font-semibold">
            View Leeward Bay Marina on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 8 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          8. Waldo Point Harbor &mdash; Marin City
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Waldo Point Harbor in Marin City is legendary among Bay Area
          liveaboard enthusiasts. The harbor&apos;s collection of houseboats
          ranges from modest floating cottages to architecturally ambitious
          creations featured in design magazines. Beyond the liveaboard culture,
          Waldo Point provides traditional slips with stunning views of
          Richardson Bay and Mount Tamalpais. Sausalito&apos;s shops and
          restaurants are a short walk or dinghy ride away, and the Golden Gate
          Bridge is visible from nearly every dock.
        </p>
        <p>
          <Link href="/marinas/marina-ca-waldo-point-harbor-1929" className="text-[#1B3A5C] hover:underline font-semibold">
            View Waldo Point Harbor on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 9 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          9. East Basin &mdash; Dana Point
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Dana Point Harbor&apos;s East Basin serves as the primary recreational
          boating hub in south Orange County. The basin offers slips for
          sailboats and powerboats, charter fishing operations, and whale
          watching tours that run from December through April. The harbor&apos;s
          recent renovation has modernized dock infrastructure while preserving
          the laid-back coastal atmosphere. Restaurants, surf shops, and the
          Ocean Institute sit within walking distance, making East Basin a
          complete waterfront destination.
        </p>
        <p>
          <Link href="/marinas/marina-ca-east-basin-1927" className="text-[#1B3A5C] hover:underline font-semibold">
            View East Basin on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* Pick 10 */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          10. West Basin &mdash; Dana Point
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Completing the Dana Point Harbor experience, West Basin houses the
          harbor&apos;s dry storage, boat launch ramps, and additional wet slips.
          It&apos;s the preferred basin for trailerable boats and smaller vessels
          that need quick launch-and-retrieve access. The basin&apos;s sheltered
          location behind the harbor breakwater keeps conditions calm even when
          Pacific swells build outside. Combined with East Basin, Dana Point
          Harbor delivers one of the most complete boating packages in Southern
          California.
        </p>
        <p>
          <Link href="/marinas/marina-ca-west-basin-1928" className="text-[#1B3A5C] hover:underline font-semibold">
            View West Basin on MarinaSeeker &rarr;
          </Link>
        </p>

        {/* State link */}
        <div className="mt-12 mb-8 p-6 bg-blue-50 rounded-lg text-center">
          <p className="text-gray-700 mb-3">
            Explore all marinas across the Golden State.
          </p>
          <Link href="/california" className="text-[#1B3A5C] hover:underline font-semibold text-lg">
            Browse All California Marinas &rarr;
          </Link>
        </div>
      </main>
    </>
  );
}
