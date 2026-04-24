import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | MarinaSeeker",
  description: "Slip rentals, liveaboard guides, marina etiquette, dockage 101 — practical advice for boaters across America.",
  alternates: { canonical: "https://www.marinaseeker.com/blog" },
};

const networkPosts = [
  {
    url: "https://www.rampseeker.com/blog",
    title: "RampSeeker Blog",
    excerpt: "Boat ramp guides, towing advice, launching tips. 27,000+ ramps across America.",
    tag: "RampSeeker",
  },
  {
    url: "https://www.pierseeker.com/blog",
    title: "PierSeeker Blog",
    excerpt: "Fishing pier guides, license requirements, seasonal tips. Access to 25,000+ piers.",
    tag: "PierSeeker",
  },
  {
    url: "https://www.babymydog.com/blog",
    title: "BabyMyDog Blog",
    excerpt: "Pet-friendly travel tips, gear reviews, and breed guides for dog-loving boaters.",
    tag: "BabyMyDog",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Slip rentals, liveaboard guides, marina etiquette, and dockage advice for boaters.</p>
      <div className="space-y-6">
        {blogPosts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-bold text-[#1B3A5C] bg-[#1B3A5C]/10 px-2 py-0.5 rounded-full">{p.category}</span>
              <span className="text-gray-400 text-xs">{p.date}</span>
            </div>
            <h2 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl hover:text-[#1B3A5C] transition">{p.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{p.description}</p>
          </Link>
        ))}
      </div>

      {/* From our network */}
      <section className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-2">From our network</h2>
        <p className="text-sm text-gray-500 mb-6">MarinaSeeker is part of a family of outdoor directory sites. Fresh reading from our sisters:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {networkPosts.map((p) => (
            <a key={p.url} href={p.url} className="group block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 inline-block">{p.tag} <span aria-hidden="true">↗</span></span>
              <p className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition text-sm leading-snug">{p.title}</p>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">{p.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
