"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section id="about" className="py-20 px-8">
      <div className="max-w-4xl mx-auto bg-surface-container rounded-lg p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary-container to-primary" />
        <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-6 italic">
          Ready to make her blush?
        </h2>
        <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto">
          Upload a photo now and receive a custom-crafted praise in seconds. No
          strings attached, just pure affection.
        </p>
        <Link href="/upload" className="btn-primary inline-flex items-center gap-2">
          Get Started Now
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
