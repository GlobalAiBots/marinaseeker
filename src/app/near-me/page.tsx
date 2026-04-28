import Link from "next/link";
import { unified } from "@/data/all-marinas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marinas Near Me | MarinaSeeker",
  description: "Find the closest marinas to your current location. Sorted by distance with slip info, fuel, and amenities.",
  alternates: { canonical: "https://www.marinaseeker.com/near-me" },
};

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default async function NearMePage({ searchParams }: { searchParams: Promise<{ lat?: string; lng?: string }> }) {
  const params = await searchParams;
  const lat = parseFloat(params.lat || "0"), lng = parseFloat(params.lng || "0");

  if (!lat || !lng) return (<div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">Location Required</h1><p className="text-gray-500 mb-8">Use the &quot;Find Near Me&quot; button on the homepage.</p><Link href="/" className="bg-[#C4924B] text-white font-bold px-6 py-3 rounded-lg transition inline-block">Go Home</Link></div>);

  const nearby = unified.map(m => ({ ...m, distance: haversine(lat, lng, m.lat, m.lng) })).filter(m => m.distance <= 50).sort((a, b) => a.distance - b.distance).slice(0, 20);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-2">Marinas Near You</h1>
      <p className="text-gray-500 mb-8">{nearby.length} marinas within 50 miles</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nearby.map(m => (<Link key={m.id} href={`/marinas/${m.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all border-l-4 border-l-[#1B3A5C]"><h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C] transition">{m.name}</h3><p className="text-gray-500 text-sm mt-1">{m.city}, {m.state}</p><p className="text-[#C4924B] text-sm font-semibold mt-2">{m.distance.toFixed(1)} miles</p></Link>))}
      </div>
    </div>
  );
}
