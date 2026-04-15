"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useLanguage, Translations } from "@/lib/i18n";

type StyleType = "ancient" | "romantic" | "devotion" | "article" | "minimal";

interface StyleOption {
  id: StyleType;
  titleKey: keyof Translations;
  subtitleKey: keyof Translations;
  icon: string;
  tagKey?: keyof Translations;
  tagType: "classic" | "emotional" | "detailed" | "default";
}

const styles: StyleOption[] = [
  {
    id: "ancient",
    titleKey: "ancientPoetry",
    subtitleKey: "ancientPoetrySubtitle",
    icon: "auto_stories",
    tagKey: "ancientPoetryTag",
    tagType: "classic",
  },
  {
    id: "romantic",
    titleKey: "englishRomance",
    subtitleKey: "englishRomanceSubtitle",
    icon: "favorite",
    tagKey: "activeChoice",
    tagType: "default",
  },
  {
    id: "devotion",
    titleKey: "unconditionalDevotion",
    subtitleKey: "unconditionalDevotionSubtitle",
    icon: "volunteer_activism",
    tagKey: "unconditionalDevotionTag",
    tagType: "emotional",
  },
  {
    id: "article",
    titleKey: "longArticle",
    subtitleKey: "longArticleSubtitle",
    icon: "history_edu",
    tagKey: "longArticleTag",
    tagType: "detailed",
  },
  {
    id: "minimal",
    titleKey: "minimalist",
    subtitleKey: "minimalistSubtitle",
    icon: "ink_highlighter",
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
  const { t } = useLanguage();

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

    sessionStorage.setItem(
      "praiseData",
      JSON.stringify({
        image,
        style: selectedStyle,
      })
    );

    router.push("/result");
  };

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
                    <p className="text-on-surface-variant">{t.dragDropHere}</p>
                    <p className="text-xs text-outline mt-2">{t.orClickToBrowse}</p>
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
                  {t.photoAnalysis}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t.photoAnalysisDesc}
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Style Selection */}
          <div className="lg:col-span-7">
            <header className="mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold tracking-widest uppercase mb-4 glow-chip">
                {t.digitalKeepsake}
              </span>
              <h1 className="font-headline text-5xl font-black text-on-surface tracking-tight mb-4">
                {t.chooseYourVoice}
              </h1>
              <p className="text-on-surface-variant text-lg">
                {t.selectLinguisticLens}
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
                    {style.tagKey && (
                      <div
                        className={`text-xs font-bold italic ${
                          style.tagType === "classic"
                            ? "text-tertiary opacity-40"
                            : style.tagType === "emotional"
                              ? "text-primary opacity-40"
                              : "text-primary opacity-100"
                        }`}
                      >
                        {t[style.tagKey]}
                      </div>
                    )}
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">
                    {t[style.titleKey]}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {t[style.subtitleKey]}
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
                    {t.generating}
                  </>
                ) : (
                  <>
                    {t.generatePraise}
                    <span className="material-symbols-outlined">sparkles</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setImage(null)}
                className="w-full sm:w-auto px-8 py-5 bg-surface-container-high text-on-surface-variant rounded-full font-medium text-lg hover:bg-surface-container-highest transition-colors"
              >
                {t.retakePhoto}
              </button>
            </div>
            <p className="mt-6 text-xs text-on-surface-variant italic text-center sm:text-left">
              &ldquo;{t.wordsAreThreads}&rdquo;
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
