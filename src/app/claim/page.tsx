import Link from "next/link";
import ClaimForm from "./ClaimForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Your Marina | MarinaSeeker",
  description: "Own or manage a marina? Claim your free listing to update slip availability, amenities, fuel prices, and contact information.",
  alternates: { canonical: "https://www.marinaseeker.com/claim" },
};

export default async function ClaimPage({ searchParams }: { searchParams: Promise<{ marina?: string; name?: string }> }) {
  const params = await searchParams;
  const marinaId = params.marina || "";
  const marinaName = params.name || "";

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Claim Your Marina</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-2">Claim Your Marina</h1>
      <p className="text-gray-500 mb-8">Own or manage a marina? Claim your free listing to update slip availability, amenities, fuel prices, and contact information.</p>

      <ClaimForm marinaId={marinaId} initialMarinaName={marinaName} />
    </div>
  );
}
