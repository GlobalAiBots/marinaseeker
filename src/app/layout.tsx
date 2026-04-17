import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import StatesDropdown from "@/components/StatesDropdown";
import CletusWidget from "@/components/CletusWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarinaSeeker | Every Marina in America — 2,700+ Marinas",
  description: "Find marinas across the United States. 2,700+ marinas with GPS coordinates, amenities, slip info, and local details. Free.",
  keywords: "marina near me, marina directory, boat marina, marina finder, boat slip, marina amenities",
  openGraph: {
    title: "MarinaSeeker | Every Marina in America",
    description: "2,700+ marinas across the US. GPS coordinates, amenities, slip info.",
    url: "https://marinaseeker.com",
    siteName: "MarinaSeeker",
    type: "website",
  },
  twitter: { card: "summary", title: "MarinaSeeker | Every Marina in America", description: "2,700+ marinas across the US. GPS coordinates, amenities, slip info." },
  alternates: { canonical: "https://marinaseeker.com" },
  other: { "google-adsense-account": "ca-pub-4822220549367368", "impact-site-verification": "5fa40e1e-c7f4-4422-9d60-69146a9bd3b5" },
};

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-[Cabin]">
          <span className="text-2xl">&#9973;</span>
          <span className="text-charcoal">Marina<span className="text-navy">Seeker</span></span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <StatesDropdown />
          <Link href="/search" className="text-gray-500 hover:text-navy transition"><svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg></Link>
          <Link href="/map" className="text-gray-500 hover:text-navy transition">Map</Link>
          <Link href="/blog" className="text-gray-500 hover:text-navy transition hidden sm:block">Blog</Link>
          <Link href="/about" className="text-gray-500 hover:text-navy transition hidden sm:block">About</Link>
          <Link href="/for-businesses" className="text-[#C4924B] font-bold hover:text-[#b5833e] transition hidden sm:block">For Businesses</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B1E33] border-t border-[#162D4A] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-white/50">
          <div>
            <p className="font-bold text-white mb-2 font-[Cabin]">&#9973; MarinaSeeker</p>
            <p>The most complete marina directory in America.</p>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Links</p>
            <div className="flex flex-col gap-1">
              <Link href="/" className="text-white/40 hover:text-white transition">All Marinas</Link>
              <Link href="/marinas" className="text-white/40 hover:text-white transition">Browse</Link>
              <Link href="/about" className="text-white/40 hover:text-white transition">About</Link>
              <Link href="/blog" className="text-white/40 hover:text-white transition">Blog</Link>
              <Link href="/claim" className="text-[#C4924B] hover:text-white transition font-semibold">For Marina Owners</Link>
              <Link href="/privacy" className="text-white/40 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition">Terms</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Know a marina we missed?</p>
            <a href="mailto:hello@marinaseeker.com" className="text-[#C4924B] hover:text-white transition">hello@marinaseeker.com</a>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">From Global AI Bots</p>
            <div className="flex flex-col gap-1">
              <a href="https://rampseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">RampSeeker</a>
              <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">PierSeeker</a>
              <a href="https://barkseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BarkSeeker</a>
              <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MarinaSeeker</a>
              <a href="https://mechanicseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MechanicSeeker</a>
              <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BabyMyDog</a>
              <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Chat</a>
              <a href="https://getcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Voice</a>
              <a href="https://grandlakeai.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Grand Lake AI</a>
              <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Global AI Bots</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-white/30 gap-4">
          <span>Veteran Owned &amp; Operated &#127482;&#127480; &middot; &copy; {new Date().getFullYear()} MarinaSeeker. All rights reserved.</span>
          <span>A <a href="https://globalaibots.com" target="_blank" className="text-[#C4924B]/70 hover:text-white transition">Global AI Bots</a> project.</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Source_Sans_3'] antialiased min-h-screen flex flex-col" style={{ background: "#FAF8F5" }}>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4822220549367368" crossOrigin="anonymous" strategy="afterInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2LM9KPHC9V" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-2LM9KPHC9V');`}</Script>
        <a href="/marinas" className="block w-full bg-[#1B3A5C] text-white text-center py-2 text-xs sm:text-sm font-medium hover:bg-[#0F2A47] transition">
          &#127381; MarinaSeeker just launched! We&apos;re building the most complete marina directory in America &rarr;
        </a>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CletusWidget />
      </body>
    </html>
  );
}
