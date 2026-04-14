"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type StyleType = "ancient" | "romantic" | "devotion" | "article" | "minimal";

interface StyleOption {
  id: StyleType;
  title: string;
  subtitle: string;
  icon: string;
  tag: string;
  tagType: "classic" | "emotional" | "detailed" | "default";
}

const styles: StyleOption[] = [
  {
    id: "ancient",
    title: "Ancient Poetry",
    subtitle: "古诗词 - Elegant verses inspired by Tang and Song dynasties",
    icon: "auto_stories",
    tag: "Classic",
    tagType: "classic",
  },
  {
    id: "romantic",
    title: "English Romance",
    subtitle: "Flowing prose in the style of Victorian literature",
    icon: "favorite",
    tag: "Active Choice",
    tagType: "default",
  },
  {
    id: "devotion",
    title: "Unconditional Devotion",
    subtitle: "Playful, hyperbolic, and deeply affectionate expressions",
    icon: "volunteer_activism",
    tag: "Emotional",
    tagType: "emotional",
  },
  {
    id: "article",
    title: "Long Article",
    subtitle: "A narrative journey detailing every nuance",
    icon: "history_edu",
    tag: "Detailed",
    tagType: "detailed",
  },
  {
    id: "minimal",
    title: "Minimalist",
    subtitle: "Short, punchy, and modern. Less is more.",
    icon: "ink_highlighter",
    tag: "",
    tagType: "default",
  },
];

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("romantic");
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerate = async () => {
    if (!image) return;

    setIsGenerating(true);

    // Store data in sessionStorage for result page
    sessionStorage.setItem(
      "praiseData",
      JSON.stringify({
        image,
        style: selectedStyle,
      })
    );

    // Navigate to result page
    router.push("/result");
  };

  const selectedStyleData = styles.find((s) => s.id === selectedStyle)!;

  return (
    <main className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Image Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 font-headline italic text-6xl text-primary opacity-20 select-none">
                Captured
              </div>
              <div className="rounded-lg overflow-hidden ambient-shadow bg-surface-container-lowest p-3">
                {image ? (
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={image}
                      alt="Uploaded preview"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div
                    className={`aspect-[4/5] flex flex-col items-center justify-center bg-surface-container-low rounded-md transition-colors cursor-pointer ${
                      isDragging ? "bg-primary-container" : ""
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-6xl text-outline mb-4">
                      add_photo_alternate
                    </span>
                    <p className="text-on-surface-variant">
                      Drag & drop your photo here
                    </p>
                    <p className="text-xs text-outline mt-2">
                      or click to browse
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {image && (
              <div className="mt-8 p-6 rounded-lg bg-surface-container-low">
                <h3 className="font-headline text-xl font-bold text-primary mb-2">
                  Photo Analysis
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  We&apos;ve detected elements of{" "}
                  <span className="font-semibold">Soft Light</span>,{" "}
                  <span className="font-semibold">Natural Beauty</span>, and{" "}
                  <span className="font-semibold">Serenity</span>. Ready to
                  transform these visuals into heartfelt words.
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Style Selection */}
          <div className="lg:col-span-7">
            <header className="mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold tracking-widest uppercase mb-4 glow-chip">
                The Digital Keepsake
              </span>
              <h1 className="font-headline text-5xl font-black text-on-surface tracking-tight mb-4">
                Choose Your Voice
              </h1>
              <p className="text-on-surface-variant text-lg">
                Select the linguistic lens through which you wish to praise this
                moment.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`text-left relative p-8 rounded-lg border-2 transition-all duration-300 ${
                    selectedStyle === style.id
                      ? "style-card-selected"
                      : "bg-surface-container-lowest border-transparent hover:border-primary-fixed"
                  }`}
                  style={{
                    boxShadow: "0 20px 40px rgba(128, 80, 98, 0.06)",
                  }}
                >
                  {selectedStyle === style.id && (
                    <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      {style.icon}
                    </span>
                    {style.tag && (
                      <div
                        className={`text-xs font-bold italic ${
                          style.tagType === "classic"
                            ? "text-tertiary opacity-40"
                            : style.tagType === "emotional"
                              ? "text-primary opacity-40"
                              : "text-primary opacity-100"
                        }`}
                      >
                        {style.tag}
                      </div>
                    )}
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">
                    {style.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {style.subtitle}
                  </p>
                  <div
                    className={`w-8 h-1 mt-4 rounded-full ${
                      selectedStyle === style.id
                        ? "w-12 bg-primary"
                        : "bg-tertiary-container"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Action Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={handleGenerate}
                disabled={!image || isGenerating}
                className={`w-full sm:w-auto px-12 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  image && !isGenerating
                    ? "bg-primary text-on-primary ambient-shadow hover:opacity-90 active:scale-95"
                    : "bg-surface-container-high text-outline cursor-not-allowed"
                }`}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">
                      progress_activity
                    </span>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Praise
                    <span className="material-symbols-outlined">sparkles</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setImage(null)}
                className="w-full sm:w-auto px-8 py-5 bg-surface-container-high text-on-surface-variant rounded-full font-medium text-lg hover:bg-surface-container-highest transition-colors"
              >
                Retake Photo
              </button>
            </div>
            <p className="mt-6 text-xs text-on-surface-variant italic text-center sm:text-left">
              &ldquo;Words are the threads that weave our affection into
              eternity.&rdquo;
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
