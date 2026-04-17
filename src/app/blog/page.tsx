import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | MarinaSeeker",
  description: "Boating tips, marina guides, and news for boaters across America.",
  alternates: { canonical: "https://marinaseeker.com/blog" },
};

const posts = [
  { slug: "marina-slip-costs", title: "How Much Does a Marina Slip Cost in 2026? State-by-State Guide", date: "April 15, 2026", description: "Marina slip costs vary from $500 to $6,000+ per month depending on region. See 2026 pricing by state and tips to save." },
  { slug: "liveaboard-marinas", title: "Liveaboard Guide: Best Marinas for Living on Your Boat (2026)", date: "April 15, 2026", description: "Everything you need to know about living aboard full-time, from legal requirements to the best states for liveaboards." },
  { slug: "choosing-a-marina-checklist", title: "10 Things to Check Before Choosing a Marina", date: "April 15, 2026", description: "Use this checklist to evaluate slip size, depth, fuel, security, insurance, pet policy, and more before signing a lease." },
  { slug: "dock-life-rules", title: "Dock Life: The Unwritten Rules of Living at a Marina", date: "April 15, 2026", description: "The unwritten rules every marina resident should know, from harbor speed to helping with dock lines." },
  { slug: "what-to-look-for-choosing-marina", title: "What to Look for When Choosing a Marina", date: "April 9, 2026", description: "The complete guide to finding the perfect marina for your boat and lifestyle." },
  { slug: "marina-etiquette", title: "Marina Etiquette: 10 Rules Every Boater Should Know", date: "April 9, 2026", description: "Unwritten rules that will make you a welcome member of any marina community." },
  { slug: "liveaboard-guide", title: "Liveaboard Guide: Living on Your Boat at a Marina", date: "April 9, 2026", description: "Everything you need to know about making a marina your full-time home." },
  { slug: "seasonal-vs-annual-slip-rental", title: "Seasonal vs Annual Slip Rental: Which Saves You Money?", date: "April 9, 2026", description: "A cost breakdown to help you decide the best slip rental strategy." },
  { slug: "top-marinas-michigan", title: "Top Marinas in Michigan for Weekend Boaters", date: "April 9, 2026", description: "Michigan has 220+ marinas. Here are the best for weekend getaways." },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-gray-400 text-xs mb-2">{p.date}</p>
            <h2 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl hover:text-[#1B3A5C] transition">{p.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
