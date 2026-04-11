"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const lines: string[] = [];
    fd.forEach((v, k) => lines.push(k + ": " + v));
    window.location.href = "mailto:admin@globalaibots.com?subject=" + encodeURIComponent("New Marina Submission \u2014 MarinaSeeker") + "&body=" + encodeURIComponent(lines.join("\n"));
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-4">{"\u2705"}</p>
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-3">Thanks for Your Submission!</h1>
      <p className="text-gray-500 mb-8">We&apos;ll review and add it to MarinaSeeker within a few days.</p>
      <Link href="/" className="bg-[#C4924B] text-white font-bold px-6 py-3 rounded-lg transition inline-block">Back to Home</Link>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2"><Link href="/" className="hover:text-[#1B3A5C] transition">Home</Link><span>/</span><span className="text-[#1A1A1A] font-medium">Submit a Marina</span></nav>
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-2">Submit a Marina</h1>
      <p className="text-gray-500 mb-8">Know a marina we&apos;re missing? Help us build the most complete directory in America.</p>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div><label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Name</label><input type="text" name="Name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C4924B] transition" /></div>
        <div><label className="block text-sm font-semibold text-[#1A1A1A] mb-1">State</label><input type="text" name="State" required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C4924B] transition" /></div>
        <div><label className="block text-sm font-semibold text-[#1A1A1A] mb-1">City/Town</label><input type="text" name="City" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C4924B] transition" /></div>
        <div><label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Address</label><input type="text" name="Address" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C4924B] transition" /></div>
        <div><label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Website (optional)</label><input type="text" name="Website" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C4924B] transition" /></div>
        <div><label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Notes</label><textarea name="Notes" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C4924B] transition resize-none" placeholder="Any additional details..." /></div>
        <button type="submit" className="w-full bg-[#C4924B] text-white font-bold py-3.5 rounded-lg transition text-sm hover:opacity-90">Submit Marina</button>
        <p className="text-xs text-gray-400 text-center">We review every submission within 48 hours.</p>
      </form>
    </div>
  );
}
