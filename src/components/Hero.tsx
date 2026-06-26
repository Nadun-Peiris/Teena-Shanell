"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const BARCODE_HEIGHTS = [16, 57, 3, 52, 68, 23, 4, 27, 84, 67, 72, 71];

export default function HeroVogueFull() {
  // Added TypeScript types to the refs
  const imageRef = useRef<HTMLImageElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      )
      .from(
        ".vogue-text",
        { y: 30, opacity: 0, stagger: 0.2, duration: 1, ease: "power3.out" },
        "-=1"
      )
      .from(
        rightSideRef.current,
        { x: 20, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative h-[100svh] w-full bg-background overflow-hidden">
      {/* 1. FULL WIDTH IMAGE */}
      <div className="absolute inset-0 z-0">
        {/* Updated path to /hero.png for Next.js public folder */}
        <img
          ref={imageRef}
          src="/hero.webp"
          alt="Teena Shanell"
          className="w-full h-full object-cover object-[50%_20%] grayscale-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* 2. EDITORIAL TEXT (Left Side) */}
      <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-8 md:p-24 pb-16 sm:pb-20">
        <div className="max-w-4xl">
          <p className="vogue-text font-montserrat text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-gold mb-3 md:mb-4">
            Professional Fashion Muse — Sri Lanka
          </p>

          <h1 className="vogue-text font-playfair text-[13vw] sm:text-6xl md:text-8xl lg:text-9xl text-white uppercase leading-[0.85] tracking-tighter mb-6 md:mb-8">
            Teena<br />Shanell
          </h1>

          <div className="vogue-text flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8">
            <Link
              href="/#portfolio"
              className="px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-montserrat text-[10px] tracking-widest uppercase text-white hover:bg-gold hover:border-gold transition-all duration-500 active:scale-95"
            >
              View Portfolio
            </Link>
            <div className="hidden sm:block w-24 md:w-32 h-[1px] bg-white/30" />
          </div>
        </div>
      </div>

      {/* 3. MOBILE BOTTOM BAR */}
      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3 md:hidden pointer-events-none">
        <p className="font-montserrat text-[8px] tracking-[0.4em] uppercase text-white/50">
          Available
        </p>
        <div className="flex gap-[2px] h-6 items-end opacity-40">
          {BARCODE_HEIGHTS.slice(0, 8).map((height, i) => (
            <div key={i} className="bg-white w-[1px]" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>

      {/* 4. VERTICAL RIGHT SIDE DETAILS */}
      <div
        ref={rightSideRef}
        className="hidden md:flex absolute right-8 lg:right-12 top-0 h-full py-24 flex-col justify-between items-center z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-white/20" />
          <p className="writing-vertical-rl rotate-180 font-montserrat text-[9px] tracking-[0.4em] uppercase text-white/60">
            Status: <span className="text-rose-gold">Available</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <p className="writing-vertical-rl rotate-180 font-montserrat text-[8px] tracking-[0.6em] uppercase text-white/30 whitespace-nowrap">
            6.9271° N, 79.8612° E — COLOMBO HQ
          </p>

          <div className="flex flex-col items-center gap-3 opacity-40">
            <div className="flex gap-[2px] h-10 items-end">
              {BARCODE_HEIGHTS.map((height, i) => (
                <div key={i} className="bg-white w-[1px]" style={{ height: `${height}%` }} />
              ))}
            </div>
            <span className="font-montserrat text-[7px] tracking-[0.5em] text-white rotate-90 origin-right">
              ID_TS_26
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="writing-vertical-rl rotate-180 font-montserrat text-[9px] tracking-[0.4em] uppercase text-white/60">
            Follow @Teena_Shanell
          </p>
          <div className="w-[1px] h-16 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
