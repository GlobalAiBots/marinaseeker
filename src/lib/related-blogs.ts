// Contextual "Related Guide" widget for /marinas/[id] pages.

type BlogTease = { slug: string; title: string; excerpt: string };

const BLOGS: Record<string, BlogTease> = {
  "marina-slip-costs-by-state": {
    slug: "marina-slip-costs-by-state",
    title: "Marina Slip Costs by State",
    excerpt: "Slip rates run $10-$25 per foot per month depending on region. Northeast and Florida command premium; Great Lakes and Gulf are cheapest. State-by-state 2026 pricing and the add-on fees that push totals up.",
  },
  "marina-vs-mooring-vs-dock": {
    slug: "marina-vs-mooring-vs-dock",
    title: "Marina Slip vs Mooring Ball vs Private Dock",
    excerpt: "Slip $300-$800/mo with walk-on access. Mooring $100-$400/mo but requires a dinghy. Private dock is a capital project. Which matches your boat size, budget, and hurricane exposure.",
  },
  "how-to-negotiate-slip-rental": {
    slug: "how-to-negotiate-slip-rental",
    title: "How to Negotiate a Marina Slip Rental",
    excerpt: "Off-season timing, multi-year discounts, trade-work deals, bundled services, and cash payment. Seven tactics that shave 10-20% off slip rates — plus what never to push back on.",
  },
  "liveaboard-guide": {
    slug: "liveaboard-guide",
    title: "Liveaboard Guide",
    excerpt: "Only ~30% of marinas allow liveaboards. What to ask, monthly costs beyond slip, pump-out requirements, insurance, hurricane plans, and the top liveaboard-friendly cities.",
  },
  "choosing-a-marina-checklist": {
    slug: "choosing-a-marina-checklist",
    title: "10 Things to Check Before Choosing a Marina",
    excerpt: "Slip depth at low tide, fuel dock availability, power amperage, security, insurance requirements, and pet policy. The checklist that prevents \"why didn't I ask\" regret on long-term leases.",
  },
  "marina-etiquette": {
    slug: "marina-etiquette",
    title: "Marina Etiquette",
    excerpt: "No-wake speeds, dock-line courtesy, head-in vs stern-in, fueling protocol, quiet hours, and pet rules. The unwritten conventions every liveaboard learned the hard way.",
  },
  "transient-dockage-guide": {
    slug: "transient-dockage-guide",
    title: "Transient Slip Guide",
    excerpt: "Overnight rates typically $2.50-$5 per foot. Where to find them, how to reserve ahead (Dockwa), what's included vs extra (power, water, pump-out), and the regions with tight summer availability.",
  },
  "seasonal-vs-annual-slip-rental": {
    slug: "seasonal-vs-annual-slip-rental",
    title: "Seasonal vs Annual Slip Rental",
    excerpt: "Annual saves 30-40% over month-by-month if you'll use the slip year-round. Seasonal makes sense for summer-only Great Lakes boats. Which applies to your cruising pattern.",
  },
};

type MarinaShape = { name?: string; city?: string; state?: string };

export function getRelatedMarinaBlog(marina: MarinaShape): BlogTease {
  const name = (marina.name || "").toLowerCase();
  if (name.includes("liveaboard") || name.includes("yacht club")) return BLOGS["liveaboard-guide"];
  if (name.includes("transient") || name.includes("guest")) return BLOGS["transient-dockage-guide"];
  if (name.includes("resort")) return BLOGS["how-to-negotiate-slip-rental"];

  const fallback = [
    "marina-slip-costs-by-state",
    "marina-vs-mooring-vs-dock",
    "choosing-a-marina-checklist",
    "how-to-negotiate-slip-rental",
    "marina-etiquette",
    "seasonal-vs-annual-slip-rental",
  ];
  const hash = (marina.city || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return BLOGS[fallback[hash % fallback.length]];
}
