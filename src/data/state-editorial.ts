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
  // Remaining top-10 entries will be added in batches:
  // new-york, california, michigan, maryland, washington,
  // north-carolina, massachusetts, new-jersey, virginia
};

export function getStateEditorial(stateSlug: string): StateEditorial | null {
  return STATE_EDITORIAL[stateSlug] || null;
}
