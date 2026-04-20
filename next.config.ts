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
    ];
  },
};

export default nextConfig;
