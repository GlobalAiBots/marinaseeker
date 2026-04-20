import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise With MarinaSeeker — Reach Boat Owners & Liveaboards",
  description: "Advertise on MarinaSeeker. Reach boat owners, liveaboards, and transient boaters actively researching marinas, slip costs, and dockage. Featured listings, sponsored posts, and banner ads.",
  alternates: { canonical: "https://marinaseeker.com/advertise" },
  openGraph: {
    title: "Advertise With MarinaSeeker",
    description: "Reach boat owners and liveaboards actively researching marinas and dockage.",
    url: "https://marinaseeker.com/advertise",
    siteName: "MarinaSeeker",
  },
};

export default function AdvertisePage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://marinaseeker.com" },
      { "@type": "ListItem", position: 2, name: "Advertise", item: "https://marinaseeker.com/advertise" },
    ],
  };

  const mailto = "mailto:hello@marinaseeker.com?subject=" + encodeURIComponent("Advertising Inquiry — MarinaSeeker") + "&body=" + encodeURIComponent("Hi MarinaSeeker team,\n\nI'd like to learn more about advertising options. Here's a quick intro:\n\n- Company: \n- Product / Service: \n- Target audience: \n- Budget range: \n- Format of interest (featured listing / sponsored post / banner): \n\nThanks!");

  return (
    <div className="min-h-screen pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
          <span className="text-[#1A1A1A] font-medium">Advertise</span>
        </nav>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 mb-10">
          <p className="text-[#C4924B] text-xs font-bold tracking-widest uppercase mb-3">Partnerships</p>
          <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">Advertise With MarinaSeeker</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-6">
            Reach boat owners, liveaboards, and transient boaters actively researching marinas, slip costs, and dockage options. MarinaSeeker is the most complete marina directory in America.
          </p>
          <a href={mailto} className="inline-block bg-[#1B3A5C] hover:bg-[#0F2A47] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Start a Conversation</a>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { stat: "9,000+", label: "Marinas" },
            { stat: "50", label: "States Covered" },
            { stat: "12+", label: "Long-Form Guides" },
            { stat: "3", label: "Dockage Comparisons" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
              <p className="font-[Cabin] text-3xl font-bold text-[#1B3A5C]">{s.stat}</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Who You&apos;ll Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
            <div>
              <p className="font-bold text-[#1A1A1A] mb-2">Audience profile</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Boat owners and liveaboards, ages 35-75</li>
                <li>&bull; Typically higher disposable income (boat ownership is a filter)</li>
                <li>&bull; Coastal Atlantic, Gulf, Great Lakes, and Pacific regions</li>
                <li>&bull; Includes transient cruisers researching dockage for trips</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A] mb-2">Commercial intent</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Comparing marinas, slip rates, and dry-stack options</li>
                <li>&bull; Shopping for marine electronics, safety gear, and tenders</li>
                <li>&bull; Researching boat insurance and liveaboard policies</li>
                <li>&bull; Pre-purchase dockage decisions (wet slip vs mooring vs private dock)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-5">Sponsorship Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Featured Listing",
                price: "$79-299/mo",
                desc: "Pin your marina to the top of relevant state and city pages. Best for marinas, boatyards, and service providers wanting direct visibility with boat owners.",
              },
              {
                title: "Sponsored Post",
                price: "$399-1,499",
                desc: "A dedicated long-form article with your brand integrated naturally. Strong for insurance brands, electronics brands, and liveaboard accessories.",
              },
              {
                title: "Banner Ad",
                price: "$399-999/mo",
                desc: "Display placement across high-traffic marina, cost, and liveaboard pages. 300x250 and responsive units. Monthly or quarterly commitments.",
              },
            ].map((opt) => (
              <div key={opt.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
                <p className="font-[Cabin] font-bold text-[#1A1A1A] text-xl mb-1">{opt.title}</p>
                <p className="text-[#1B3A5C] font-bold text-lg mb-3">{opt.price}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{opt.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 italic mt-3">Pricing is a starting range. Custom packages and multi-site bundles (RampSeeker, PierSeeker, BarkSeeker) available.</p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Media Kit</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Current traffic numbers, top-performing content, category breakdowns, and example ad placements are available in our media kit. We send it on request so we can tailor it to your vertical.
          </p>
          <a href={mailto} className="inline-block bg-[#C4924B] hover:bg-[#b5833e] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Request Media Kit</a>
        </section>

        <section className="bg-[#1B3A5C]/5 border-2 border-[#1B3A5C]/30 rounded-2xl p-6 md:p-8">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Let&apos;s Talk</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Email <a href={mailto} className="text-[#1B3A5C] font-semibold hover:underline">hello@marinaseeker.com</a> with a quick note about your product and target audience. We&apos;ll reply within two business days with recommended placements and current availability.
          </p>
          <a href={mailto} className="inline-block bg-[#1B3A5C] hover:bg-[#0F2A47] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Email Us</a>
        </section>
      </div>
    </div>
  );
}
