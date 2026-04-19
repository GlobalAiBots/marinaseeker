type Product = { name: string; desc: string; q: string };
type Season = { label: string; emoji: string; headline: string; items: Product[] };

const AFFILIATE_TAG = "babymydog03-20";
const amazonSearch = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;

const SEASONS: Record<"spring" | "summer" | "fall" | "winter", Season> = {
  spring: {
    label: "Spring",
    emoji: "\u{1F33F}",
    headline: "Splash-down prep for the new season",
    items: [
      { name: "Bottom Paint", desc: "Ablative antifouling holds off barnacles and slime all season. Apply before the first splash.", q: "bottom paint ablative marine" },
      { name: "Zinc Anodes", desc: "Replace annually. Protects shaft, prop, and fittings from galvanic corrosion.", q: "zinc anode boat shaft" },
      { name: "Marine Polish", desc: "Restore oxidized gelcoat to a mirror finish. UV-resistant, protects all season.", q: "marine polish oxidation remover" },
    ],
  },
  summer: {
    label: "Summer",
    emoji: "\u{2600}",
    headline: "Onboard comfort for peak cruising season",
    items: [
      { name: "Magma Portable Boat Grill", desc: "Rail-mounted stainless grill. The gold standard for grilling at anchor or at the dock.", q: "magma marine boat grill" },
      { name: "Waterproof Marine Bluetooth Speaker", desc: "IPX7-rated, loud enough to hear at cruising speed. All-day battery.", q: "waterproof marine bluetooth speaker" },
      { name: "Marine Cooler (70qt+)", desc: "Keep drinks cold for the whole weekend at anchor. Holds ice 4-5 days.", q: "marine cooler 70 quart rotomolded" },
    ],
  },
  fall: {
    label: "Fall",
    emoji: "\u{1F342}",
    headline: "Winterization starts now &mdash; don't wait for the first freeze",
    items: [
      { name: "Fuel Stabilizer", desc: "Add before the last trip. Prevents ethanol phase-separation and gummed fuel systems in spring.", q: "stabil marine fuel stabilizer" },
      { name: "Fogging Oil", desc: "Spray into cylinders before long-term storage. Prevents internal engine corrosion.", q: "marine engine fogging oil" },
      { name: "Dehumidifier for Boat Cabin", desc: "Prevents mildew on cushions and gear during winter layup. Plug-and-forget.", q: "boat cabin dehumidifier" },
    ],
  },
  winter: {
    label: "Winter",
    emoji: "\u{2744}",
    headline: "Winter layup and storage essentials",
    items: [
      { name: "Shrink Wrap Kit", desc: "Full-boat shrink wrap with vents. DIY saves $200+ vs. marina-applied wrap.", q: "boat shrink wrap kit" },
      { name: "Battery Maintainer", desc: "Trickle-charges all winter. A $25 maintainer saves a $200 battery replacement.", q: "battery tender jr 12v" },
      { name: "Dock De-Icer / Bubbler", desc: "Circulates warm water around hull and dock. Prevents ice damage in slip storage.", q: "dock de-icer bubbler" },
    ],
  },
};

function getSeason(): keyof typeof SEASONS {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
}

export default function SeasonalPicks() {
  const season = SEASONS[getSeason()];

  return (
    <div className="my-10">
      <div className="flex items-baseline gap-3 mb-1">
        <h3 className="font-[Cabin] text-lg font-bold text-[#1A1A1A]">This {season.label}&apos;s Picks</h3>
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#C4924B]">{season.emoji} Limited-Time Featured</span>
      </div>
      <p className="text-gray-500 text-sm mb-4" dangerouslySetInnerHTML={{ __html: season.headline }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {season.items.map((item) => (
          <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
            <p className="font-bold text-[#1A1A1A] text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{item.desc}</p>
            <a
              href={amazonSearch(item.q)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-block mt-3 text-xs font-semibold text-[#C4924B] hover:text-[#A87834] transition"
            >
              &#9733; Our Pick &mdash; View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
