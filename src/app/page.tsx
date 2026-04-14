"use client";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import StyleShowcase from "@/components/StyleShowcase";
import BentoSection from "@/components/BentoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="pb-20">
      <NavBar />
      <HeroSection />
      <StyleShowcase />
      <BentoSection />
      <CTASection />
      <Footer />
    </main>
  );
}
