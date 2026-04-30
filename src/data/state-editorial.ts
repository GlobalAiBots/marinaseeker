export interface H2Block {
  heading: string;
  body: string;
}

export interface StateEditorial {
  // Brief intro paragraph that REPLACES the generic intro (~70-90 words)
  introOverride?: string;
  // 3 H2 sections inserted between cities sub-grid and marina list
  h2Blocks: H2Block[];
  // Optional additional FAQs appended to the existing FAQPage; the
  // already-present generic FAQs are kept.
  faqExtra?: { q: string; a: string }[];
}

export const STATE_EDITORIAL: Record<string, StateEditorial> = {
  florida: {
    introOverride:
      "Florida has 962 marinas spanning over 8,400 miles of tidal coastline, the Intracoastal Waterway from Fernandina Beach to Key West, the Florida Keys archipelago, the Gulf Coast from Panama City to Marco Island, Lake Okeechobee, and the St. Johns River system. Whether you're looking for transient dockage on a summer cruise, a year-round liveaboard slip in Fort Lauderdale, fuel and pump-out on the Loop trip, or a hurricane-rated dry stack inland from a hurricane zone, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "Florida's Marina Landscape",
        body:
          "Florida runs the largest and most varied marina market in the country. The Atlantic coast from Fernandina Beach south through Jacksonville, Daytona, Cape Canaveral, Vero Beach, Stuart, West Palm Beach, Fort Lauderdale, and Miami carries the heaviest sportfishing and yacht concentration on the East Coast — Fort Lauderdale alone hosts over 50 marinas including some of the country's largest superyacht facilities (Bahia Mar, Pier 66, Hall of Fame Marina). The Intracoastal Waterway runs the entire length of the state and supports a steady transient-cruiser market, especially during the fall southbound and spring northbound migrations. The Florida Keys host roughly 70 marinas across Key Largo, Islamorada, Marathon, and Key West, catering to flats fishing, offshore charter, and Bahamas-bound cruisers. The Gulf Coast — Panama City, Apalachicola, Cedar Key, Crystal River, Tampa Bay, Sarasota, Fort Myers, Naples, Marco Island — supports a more protected boating market with strong sportfishing presence and growing dry-stack storage capacity. Inland, Lake Okeechobee anchors the Okeechobee Waterway crossing the state east-to-west, with marinas at Stuart, Indiantown, Clewiston, Moore Haven, LaBelle, and Fort Myers serving Loop-trip cruisers and bass-tournament fleets. The St. Johns River system supports a smaller but active inland marina market from Jacksonville to Sanford."
      },
      {
        heading: "Slip Availability, Fuel, and Hurricane Season",
        body:
          "Three Florida-specific factors shape every marina decision. Slip availability is the tightest in the country: most popular South Florida marinas (Fort Lauderdale, Miami Beach, Palm Beach, Marathon, Key West) maintain multi-year wait lists for permanent slips, with monthly rates running $35-90 per foot. Transient dockage is more available but requires advance booking November through April when seasonal cruisers arrive — many marinas book transient slips 6-12 weeks ahead during peak season. Fuel is universally available in coastal Florida; pricing typically runs 15-25% above auto-fuel prices and varies significantly by region (Keys and Lower Atlantic are highest, Panhandle and Gulf inland lowest). Hurricane season runs June 1 through November 30 and reshapes marina logistics every year. Most marinas have hurricane plans requiring vessels to be removed or specifically secured before named-storm landfall; insurance policies typically require haul-out or relocation north of certain latitudes for boats over a certain size. Marinas in known surge zones (Lower Keys, Tampa Bay, Charlotte Harbor) often close entirely 48-72 hours before hurricane landfall. Florida law requires marinas to have a written hurricane plan and to make it available to dockage customers."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Florida's marina market splits into six distinct regions. South Florida Atlantic (Palm Beach, Broward, Miami-Dade): most expensive dockage in the state, superyacht and luxury market dominance, year-round demand with peak in winter, deepest concentration of full-service yards and refit facilities. Florida Keys: 70+ marinas split between flats fishing (Upper Keys), offshore charter (Middle and Lower Keys), and Bahamas/Caribbean staging (Key West, Stock Island), tightest slip availability and highest fuel prices. Treasure Coast and Space Coast (Stuart, Vero Beach, Cape Canaveral, Daytona): mid-priced market with strong cruiser-friendly amenities, popular Loop-trip stopover. Tampa Bay and Southwest Florida (St. Petersburg, Bradenton, Sarasota, Fort Myers, Naples, Marco Island): protected boating, growing dry-stack market, sportfishing strong, lower hurricane-surge risk than southeast coast. Panhandle (Pensacola, Destin, Panama City, Apalachicola): emerald-water Gulf access, sportfishing focused, lowest dockage rates in the state, more seasonal patterns with summer peak. Inland Florida (Lake Okeechobee, St. Johns River, Crystal River, Suwannee River): bass tournament fleets, freshwater specialty, manatee zones, lower-cost dockage, less hurricane exposure. The directory above includes coverage across all six zones."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a Florida marina?",
        a: "Monthly slip rates in Florida vary dramatically by region. South Florida Atlantic (Fort Lauderdale, Miami, Palm Beach): $50-90 per foot per month, with superyacht facilities running higher. Florida Keys: $40-80 per foot. Treasure Coast and Tampa Bay: $25-55 per foot. Panhandle and inland: $15-35 per foot. Annual contracts typically discount 10-20% from monthly rates. Transient dockage runs $2-5 per foot per night statewide, with peak-season premium in South Florida."
      },
      {
        q: "When is the best time to book a Florida marina slip?",
        a: "For seasonal slips November through April, book by July or August. For transient dockage during peak season (especially Keys, Fort Lauderdale, and Loop-trip stopovers), book 6-12 weeks ahead. Summer dockage (May-October) is much more available across all regions. Hurricane-season cruisers should book hurricane holes or inland marinas (Lake Okeechobee, St. Johns) well in advance — these fill quickly when storms threaten."
      },
      {
        q: "What does Florida marina hurricane policy typically require?",
        a: "Most Florida marinas have a hurricane plan that's activated 48-72 hours before a named storm landfall is forecast. Common requirements include vessel removal (haul-out or move to a hurricane hole), specific tie-down patterns with extra lines, removal of canvas and loose gear, and proof of insurance with hurricane coverage. Some marinas in highest-risk surge zones (Lower Keys, Tampa Bay) require full evacuation. Review the marina's written hurricane plan before signing dockage contracts — Florida law requires it to be available."
      }
    ]
  },
  "new-york": {
    introOverride:
      "New York has 830 marinas spanning the Hudson River from Manhattan to the Erie Canal, the New York Harbor and Long Island Sound megamarket, the 1,000-mile Erie Canal system that connects Lake Erie to the Hudson, the Finger Lakes inland fleet, Lake Champlain on the Vermont border, and Long Island's south shore from Jamaica Bay to Montauk. Whether you need transient dockage on a Loop trip through the Erie Canal, a year-round slip on Long Island Sound, a club mooring on Lake George, or hurricane-season haul-out on the south shore, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "New York's Marina Landscape",
        body:
          "New York runs the most varied freshwater-and-saltwater marina market in the country. New York Harbor and the lower Hudson host the densest urban marina cluster in the Northeast — Liberty Landing, Chelsea Piers, North Cove, 79th Street Boat Basin, Half Moon Bay, and dozens of municipal facilities serve a fleet that runs the full range from working boats to superyachts. Long Island Sound from City Island east through Westchester, Nassau, and Suffolk counties hosts roughly 200 marinas catering to weekend cruisers, club fleets, and the New York-to-Newport summer migration. Long Island's south shore — Great South Bay, Moriches Bay, Shinnecock, Peconic, and the Hamptons-to-Montauk run — supports both sportfishing and shoaling-bay cruising. The Hudson River north of Manhattan to Albany supports Loop-trip cruisers, with major marinas at Tarrytown, Cold Spring, Newburgh, Kingston, and Catskill. The Erie Canal system (Erie, Champlain, Oswego, Cayuga-Seneca canals) is the country's premier freshwater Loop route, with marinas at Waterford, Schenectady, Little Falls, Ilion, Sylvan Beach, Brewerton, Oswego, and Buffalo. The Finger Lakes (Cayuga, Seneca, Skaneateles, Keuka, Canandaigua) host smaller club marinas serving the wine country market. Lake Champlain on the eastern Adirondack border is its own freshwater cruising destination."
      },
      {
        heading: "Erie Canal Season, Sound Tides, and Hurricane Exposure",
        body:
          "Three New York-specific factors shape every marina decision. The Erie Canal system operates seasonally from approximately May 15 through October 11 each year — outside those dates the locks are closed, marinas are largely shut down, and the entire inland Loop route through New York is unavailable. Loop-trip cruisers traditionally enter Waterford by late September to clear the locks before closure. Long Island Sound and New York Harbor have substantial tidal ranges (4-9 feet at New York Harbor, 7-8 feet at the eastern Sound), and current at the East River and Hell Gate runs strong enough that timing matters. Marina entries with shallow approach channels (Mamaroneck, Stamford, Greenwich) require tide-aware arrivals. Hurricane season (June through November) is real for New York: Sandy (2012) destroyed or damaged hundreds of New York marinas and reshaped slip availability in the harbor and on the south shore for years. Most south shore and harbor marinas now require haul-out plans for vessels over a certain size when named storms threaten landfall within 48 hours; Sound and Hudson marinas typically require enhanced tie-downs but allow vessels to remain. Marina insurance underwriting for vessels staying in New York harbors during hurricane season has tightened significantly post-Sandy."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "New York's marina market splits into five distinct regions. New York Harbor and lower Hudson (Manhattan, Brooklyn, Queens, Staten Island, lower Westchester, NJ Hudson side): highest dockage rates in the state ($60-150 per foot per month), tightest slip availability with multi-year wait lists at premier facilities, post-Sandy surge protection requirements drive insurance pricing. Long Island Sound (upper Westchester, Nassau, Suffolk through Sound shore): mid-priced market, strong yacht club presence, summer-peak demand with Newport-bound cruiser traffic. Long Island south shore (south Nassau, south Suffolk through Montauk): sportfishing focused, shoaling-bay cruising, hurricane-exposure premium on insurance. Hudson Valley and Capital District (mid-Hudson north to Albany and Troy): Loop-trip cruiser market, lower dockage rates than downstate, summer-only operation at most facilities. Erie Canal corridor and inland (Mohawk Valley, Finger Lakes, Lake Champlain): seasonal May-October operation, lowest dockage rates in the state, freshwater cruising specialty, club mooring scene strong in Finger Lakes and Lake Champlain. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a New York marina?",
        a: "Monthly slip rates in New York vary dramatically by region. New York Harbor and lower Hudson: $60-150 per foot per month, with premier facilities running higher. Long Island Sound: $35-80 per foot. Long Island south shore: $30-65 per foot. Hudson Valley: $20-45 per foot. Erie Canal and Finger Lakes: $15-35 per foot for seasonal storage (May-October). Annual vs seasonal pricing differs significantly upstate where most facilities winter-close."
      },
      {
        q: "When is the Erie Canal open for boats?",
        a: "The Erie Canal system operates seasonally from approximately May 15 through October 11 each year, with exact dates set annually by the New York State Canal Corporation. Outside those dates, the locks are closed and through-passage is impossible. Loop-trip cruisers traditionally enter Waterford by mid-to-late September to clear the locks before closure. Marinas along the canal corridor mostly close for winter, with a handful offering year-round dry storage."
      },
      {
        q: "How does hurricane season affect New York marinas?",
        a: "After Sandy (2012), most New York harbor and south shore marinas have written hurricane plans. Common requirements include haul-out for vessels over certain sizes (typically 35-40 feet) when a named storm is forecast to land within 48 hours, enhanced tie-down and chafing protection, removal of canvas and loose gear, and proof of insurance with hurricane coverage. Some facilities in highest-risk surge zones (Jamaica Bay, parts of the south shore) require full evacuation. Marina insurance pricing for storage during hurricane season has risen substantially post-Sandy."
      }
    ]
  },
  california: {
    introOverride:
      "California has 558 marinas spanning the 840-mile Pacific coastline from Crescent City to San Diego, the San Francisco Bay system with dozens of marinas across nine counties, the 1,100-square-mile Sacramento-San Joaquin Delta with its inland marina network, alpine lakes from Tahoe to Big Bear, and the desert reservoirs at Lake Havasu and the Colorado River. Whether you need year-round dockage in San Diego, a sailing club berth in Marina del Rey, a Delta houseboat marina near Stockton, or summer-only mooring at Lake Tahoe, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "California's Marina Landscape",
        body:
          "California has the most geographically split marina market in the country, with three distinct waters supporting completely different boating cultures. Pacific coast marinas concentrate at major harbors: San Diego (Shelter Island, Harbor Island, Coronado, Mission Bay), Newport Beach, Long Beach, Marina del Rey (the largest man-made small craft harbor in North America with over 5,000 slips), Channel Islands Harbor, Santa Barbara, Morro Bay, Monterey, Santa Cruz, and the limited offerings north of the Bay Area at Bodega Bay, Eureka, and Crescent City. San Francisco Bay supports its own dense marina cluster across nine Bay Area counties — Sausalito, Tiburon, Berkeley, Alameda, Oakland, San Francisco's South Beach and Pier 39, Redwood City, Coyote Point, plus the Suisun Bay and Carquinez Strait marinas funneling traffic into the Delta. The Sacramento-San Joaquin Delta is California's premier inland boating destination — over 100 marinas across Stockton, Lodi, Antioch, Bethel Island, Discovery Bay, Walnut Grove, Rio Vista, and the back-channel cuts support a heavy houseboat, ski-boat, and bass-tournament fleet. Sierra and alpine lakes (Tahoe, Donner, June, Big Bear, Lake Arrowhead, Pyramid, Castaic) host seasonal marinas serving the recreational summer market. Colorado River and desert reservoirs (Havasu, Mead, Mojave) anchor a hot-weather cruising and houseboat market."
      },
      {
        heading: "Drought, Wildfire Smoke, and Marina-Slip Scarcity",
        body:
          "Three California-specific factors shape every marina decision. Drought directly affects inland marinas: Lake Oroville, Folsom, Shasta, New Melones, and Pyramid have all dropped 100+ feet from full pool in recent dry cycles, exposing or closing ramps and forcing low-water launch sites. Sierra alpine lakes are less affected but still see seasonal level fluctuations. The Sacramento Delta is sea-level-driven and not affected by drought, making it the most reliable inland boating in dry years. Wildfire smoke season (typically July through October) periodically closes marinas at Sierra and inland lakes when air quality reaches hazardous levels — many seasonal marinas now build smoke contingency into operations. Slip scarcity on the coast is a major constraint: Marina del Rey, Newport Beach, and Long Beach maintain multi-year wait lists; San Diego harbor slips for vessels over 30 feet require 2-5 year waits at most facilities. Bay Area marinas (especially in Marin and the East Bay) maintain similar wait lists. Average dockage rates run $20-50 per foot per month statewide, with Marina del Rey, Newport, and Marin running at the high end ($35-65). Liveaboard slips are limited and tightly regulated by California marina law — most coastal cities cap liveaboard percentage at 10-15% of total slips."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "California's marina market splits into five distinct regions. Southern California coast (San Diego through Santa Barbara): year-round operation, highest demand, multi-year slip wait lists at most major harbors, strong sailing and yacht club presence, deep refit and yard infrastructure. Central Coast (Morro Bay, Monterey, Santa Cruz): smaller market, harbor entry conditions limit boat size at some facilities, sportfishing and Pacific cruising focused. San Francisco Bay: dense Bay Area marina cluster, 4-7 foot tide ranges and strong currents at the Golden Gate and Carquinez Strait require timing-aware passage, sailing club tradition strong, year-round operation. Sacramento Delta: largest inland marina market in California, reliable water levels, houseboat dominance, summer peak with strong shoulder-season demand, 1,100 square miles of interconnected sloughs. Sierra and Mountain Lakes plus desert reservoirs: seasonal operation (typically May through October at Sierra lakes; year-round at Havasu/Mead with summer peak), drought-vulnerable inland reservoirs, strong houseboat market on the Colorado River. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a California marina?",
        a: "Monthly slip rates in California vary by region. Southern California coast (San Diego, Newport, Long Beach, Marina del Rey): $30-65 per foot per month, with premier facilities running higher. Central Coast (Monterey, Santa Cruz, Morro Bay): $25-45 per foot. San Francisco Bay: $18-50 per foot depending on location and amenities. Sacramento Delta: $12-30 per foot. Sierra and alpine lakes (May-October seasonal): $20-45 per foot for the season. Liveaboard slips, where available, command 30-50% premium and require waiting list approval."
      },
      {
        q: "Are California marina slips hard to get?",
        a: "Yes, especially on the Southern California coast and in the Bay Area. Marina del Rey, Newport Beach, Long Beach, San Diego harbor, and most Marin County and East Bay facilities maintain multi-year wait lists for permanent slips, with 2-5 year waits common for vessels over 30 feet. Liveaboard slots are even more constrained — California marina law typically caps liveaboard density at 10-15% of total slips. Transient dockage is more available with advance booking. Sacramento Delta and Colorado River marinas have far more slip availability than coastal markets."
      },
      {
        q: "How does drought affect California inland marinas?",
        a: "Major California reservoirs — Oroville, Folsom, Shasta, New Melones, Pyramid — drop 50-150+ feet during multi-year droughts, restricting or closing ramps and forcing use of low-water launch sites. Marina dockage may be relocated to deeper water during severe drawdowns. The California Department of Water Resources publishes weekly reservoir levels. Sacramento Delta is sea-level-driven and not affected by drought, making it the most reliable inland boating during dry cycles. Sierra alpine lakes (Tahoe, Donner) see less drought impact but still vary seasonally."
      }
    ]
  },
  // Remaining top-10 entries will be added in batches:
  // michigan, maryland, washington, north-carolina,
  // massachusetts, new-jersey, virginia
};

export function getStateEditorial(stateSlug: string): StateEditorial | null {
  return STATE_EDITORIAL[stateSlug] || null;
}
