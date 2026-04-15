"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

import aboutImage from "@/../public/images/screen.png";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* Hero: Our Vision */}
        <section className="relative mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold tracking-widest uppercase mb-6 glow-chip">
                {t.ourVision}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-primary leading-tight tracking-tight mb-8">
                {t.theDigitalKeepsakeTitle}
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed font-light max-w-xl">
                {t.theDigitalKeepsakeDesc}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-container/30 rounded-full blur-3xl" />
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image
                  className="object-cover"
                  alt="A warm, cozy, and heartwarming scene"
                  src={aboutImage}
                  fill
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Section: The Heart & Technical Architecture */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {/* The Heart */}
          <div className="md:col-span-2 bg-surface-container-lowest p-12 rounded-lg relative overflow-hidden ambient-shadow">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-9xl">favorite</span>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-6">
              {t.heartOfProject}
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
              {t.heartOfProjectDesc1}
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed italic">
              {t.heartOfProjectDesc2}
            </p>
          </div>

          {/* AI Section */}
          <div className="bg-secondary-container p-12 rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-on-secondary-container mb-4">
                {t.aiDrivenEloquence}
              </h3>
              <p className="text-sm text-on-secondary-container/80 leading-relaxed">
                {t.aiDrivenEloquenceDesc}
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-on-secondary-container/10">
              <span
                className="material-symbols-outlined text-4xl text-primary mb-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <p className="text-xs font-bold text-on-secondary-container tracking-widest uppercase">
                {t.theAuraSystem}
              </p>
            </div>
          </div>

          {/* Architecture / System */}
          <div className="bg-surface-container-low p-12 rounded-lg flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-primary text-3xl">
                architecture
              </span>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              {t.elegantArchitecture}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t.elegantArchitectureDesc}
            </p>
          </div>

          {/* Open Source */}
          <div id="our-core-is-open" className="md:col-span-2 bg-primary text-on-primary p-12 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">{t.ourCoreIsOpen}</h3>
              <p className="text-primary-fixed-dim max-w-md">
                {t.ourCoreIsOpenDesc}
              </p>
            </div>
            <a
              className="px-10 py-5 bg-tertiary-container text-on-tertiary-container rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform"
              href="https://github.com/Henrytudor-lee/ComplimentGarden"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              {t.githubRepository}
            </a>
          </div>
        </section>

        {/* Connect with Us */}
        <section id="connect-with-us" className="max-w-3xl mx-auto text-center py-20 bg-surface-container-lowest rounded-lg ambient-shadow">
          <h2 className="text-4xl font-bold text-primary mb-6 italic">
            {t.connectWithUs}
          </h2>
          <p className="text-on-surface-variant mb-12 px-8">
            {t.connectWithUsDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
              </div>
              <span className="font-medium">tlee4014@gmail.com</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
