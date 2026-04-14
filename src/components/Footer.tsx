"use client";

export default function Footer() {
  return (
    <footer className="w-full mt-20 py-12 bg-surface-container-low dark:bg-stone-950 text-primary dark:text-primary-fixed font-['Inter'] text-sm tracking-wide">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 max-w-7xl mx-auto">
        <div className="font-['Noto_Serif'] italic text-primary dark:text-primary-fixed text-xl">
          Aura of Praise
        </div>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-stone-500 hover:text-primary transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-stone-500 hover:text-primary transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-stone-500 hover:text-primary transition-colors"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="text-stone-500 hover:text-primary transition-colors"
          >
            Support
          </a>
        </div>
        <div className="text-stone-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} Aura of Praise. Crafted with
          affection.
        </div>
      </div>
    </footer>
  );
}
