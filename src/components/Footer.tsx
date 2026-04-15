"use client";

import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full mt-20 py-12 bg-surface-container-low dark:bg-stone-950 text-primary dark:text-primary-fixed font-['Inter'] text-sm tracking-wide">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 max-w-7xl mx-auto">
        <div className="font-['Noto_Serif'] italic text-primary dark:text-primary-fixed text-xl">
          {t.projectName}
        </div>
        <div className="flex gap-8">
          <a href="/about#our-core-is-open" className="text-stone-500 hover:text-primary transition-colors">
            {t.privacy}
          </a>
          <a href="/about#connect-with-us" className="text-stone-500 hover:text-primary transition-colors">
            {t.contactUs}
          </a>
        </div>
        <div className="text-stone-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} {t.copyright}
        </div>
      </div>
    </footer>
  );
}
