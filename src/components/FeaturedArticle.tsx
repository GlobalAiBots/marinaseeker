import Link from "next/link";

const POSTS = [
  { slug: "what-to-look-for-choosing-marina", title: "What to Look for When Choosing a Marina", category: "Guide", desc: "Amenities, location, pricing, and more — how to pick the right marina for your boat." },
  { slug: "marina-etiquette", title: "Marina Etiquette: Be a Good Neighbor at the Dock", category: "Tips", desc: "Essential marina etiquette rules for a respectful and safe experience at any dock." },
  { slug: "seasonal-vs-annual-slip-rental", title: "Seasonal vs Annual Slip Rental: Which Is Better?", category: "Guide", desc: "Compare seasonal and annual slip rentals to find the best value for your boating needs." },
  { slug: "liveaboard-guide", title: "Living Aboard: A Complete Liveaboard Guide", category: "Lifestyle", desc: "Everything you need to know about living on your boat at a marina full-time." },
  { slug: "top-marinas-michigan", title: "Top Marinas in Michigan", category: "Destinations", desc: "The best marinas across Michigan for Great Lakes boating, from Traverse City to Mackinac." },
];

function seededIndex(slug: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

export default function FeaturedArticle({ listingSlug }: { listingSlug: string }) {
  const idx1 = seededIndex(listingSlug, POSTS.length);
  const idx2 = seededIndex(listingSlug + "_2", POSTS.length);
  const picks = [POSTS[idx1]];
  if (idx2 !== idx1) picks.push(POSTS[idx2]);

  return (
    <section className="my-8">
      <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Boating Tips &amp; Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {picks.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{p.category}</span>
            <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition mt-2 text-sm leading-snug">{p.title}</h3>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">{p.desc.substring(0, 120)}{p.desc.length > 120 ? "..." : ""}</p>
            <span className="text-[#1B3A5C] text-xs font-semibold mt-2 inline-block">Read More &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
