import Link from "next/link";
import { notFound } from "next/navigation";
import categoriesData from "@/data/categories.json";
import type { Metadata } from "next";

interface CatState { code: string; name: string; slug: string; count: number; }
interface Category { slug: string; title: string; description: string; totalCount: number; states: CatState[]; }
const categories = categoriesData as Category[];

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.title} in America | MarinaSeeker`,
    description: category.description,
    alternates: { canonical: `https://www.marinaseeker.com/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.marinaseeker.com" }, { "@type": "ListItem", position: 2, name: category.title, item: `https://www.marinaseeker.com/category/${slug}` }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: `How many ${category.title.toLowerCase()} are in America?`, acceptedAnswer: { "@type": "Answer", text: `MarinaSeeker lists ${category.totalCount} ${category.title.toLowerCase()} across ${category.states.length} states.` } },
        { "@type": "Question", name: `How do I find ${category.title.toLowerCase()} near me?`, acceptedAnswer: { "@type": "Answer", text: `Browse MarinaSeeker by state to find ${category.title.toLowerCase()} in your area with contact info, amenities, and maps.` } },
        { "@type": "Question", name: `How much do slips cost at ${category.title.toLowerCase()}?`, acceptedAnswer: { "@type": "Answer", text: `Slip costs vary by location, size, and amenities. Contact individual marinas for current rates and availability.` } },
      ] }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">{category.title}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">{category.title} in America</h1>
      <p className="text-gray-500 mb-2">{category.totalCount} marinas across {category.states.length} states</p>
      <p className="text-gray-400 text-sm mb-8">{category.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {category.states.map(st => (
          <Link key={st.code} href={`/${st.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#1B3A5C] hover:shadow-sm transition">
            <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#1B3A5C] transition">{st.name}</p>
            <p className="text-gray-400 text-xs">{st.count} marinas</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
