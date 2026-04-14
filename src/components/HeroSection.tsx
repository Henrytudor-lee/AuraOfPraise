"use client";

import Link from "next/link";
import Image from "next/image";

const sampleImage = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80";

export default function HeroSection() {
  return (
    <section className="relative px-8 py-16 md:py-32 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-label font-medium tracking-wider uppercase text-on-secondary-container bg-secondary-container rounded-full">
            The Art of Admiration
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface leading-[1.1] mb-8 tracking-tight">
            Capture Her Radiance, <br />
            <span className="italic font-serif text-primary">Gift Her Words.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-12 leading-relaxed">
            Transform every portrait into a poetic masterpiece. Our AI understands
            the soul of beauty, crafting personalized praise that resonates with
            affection and grace.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/upload" className="btn-primary flex items-center gap-2 group">
              <span className="material-symbols-outlined">upload_file</span>
              Upload Photo
            </Link>
            <Link
              href="#styles"
              className="px-8 py-4 bg-surface-container-high text-on-surface-variant font-medium rounded-xl hover:bg-surface-container-highest transition-all flex items-center gap-2"
            >
              Explore Styles
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden ambient-shadow">
            <Image
              alt="Portrait of a woman"
              src={sampleImage}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-tertiary-container p-6 rounded-lg ambient-shadow max-w-[200px]">
            <span className="material-symbols-outlined text-on-tertiary-container text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <p className="font-headline italic text-on-tertiary-container text-sm">
              &ldquo;Your light outshines the morning sun...&rdquo;
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary-container/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-tertiary-container/10 blur-[80px] rounded-full" />
    </section>
  );
}
