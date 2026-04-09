import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MarinaSeeker | Every Marina in America",
  description: "MarinaSeeker is the most complete marina directory in America. Free GPS coordinates, amenities, and local information for every marina.",
  alternates: { canonical: "https://marinaseeker.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">About MarinaSeeker</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>MarinaSeeker is the most complete marina directory in America. We compile data from OpenStreetMap, federal maritime agencies, and community contributions to build a comprehensive, free resource for boaters.</p>
        <p>Every marina listing includes GPS coordinates so you can navigate directly, plus amenity information like fuel availability, electric hookups, pump-out stations, showers, wifi, and restaurant access where available.</p>
        <p>MarinaSeeker is free to use. No login required. No account needed. Just find your marina and go.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-8 mb-3">Our Network</h2>
        <p>MarinaSeeker is part of the Global AI Bots family of directories:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a href="https://rampseeker.com" className="text-[#1B3A5C] hover:underline">RampSeeker</a> &mdash; 29,500+ boat ramps</li>
          <li><a href="https://pierseeker.com" className="text-[#1B3A5C] hover:underline">PierSeeker</a> &mdash; 34,900+ fishing piers</li>
          <li><a href="https://barkseeker.com" className="text-[#1B3A5C] hover:underline">BarkSeeker</a> &mdash; 7,300+ dog parks</li>
          <li><a href="https://babymydog.com" className="text-[#1B3A5C] hover:underline">BabyMyDog</a> &mdash; dog products &amp; care guides</li>
        </ul>
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-8 mb-3">Contact</h2>
        <p>Email us at <a href="mailto:hello@marinaseeker.com" className="text-[#C4924B] hover:underline">hello@marinaseeker.com</a></p>
      </div>
    </div>
  );
}
