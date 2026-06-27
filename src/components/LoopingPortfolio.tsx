"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const LOOPING_IMAGE_NAMES = [
  "17.webp",
  "3.webp",
  "24.webp",
  "8.webp",
  "29.webp",
  "1.webp",
  "12.webp",
  "26.webp",
  "20.webp",
  "9.webp",
  "30.webp",
  "6.webp",
  "22.webp",
  "2.webp",
  "27.webp",
  "11.webp",
  "19.webp",
  "4.webp",
  "25.webp",
  "7.webp",
  "16.webp",
  "28.webp",
  "10.webp",
  "21.webp",
  "13.webp",
  "18.webp",
  "23.webp",
] as const;

const LOOPING_ITEMS = LOOPING_IMAGE_NAMES.map((src, index) => ({
  id: index + 1,
  src: `/looping-portfolio/${src}`,
}));

const midpoint = Math.ceil(LOOPING_ITEMS.length / 2);
const FIRST_ROW_ITEMS = LOOPING_ITEMS.slice(0, midpoint);
const SECOND_ROW_ITEMS = LOOPING_ITEMS.slice(midpoint);
const FIRST_ROW_LOOP = [...FIRST_ROW_ITEMS, ...FIRST_ROW_ITEMS];
const SECOND_ROW_LOOP = [...SECOND_ROW_ITEMS, ...SECOND_ROW_ITEMS];

export default function LoopingPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      ".looping-portfolio-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }
    ).fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background py-20 text-foreground sm:py-32"
      id="press"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="looping-portfolio-header mb-10 flex flex-col gap-6 text-center md:mb-20 md:flex-row md:items-end md:justify-between md:text-left">
          <div className="mx-auto md:mx-0">
            <h2 className="font-playfair text-4xl uppercase leading-none tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
              Visual
              <br className="hidden md:block" /> Diary
            </h2>
          </div>

          <div className="mx-auto max-w-xs md:mx-0 md:max-w-sm">
            <p className="font-montserrat text-[9px] uppercase tracking-[0.24em] leading-relaxed text-foreground/50 sm:text-[10px] sm:tracking-[0.3em] md:text-xs">
              A flowing edit of signature frames, editorial moods, and luminous moments drawn from the world of Teena Shanell.
            </p>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="w-full">
        <div className="space-y-3 pb-8 sm:space-y-8 sm:pb-12">
          <div className="carousel-marquee flex w-max gap-3 px-5 sm:gap-8 sm:px-8 md:px-16 lg:px-24 [transform:translate3d(0,0,0)]">
            {FIRST_ROW_LOOP.map((item, index) => (
              <div
                key={`row-one-${item.id}-${index}`}
                className="group relative aspect-[3/4] w-[44vw] flex-none overflow-hidden rounded-sm bg-foreground/5 will-change-transform sm:w-[38vw] md:w-[26vw] lg:w-[20vw]"
              >
                <Image
                  src={item.src}
                  alt={`Visual diary image ${item.id}`}
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 768px) 38vw, (max-width: 1024px) 26vw, 20vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="carousel-marquee-reverse flex w-max gap-3 px-5 sm:gap-8 sm:px-8 md:px-16 lg:px-24 [transform:translate3d(0,0,0)]">
            {SECOND_ROW_LOOP.map((item, index) => (
              <div
                key={`row-two-${item.id}-${index}`}
                className="group relative aspect-[3/4] w-[44vw] flex-none overflow-hidden rounded-sm bg-foreground/5 will-change-transform sm:w-[38vw] md:w-[26vw] lg:w-[20vw]"
              >
                <Image
                  src={item.src}
                  alt={`Visual diary image ${item.id}`}
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 768px) 38vw, (max-width: 1024px) 26vw, 20vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
