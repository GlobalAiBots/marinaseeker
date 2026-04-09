import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MarinaSeeker",
  alternates: { canonical: "https://marinaseeker.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
        <p>Last updated: April 2026</p>
        <p>MarinaSeeker (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates marinaseeker.com. This page informs you of our policies regarding the collection, use, and disclosure of personal information.</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Information We Collect</h2>
        <p>We collect anonymous usage data through Google Analytics, including pages visited, time on site, and general geographic location. We do not collect personally identifiable information unless you voluntarily submit it (e.g., via email).</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Cookies</h2>
        <p>We use cookies for analytics (Google Analytics) and advertising (Google AdSense). You can disable cookies in your browser settings.</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Third-Party Services</h2>
        <p>We use Google Analytics for traffic analysis and Google AdSense for advertising. These services may collect data as described in their respective privacy policies.</p>
        <h2 className="font-bold text-[#1A1A1A] text-base mt-6">Contact</h2>
        <p>Questions? Email <a href="mailto:hello@marinaseeker.com" className="text-[#C4924B] hover:underline">hello@marinaseeker.com</a></p>
      </div>
    </div>
  );
}
