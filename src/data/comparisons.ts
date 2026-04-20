export interface ComparisonProduct {
  name: string;
  searchQuery: string;
  price: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface ComparisonRow {
  attribute: string;
  a: string;
  b: string;
  winner?: "a" | "b" | "tie";
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface ComparisonPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  subject: string;
  productA: ComparisonProduct;
  productB: ComparisonProduct;
  intro: string;
  comparisonRows: ComparisonRow[];
  body: string;
  verdict: string;
  verdictWinner: "a" | "b" | "both";
  faqs: ComparisonFaq[];
  relatedStates?: string[];
  relatedBlog?: string[];
}

export const comparisons: ComparisonPage[] = [
  {
    slug: "wet-slip-vs-dry-storage",
    title: "Wet Slip vs Dry Stack Storage: Which Is Better for Your Boat?",
    metaTitle: "Wet Slip vs Dry Stack Storage: Pros, Cons, and Costs (2026)",
    metaDescription:
      "Wet slip vs dry stack marina storage compared: cost, hull maintenance, weather protection, access time, and boat size limits. Honest verdict for 2026 boaters.",
    subject: "marina storage",
    productA: {
      name: "Wet Slip (boat kept in water year-round)",
      searchQuery: "",
      price: "$100-600+/ft/year",
      pros: [
        "Instant access - step aboard and go",
        "Plug into shore power at the dock",
        "Liveaboard-capable at most marinas",
        "Suits sailboats and larger vessels without size caps",
        "Easier to work on the boat while tied to the dock",
      ],
      cons: [
        "Hull growth requires bottom paint and periodic cleaning",
        "Constant weather exposure (sun, rain, wind, UV)",
        "Higher insurance premiums due to in-water risk",
        "Vulnerable to storm surge and hurricane damage",
      ],
      bestFor: "Sailboats, liveaboards, and owners who want quick access",
    },
    productB: {
      name: "Dry Stack Storage (boat in rack, launched on request)",
      searchQuery: "",
      price: "$70-400+/ft/year",
      pros: [
        "No bottom growth since the boat is out of the water",
        "No bottom paint required, saving several hundred dollars a year",
        "Less weather damage - boats are often under cover",
        "Generally cheaper per foot than a wet slip",
        "Fewer antifouling and hull-cleaning costs over time",
      ],
      cons: [
        "Launch-on-demand with limits on busy weekends and holidays",
        "Size cap (usually 30-40 ft and a weight limit)",
        "Not suitable for liveaboard use",
        "Cannot leave gear on the boat between trips",
      ],
      bestFor: "Smaller powerboats and weekend fishermen who value protection",
    },
    intro:
      "Choosing between a wet slip and dry stack storage is one of the biggest decisions a new boat owner makes at the marina. The two options affect your annual cost, how often you use the boat, and how much time you spend on hull maintenance over the life of the vessel.\n\nThis comparison covers common industry pricing, maintenance tradeoffs, access patterns, and weather exposure so you can match the storage style to the way you actually boat. Neither option is objectively better - the right answer depends on your boat size, how often you go out, and whether you want liveaboard flexibility or lower running costs.",
    comparisonRows: [
      {
        attribute: "Annual cost",
        a: "$100-600+/ft/year (varies by region)",
        b: "$70-400+/ft/year (typically 20-30% less)",
        winner: "b",
      },
      {
        attribute: "Hull maintenance",
        a: "Bottom paint every 1-2 years, regular cleaning",
        b: "Minimal - hull stays dry between trips",
        winner: "b",
      },
      {
        attribute: "Weather exposure",
        a: "Full exposure to sun, wind, and storm surge",
        b: "Usually covered or inside a building",
        winner: "b",
      },
      {
        attribute: "Liveaboard possible",
        a: "Yes, at most marinas that allow it",
        b: "No - boat is in a rack when not in use",
        winner: "a",
      },
      {
        attribute: "Boat size limit",
        a: "Essentially unlimited (slip size dependent)",
        b: "Capped around 30-40 ft and 15,000-20,000 lb",
        winner: "a",
      },
      {
        attribute: "Access time",
        a: "Instant - walk down the dock and go",
        b: "15-45 minute launch wait, longer on weekends",
        winner: "a",
      },
      {
        attribute: "Insurance cost",
        a: "Higher due to in-water storm and sinking risk",
        b: "Lower since boat is dry and protected",
        winner: "b",
      },
      {
        attribute: "Best for",
        a: "Sailboats, liveaboards, frequent users",
        b: "Small powerboats, weekend fishermen",
        winner: "tie",
      },
    ],
    body: "## What a Wet Slip Actually Costs and Delivers\n\nA **wet slip** is the classic marina experience - your boat stays in the water tied to a fixed or floating dock, plugged into shore power, ready whenever you are. Pricing is typically quoted per foot per year and ranges from around $100/ft/year in rural freshwater lakes to $600/ft/year or more at premium saltwater marinas in South Florida, Southern California, or the Northeast. A **35-ft sailboat** at a typical Florida marina might cost $5,000-$8,000 a year in slip fees alone, before utilities, liveaboard surcharges, or pump-out fees.\n\nThe biggest upside is **convenience**. You can step onto your boat, untie the lines, and be underway in minutes. Sailboats in particular almost always need wet slips because of their mast and draft - you cannot stack a sailboat in a rack system. Liveaboards also need a wet slip with full shore power, water hookup, and sewage pumpout.\n\n## How Dry Stack Storage Changes the Math\n\n**Dry stack storage** (also called rack storage or a dry marina) keeps your boat on a steel rack inside a covered building. When you want to go boating, you call or use an app an hour ahead, and a forklift operator pulls your boat down and launches it at a splash pool. When you return, the operator flushes the engine, rinses the hull, and racks the boat again. Typical pricing runs 20-30% less per foot than a wet slip in the same market.\n\nThe hidden savings show up in **hull maintenance**. Because the boat never sits in saltwater, you skip the $500-$2,000 bottom paint job every 1-2 years, you avoid hull cleaning divers, and zinc anodes last far longer. Over a 10-year ownership period, a dry-stacked boat can save $8,000-$15,000 in antifouling costs alone.\n\n## Weather Exposure and Storm Risk\n\nStorms hit wet slips hard. A hurricane or nor'easter can push a boat off its lines, drive floating docks into fixed pilings, or sink a vessel in its slip. Insurance carriers charge more for boats kept afloat and often require named-storm haul-out plans in Florida, the Carolinas, and the Gulf Coast.\n\nDry stack boats, by contrast, sit inside a metal building rated to modern wind codes. During Hurricane Irma and Ian, many dry stack facilities in Florida reported minor damage while nearby wet slips saw total losses. The insurance savings alone can be $300-$800 a year on a mid-size powerboat.\n\n## Access and Lifestyle Tradeoffs\n\nThe real friction in dry stack is **launch-on-demand**. On a quiet Tuesday morning, the forklift operator is idle and your boat is in the water in 10 minutes. On a holiday Saturday in July, the queue can stretch 45-90 minutes, and most dry stack marinas stop launching around 5-6 PM. If your boating pattern is spontaneous or evening-focused, a wet slip removes the scheduling headache.\n\nWet slips also let you **leave gear aboard** between trips - rods, coolers, PFDs, tools. Dry stack boats get racked empty or lightly loaded because weight matters to the forklift, and gear left inside rattles around during lifts.\n\n## Boat Size and Type Determine Your Options\n\nDry stack is essentially a **powerboat solution** for vessels under roughly 40 ft and 20,000 lb. Sailboats, trawlers, and larger center consoles do not fit. If you own a 42-ft Grand Banks or a 38-ft sailboat, a wet slip is your only realistic option at most marinas.\n\nSmaller powerboats (17-32 ft) are the sweet spot for dry stack - the cost savings, reduced maintenance, and weather protection all stack up in your favor.\n\n## Making the Decision\n\nChoose a **wet slip** if you own a sailboat, plan to liveaboard, go boating spontaneously, or keep a vessel larger than 40 ft. Choose **dry stack** if you own a smaller powerboat, value weather protection, want to minimize hull maintenance, and can plan your outings an hour ahead. For many weekend powerboat owners, dry stack is the better long-term value even though wet slips feel more traditional. Before you commit, visit the facility in person, watch a launch cycle during a busy Saturday, and check the marina's hurricane-season policy. Ask about **seasonal rate changes**, peak-summer surcharges, and the waitlist situation at nearby facilities in case your needs change. Finally, talk to current customers - a good dockmaster and a predictable launch queue matter more than a slightly lower per-foot rate, and these are things you only learn by standing on the dock and asking.",
    verdict:
      "Wet slip for sailboats, liveaboards, and quick-access fishing habits. Dry stack for smaller powerboats where protection and lower hull-maintenance costs outweigh the minor friction of requesting a launch.",
    verdictWinner: "both",
    faqs: [
      {
        q: "How much cheaper is dry stack than a wet slip?",
        a: "Dry stack typically costs 20-30% less per foot per year than a wet slip in the same market. You also save several hundred to a couple thousand dollars a year on bottom paint, hull cleaning, and zincs since the boat stays dry between trips. Over a decade of ownership, the combined savings can exceed $10,000 on a mid-size powerboat.",
      },
      {
        q: "Can any boat use dry stack storage?",
        a: "No. Dry stack facilities have size and weight limits dictated by their forklift capacity - typically 30-40 ft in length and 15,000-20,000 lb. Sailboats with fixed masts, trawlers, and heavier cruisers cannot be racked. Most dry stack is used by center consoles, bowriders, and smaller cruisers where a forklift can safely lift the hull.",
      },
      {
        q: "Do I still need bottom paint if I'm in dry stack?",
        a: "No. One of the biggest financial advantages of dry stack is that the hull stays dry between trips, so marine growth never has time to attach. You can run a clean gelcoat bottom with no antifouling paint at all, which saves $500-$2,000 every 1-2 years and preserves resale value since buyers generally prefer an unpainted hull.",
      },
    ],
    relatedStates: ["florida", "california", "michigan"],
    relatedBlog: ["marina-slip-costs", "winter-boat-storage-at-marinas"],
  },
  {
    slug: "marina-vs-private-dock",
    title: "Marina vs Private Dock: Cost and Convenience Comparison",
    metaTitle: "Marina vs Private Dock: Cost, Permits, and Tradeoffs (2026)",
    metaDescription:
      "Marina vs private dock compared: upfront cost, annual maintenance, amenities, security, permits. Honest verdict on which is better for your boat and budget.",
    subject: "dockage",
    productA: {
      name: "Marina Slip Rental",
      searchQuery: "",
      price: "$1,200-15,000+/year",
      pros: [
        "No capital expenditure - pay as you go",
        "Full amenities (fuel, pumpout, showers, laundry, ice)",
        "Built-in community of fellow boaters",
        "Staff handle storm prep and emergency line adjustments",
        "Easy to leave the boat while traveling for weeks",
      ],
      cons: [
        "Ongoing monthly or annual fees that never stop",
        "Less privacy - boats packed close together",
        "Marina rules, quiet hours, and guest restrictions",
        "Waitlists for good slips in popular harbors",
      ],
      bestFor: "Boaters who want amenities and zero capital outlay",
    },
    productB: {
      name: "Private Dock at Waterfront Home",
      searchQuery: "",
      price: "$15,000-150,000 to build + upkeep",
      pros: [
        "True independence - the dock is yours, on your terms",
        "Long-term cost can be lower once construction is paid off",
        "Walk-to-boat convenience from the back yard",
        "Boosts waterfront home value significantly",
        "No rules except the ones you set",
      ],
      cons: [
        "Large upfront construction cost (often $25,000-$75,000)",
        "State and federal permits required (USACE, state DEP)",
        "Annual dock maintenance, pilings, and storm repairs",
        "No amenities - no fuel, pumpout, or pressure wash",
        "Full storm responsibility falls on the owner",
      ],
      bestFor: "Waterfront homeowners who want full independence",
    },
    intro:
      "For waterfront homeowners, the choice between renting a marina slip and building a private dock comes down to capital, permits, and lifestyle. A marina offers amenities and a community; a private dock offers independence and can build long-term equity in your property.\n\nThis comparison walks through construction costs, permit timelines, ongoing maintenance, and the resale impact of a dock on a waterfront home. Pricing figures reflect common industry ranges for 2026 and will vary significantly based on water depth, bottom type, local permitting authority, and whether you want a simple fixed pier or a floating dock with a boat lift.",
    comparisonRows: [
      {
        attribute: "Upfront cost",
        a: "$0 - slip deposit only",
        b: "$15,000-$150,000 construction",
        winner: "a",
      },
      {
        attribute: "Ongoing annual cost",
        a: "$1,200-$15,000+/year in slip fees",
        b: "$500-$3,000/year in maintenance",
        winner: "b",
      },
      {
        attribute: "Amenities",
        a: "Fuel, pumpout, showers, laundry, restaurant",
        b: "None - you build what you need",
        winner: "a",
      },
      {
        attribute: "Community",
        a: "Built-in dock neighbors and social life",
        b: "Private - just you and your neighbors",
        winner: "a",
      },
      {
        attribute: "Permits required",
        a: "None - marina handles everything",
        b: "USACE, state DEP, local zoning (6-18 months)",
        winner: "a",
      },
      {
        attribute: "Security",
        a: "Gated, cameras, staff on-site",
        b: "Whatever you install yourself",
        winner: "a",
      },
      {
        attribute: "Storm support",
        a: "Marina staff help with prep and lines",
        b: "Full responsibility falls on owner",
        winner: "a",
      },
      {
        attribute: "Resale impact",
        a: "None - you rent, you leave",
        b: "Can add $50,000-$250,000 to home value",
        winner: "b",
      },
    ],
    body: "## The Capital vs Cash-Flow Question\n\nA **marina slip** converts boat storage into a recurring operating expense. You pay $1,200-$15,000 or more per year depending on boat size and market - a 35-ft slip in Fort Lauderdale might run $9,000/year, while the same slip on a quiet Michigan lake might be $2,500. There is no capital outlay, which makes a marina easy to enter and easy to leave if you sell the boat.\n\nA **private dock** is a capital project. Typical construction runs **$1,000-$3,000 per linear foot** for a fixed pier, and adding a floating dock, boat lift, and electrical service can push a full build to $75,000-$150,000. For a waterfront homeowner who plans to stay 10+ years, the math often favors building - the dock pays for itself in avoided slip fees and adds substantial value to the home at resale.\n\n## Permits Are the Hidden Complexity\n\nBuilding a private dock is not a weekend project. In most coastal states you need approval from the **US Army Corps of Engineers** (Section 10 of the Rivers and Harbors Act), your state environmental agency (DEP, DNR, or equivalent), and your local zoning authority. In Florida, a simple dock permit takes 3-6 months; in New England or California, 12-18 months is common, and projects touching seagrass, manatee habitat, or Essential Fish Habitat require mitigation.\n\nMarina slips come with zero permit work on your end. The marina already holds its own Corps, state, and local permits, and you simply sign a slip rental agreement.\n\n## Amenities and Community Matter More Than You Think\n\nA good marina is a small village. **Fuel, pumpout, ice, showers, laundry, a ship store, WiFi, and often a restaurant** are all within 100 yards of your slip. If you run out of oil mid-season, the ship store has it. If your battery dies, the dockmaster has jumper cables. If a hurricane is tracking toward the coast, staff help you add storm lines and double up fenders.\n\nPrivate docks offer **none of these things**. You pump your own fuel from a jerry can, you drive to a pumpout station, you store your gear in a garage, and you prep for storms alone. For some owners that independence is the point; for others it becomes a chore by year three.\n\n## Long-Term Cost Math\n\nOver a 20-year horizon, the cost curves cross. A $6,000/year marina slip costs $120,000 over 20 years (before inflation). A $60,000 dock plus $1,500/year maintenance costs $90,000 - cheaper by $30,000, and you still own the dock. If the home sells, the dock typically recovers **70-100% of its construction cost** in added home value, making the effective ownership cost even lower.\n\nThe break-even point is usually **6-10 years** for a moderately priced dock on a moderately priced waterfront property. Shorter ownership windows favor a marina.\n\n## Storm and Insurance Considerations\n\nMarinas carry commercial liability and typically have storm plans, haul-out agreements, and 24/7 staff during named events. Private dock owners must handle storms alone - moving the boat, doubling lines, removing canvas, and potentially hauling the vessel to a yard. In hurricane markets like Florida, the Carolinas, and the Gulf Coast, many insurance carriers require a documented **named-storm plan** before they will write a policy on a boat kept at a private dock.\n\n## Who Wins in the End\n\nChoose a **marina** if you do not own waterfront property, want amenities, travel frequently, or prefer to keep boating a pure operating expense. Choose a **private dock** if you own waterfront property, plan to stay 10+ years, want full independence, and are willing to handle permits, construction, and ongoing maintenance yourself. The two options serve different life situations more than different types of boaters. If you are on the fence, a practical middle path is to **rent a marina slip for your first season or two** while you live with the waterfront property and figure out how you actually use the boat. Permits and construction are easier to plan once you know whether you need a 20-ft piling dock, a 60-ft floating system with a boat lift, or a simple pier with a davit. Many experienced waterfront owners rent locally for two seasons, then build precisely what they want - avoiding the expensive mistake of a dock that is too small, too shallow, or oriented wrong for the prevailing wind.",
    verdict:
      "Marina for amenities, community, and capital-free access to boating. Private dock for waterfront homeowners who want full independence and are willing to handle permits, construction, and maintenance themselves.",
    verdictWinner: "both",
    faqs: [
      {
        q: "Do I need permits to build a private dock?",
        a: "Yes. In most coastal and navigable-water states you need federal approval from the US Army Corps of Engineers, state approval from your environmental agency (DEP, DNR, or equivalent), and local zoning approval. Timelines range from 3-6 months in permit-friendly states like Florida to 12-18 months in California, New England, or sensitive habitat zones. Plan for $2,000-$10,000 in permit and engineering fees before construction begins.",
      },
      {
        q: "Does a private dock add value to a home?",
        a: "Yes, typically quite a bit. A well-built dock with a boat lift can add $50,000-$250,000 to the value of a waterfront home, often recovering 70-100% of construction cost at resale. The resale bump is largest on homes where the dock enables direct water access that the property could not otherwise offer, such as deep-water homes on the ICW or Great Lakes waterfront.",
      },
      {
        q: "Which has lower long-term cost?",
        a: "A private dock is usually cheaper over a 10+ year horizon, especially for larger boats or expensive marina markets. A $60,000 dock plus $1,500/year maintenance beats a $6,000/year marina slip after roughly 8 years. For ownership under 5 years, or for boaters who value amenities and community, the marina is often the better total-cost choice once you factor in the hassle of permits and maintenance.",
      },
    ],
    relatedStates: ["florida", "michigan", "texas"],
    relatedBlog: ["marina-slip-costs", "what-to-look-for-choosing-marina"],
  },
  {
    slug: "mooring-vs-slip",
    title: "Mooring Ball vs Marina Slip: Which Should You Choose?",
    metaTitle: "Mooring Ball vs Marina Slip: Cost and Convenience (2026)",
    metaDescription:
      "Mooring ball vs marina slip compared: cost (50-70% cheaper on a ball), convenience, weather exposure, dinghy needs. Honest verdict for 2026 sailors and boaters.",
    subject: "dockage",
    productA: {
      name: "Mooring Ball (boat tied to anchored buoy)",
      searchQuery: "",
      price: "$30-100+/ft/season",
      pros: [
        "50-70% cheaper than a comparable slip",
        "More swing room - boat rotates with wind and tide",
        "Less hull scrape risk from pilings and fenders",
        "Quieter surroundings away from dock foot traffic",
        "Widely available in New England, Pacific NW, and the Caribbean",
      ],
      cons: [
        "Need a dinghy or launch service to reach the boat",
        "No shore power - battery and solar only",
        "Weather exposed on all sides with no dock protection",
        "Harder to load coolers, gear, and guests",
      ],
      bestFor: "Sailors and cruisers who want to save money and swing free",
    },
    productB: {
      name: "Marina Slip (boat tied to fixed dock)",
      searchQuery: "",
      price: "$100-600+/ft/year",
      pros: [
        "Walk directly to your boat from the parking lot",
        "Shore power, water, and often sewage pumpout",
        "Step-off convenience without a dinghy ride",
        "Easier for kids, pets, and elderly guests",
        "Gear storage at the slip or dock box",
      ],
      cons: [
        "Costs significantly more than a mooring",
        "Tight maneuvering in crowded fairways",
        "Boats rub against fenders in wind and wake",
        "Waitlist in popular harbors - sometimes years long",
      ],
      bestFor: "Families, liveaboards, and convenience-focused boaters",
    },
    intro:
      "Mooring balls and marina slips are the two most common ways to keep a boat in the water seasonally, and the cost difference between them is striking. A mooring is typically 50-70% cheaper than a slip in the same harbor, but you trade away shore power, walk-on access, and the general convenience of a dock.\n\nThis comparison covers seasonal pricing, access logistics, weather exposure, and the kinds of boats and boaters each option fits best. Mooring fields are especially common in New England, the Pacific Northwest, and the Caribbean; slips dominate most Florida, Great Lakes, and Gulf Coast marinas. Both options work well - the right choice depends on your boat, your budget, and how you actually use the water.",
    comparisonRows: [
      {
        attribute: "Seasonal cost",
        a: "$30-100+/ft/season (often 50-70% cheaper)",
        b: "$100-600+/ft/year",
        winner: "a",
      },
      {
        attribute: "Access method",
        a: "Dinghy ride or launch service required",
        b: "Walk from the parking lot to the boat",
        winner: "b",
      },
      {
        attribute: "Shore power",
        a: "None - battery, solar, or generator only",
        b: "Standard 30A or 50A service at the slip",
        winner: "b",
      },
      {
        attribute: "Weather exposure",
        a: "Exposed on all sides, swings with wind",
        b: "Partly protected by dock structure and neighbors",
        winner: "b",
      },
      {
        attribute: "Dinghy required",
        a: "Yes - or pay for launch service",
        b: "No - walk aboard",
        winner: "b",
      },
      {
        attribute: "Ease of loading",
        a: "Gear must be ferried in a dinghy",
        b: "Roll a cart straight to the boat",
        winner: "b",
      },
      {
        attribute: "Availability",
        a: "Common in NE, PNW, Caribbean harbors",
        b: "Widespread but often waitlisted",
        winner: "tie",
      },
      {
        attribute: "Best for",
        a: "Sailors, cruisers, cost-conscious owners",
        b: "Families, liveaboards, frequent users",
        winner: "tie",
      },
    ],
    body: "## How Much You Actually Save on a Mooring\n\nThe headline number is the cost. A **mooring ball** in a typical New England harbor runs $30-$100/ft per season, while a slip in the same harbor runs $100-$300/ft per season. On a 35-ft sailboat that translates to roughly $2,000-$3,500 for a mooring versus $5,000-$10,000 for a slip - savings of 50-70%. The cost gap is even wider in premium harbors like Newport, Edgartown, Nantucket, and Sausalito where slip waitlists can stretch years and mooring balls are the only practical option for most boats.\n\nMunicipal mooring fields in towns like Marblehead, Boothbay Harbor, and Friday Harbor offer the best pricing, while private yacht clubs charge more but often include launch service, dinghy dock, and clubhouse access.\n\n## The Dinghy Reality\n\nThe biggest daily friction of a mooring is **getting out to the boat**. You either own a dinghy (inflatable, hard tender, or small skiff) and row or outboard out to the mooring, or you rely on a **harbor launch service** that runs on a schedule or on-call via VHF. Launch services in New England typically cost $200-$500 per season and run from about 7 AM to 10 PM in summer.\n\nA dinghy adds complexity - you need a place to store it, fuel for the outboard, and a dinghy dock ashore. Loading coolers, groceries, and guests across a wet dinghy is awkward, and hauling in 20 knots of breeze is legitimately unpleasant. Slip owners skip all of this.\n\n## Weather and Swing Room\n\nA boat on a **mooring swings freely** into the wind, which is actually gentler on the vessel than being held rigid against a dock. There are no pilings to scrape, no fenders to compress, and no dock lines to chafe. In a good mooring field the boats all point the same direction and never touch each other.\n\nThe tradeoff is **total weather exposure**. There is no dock to break waves or wind, and in a blow the boat rolls and pitches in whatever sea state enters the harbor. During named storms, mooring balls are often the safer option than slips because there is nothing solid for the boat to pound against - many Northeast harbors require boats to be moved from slips to moorings for hurricane season.\n\n## No Shore Power Changes Daily Life\n\nWithout shore power you are running on **batteries, solar, or a generator**. For a weekend sailor this is fine - you run the engine to charge batteries on the way in and out. For a liveaboard or a boat with a refrigerator, induction stove, or air conditioning, no shore power is a serious limitation. Most serious cruisers on moorings add 200-400 watts of solar to keep up with refrigeration and electronics.\n\nSlips come with standard 30A or 50A shore power, usually included in the base rate or metered at cost.\n\n## Who Each Option Fits\n\n**Moorings** fit sailors, classic New England cruisers, Pacific Northwest salmon fishermen, and any cost-conscious owner whose boat is designed to be self-sufficient. Sailboats in particular swing beautifully on moorings and do not need shore power for most activities.\n\n**Slips** fit families with young kids, anyone with mobility concerns, liveaboards, powerboats that rely on shore-power chargers and AC, and owners who go out spontaneously on weeknights when dragging a dinghy out feels like too much. The convenience premium is real, but so is the cost - if you do not need the walk-aboard access, a mooring saves thousands of dollars a season with little downside for the right kind of boater.",
    verdict:
      "Mooring to save 50-70% on seasonal dockage and to keep fishing on classic New England or Pacific Northwest harbors. Slip for families, liveaboards, or anyone who values walk-aboard convenience over savings.",
    verdictWinner: "both",
    faqs: [
      {
        q: "How much money do you save on a mooring vs a slip?",
        a: "Typically 50-70% versus a comparable slip in the same harbor. On a 35-ft sailboat, a mooring might cost $2,000-$3,500 per season while a slip runs $5,000-$10,000. The savings are largest in premium New England harbors like Newport, Edgartown, and Nantucket where slip supply is tight and mooring fields are well-established.",
      },
      {
        q: "Do I have to own a dinghy if I keep my boat on a mooring?",
        a: "Not always. Most established mooring fields have a harbor launch service that runs on a schedule or on-call via VHF for $200-$500 per season. Yacht clubs often include launch in membership dues. That said, owning a small dinghy or inflatable gives you freedom to come and go outside launch hours and is generally considered part of the mooring lifestyle.",
      },
      {
        q: "Can you liveaboard on a mooring?",
        a: "Technically yes, but it is much harder than liveaboard at a slip. You have no shore power for refrigeration or AC, no easy water hookup, and every trip to shore requires a dinghy. Serious cruisers do it with solar panels, lithium batteries, watermakers, and a reliable tender - but it is a cruising lifestyle, not a commuter lifestyle. For most liveaboard situations a slip is the practical choice.",
      },
    ],
    relatedStates: ["massachusetts", "maine", "california"],
    relatedBlog: ["marina-slip-costs", "dock-life-rules"],
  },
];

export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return comparisons.find((c) => c.slug === slug);
}
