import { ImageResponse } from "next/og";
import { unified, stateList } from "@/data/all-marinas";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { state: string } }) {
  const { state } = params;
  const st = stateList.find(s => s.slug === state);
  const name = st?.name || state;
  const count = st ? unified.filter(m => m.state === st.code).length : 0;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #1B3A5C, #0B1E33)", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.5)", marginBottom: 16, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}>MarinaSeeker</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "white", textAlign: "center" as const, maxWidth: 900, lineHeight: 1.2 }}>Marinas in {name}</div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)", marginTop: 16 }}>{count.toLocaleString()} marinas with GPS & amenities</div>
      </div>
    ),
    { ...size }
  );
}
