"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type StyleType = "ancient" | "romantic" | "devotion" | "article" | "minimal";

interface PraiseData {
  image: string;
  style: StyleType;
  praise?: string;
}

const styleConfig: Record<
  StyleType,
  { title: string; subtitle: string; icon: string }
> = {
  ancient: {
    title: "Ancient Poetry",
    subtitle: "Elegant verses inspired by Tang and Song dynasties",
    icon: "auto_stories",
  },
  romantic: {
    title: "English Romance",
    subtitle: "Flowing prose in the style of Victorian literature",
    icon: "favorite",
  },
  devotion: {
    title: "Unconditional Devotion",
    subtitle: "Playful, hyperbolic, and deeply affectionate",
    icon: "volunteer_activism",
  },
  article: {
    title: "Long Article",
    subtitle: "A narrative journey detailing every nuance",
    icon: "history_edu",
  },
  minimal: {
    title: "Minimalist",
    subtitle: "Short, punchy, and modern",
    icon: "ink_highlighter",
  },
};

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<PraiseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [praise, setPraise] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("praiseData");
    if (!stored) {
      router.push("/upload");
      return;
    }

    const parsedData: PraiseData = JSON.parse(stored);
    setData(parsedData);

    // If we don't have praise yet, generate it
    if (!parsedData.praise) {
      generatePraise(parsedData);
    } else {
      setPraise(parsedData.praise);
      setIsLoading(false);
    }
  }, [router]);

  const generatePraise = async (data: PraiseData) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate praise");
      }

      const result = await response.json();
      setPraise(result.praise);
    } catch (error) {
      // Fallback praise if API fails
      setPraise(
        "There is a light you carry that doesn't just illuminate the room—it ignites the spirit of everyone within it. Like golden hour captured in a single smile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(praise);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Aura of Praise",
        text: praise,
      });
    } else {
      handleCopy();
    }
  };

  if (isLoading || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <NavBar />
        <div className="flex flex-col items-center gap-4">
          <span className="animate-spin material-symbols-outlined text-6xl text-primary">
            progress_activity
          </span>
          <p className="font-headline text-xl text-on-surface-variant">
            Crafting your praise...
          </p>
        </div>
      </main>
    );
  }

  const style = styleConfig[data.style];

  return (
    <main className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4">
            A Moment of{" "}
            <span className="italic text-primary">
              {style.title.split(" ")[0]}
            </span>
          </h1>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Your uploaded memory has been paired with a curated reflection. This
            is your digital keepsake to cherish and share.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          {/* Image */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-4 bg-tertiary-container/10 rounded-lg blur-2xl group-hover:bg-tertiary-container/20 transition-all duration-700" />
            <div className="relative bg-surface-container-lowest rounded-lg overflow-hidden ambient-shadow">
              <div className="relative aspect-[4/5]">
                <Image
                  src={data.image}
                  alt="Uploaded memory"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-tertiary-container overflow-hidden bg-surface-container-lowest">
                    <span className="material-symbols-outlined text-2xl text-tertiary flex items-center justify-center h-full">
                      {style.icon}
                    </span>
                  </div>
                  <div className="text-white">
                    <p className="text-xs font-label uppercase tracking-widest opacity-80">
                      Memory Recorded
                    </p>
                    <p className="font-headline italic text-lg text-tertiary-fixed">
                      {new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Praise Content */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="bg-surface-container-low p-10 rounded-lg relative">
              <span
                className="material-symbols-outlined absolute -top-4 -left-4 text-6xl text-primary/10 select-none"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <div className="space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-tertiary-fixed rounded-full text-on-tertiary-fixed text-xs font-bold tracking-widest uppercase glow-chip">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  The {style.title} Style
                </div>
                <p className="font-headline text-3xl md:text-4xl text-on-surface leading-tight font-medium italic">
                  &ldquo;{praise}&rdquo;
                </p>
                <div className="h-0.5 w-16 bg-tertiary-container" />
                <p className="font-body text-on-surface-variant leading-relaxed text-lg">
                  This moment captures the essence of beauty. Every detail in
                  this frame speaks to a soul that is unafraid to shine brightly,
                  even in the quietest of hours.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={handleCopy}
                className="w-full py-4 px-8 bg-primary text-on-primary rounded-full font-label font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98] ambient-shadow"
              >
                <span className="material-symbols-outlined">
                  {copied ? "check" : "content_copy"}
                </span>
                {copied ? "Copied!" : "Copy Text"}
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleShare}
                  className="py-4 px-6 bg-secondary-container text-on-secondary-container rounded-full font-label font-semibold flex items-center justify-center gap-3 hover:bg-primary-fixed transition-all"
                >
                  <span className="material-symbols-outlined">share</span>
                  Share
                </button>
                <button
                  onClick={() => router.push("/upload")}
                  className="py-4 px-6 bg-surface-container-highest text-on-surface rounded-full font-label font-semibold flex items-center justify-center gap-3 hover:bg-outline-variant transition-all"
                >
                  <span className="material-symbols-outlined">add</span>
                  New Photo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Other Styles */}
        <section className="mt-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-headline text-4xl font-black text-on-surface tracking-tight mb-2">
                Explore Other{" "}
                <span className="text-tertiary">Auras</span>
              </h2>
              <p className="text-on-surface-variant font-body">
                Change the mood of your keepsake with different praise styles.
              </p>
            </div>
            <Link
              href="/upload"
              className="text-primary font-label font-bold flex items-center gap-2 hover:gap-4 transition-all"
            >
              View all styles{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(styleConfig)
              .filter(([key]) => key !== data.style)
              .slice(0, 3)
              .map(([key, config]) => (
                <div
                  key={key}
                  className="bg-surface-container-lowest p-8 rounded-lg ambient-shadow group hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  onClick={() => {
                    const newData = { ...data, style: key as StyleType };
                    sessionStorage.setItem("praiseData", JSON.stringify(newData));
                    setData(newData);
                    setIsLoading(true);
                    generatePraise(newData);
                  }}
                >
                  <div className="w-14 h-14 bg-secondary-fixed rounded-2xl flex items-center justify-center mb-6 text-on-secondary-fixed-variant">
                    <span className="material-symbols-outlined text-3xl">
                      {config.icon}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-3">
                    {config.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {config.subtitle}
                  </p>
                  <div className="text-tertiary font-label text-xs font-black uppercase tracking-widest">
                    Select Style
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
