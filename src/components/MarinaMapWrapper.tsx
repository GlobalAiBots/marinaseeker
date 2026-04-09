"use client";

import dynamic from "next/dynamic";

const MarinaMap = dynamic(() => import("@/components/MarinaMap"), { ssr: false });

interface MarinaPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
}

export default function MarinaMapWrapper({
  marinas,
  center,
  zoom,
  height,
}: {
  marinas: MarinaPin[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}) {
  return <MarinaMap marinas={marinas} center={center} zoom={zoom} height={height} />;
}
