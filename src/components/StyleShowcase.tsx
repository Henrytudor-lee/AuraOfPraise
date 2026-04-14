"use client";

export default function StyleShowcase() {
  const styles = [
    {
      icon: "brush",
      title: "Ancient Poetry",
      description:
        "Elegant verses inspired by the classics, celebrating timeless beauty with traditional grace.",
      tag: "Refined",
      bgColor: "bg-secondary-container",
      textColor: "text-on-secondary-container",
    },
    {
      icon: "favorite",
      title: "Modern Romantic",
      description:
        "Direct, heartfelt, and contemporary expressions of love that speak to the heart of today.",
      tag: "Passionate",
      bgColor: "bg-primary-fixed",
      textColor: "text-on-primary-fixed",
    },
    {
      icon: "menu_book",
      title: "English Muse",
      description:
        "Shakespearean depth and Victorian charm, for a sophisticated touch of international flair.",
      tag: "Sophisticated",
      bgColor: "bg-tertiary-fixed",
      textColor: "text-on-tertiary-fixed",
      glow: true,
    },
    {
      icon: "auto_awesome_motion",
      title: "Playful & Cute",
      description:
        "Lighthearted, witty, and sweet praises that bring a radiant smile to her face instantly.",
      tag: "Enchanting",
      bgColor: "bg-outline-variant/30",
      textColor: "text-primary",
    },
  ];

  return (
    <section id="styles" className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">
            Every Muse Deserves a Melody
          </h2>
          <p className="text-on-surface-variant">
            Choose from a variety of curated literary styles to match her unique
            personality and the mood of your photo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {styles.map((style) => (
            <div
              key={style.title}
              className="p-8 bg-surface-container-lowest rounded-lg group hover:bg-primary-container/10 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-full ${style.bgColor} flex items-center justify-center mb-6 ${style.textColor} ${style.glow ? "glow-chip" : ""}`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {style.icon}
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">
                {style.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {style.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary tracking-widest uppercase">
                <span className="w-4 h-[1px] bg-primary" />
                {style.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
