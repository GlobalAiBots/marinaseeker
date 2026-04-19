type Product = { name: string; desc: string; asin: string };

const AFFILIATE_TAG = "babymydog03-20";
const amazonUrl = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;

const SECTIONS: Record<string, { title: string; items: Product[] }> = {
  "dock-essentials": {
    title: "Marina & Dock Essentials",
    items: [
      { name: "Dock Lines (4-Pack Nylon)", desc: "Pre-spliced, marine-grade nylon. The one thing every slip needs before you tie up the first time.", asin: "B07NQFK7MN" },
      { name: "Boat Fenders (4-Pack)", desc: "Inflatable, UV-resistant. Protect the hull from dock rash at home and when visiting transient slips.", asin: "B000ALQ7VO" },
      { name: "Star Brite Marine Cleaner", desc: "The gold standard for cleaning hulls, decks, and vinyl. Removes waterline scum without harming gelcoat.", asin: "B000MCLRS2" },
      { name: "Shore Power Cord (30A)", desc: "Heavy-gauge with locking rings. The cord that came with the boat is almost certainly not good enough.", asin: "B002LE7LGC" },
      { name: "Boarding Dock Step", desc: "Makes stepping onto a higher freeboard safe for kids, guests, and older crew. Non-slip tread.", asin: "B003EET0NC" },
      { name: "Universal Boat Cover", desc: "UV and weather protection for off-season or long stretches in the slip. Trailerable with proper straps.", asin: "B0752YZP5K" },
    ],
  },
  maintenance: {
    title: "Boat Maintenance",
    items: [
      { name: "Deep-Cycle Marine Battery", desc: "Dual-purpose AGM for house loads and engine starts. The battery every liveaboard eventually upgrades to.", asin: "B00GQ4MY9I" },
      { name: "Bilge Pump", desc: "Automatic switch, 1100 GPH. The single most important piece of safety gear on any boat.", asin: "B000O8AUPO" },
      { name: "Marine Grease", desc: "Waterproof, salt-resistant. For trailer bearings, steering cables, and steering helm maintenance.", asin: "B000CITK8S" },
      { name: "Bottom Paint", desc: "Ablative antifouling for boats kept in the water. Apply once a year to keep the hull clean and fast.", asin: "B000N37672" },
      { name: "Zinc Anodes", desc: "Sacrificial anodes protect your shaft, prop, and metal fittings from galvanic corrosion. Replace annually.", asin: "B0049VPYDS" },
      { name: "Marine Polish", desc: "Restores faded gelcoat and adds a UV-resistant finish. Buy before your boat starts looking chalky.", asin: "B0009IQXDG" },
    ],
  },
  comfort: {
    title: "Onboard Comfort",
    items: [
      { name: "Waterproof Marine Bluetooth Speaker", desc: "Loud enough to hear at cruising speed, IPX7-rated for splash and rain. Long battery for all-day trips.", asin: "B07DD7PG6N" },
      { name: "Magma Portable Boat Grill", desc: "Mounts to most boat rails. Stainless, compact, and propane-powered — the gold standard of boat grills.", asin: "B001PKHFHI" },
      { name: "Marine Cooler", desc: "Holds ice for days. The difference between a good trip and a great one is cold drinks and fresh fish.", asin: "B0018ADGBO" },
      { name: "Solar Phone Charger", desc: "Keep phones and GPS charged without draining the house battery. Folds flat for easy stowing.", asin: "B0B45FHKVH" },
    ],
  },
};

export default function GearRecommendation({ section = "dock-essentials", heading }: { section?: keyof typeof SECTIONS; heading?: string }) {
  const data = SECTIONS[section] || SECTIONS["dock-essentials"];
  const title = heading ?? data.title;

  return (
    <div className="my-10">
      <h3 className="font-[Cabin] text-lg font-bold text-[#1A1A1A] mb-1">{title}</h3>
      <p className="text-gray-400 text-xs mb-4">As an Amazon Associate we earn from qualifying purchases.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.items.map((item) => (
          <div key={item.asin} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
            <p className="font-bold text-[#1A1A1A] text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{item.desc}</p>
            <a
              href={amazonUrl(item.asin)}
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
