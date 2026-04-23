import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Consolidate service-page slugs onto existing canonical URLs.
      { source: "/marinas/fuel-dock", destination: "/fuel", permanent: true },
      { source: "/marinas/liveaboard", destination: "/liveaboard", permanent: true },
      // Redirect duplicate-topic blog slugs to existing canonical posts.
      { source: "/blog/how-to-choose-a-marina", destination: "/blog/choosing-a-marina-checklist", permanent: true },
      { source: "/blog/liveaboard-marinas-guide", destination: "/blog/liveaboard-guide", permanent: true },
      { source: "/blog/boat-winterization-at-marina", destination: "/blog/winter-boat-storage-at-marinas", permanent: true },
      { source: "/blog/transient-vs-annual-slip", destination: "/blog/seasonal-vs-annual-slip-rental", permanent: true },
      // Canonicalize apex → www with 308 (Google AdSense ads.txt crawler does not reliably follow 307).
      { source: "/:path*", has: [{ type: "host", value: "marinaseeker.com" }], destination: "https://www.marinaseeker.com/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
