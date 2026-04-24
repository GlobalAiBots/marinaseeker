export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "marina-vs-mooring-vs-dock", title: "Marina Slip vs Mooring Ball vs Private Dock: Which is Right for You?", date: "April 21, 2026", description: "Full cost + access comparison: slips $10-25/ft, moorings $100-400/mo, private docks $1K-5K/mo. Which makes sense for your boat, budget, and weather exposure.", category: "Slip Rentals" },
  { slug: "how-to-negotiate-slip-rental", title: "How to Negotiate a Marina Slip Rental: 7 Insider Tips", date: "April 21, 2026", description: "When to ask, what to ask for, and what to never negotiate on. Multi-year discounts, trade-work deals, off-season rates, and bundle options that save thousands.", category: "Slip Rentals" },
  { slug: "best-marinas-for-sailboats", title: "Best Marinas for Sailboats: What Sail Owners Should Look For", date: "April 20, 2026", description: "The best marinas for sailboats — keel depth, mast height, sailing community, and the sailboat-specific features that separate great marinas from the wrong fit.", category: "Destinations" },
  { slug: "marina-amenities-checklist", title: "Marina Amenities Checklist: 15 Things a Good Marina Should Have (2026)", date: "April 20, 2026", description: "The 15 amenities a good marina should have — fuel dock, pump-out, shore power, ship's store, restrooms, laundry, Wi-Fi, and the must-haves you shouldn't compromise on.", category: "Guides" },
  { slug: "marina-slip-costs-by-state", title: "Marina Slip Costs by State (2026): What You'll Actually Pay", date: "April 20, 2026", description: "Marina slip costs by state in 2026. Typical monthly rates in Florida, California, New York, Michigan and 15+ more — plus what drives regional pricing.", category: "Slip Rentals" },
  { slug: "boat-insurance-guide", title: "Boat Insurance 101: What Every Boat Owner Needs to Know", date: "April 19, 2026", description: "Boat insurance explained: types of coverage, average costs by boat size, agreed value vs actual cash value, liability, and when it's required. Plain-English 2026 guide.", category: "Guides" },
  { slug: "marina-checklist", title: "Marina Checklist: 10 Things to Inspect Before Signing a Lease", date: "April 19, 2026", description: "Before signing a marina slip lease, walk the docks and check these 10 items. Electrical condition, dock stability, security, fuel access, depth at low tide, and more.", category: "Guides" },
  { slug: "transient-dockage-guide", title: "How to Find Transient Slips for Overnight Stays", date: "April 15, 2026", description: "Everything cruising boaters need to know about transient dockage: nightly rates, etiquette, and the best regions for overnight slips.", category: "Slip Rentals" },
  { slug: "marina-slip-costs", title: "How Much Does a Marina Slip Cost in 2026? State-by-State Guide", date: "April 15, 2026", description: "Marina slip costs vary from $500 to $6,000+ per month depending on region. See 2026 pricing by state and tips to save.", category: "Slip Rentals" },
  { slug: "liveaboard-marinas", title: "Liveaboard Guide: Best Marinas for Living on Your Boat (2026)", date: "April 15, 2026", description: "Everything you need to know about living aboard full-time, from legal requirements to the best states for liveaboards.", category: "Liveaboard" },
  { slug: "choosing-a-marina-checklist", title: "10 Things to Check Before Choosing a Marina", date: "April 15, 2026", description: "Use this checklist to evaluate slip size, depth, fuel, security, insurance, pet policy, and more before signing a lease.", category: "Guides" },
  { slug: "dock-life-rules", title: "Dock Life: The Unwritten Rules of Living at a Marina", date: "April 15, 2026", description: "The unwritten rules every marina resident should know, from harbor speed to helping with dock lines.", category: "Etiquette" },
  { slug: "winter-boat-storage-at-marinas", title: "Winter Boat Storage: Marina vs Dry Stack vs Home", date: "April 15, 2026", description: "Compare marina wet slip, dry stack, and home storage for winter boat storage. Cost ranges, pros and cons, and what to ask your marina about winter storage policies.", category: "Seasonal" },
  { slug: "what-to-look-for-choosing-marina", title: "What to Look for When Choosing a Marina", date: "April 9, 2026", description: "The complete guide to finding the perfect marina for your boat and lifestyle.", category: "Guides" },
  { slug: "marina-etiquette", title: "Marina Etiquette: 10 Rules Every Boater Should Know", date: "April 9, 2026", description: "Unwritten rules that will make you a welcome member of any marina community.", category: "Etiquette" },
  { slug: "liveaboard-guide", title: "Liveaboard Guide: Living on Your Boat at a Marina", date: "April 9, 2026", description: "Everything you need to know about making a marina your full-time home.", category: "Liveaboard" },
  { slug: "seasonal-vs-annual-slip-rental", title: "Seasonal vs Annual Slip Rental: Which Saves You Money?", date: "April 9, 2026", description: "A cost breakdown to help you decide the best slip rental strategy.", category: "Slip Rentals" },
  { slug: "top-marinas-michigan", title: "Top Marinas in Michigan for Weekend Boaters", date: "April 9, 2026", description: "Michigan has 220+ marinas. Here are the best for weekend getaways.", category: "Destinations" },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}
