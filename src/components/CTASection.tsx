"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-8">
      <div className="max-w-4xl mx-auto bg-surface-container rounded-lg p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary-container to-primary" />
        <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-6 italic">
          {t.readyToMakeHerBlush}
        </h2>
        <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto">
          {t.ctaDescription}
        </p>
        <Link href="/create" className="btn-primary inline-flex items-center gap-2">
          {t.getStartedNow}
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
