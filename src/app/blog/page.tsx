import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | MarinaSeeker",
  description: "Slip rentals, liveaboard guides, marina etiquette, dockage 101 — practical advice for boaters across America.",
  alternates: { canonical: "https://www.marinaseeker.com/blog" },
};

// Category → gradient + inline SVG icon. Matches RampSeeker's
// visual pattern (outlined SVG, 30-40% white, 80x60 viewBox).
const CATEGORY_CONFIG: Record<string, { gradient: string; icon: string }> = {
  "Slip Rentals": {
    gradient: "linear-gradient(135deg, #134B70 0%, #0891B2 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="40" cy="14" r="4" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><line x1="40" y1="18" x2="40" y2="48" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><line x1="30" y1="26" x2="50" y2="26" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><path d="M22 40 Q22 50 40 50 Q58 50 58 40" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  },
  Liveaboard: {
    gradient: "linear-gradient(135deg, #0D9488 0%, #059669 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M18 30 L40 12 L62 30" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M24 28 L24 50 L56 50 L56 28" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/><rect x="34" y="36" width="12" height="14" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/></svg>`,
  },
  Destinations: {
    gradient: "linear-gradient(135deg, #D97706 0%, #EA580C 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><line x1="24" y1="10" x2="24" y2="52" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/><path d="M24 12 L56 18 L48 26 L56 34 L24 28 Z" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>`,
  },
  Guides: {
    gradient: "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="40" cy="30" r="18" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><path d="M40 16 L44 30 L40 44 L36 30 Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="rgba(255,255,255,0.15)" stroke-linejoin="round"/></svg>`,
  },
  Etiquette: {
    gradient: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="30" cy="22" r="6" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><path d="M20 48 Q20 36 30 36 Q40 36 40 48" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/><circle cx="52" cy="22" r="6" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><path d="M42 48 Q42 36 52 36 Q62 36 62 48" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/></svg>`,
  },
  Seasonal: {
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #4338CA 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><rect x="20" y="16" width="40" height="32" rx="2" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><line x1="20" y1="24" x2="60" y2="24" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><line x1="28" y1="10" x2="28" y2="20" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linecap="round"/><line x1="52" y1="10" x2="52" y2="20" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linecap="round"/><circle cx="32" cy="34" r="1.5" fill="rgba(255,255,255,0.45)"/><circle cx="40" cy="34" r="1.5" fill="rgba(255,255,255,0.45)"/><circle cx="48" cy="34" r="1.5" fill="rgba(255,255,255,0.45)"/></svg>`,
  },
};

const DEFAULT_CONFIG = {
  gradient: "linear-gradient(135deg, #475569 0%, #1E293B 100%)",
  icon: `<svg viewBox="0 0 80 60" fill="none"><rect x="20" y="14" width="40" height="32" rx="3" stroke="rgba(255,255,255,0.4)" stroke-width="2"/></svg>`,
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Slip rentals, liveaboard guides, marina etiquette, and dockage advice for boaters.</p>
      <div className="space-y-6">
        {blogPosts.map((p) => {
          const config = CATEGORY_CONFIG[p.category] ?? DEFAULT_CONFIG;
          return (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              {/* Thumbnail */}
              <div className="sm:w-48 h-36 sm:h-auto flex-shrink-0 flex items-center justify-center relative" style={{ background: config.gradient }}>
                <div className="w-20 h-16" dangerouslySetInnerHTML={{ __html: config.icon }} />
              </div>
              {/* Content */}
              <div className="p-5 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-bold text-[#1B3A5C] bg-[#1B3A5C]/10 px-2 py-0.5 rounded-full">{p.category}</span>
                  <span className="text-gray-400 text-xs">{p.date}</span>
                </div>
                <h2 className="font-[Cabin] text-lg font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition mb-2 line-clamp-2">{p.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{p.description}</p>
                <span className="text-[#1B3A5C] font-semibold text-sm">Read more &rarr;</span>
              </div>
            </Link>
          );
        })}
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
