"use client";

import dynamic from "next/dynamic";

const MarinaMap = dynamic(() => import("@/components/MarinaMap"), { ssr: false });

interface MarinaForMap { id: string; name: string; lat: number; lng: number; city: string; state: string; amenities: string[]; }

export default function StateMap({ marinas, center }: { marinas: MarinaForMap[]; center: [number, number] }) {
  return <MarinaMap marinas={marinas} center={center} zoom={7} height="400px" />;
}
