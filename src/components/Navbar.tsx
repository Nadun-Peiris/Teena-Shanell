"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaFacebookF, FaImdb, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

// --- Types & Globals ---
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

// --- Data Arrays ---
const NAV_LINKS = [
  { name: "Home", href: "/#home" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Screen Work", href: "/#screen-work" },
  { name: "Digitals", href: "/#digitals" },
  { name: "Press & Media", href: "/#press" },
  { name: "About", href: "/#about" },
];

const SOCIAL_ICONS = {
  YouTube: <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />,
  TikTok: <FaTiktok className="w-4 h-4 sm:w-5 sm:h-5" />,
  Instagram: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />,
  Facebook: <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />,
  IMDb: <FaImdb className="w-6 h-6 sm:w-7 sm:h-7" />,
} as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = window.setTimeout(() => setIsVisible(true), 3500);
    const header = headerRef.current;

    if (!header) return;

    const showAnim = gsap
      .from(header, {
        yPercent: -100,
        paused: true,
        duration: 0.4,
        ease: "power2.out",
      })
      .progress(1);

    scrollTriggerRef.current = ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
        setIsAtTop(self.scroll() < 20);
      },
    });

    return () => {
      window.clearTimeout(timer);
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
    };
  }, []);

  useGSAP(() => {
    if (!isOpen) return;

    gsap.fromTo(
      ".menu-link",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
      }
    );
  }, [isOpen]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;

    if (isOpen) {
      lenis.stop?.();
    } else {
      lenis.start?.();
    }
  }, [isOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 z-[90] w-full px-5 py-5 transition-all duration-700 sm:px-8 sm:py-6 md:px-16 md:py-10 ${
          !isVisible ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${isOpen ? "pointer-events-none opacity-0" : ""} ${
          !isOpen && isAtTop
            ? "border-transparent bg-transparent"
            : "border-b border-foreground/10 bg-foreground/5 shadow-sm backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between">
          <button
            onClick={() => setIsOpen(true)}
            className="group pointer-events-auto flex items-center gap-4 focus:outline-none md:gap-6"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-[6px] md:gap-2">
              <span className="h-[1px] w-8 bg-foreground transition-all duration-500 group-hover:bg-gold md:w-10" />
              <span className="h-[1px] w-5 bg-foreground transition-all duration-500 group-hover:bg-gold md:w-6" />
            </div>
            <span className="hidden font-montserrat text-[10px] uppercase tracking-[0.5em] text-foreground transition-colors group-hover:text-gold sm:inline">
              Menu
            </span>
          </button>

          <Link
            href="/contact"
            className="rounded-full bg-foreground px-6 py-2.5 font-montserrat text-[9px] uppercase tracking-[0.3em] text-background transition-all duration-500 hover:bg-gold sm:px-8 md:px-10 md:py-3"
          >
            Booking
          </Link>
        </div>
      </header>

      {/* Drawer Overlay & Menu */}
      <div className="pointer-events-none fixed inset-0 z-[110]">
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-700 pointer-events-auto ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`pointer-events-auto absolute top-0 left-0 h-full w-full bg-foreground transition-transform duration-700 ease-out sm:w-[420px] md:w-[500px] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col justify-between px-7 py-8 sm:p-12 md:p-20">
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between">
              <div className="font-playfair text-xl uppercase tracking-[0.4em] text-gold sm:text-2xl">
                T. Shanell
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 focus:outline-none md:gap-4"
                aria-label="Close menu"
              >
                <span className="hidden font-montserrat text-[9px] uppercase tracking-[0.5em] text-background/30 transition-colors group-hover:text-gold sm:inline">
                  Close
                </span>
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <span className="absolute h-[1px] w-full rotate-45 bg-background/20 transition-all group-hover:bg-gold" />
                  <span className="absolute h-[1px] w-full -rotate-45 bg-background/20 transition-all group-hover:bg-gold" />
                </div>
              </button>
            </div>

            {/* Main Navigation Links */}
            <nav className="flex flex-col gap-3 sm:gap-5 mt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="menu-link group block font-playfair text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-background/90 transition-colors duration-300 hover:text-gold"
                >
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Bottom Footer Section */}
            <div className="space-y-6 sm:space-y-10">
              <div className="flex flex-col gap-4 sm:gap-6">
                <p className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-background/20">
                  Connect
                </p>
                {/* Social Icons Row with Standard Hover */}
                <div className="flex items-center gap-6 sm:gap-8 text-background/60">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="transition-all duration-300 hover:text-gold hover:-translate-y-1 hover:scale-110 block p-2 -m-2"
                    >
                      {SOCIAL_ICONS[link.name]}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="h-[1px] w-full bg-background/10" />
              
              <p className="font-montserrat text-[8px] sm:text-[9px] uppercase tracking-[0.5em] text-background/20">
                Developed by Graphora Studio
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
