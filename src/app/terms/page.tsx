import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MarinaSeeker",
  alternates: { canonical: "https://www.marinaseeker.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">Terms of Service</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
        <p>Last updated: April 2026</p>
        <p>By accessing MarinaSeeker (marinaseeker.com), you agree to these terms.</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Use of Data</h2>
        <p>Marina data is compiled from public sources including OpenStreetMap and federal agencies. While we strive for accuracy, we cannot guarantee that all information is current or complete. Always verify marina details before visiting.</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Disclaimer</h2>
        <p>MarinaSeeker provides information for reference purposes only. We are not responsible for any damages resulting from use of this information. Marina conditions, availability, and amenities may change without notice.</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Data Sources</h2>
        <p>Marina data is sourced from OpenStreetMap (ODbL license) and other public datasets. Map data &copy; OpenStreetMap contributors.</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Contact</h2>
        <p>Questions? Email <a href="mailto:hello@marinaseeker.com" className="text-[#C4924B] hover:underline">hello@marinaseeker.com</a></p>
      </div>
    </div>
  );
}
