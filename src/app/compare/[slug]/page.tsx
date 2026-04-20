import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparisonBySlug, type ComparisonPage } from "@/data/comparisons";
import type { Metadata } from "next";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) return { title: "Comparison Not Found" };
  return {
    title: cmp.metaTitle,
    description: cmp.metaDescription,
    alternates: { canonical: `https://www.marinaseeker.com/compare/${cmp.slug}` },
    openGraph: { title: cmp.metaTitle, description: cmp.metaDescription, url: `https://www.marinaseeker.com/compare/${cmp.slug}`, siteName: "MarinaSeeker", type: "article" },
  };
}

function ProductCard({ product, isWinner }: { product: ComparisonPage["productA"]; isWinner: boolean }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden ${isWinner ? 'ring-2 ring-[#1B3A5C]' : 'border border-gray-200'} shadow-sm`}>
      <div className={`px-6 py-3 text-white text-xs font-bold uppercase tracking-widest ${isWinner ? 'bg-[#1B3A5C]' : 'bg-gray-500'}`}>
        {product.name} {isWinner && " · Our Pick"}
      </div>
      <div className="p-6">
        <p className="font-extrabold text-[#1B3A5C] text-xl mb-4">{product.price}</p>
        <p className="text-gray-600 text-sm italic mb-4">{product.bestFor}</p>

        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1B3A5C] mb-2">Pros</p>
          <ul className="space-y-1.5">
            {product.pros.map((p, i) => (
              <li key={i} className="text-[#1A1A1A] text-sm flex items-start gap-2">
                <span className="text-[#1B3A5C] font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C4924B] mb-2">Cons</p>
          <ul className="space-y-1.5">
            {product.cons.map((c, i) => (
              <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                <span className="text-[#C4924B] font-bold flex-shrink-0 mt-0.5">&#8722;</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const STATE_NAMES: Record<string, string> = {
  "florida": "Florida", "california": "California", "texas": "Texas", "north-carolina": "North Carolina",
  "south-carolina": "South Carolina", "georgia": "Georgia", "alabama": "Alabama", "virginia": "Virginia",
  "michigan": "Michigan", "minnesota": "Minnesota", "wisconsin": "Wisconsin", "ohio": "Ohio",
  "new-jersey": "New Jersey", "new-york": "New York", "oregon": "Oregon", "washington": "Washington",
  "massachusetts": "Massachusetts", "maine": "Maine", "rhode-island": "Rhode Island", "connecticut": "Connecticut",
};
const BLOG_TITLES: Record<string, string> = {
  "marina-etiquette": "Marina Etiquette: 10 Rules",
  "marina-slip-costs": "Marina Slip Costs",
  "winter-boat-storage-at-marinas": "Winter Boat Storage at Marinas",
  "what-to-look-for-choosing-marina": "What to Look For When Choosing a Marina",
  "choosing-a-marina-checklist": "Choosing a Marina Checklist",
  "dock-life-rules": "Dock Life Rules",
  "liveaboard-guide": "Liveaboard Guide",
  "liveaboard-marinas": "Best Liveaboard Marinas",
  "seasonal-vs-annual-slip-rental": "Seasonal vs Annual Slip Rental",
  "transient-dockage-guide": "Transient Dockage Guide",
  "top-marinas-michigan": "Top Marinas in Michigan",
  "marina-checklist": "Marina Checklist: 10 Things to Inspect",
  "boat-insurance-guide": "Boat Insurance 101",
};

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.marinaseeker.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://www.marinaseeker.com/compare" },
      { "@type": "ListItem", position: 3, name: cmp.title, item: `https://www.marinaseeker.com/compare/${cmp.slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cmp.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cmp.title,
    description: cmp.metaDescription,
    datePublished: "2026-04-19",
    author: { "@type": "Organization", name: "MarinaSeeker" },
    publisher: { "@type": "Organization", name: "MarinaSeeker", url: "https://www.marinaseeker.com" },
  };

  return (
    <div className="min-h-screen pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLd, breadcrumbLd, faqLd]) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
          <Link href="/compare" className="hover:text-[#1B3A5C] transition">Compare</Link><span>/</span>
          <span className="text-[#1A1A1A] font-medium">{cmp.subject}</span>
        </nav>

        <Link href="/compare" className="inline-flex items-center gap-1 text-sm text-[#1B3A5C] font-semibold hover:underline mb-6">
          &larr; All Comparisons
        </Link>

        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">{cmp.title}</h1>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-6">Last Updated: April 2026</p>

        <div className="text-gray-700 leading-relaxed space-y-4 mb-10 text-lg max-w-3xl">
          {cmp.intro.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <ProductCard product={cmp.productA} isWinner={cmp.verdictWinner === "a" || cmp.verdictWinner === "both"} />
          <ProductCard product={cmp.productB} isWinner={cmp.verdictWinner === "b" || cmp.verdictWinner === "both"} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-12 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-[#1A1A1A] mb-4">Side-by-Side</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Attribute</th>
                    <th className="text-left py-3 px-4 text-[#1A1A1A] font-bold">{cmp.productA.name}</th>
                    <th className="text-left py-3 px-4 text-[#1A1A1A] font-bold">{cmp.productB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {cmp.comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-semibold text-gray-500">{row.attribute}</td>
                      <td className={`py-3 px-4 ${row.winner === "a" ? 'font-bold text-[#1B3A5C]' : 'text-gray-700'}`}>
                        {row.winner === "a" && "\u2713 "}{row.a}
                      </td>
                      <td className={`py-3 px-4 ${row.winner === "b" ? 'font-bold text-[#1B3A5C]' : 'text-gray-700'}`}>
                        {row.winner === "b" && "\u2713 "}{row.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <article className="prose prose-gray max-w-none mb-12">
          <div className="text-[#1A1A1A] leading-relaxed space-y-5">
            {cmp.body.split(/\n\n+/).map((block, i) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("## ")) {
                return <h2 key={i} className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-8 mb-3">{trimmed.slice(3)}</h2>;
              }
              return (
                <p key={i} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*([^*]+)\*\*/g, "<strong class='text-[#1A1A1A]'>$1</strong>") }} />
              );
            })}
          </div>
        </article>

        <section className="mb-12 rounded-2xl p-6 md:p-8 border-2 border-[#C4924B]/30 bg-[#C4924B]/5">
          <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
            <span className="text-[#C4924B]">&#127942;</span> Our Verdict
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed text-base md:text-lg">{cmp.verdict}</p>
        </section>

        <section className="mb-12">
          <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-[#1A1A1A] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {cmp.faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[#1A1A1A] hover:text-[#1B3A5C] transition list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-[#1B3A5C] ml-2 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {cmp.relatedStates && cmp.relatedStates.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-[#1B3A5C] mb-3">Top States</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedStates.map((s) => (
                  <Link key={s} href={`/${s}`} className="inline-flex items-center gap-1 bg-[#1B3A5C]/10 hover:bg-[#1B3A5C]/20 text-[#1B3A5C] text-xs font-semibold px-3 py-1.5 rounded-full transition">
                    {STATE_NAMES[s] || s} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
          {cmp.relatedBlog && cmp.relatedBlog.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Related Reading</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedBlog.map((s) => (
                  <Link key={s} href={`/blog/${s}`} className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full transition">
                    {BLOG_TITLES[s] || s} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">More Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {comparisons.filter((c) => c.slug !== cmp.slug).slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-[#1B3A5C] hover:bg-[#1B3A5C]/5 transition">
                <p className="font-bold text-[#1A1A1A] text-sm">{c.title}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{c.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-xs text-gray-400 italic text-center mt-8">
          Pricing and availability vary by region and facility. Always confirm current rates with the marina directly.
        </p>
      </div>
    </div>
  );
}
