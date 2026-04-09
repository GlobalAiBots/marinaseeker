import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">&#9875;</p>
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-3">Marina Not Found</h1>
      <p className="text-gray-500 mb-8">We couldn&apos;t find that page &mdash; but we&apos;ve got {(2700).toLocaleString()}+ marinas waiting for you.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="bg-[#C4924B] hover:bg-[#b5833e] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Search All Marinas</Link>
        <Link href="/marinas" className="border-2 border-[#1B3A5C] text-[#1B3A5C] hover:bg-[#1B3A5C] hover:text-white font-bold px-6 py-3 rounded-lg transition">Browse by State</Link>
      </div>
    </div>
  );
}
