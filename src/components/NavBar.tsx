"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <div className="text-2xl font-['Noto_Serif'] font-black tracking-tighter text-primary dark:text-primary-fixed">
          Aura of Praise
        </div>
        <div className="hidden md:flex items-center gap-8 font-['Noto_Serif'] text-lg font-medium">
          <Link
            href="/"
            className="text-primary dark:text-primary-fixed border-b-2 border-tertiary-container pb-1"
          >
            Home
          </Link>
          <Link
            href="/upload"
            className="text-stone-500 dark:text-stone-400 hover:text-primary transition-colors"
          >
            Create
          </Link>
          <Link
            href="#about"
            className="text-stone-500 dark:text-stone-400 hover:text-primary transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
