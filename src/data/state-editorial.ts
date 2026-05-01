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
  michigan: {
    introOverride:
      "Michigan has 514 marinas spanning 3,288 miles of Great Lakes coastline (more than any other state), the densest inland-lake system in the country at 11,000+ named lakes, the Detroit River and Lake St. Clair fleet, the Saginaw Bay and Thumb shoreline, and the Upper Peninsula's Lake Superior and Lake Michigan harbors. Whether you need a slip on Charlevoix's Round Lake, a winter haul-out before ice-in on Lake Erie, transient dockage on a Pure Michigan summer cruise from Saugatuck to Mackinac, or a club mooring on a Cadillac inland lake, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "Michigan's Marina Landscape",
        body:
          "Michigan runs the largest Great Lakes marina market in the country, with marinas serving four of the five Great Lakes (Superior, Michigan, Huron, Erie) plus Lake St. Clair and the country's densest inland-lake fleet. Lake Michigan's eastern shore is the heaviest-trafficked corridor: Harbor Country (New Buffalo, St. Joseph, South Haven), Saugatuck and Holland, Grand Haven, Muskegon, Pentwater, Ludington, Manistee, Frankfort, Leland, Northport, Charlevoix, and Petoskey support the Pure Michigan summer cruising migration. Mackinac Island and the Straits region anchor the Lake Michigan-to-Lake Huron transition with marinas at St. Ignace, Mackinac City, and the iconic island itself. Lake Huron's Sunrise Coast (Cheboygan, Alpena, Tawas, Au Sable, Bay City) and the Thumb (Caseville, Port Austin, Harbor Beach, Lexington, Port Huron) support a quieter cruising scene plus heavy commercial fishing. Lake St. Clair and the Detroit River host one of the densest urban marina clusters in the Midwest, with the Detroit Yacht Club, Belle Isle, Grosse Pointe, and dozens of municipal facilities. Lake Superior on the Upper Peninsula (Marquette, Munising, Grand Marais, Houghton, Copper Harbor) supports a smaller, more remote cruising market. Inland, Michigan's 11,000+ lakes support a vast smaller-marina scene serving runabouts, pontoons, and bass-tournament boats, with the heaviest concentration in the Cadillac, Traverse City, Houghton Lake, and Higgins Lake regions."
      },
      {
        heading: "Ice-In Season, Great Lakes Weather, and Slip Logistics",
        body:
          "Three Michigan-specific factors shape every marina decision. Ice-in dictates the boating season across most of the state. Most marinas run from approximately mid-May through late October, with northern Michigan and Upper Peninsula facilities operating an even shorter window (early June through early October). Vessel haul-out, winterization, and indoor storage are major Michigan marina services — most facilities offer storage and many operate in-and-out programs that include spring launch and fall haul. Indoor heated storage in northern Michigan often books a year ahead. Great Lakes weather is the dominant safety factor: Lake Michigan, Superior, and Huron generate sea-state conditions that rival ocean cruising, with sustained northwest blows over 25 knots producing 8-12 foot wave heights regularly. Marinas with shallow-approach harbors (St. Joseph, Manistee, Grand Marais) become inaccessible in heavy westerlies. Smart cruisers monitor NOAA marine forecasts and time crossings around weather windows. Slip availability runs tight on Lake Michigan's eastern shore from Memorial Day through Labor Day; transient slips at popular destinations (Mackinac Island, Charlevoix, Saugatuck) often book 2-4 weeks ahead during peak season. Annual slip rates run $40-90 per foot per season at premier west-shore facilities, dropping to $25-55 on Lake Huron and Saginaw Bay, and $15-40 on inland lakes."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Michigan's marina market splits into six distinct regions. Lake Michigan southeast and Harbor Country (New Buffalo, St. Joseph, South Haven, Saugatuck, Holland, Grand Haven): heaviest tourist demand, highest seasonal dockage rates in the state, peak-season transient bookings essential. Lake Michigan northeast and Up North (Muskegon, Ludington, Manistee, Frankfort, Leland, Charlevoix, Petoskey, Mackinac): premier summer cruising corridor, premium dockage at island and resort destinations. Saginaw Bay and the Thumb (Bay City, Caseville, Port Austin, Harbor Beach): quieter cruising, strong commercial fishing scene, lower dockage rates than west shore. Detroit River, Lake St. Clair, and Lake Erie corridor (Detroit, Grosse Pointe, St. Clair Shores, Algonac, Monroe): dense urban-and-suburban marina cluster, year-round access at some facilities, southern Michigan's main metro fleet. Lake Superior and Upper Peninsula (Marquette, Houghton, Copper Harbor, Sault Ste. Marie): shortest season, remote cruising specialty, lowest density. Inland lakes (Traverse City Bay, Cadillac, Houghton Lake, Higgins Lake, Lake Charlevoix, Torch Lake): seasonal pontoon and runabout fleet, smaller marina footprints, club-mooring scene strong in Traverse Bay and Charlevoix. The directory above includes coverage across all six regions."
      }
    ],
    faqExtra: [
      {
        q: "When does the Michigan boating season open?",
        a: "Most Michigan marinas operate mid-May through late October. Lake Michigan eastern shore and Lake St. Clair facilities typically open by Memorial Day; northern Michigan and Lake Huron facilities open by early June. Upper Peninsula and Lake Superior marinas operate the shortest seasons — early June through early October at most. Ice-out and ice-in dates vary year to year; cold winters can compress the season at northern facilities. Most marinas publish opening and closing dates by April."
      },
      {
        q: "How much does it cost to keep a boat in a Michigan marina?",
        a: "Seasonal slip rates in Michigan vary by region. Lake Michigan eastern shore and Up North destinations: $40-90 per foot for the season, with Mackinac Island, Charlevoix, and Harbor Springs at the high end. Lake Huron and Saginaw Bay: $25-55 per foot. Detroit River and Lake St. Clair: $30-70 per foot. Inland lakes: $15-40 per foot. Indoor heated winter storage runs $15-35 per foot extra. Most Michigan marinas charge for the full season (May-October) rather than monthly."
      },
      {
        q: "Do Michigan marinas offer winter storage?",
        a: "Yes — winter storage and winterization are major Michigan marina services because most boats can't stay in the water through ice-in season. Options include outdoor open storage (cheapest), shrink-wrapped outdoor (better protection), unheated indoor (mid-tier), and heated indoor (premium, often books a year ahead at popular northern facilities). Many marinas offer in-and-out programs that include winterization, storage, spring de-winterization, and launch — typically priced as a package. Book by August for fall haul-out at popular facilities."
      }
    ]
  },
  maryland: {
    introOverride:
      "Maryland has 368 marinas concentrated overwhelmingly on the Chesapeake Bay and its tributaries — the country's largest estuary and one of its most-trafficked recreational boating regions. From the Susquehanna Flats at the Bay's head to the Potomac at its southern reach, Maryland marinas serve sailors, sport fishers, charter captains, racers, and Loop-trip cruisers in unusual concentration. Whether you need a year-round slip in Annapolis, a working dock for crab boats on the Eastern Shore, transient dockage at St. Michael's, or a hurricane-protected hole on the Patuxent, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "Maryland's Marina Landscape",
        body:
          "Maryland runs the most Bay-concentrated marina market in the country. The Chesapeake Bay and its tributaries hold over 90% of the state's marinas, making this the densest cruising-grade marina concentration on the East Coast. Annapolis is the unofficial sailing capital of the Eastern Seaboard — Spa Creek, Back Creek, the Severn, and Whitehall Bay support hundreds of slips at facilities like Bert Jabin's, Annapolis Yacht Basin, and Eastport Yacht Center, plus the Naval Academy. The Magothy and Severn rivers, plus Galesville on the West River, anchor the western shore midway market. The Patuxent River from Solomons Island north supports a strong sailing and powerboat fleet. Kent Narrows, Rock Hall, Chestertown, St. Michael's, Oxford, and Cambridge anchor the Eastern Shore market — quieter, more historic, with strong deadrise and skipjack heritage. The Susquehanna Flats at the Bay's head (Havre de Grace, North East, Charlestown) support a freshwater-influenced market specializing in striped bass fishing. Ocean City on the Atlantic side is a separate market — offshore charter, tournament fishing, and tighter inlet conditions. The Potomac River from the D.C. line south to Point Lookout is its own boating fishery with scattered marinas at Solomons, Lexington Park, and Coltons Point."
      },
      {
        heading: "Bay Cruising Season, Striper Cycle, and Hurricane Exposure",
        body:
          "Three Maryland-specific factors shape every marina decision. Bay cruising season runs effectively April through November, with peak demand May through October. The Bay rarely freezes hard enough to require widespread haul-out, so many Maryland marinas operate year-round, though most pleasure boats are wintered between November and April. Striper season — particularly the trophy spring run from approximately mid-April through mid-May — drives massive transient and tournament fishing activity at Susquehanna Flats, Bay Bridge, and the Eastern Shore tributaries. Slip availability tightens at upper Bay marinas during the trophy season; transient bookings often go fast even on weekdays. Hurricane exposure is real: the Bay funnels storm surge dramatically when hurricanes track up the East Coast, and the Eastern Shore is particularly vulnerable. Most Maryland marinas have hurricane plans requiring vessels over a certain size to be hauled or relocated when named storms threaten landfall within 48-72 hours. Annapolis area marinas have implemented enhanced surge protection requirements after Isabel (2003) and subsequent storms. Slip rates in Maryland run $30-70 per foot per month at premier Annapolis facilities, $20-45 elsewhere on the western shore, $15-35 on the Eastern Shore, and $25-50 at Solomons and Patuxent marinas."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Maryland's marina market splits into five distinct regions. Annapolis and the western shore midway (Severn, South, West, Magothy rivers): largest concentration, highest dockage rates, peak demand from sailing and racing fleet, deepest yacht service infrastructure. Upper Bay and Susquehanna Flats (Havre de Grace, North East, Rock Hall, Chestertown): striper trophy season market, freshwater-influenced fishing, mid-priced dockage. Eastern Shore (Kent Narrows, St. Michael's, Oxford, Cambridge): quieter cruising, historic working-waterfront heritage, lower dockage rates than western shore, strong transient demand at destination towns. Patuxent and Solomons (southern western shore): mid-Bay sailing fleet, strong charter scene, mid-priced dockage. Potomac, southern Maryland, and Ocean City: fewer marinas but distinct markets — Potomac is freshwater-influenced fishing and cruising, Ocean City is separate Atlantic offshore charter. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a Maryland marina?",
        a: "Slip rates in Maryland vary by region. Annapolis area (Spa Creek, Back Creek, Severn): $40-70 per foot per month, with premier facilities running higher. Western shore (West, South, Magothy, Patuxent): $25-50 per foot. Solomons and lower Patuxent: $25-50 per foot. Eastern Shore (Rock Hall, Kent Narrows, St. Michael's, Oxford): $15-40 per foot. Upper Bay and Susquehanna Flats: $20-40 per foot. Annual contracts typically discount 10-20% from monthly rates. Liveaboard slips, where available, command premium pricing and have stricter regulations."
      },
      {
        q: "When is striper season on the Chesapeake Bay?",
        a: "Maryland's trophy spring striper season runs approximately mid-April through mid-May, when post-spawn rockfish above 28 inches are catchable on the upper Bay. Summer slot season follows with smaller fish. The fall run runs September through November as fish school heading south. Winter catch-and-release continues on the Susquehanna Flats. Maryland DNR sets exact dates and slot limits annually — rules change yearly, so check before each trip. Slip availability at upper Bay marinas tightens significantly during the trophy spring season."
      },
      {
        q: "How does hurricane season affect Maryland marinas?",
        a: "Hurricane exposure is real for Chesapeake Bay marinas. Storm surge funnels up the Bay dramatically when hurricanes track up the East Coast, and the Eastern Shore is particularly vulnerable. Most Maryland marinas have written hurricane plans requiring vessels over a certain size to be hauled or relocated within 48-72 hours of named storm landfall forecast. Annapolis area marinas tightened surge protection requirements after Isabel (2003). Marina insurance underwriting for vessels remaining at Bay marinas during named-storm windows has tightened significantly post-Isabel and post-Sandy. Confirm your marina's hurricane plan and your insurance hurricane coverage before signing dockage contracts."
      }
    ]
  },
  washington: {
    introOverride:
      "Washington has 279 marinas spanning Puget Sound's 2,500+ miles of saltwater shoreline, the San Juan Islands archipelago, the Strait of Juan de Fuca, the Pacific coast at Westport and Ilwaco, the Columbia River from Astoria up to the inland gorges, and the freshwater Lake Washington and Lake Union complex within Seattle. Whether you need year-round dockage in Lake Union, transient slips in Friday Harbor for a San Juan Islands cruise, a refit yard in Anacortes, or a salmon-charter berth in Westport, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "Washington's Marina Landscape",
        body:
          "Washington runs the most varied saltwater-and-freshwater marina market in the Pacific Northwest. Puget Sound is the dominant cruising region — Seattle (Shilshole Bay, Elliott Bay, Lake Union, Lake Washington), Tacoma, Olympia, Bremerton, Port Townsend, Anacortes, and Bellingham anchor a Sound-wide cruising network. Anacortes is the unofficial gateway to the San Juan Islands, with major refit yards (Cap Sante, Skyline) and the largest charter fleet in the region. The San Juan Islands themselves (Friday Harbor, Roche Harbor, Deer Harbor, Lopez Village) host destination marinas catering to summer cruisers and the heavy U.S.-Canada border traffic. The Strait of Juan de Fuca and the outer coast at La Push, Neah Bay, and Sekiu support working fishing fleets and weather-window cruisers. The Pacific coast harbors at Westport and Ilwaco anchor the salmon and tuna charter fleet. The Columbia River corridor — Astoria, Cathlamet, Longview-Kelso, Portland-Vancouver, Hood River, The Dalles — supports a mixed fishing-and-cruising market that extends inland through the Columbia River Gorge. Lake Washington and Lake Union within Seattle host one of the densest urban freshwater marina clusters in the country, with year-round operation and significant liveaboard population."
      },
      {
        heading: "PNW Cruising Season, Tides, and U.S.-Canada Border Logistics",
        body:
          "Three Washington-specific factors shape every marina decision. The Pacific Northwest cruising season runs effectively May through September, with peak demand June-August. Most Puget Sound marinas operate year-round (no ice issues except occasional shallow-bay freezing), but slip availability tightens dramatically in summer at popular destination marinas (Friday Harbor, Roche Harbor, Port Townsend) — book transient slips 4-8 weeks ahead during peak season. Tides are substantial and matter: 8-14 foot tide ranges are typical, currents at Deception Pass, Tacoma Narrows, Admiralty Inlet, and the San Juan Islands passes can run 5-9 knots, requiring tide-aware passage planning. Many cruisers consult the Puget Sound Tides app or the Washburne's tide and current tables before each transit. U.S.-Canada border crossings are real for any cruising into British Columbia (Gulf Islands, Vancouver, Princess Louisa Inlet) — vessels must check in at designated entry ports (Roche Harbor, Friday Harbor, Anacortes, Point Roberts) and clear CBP on return. Slip rates run $25-55 per foot per month at premier Seattle/Anacortes/Friday Harbor facilities, $15-40 elsewhere on the Sound, $20-45 on the Pacific coast, and $20-45 on the Columbia River. Liveaboard slips are tightly regulated and command premium rates."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Washington's marina market splits into five distinct regions. Seattle metro and Lake Washington/Lake Union (King County): year-round operation, dense urban marina cluster, significant liveaboard population, deepest yacht service and refit infrastructure. Anacortes, Bellingham, and the North Sound: gateway to the San Juans, largest concentration of refit yards in the region, charter fleet base. San Juan Islands: destination cruising market, summer peak with multi-week wait lists at popular harbors, liveaboard-friendly at some facilities. Olympic Peninsula and outer coast (Port Townsend, Port Angeles, La Push, Neah Bay, Sekiu, Westport, Ilwaco): working fishing fleets, weather-window cruising, lower density. Columbia River corridor (Astoria, Longview, Vancouver, Hood River, The Dalles): mixed fishing and cruising, freshwater above Bonneville Dam, gorge winds make Hood River one of the country's premier sailing and windsurfing destinations. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a Washington marina?",
        a: "Monthly slip rates in Washington vary by region. Seattle metro and Lake Union/Washington: $30-60 per foot per month, with liveaboard slips at premium pricing. Anacortes, Bellingham, San Juan Islands: $25-55 per foot. Tacoma, Olympia, Bremerton: $20-45 per foot. Pacific coast and Columbia River: $20-45 per foot. Annual contracts typically discount 10-20% from monthly rates. Liveaboard slip availability is tightly regulated by city and county; most marinas cap liveaboard density at 10-20% of total slips."
      },
      {
        q: "When is San Juan Islands cruising season?",
        a: "Peak San Juans cruising runs June through August, with shoulder-season cruising in May and September. Most destination harbors (Friday Harbor, Roche Harbor, Deer Harbor) require transient slip bookings 4-8 weeks ahead during peak. Some marinas have multi-month wait lists for summer permanent slips. Off-season cruising October-April is much quieter; many smaller marinas reduce hours. The San Juans rarely freeze, so year-round access is possible at most facilities, but services are limited in winter."
      },
      {
        q: "Do I need to clear customs to cruise from Washington to Canada?",
        a: "Yes. U.S. vessels entering Canadian waters must check in with Canada Border Services Agency by phone (1-888-226-7277) at the first port of call. Returning U.S. vessels must clear U.S. Customs and Border Protection at a designated entry port — Roche Harbor, Friday Harbor, Anacortes, Point Roberts, or Bellingham. Both countries require advance arrival notification and proper documentation (passports, vessel registration, NEXUS for expedited clearance). Plan crossings with adequate daylight to clear customs before marinas close."
      }
    ]
  },
  "north-carolina": {
    introOverride:
      "North Carolina has 268 marinas spanning the Outer Banks barrier-island chain, the Pamlico and Albemarle Sounds (the second-largest estuarine system on the East Coast), the Intracoastal Waterway from Currituck to South Carolina, the Cape Fear River and Wilmington's busy port, and inland lakes like Lake Norman, Lake Gaston, and the High Rock Lake chain. Whether you need offshore charter dockage in Hatteras or Morehead City, transient slips on the ICW, hurricane-protected dockage during Outer Banks storm cycles, or year-round inland dockage on Lake Norman, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "North Carolina's Marina Landscape",
        body:
          "North Carolina runs one of the most diverse Atlantic-coast-and-inland marina markets in the country. The Outer Banks (Manteo, Wanchese, Hatteras, Ocracoke) anchor the offshore charter fishing fleet — Oregon Inlet, Hatteras Inlet, and Beaufort Inlet provide Gulf Stream access for marlin, tuna, sailfish, and dolphinfish. Morehead City and Beaufort host the country's deepest blue-marlin tournament tradition, with major facilities supporting a year-round charter fleet. The Intracoastal Waterway runs the entire length of the state and supports a steady transient-cruiser flow during the spring and fall snowbird migrations — Coinjock, Belhaven, Oriental, Beaufort, Swansboro, Wrightsville Beach, Carolina Beach, Southport, and the Calabash area all serve ICW traffic. Pamlico and Albemarle Sounds host a quieter cruising scene with marinas at Edenton, Plymouth, Washington (NC), Bath, Belhaven, and Engelhard. Wilmington and the Cape Fear River support a major cruising stopover plus the heavy commercial port. Inland, Lake Norman north of Charlotte (the largest man-made lake in NC at 32,500 acres) anchors a year-round powerboat and bass-tournament market with dozens of marinas; Lake Gaston, High Rock Lake, Jordan Lake, and Falls Lake support smaller inland marina scenes. The Western mountain region has limited marina access — small facilities at Lake James, Lake Hickory, and Fontana Lake."
      },
      {
        heading: "Hurricane Season, Outer Banks Inlet Conditions, and ICW Transient Patterns",
        body:
          "Three North Carolina-specific factors shape every marina decision. Hurricane season (June 1 through November 30, peaking August-October) heavily affects Outer Banks and coastal marinas — Hurricanes Florence (2018), Dorian (2019), and Matthew (2016) generated major destruction across the coastal marina network. Most Outer Banks and ICW marinas have written hurricane plans; many require haul-out or relocation 48-72 hours before named storm landfall, and some facilities (particularly on the Outer Banks) require full evacuation when major storms threaten direct landfall. Outer Banks inlet conditions are dynamic and dangerous: Oregon Inlet, Hatteras Inlet, and Beaufort Inlet shoal seasonally, and breaking surf at the inlet entrances during outgoing tides combined with onshore winds can be lethal. Captains monitor inlet conditions daily; marinas at the inlet harbors (Wanchese, Hatteras, Beaufort) often have the most current local conditions information. Transient ICW traffic peaks twice yearly — fall southbound migration (October-November) heading to Florida and the Bahamas, and spring northbound (April-May) heading north for summer. Marinas along the route (Coinjock, Belhaven, Oriental, Wrightsville Beach) book transient slips heavily during these windows, often 1-2 weeks ahead during peak migration. Slip rates run $25-55 per foot per month at premier coastal facilities, $15-35 inland, and $20-45 on Lake Norman."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "North Carolina's marina market splits into five distinct regions. Outer Banks (Currituck, Dare, Hyde counties): offshore charter fishing dominance, hurricane-vulnerable, seasonal demand peaks in summer charter season, limited slip count relative to demand. Pamlico and Albemarle Sounds (Belhaven, Oriental, Edenton, Bath, Manteo back-side): quieter cruising, sailing club scene, lower dockage rates than Outer Banks, ICW connection. Crystal Coast and Cape Fear corridor (Beaufort, Morehead City, Swansboro, Wrightsville Beach, Carolina Beach, Southport, Calabash): heavy ICW transient traffic, blue-marlin tournament tradition, strong resort-area marina scene. Inland lakes (Lake Norman, Lake Gaston, High Rock, Jordan, Falls): year-round powerboat fleet, bass tournaments, lower dockage rates, Lake Norman dominance with dozens of facilities. Western mountains (Lake James, Lake Hickory, Fontana Lake, Lake Glenville): limited marina access, smaller facilities serving regional powerboaters. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a North Carolina marina?",
        a: "Slip rates in North Carolina vary by region. Outer Banks (Hatteras, Manteo, Wanchese): $30-65 per foot per month, with charter-friendly facilities at the high end. Crystal Coast (Beaufort, Morehead City, Wrightsville Beach): $25-55 per foot. Inland sounds (Belhaven, Oriental, Edenton): $20-40 per foot. Cape Fear River and Wilmington: $25-50 per foot. Lake Norman and inland lakes: $20-45 per foot. Annual contracts typically discount 10-20% from monthly rates. Many coastal marinas offer storm-watch contingency pricing during hurricane season."
      },
      {
        q: "When is the best time to cruise the North Carolina ICW?",
        a: "Two peak windows: fall southbound (October-November) when cruisers head to Florida and the Bahamas, and spring northbound (April-May) when boats return north for summer. Both windows pack transient slips along the route — book Coinjock, Belhaven, Oriental, and Wrightsville Beach 1-2 weeks ahead during peak migration. Summer (June-September) is hurricane-vulnerable on the coast. Winter (December-March) is quieter but cold and weather-window-dependent. Pre-Christmas southbound and post-Easter northbound are the most practical migration windows for most cruisers."
      },
      {
        q: "How does hurricane season affect Outer Banks marinas?",
        a: "Hurricane season runs June 1 through November 30, peaking August through October. Outer Banks marinas face direct hurricane exposure — Hurricanes Florence (2018), Dorian (2019), and Matthew (2016) all caused major destruction to the coastal marina network. Most facilities have hurricane plans requiring haul-out or relocation within 48-72 hours of named-storm landfall forecast. Some Outer Banks marinas require full evacuation during major storms. Marina insurance for Outer Banks vessels remaining during hurricane season has tightened significantly. Confirm your marina's hurricane plan and your insurance coverage before signing dockage contracts."
      }
    ]
  },
  massachusetts: {
    introOverride:
      "Massachusetts has 238 marinas spanning Boston Harbor's deep urban marina cluster, Cape Cod and the islands (Martha's Vineyard, Nantucket, the Elizabeth Islands), the South Coast from Buzzards Bay through New Bedford and Westport, the North Shore from Salem to Newburyport, and the inland Connecticut River and Quabbin Reservoir freshwater systems. Whether you need a year-round Boston slip, transient dockage at Edgartown for a Vineyard summer, a working slip in New Bedford's commercial port, or a club mooring on Buzzards Bay, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "Massachusetts's Marina Landscape",
        body:
          "Massachusetts runs one of the most concentrated saltwater marina markets on the East Coast. Boston Harbor and the inner harbor (Charlestown, East Boston, Quincy, Hingham, Hull) host a dense urban marina cluster with year-round operation, supporting commercial fishing fleets, working harbor traffic, and pleasure boating from the same waters. The North Shore from Lynn through Salem, Marblehead, Beverly, Manchester, Gloucester, Rockport, Ipswich, and Newburyport hosts a deeply traditional yachting culture — Marblehead and Gloucester anchor some of the country's oldest yacht clubs and the most prestigious sailing race scene. The South Shore from Hingham through Plymouth, Duxbury, Marshfield, and Scituate supports a quieter cruising market with strong powerboat presence. Cape Cod (Sandwich, Falmouth, Hyannis, Chatham, Provincetown, Wellfleet, Truro) and the islands (Martha's Vineyard at Vineyard Haven, Edgartown, Oak Bluffs, Menemsha; Nantucket harbor) anchor the country's most concentrated summer-cruising destination market — slip availability is among the tightest anywhere from Memorial Day through Labor Day. Buzzards Bay (Marion, Mattapoisett, New Bedford, Westport, Padanaram) supports a strong sailing scene, with the New Bedford working harbor handling commercial fishing, ferry traffic, and pleasure boating side-by-side. Inland, the Connecticut River corridor (Northampton, Holyoke, Springfield) and Quabbin Reservoir support smaller freshwater marina scenes."
      },
      {
        heading: "Cape and Islands Demand, Hurricane Exposure, and Mooring Logistics",
        body:
          "Three Massachusetts-specific factors shape every marina decision. Cape and Islands demand is the tightest summer marina market in the country — Edgartown, Vineyard Haven, Nantucket, and Provincetown maintain multi-year wait lists for permanent slips, with transient dockage during peak season (July-August) booking 8-12 weeks ahead at minimum. Town moorings (where dockage isn't available) require local resident affiliations or yacht club membership in many cases; a substantial portion of the Cape's boating fleet uses moorings rather than slips. Hurricane exposure is real for Massachusetts: the Bay Area and Cape are tracks for hurricanes that bend up the East Coast, and Hurricane Bob (1991) and several recent named storms have produced major surge damage. Most coastal marinas have hurricane plans requiring vessels over a certain size to be hauled or relocated 48-72 hours before landfall; the Cape and Islands have particularly aggressive evacuation requirements during major storm threats. Slip availability statewide tightens dramatically Memorial Day through Labor Day. Slip rates run $50-90 per foot per month in Boston Harbor and the inner harbor, $40-80 per foot on the Cape and Islands, $30-60 per foot on the North Shore, $25-55 per foot on Buzzards Bay, and $20-45 per foot inland. Mooring fees (where available) typically run $400-1,200 per season."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Massachusetts's marina market splits into five distinct regions. Boston Harbor and inner harbor (Boston, Charlestown, Quincy, Hingham, Hull): year-round operation, dense urban marina cluster, commercial-and-pleasure mixed-use harbors. North Shore (Salem, Marblehead, Beverly, Manchester, Gloucester, Newburyport): deeply traditional yachting culture, prestigious racing scene, premium dockage at Marblehead and Gloucester. South Shore (Hingham, Plymouth, Duxbury, Marshfield, Scituate): quieter cruising market, strong powerboat presence, lower demand than North Shore. Cape Cod and the islands (Falmouth, Hyannis, Chatham, Provincetown, Vineyard Haven, Edgartown, Oak Bluffs, Nantucket): tightest summer demand in the country, multi-year wait lists at premier facilities, transient bookings 8-12 weeks ahead in peak season. Buzzards Bay and South Coast (Marion, Mattapoisett, New Bedford, Westport): strong sailing scene, mixed commercial-and-pleasure harbors at New Bedford, mid-priced dockage. Inland (Connecticut River corridor, Quabbin Reservoir, smaller lakes): seasonal freshwater operation, smaller marina footprints, lowest dockage rates. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a Massachusetts marina?",
        a: "Slip rates in Massachusetts vary by region. Boston Harbor and inner harbor: $50-90 per foot per month. Cape Cod and islands (Edgartown, Vineyard Haven, Nantucket, Provincetown): $40-80 per foot, with premier facilities running higher and multi-year wait lists. North Shore (Marblehead, Gloucester, Salem): $30-60 per foot. Buzzards Bay and South Coast: $25-55 per foot. South Shore: $25-50 per foot. Mooring fees, where available, typically run $400-1,200 per season. Annual contracts typically discount 10-20% from monthly rates."
      },
      {
        q: "How far ahead should I book a Cape Cod or Nantucket marina slip?",
        a: "For peak season (July-August) at Edgartown, Vineyard Haven, Nantucket harbor, Provincetown, or Hyannis: book transient slips 8-12 weeks ahead minimum. Permanent seasonal slips at these destinations typically have multi-year wait lists. Shoulder season (June and September) is more available with 4-6 week notice. Off-Cape destinations like Falmouth, Sandwich, and lesser-known Cape harbors are easier to book on shorter notice. Town mooring availability varies and often requires local resident affiliation or yacht club membership."
      },
      {
        q: "How does hurricane season affect Massachusetts marinas?",
        a: "Hurricane exposure is real for Massachusetts coastal waters. Hurricane Bob (1991) and several subsequent named storms caused major surge damage. Most coastal marinas have hurricane plans requiring vessels over a certain size to be hauled or relocated 48-72 hours before named-storm landfall forecast. Cape and Islands marinas have particularly aggressive evacuation requirements during major storm threats. Marina insurance underwriting for vessels remaining at coastal Massachusetts marinas during hurricane season has tightened. Confirm your marina's hurricane plan and your insurance hurricane coverage before signing dockage contracts."
      }
    ]
  },
  "new-jersey": {
    introOverride:
      "New Jersey has 233 marinas spanning the Hudson and Raritan riverfront across from Manhattan, the Atlantic coast from Sandy Hook to Cape May, the Intracoastal Waterway through the back bays of Barnegat, Great Bay, and Great Egg Harbor, the Delaware Bay and River, and inland lakes like Lake Hopatcong and the Pine Barrens reservoirs. Whether you need a year-round Hudson River slip with a Manhattan view, transient dockage at Cape May for a Delaware Bay crossing, sportfishing dockage at Cape May or Brielle, or a back-bay slip in the Long Beach Island region, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "New Jersey's Marina Landscape",
        body:
          "New Jersey runs one of the most varied saltwater marina markets on the East Coast — bookended by the Hudson River across from Manhattan in the north and Cape May at the entrance to Delaware Bay in the south. The Hudson River and Raritan Bay (Liberty Landing, Hoboken, Edgewater, Weehawken, Fort Lee, Atlantic Highlands) host an urban marina cluster catering to NYC commuters and weekend cruisers. The northern Atlantic coast from Sandy Hook through Asbury Park, Belmar, Manasquan, and Brielle anchors a strong sportfishing fleet — Brielle hosts one of the largest charter fleets in the Northeast for tuna, marlin, and offshore work. The Manasquan Inlet provides reliable Atlantic access. Barnegat Bay and the Long Beach Island corridor (Toms River, Forked River, Beach Haven, Long Beach Township) host a dense back-bay marina cluster serving the heaviest summer-vacation boating market on the Jersey coast. Atlantic City and the Great Egg Harbor / Great Bay system support sportfishing and commercial-pleasure mixed-use marinas. Cape May at the southern tip is the country's premier sportfishing tournament hub — major facilities support marlin, tuna, and offshore tournament traffic, plus the Delaware Bay crossing for ICW cruisers. Inland, Lake Hopatcong (the largest lake in NJ at 2,685 acres) anchors a year-round powerboat fleet, and Pine Barrens reservoirs support smaller freshwater marina scenes."
      },
      {
        heading: "Sportfishing Tournaments, Hurricane Exposure, and ICW Logistics",
        body:
          "Three New Jersey-specific factors shape every marina decision. Sportfishing tournament season (May through October) drives heavy demand at Brielle, Cape May, and Atlantic City marinas — the White Marlin Open (Ocean City MD-adjacent), the South Jersey Marina Mid-Atlantic, and dozens of smaller tournaments fill slip availability for weeks at a time during peak windows. Tournament boats reserve slip space months ahead. Hurricane exposure is severe for New Jersey: Sandy (2012) destroyed or damaged hundreds of marinas across the Jersey Shore and Hudson River corridor; the Jersey coast remains one of the most hurricane-vulnerable marina markets on the East Coast. Most coastal marinas have hurricane plans requiring vessels over a certain size to be hauled or relocated 48-72 hours before named-storm landfall forecast; many post-Sandy facilities now require enhanced surge protection and proof of hurricane insurance. ICW cruiser traffic is heavy in fall (southbound to Florida via Cape May) and spring (northbound to summer destinations via the Hudson) — Cape May and Atlantic Highlands serve as primary transient stopover points. Slip rates run $40-80 per foot per month on the Hudson and northern coast, $30-60 per foot in Barnegat Bay and Atlantic City, $35-70 per foot in Cape May, and $20-40 per foot at Lake Hopatcong and inland."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "New Jersey's marina market splits into five distinct regions. Hudson River and Raritan Bay (Liberty Landing, Hoboken, Edgewater, Atlantic Highlands): urban commuter-and-weekend market, year-round operation at most facilities, premium dockage rates with Manhattan-view premiums. Northern Atlantic coast (Sandy Hook, Belmar, Manasquan, Brielle): sportfishing fleet dominance, charter operation hub, mid-to-high dockage rates. Barnegat Bay and Long Beach Island corridor (Toms River, Forked River, Beach Haven, Long Beach Township): heaviest summer back-bay vacation market, dense marina cluster, summer peak with multi-week transient bookings. Atlantic City and South Jersey (Atlantic City, Margate, Ocean City NJ, Brigantine): sportfishing focus, casino-adjacent demand patterns, hurricane-vulnerable. Cape May (southern tip): country's premier sportfishing tournament hub, ICW transient stopover, Delaware Bay crossing logistics. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a New Jersey marina?",
        a: "Slip rates in New Jersey vary by region. Hudson River and Raritan Bay: $40-80 per foot per month, with Manhattan-view facilities running higher. Northern Atlantic coast (Brielle, Manasquan, Belmar): $35-70 per foot. Barnegat Bay and LBI corridor: $25-55 per foot. Atlantic City and South Jersey: $30-60 per foot. Cape May: $35-70 per foot, with tournament-friendly facilities at the high end. Lake Hopatcong and inland: $20-40 per foot. Annual contracts typically discount 10-20% from monthly rates. Many post-Sandy facilities now charge surge-protection surcharges during hurricane season."
      },
      {
        q: "When is sportfishing tournament season in New Jersey?",
        a: "New Jersey sportfishing tournament season runs May through October, peaking June through September. Major events include the South Jersey Marina Mid-Atlantic, Manasquan River Marlin and Tuna Club tournaments, Cape May tournaments, and dozens of smaller club and charter events. Tournament boats reserve slips months ahead at Brielle, Cape May, and Atlantic City; transient slip availability can be tight even on weekdays during peak tournament windows. Confirm scheduling before planning summer cruises that need transient dockage at these ports."
      },
      {
        q: "How does hurricane season affect New Jersey marinas?",
        a: "Hurricane exposure is severe — Sandy (2012) destroyed or damaged hundreds of New Jersey marinas, and the Jersey coast remains one of the most hurricane-vulnerable marina markets on the East Coast. Most coastal marinas have hurricane plans requiring vessels over a certain size to be hauled or relocated 48-72 hours before named-storm landfall forecast. Post-Sandy, many facilities require enhanced surge protection and proof of hurricane insurance. Marina insurance underwriting has tightened significantly. Confirm your marina's hurricane plan and your insurance hurricane coverage before signing dockage contracts."
      }
    ]
  },
  virginia: {
    introOverride:
      "Virginia has 231 marinas spanning the Chesapeake Bay's southern reach (Hampton Roads, the Lower Bay, the Eastern Shore), the four major rivers that feed the Bay (the Potomac, Rappahannock, York, and James), the Atlantic coast at Virginia Beach, the Intracoastal Waterway from Norfolk south, and inland reservoirs like Smith Mountain Lake, Lake Anna, and Lake Gaston. Whether you need a year-round slip in Norfolk's Hampton Roads naval port, transient dockage on the ICW heading south, a club mooring on the Northern Neck, or a year-round freshwater slip on Smith Mountain Lake, the directory below shows marinas with verified slip counts, fuel availability, transient policies, and amenity details.",
    h2Blocks: [
      {
        heading: "Virginia's Marina Landscape",
        body:
          "Virginia runs one of the most varied Bay-and-river marina markets on the East Coast. Hampton Roads (Norfolk, Portsmouth, Newport News, Hampton, Virginia Beach) anchors the southern Bay market — the largest naval base in the world (Naval Station Norfolk) plus the heaviest commercial port traffic on the Bay create a unique mixed-use harbor environment with major facilities like Waterside, Tidewater Yacht Marina, and the Hampton waterfront. The Lower Chesapeake (Yorktown, Gloucester, Mathews County) supports a quieter cruising scene with deep history. The four river systems each anchor their own cruising markets: the Potomac River (lower stretch from Colonial Beach south through Reedville and Coles Point), the Rappahannock (Tappahannock, Urbanna, Deltaville, Kilmarnock, Irvington), the York (Yorktown, West Point, Gloucester Point), and the James (Williamsburg, Surry, Charles City, Hopewell). Deltaville on the lower Rappahannock is unofficially the Bay's southern sailing capital. The Eastern Shore (Cape Charles, Onancock, Wachapreague, Chincoteague) supports a different market — quieter, more remote, with strong waterfowling heritage. Virginia Beach hosts a smaller Atlantic-coast marina cluster with offshore charter capability. Inland, Smith Mountain Lake (the largest lake in VA at 20,600 acres) anchors a year-round powerboat market, with Lake Anna, Lake Gaston (shared with NC), Claytor Lake, and Kerr Lake supporting smaller freshwater marina scenes."
      },
      {
        heading: "Bay Cruising, ICW Transient Patterns, and Hurricane Exposure",
        body:
          "Three Virginia-specific factors shape every marina decision. Bay cruising season runs effectively April through November, with peak demand May through October. Most Virginia marinas operate year-round — the southern Bay rarely freezes hard, and Hampton Roads stays accessible all winter — though most pleasure boats are wintered between November and April. Norfolk is the southern terminus of the upper Bay cruising network and the start of the ICW heading south to Florida; transient cruiser traffic peaks heavily in fall (October-November southbound migration) and spring (April-May northbound). Norfolk-area marinas (Tidewater, Waterside, plus the Portsmouth side) book transient slips heavily during these windows. Hurricane exposure is real for Hampton Roads and the lower Bay — Hurricanes Isabel (2003), Sandy (2012), and several recent named storms have produced major surge damage. Most coastal marinas have hurricane plans requiring vessels over a certain size to be hauled or relocated 48-72 hours before named-storm landfall forecast. Hampton Roads' deep-water port location means storm surge funnels dramatically up the rivers during hurricane events. Slip rates run $25-55 per foot per month at premier Hampton Roads facilities, $20-45 per foot on the Bay rivers (Rappahannock, Potomac, York), $30-60 per foot at Virginia Beach, and $20-40 per foot on inland reservoirs."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Virginia's marina market splits into five distinct regions. Hampton Roads (Norfolk, Portsmouth, Newport News, Hampton): largest concentration, year-round operation, ICW southern terminus drives heavy fall and spring transient traffic, mixed naval-commercial-pleasure harbor environment. Bay Rivers — Potomac, Rappahannock, York, James (Colonial Beach, Reedville, Tappahannock, Urbanna, Deltaville, Kilmarnock, Irvington, Yorktown, Williamsburg): traditional cruising market, sailing club scene strong on the Rappahannock, lower dockage rates than Hampton Roads, summer-peak demand. Eastern Shore (Cape Charles, Onancock, Wachapreague, Chincoteague): quieter cruising, waterfowling heritage, lower density, the most remote marina market in Virginia. Virginia Beach Atlantic coast: smaller Atlantic-coast cluster, offshore charter capability, mid-priced dockage. Inland reservoirs (Smith Mountain Lake, Lake Anna, Lake Gaston, Claytor Lake, Kerr Lake): year-round powerboat fleet, lower dockage rates, Smith Mountain Lake dominance with dozens of facilities. The directory above includes coverage across all five regions."
      }
    ],
    faqExtra: [
      {
        q: "How much does it cost to keep a boat in a Virginia marina?",
        a: "Slip rates in Virginia vary by region. Hampton Roads (Norfolk, Portsmouth, Hampton): $25-55 per foot per month. Bay rivers (Rappahannock, Potomac, York, James): $20-45 per foot, with Deltaville and Urbanna at the high end. Virginia Beach: $30-60 per foot. Eastern Shore (Cape Charles, Onancock): $20-40 per foot. Smith Mountain Lake and inland reservoirs: $20-40 per foot. Annual contracts typically discount 10-20% from monthly rates."
      },
      {
        q: "When is the best time to use Virginia marinas as an ICW stopover?",
        a: "Two peak windows: fall southbound (October-November) when cruisers head from the Bay to Florida and the Bahamas via the ICW, and spring northbound (April-May) when boats return north. Both windows pack transient slips at Hampton Roads and Norfolk facilities (Tidewater, Waterside, plus Portsmouth side) — book 1-2 weeks ahead during peak migration. Summer (June-September) is hurricane-vulnerable on the lower Bay. Winter cruising is quieter but weather-window-dependent; pre-Christmas southbound and post-Easter northbound are the most practical migration windows."
      },
      {
        q: "How does hurricane season affect Hampton Roads marinas?",
        a: "Hurricane exposure is real for Hampton Roads and the lower Bay. Hurricanes Isabel (2003), Sandy (2012), and several recent named storms have produced major surge damage. Hampton Roads' deep-water port location means storm surge funnels dramatically up the rivers during hurricane events. Most coastal marinas have hurricane plans requiring vessels over a certain size to be hauled or relocated 48-72 hours before named-storm landfall forecast. Marina insurance for vessels remaining at Hampton Roads marinas during hurricane season has tightened significantly. Confirm your marina's hurricane plan and your insurance hurricane coverage before signing dockage contracts."
      }
    ]
  }
};

export function getStateEditorial(stateSlug: string): StateEditorial | null {
  return STATE_EDITORIAL[stateSlug] || null;
}
