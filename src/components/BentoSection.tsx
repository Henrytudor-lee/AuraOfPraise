"use client";

import Image from "next/image";

const images = {
  couple: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
};

export default function BentoSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
        <div className="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-lg p-10 flex flex-col justify-end relative overflow-hidden group">
          <Image
            alt="Happy couple"
            src={images.couple}
            fill
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <div className="relative z-10">
            <h3 className="font-headline text-3xl font-bold text-on-primary mb-2">
              Moments Immortalized
            </h3>
            <p className="text-on-primary/80 max-w-xs">
              Beyond just an image, we capture the emotion behind the gaze.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 md:row-span-1 bg-tertiary-fixed rounded-lg p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="material-symbols-outlined text-on-tertiary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-on-tertiary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined text-on-tertiary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-tertiary-fixed mb-2 italic">
              &ldquo;She is a poem without words.&rdquo;
            </h3>
            <p className="text-on-tertiary-fixed-variant">
              Let our AI bridge that gap with linguistic perfection.
            </p>
          </div>
        </div>

        <div className="md:col-span-1 md:row-span-1 bg-surface-container-highest rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <span className="block text-4xl font-headline font-black text-primary mb-1">
              99%
            </span>
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
              Heart Rate Spike
            </span>
          </div>
        </div>

        <div className="md:col-span-1 md:row-span-1 bg-primary text-on-primary rounded-lg p-8 flex items-center justify-center group cursor-pointer">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl mb-2 group-hover:scale-125 transition-transform block">
              favorite
            </span>
            <span className="block text-sm font-label">Gift the Moment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
