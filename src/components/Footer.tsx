"use client";

import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

type LenisLike = {
  stop?: () => void;
  start?: () => void;
  scrollTo?: (
    target: number,
    options?: {
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

// Updated to match the new site architecture
const EXPLORE_LINKS = [
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Screen Work", href: "/#screen-work" },
  { name: "Digitals", href: "/#digitals" },
  { name: "Press & Media", href: "/#press" },
  { name: "About", href: "/#about" },
  { name: "Booking", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const lenis = window.__lenis;

    if (lenis?.scrollTo) {
      lenis.scrollTo(0, {
        duration: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden rounded-t-[2rem] bg-[#0A0A0A] px-5 pt-16 pb-8 sm:rounded-t-[3rem] sm:px-8 sm:pt-20 sm:pb-10 md:rounded-t-[5rem] md:px-24 md:pt-24 md:pb-12">
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto flex max-w-[1800px] flex-col gap-14 md:gap-20">
        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-start sm:justify-between md:gap-12">
          
          <div className="space-y-3 text-center sm:text-left md:space-y-4">
            <h2 className="font-playfair text-4xl uppercase tracking-tighter leading-[0.9] text-white sm:text-5xl md:text-6xl">
              Teena
              <br />
              Shanell
            </h2>
            <p className="font-montserrat text-[10px] uppercase tracking-[0.5em] text-gold/60">
              Editorial Archive
            </p>
          </div>

          {/* Navigation changed for mobile vertical stacking and desktop grid */}
          <nav className="flex flex-col items-center gap-10 text-center sm:grid sm:grid-cols-2 sm:gap-x-16 sm:text-left w-full sm:w-auto">
            
            <div className="flex flex-col items-center gap-3 sm:items-start md:gap-4 w-full">
              <p className="mb-1 font-montserrat text-[9px] uppercase tracking-[0.3em] text-white/20 md:mb-2">
                Explore
              </p>
              {EXPLORE_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 hover:text-gold"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 sm:items-start md:gap-4 w-full">
              <p className="mb-1 font-montserrat text-[9px] uppercase tracking-[0.3em] text-white/20 md:mb-2">
                Social
              </p>
              {/* Flex row for mobile (horizontal), Flex col for desktop (vertical) */}
              <div className="flex flex-row flex-wrap justify-center gap-6 sm:flex-col sm:items-start sm:gap-3 md:gap-4">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 hover:text-gold"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            
          </nav>

        </div>

        <div className="flex flex-col items-center justify-center gap-5 border-t border-white/5 pt-8 sm:flex-row sm:items-end sm:justify-between md:gap-8 md:pt-12">
          <div className="flex flex-col items-center gap-3 sm:items-start md:gap-4">
            <button
              onClick={scrollToTop}
              className="text-center font-montserrat text-[9px] uppercase tracking-[0.5em] text-gold transition-colors hover:text-white sm:text-left"
            >
              Back to Top ^
            </button>
            <p className="text-center font-montserrat text-[8px] uppercase tracking-[0.4em] text-white/20 sm:text-left">
              Copyright {currentYear} All Rights Reserved.
            </p>
          </div>

          <div className="group text-center sm:text-right">
            <p className="font-montserrat text-[9px] uppercase tracking-[0.3em] leading-loose text-white/20">
              Designed and Developed by
              <br />
              <a
                href="https://www.graphorastudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tracking-[0.4em] text-white/60 underline decoration-gold/30 underline-offset-8 transition-colors duration-500 hover:text-gold group-hover:text-gold"
              >
                Graphora Studio
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center overflow-hidden opacity-[0.03] pointer-events-none select-none md:mt-16">
        <span className="whitespace-nowrap font-playfair text-[12vw] italic leading-none tracking-tighter text-white">
          Teena Shanell
        </span>
      </div>
    </footer>
  );
}
