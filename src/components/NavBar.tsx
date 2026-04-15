"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";

export default function NavBar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <div className="text-2xl font-['Noto_Serif'] font-black tracking-tighter text-primary dark:text-primary-fixed">
          {t.projectName}
        </div>
        <div className="hidden md:flex items-center gap-8 font-['Noto_Serif'] text-lg font-medium">
          <Link
            href="/"
            className={`transition-colors ${
              isActive("/")
                ? "text-primary dark:text-primary-fixed border-b-2 border-tertiary-container pb-1"
                : "text-stone-500 dark:text-stone-400 hover:text-primary"
            }`}
          >
            {t.home}
          </Link>
          <Link
            href="/create"
            className={`transition-colors ${
              isActive("/create")
                ? "text-primary dark:text-primary-fixed border-b-2 border-tertiary-container pb-1"
                : "text-stone-500 dark:text-stone-400 hover:text-primary"
            }`}
          >
            {t.create}
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              isActive("/about")
                ? "text-primary dark:text-primary-fixed border-b-2 border-tertiary-container pb-1"
                : "text-stone-500 dark:text-stone-400 hover:text-primary"
            }`}
          >
            {t.about}
          </Link>
          <button
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
            className="px-3 py-1 rounded-full bg-surface-container-high text-sm font-medium hover:bg-surface-container-highest transition-colors"
          >
            {language === "en" ? "中文" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
