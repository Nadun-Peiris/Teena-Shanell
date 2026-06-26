"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const LOOPING_ITEMS = [
  { id: 1, src: "/looping-portfolio/17.webp" },
  { id: 2, src: "/looping-portfolio/3.webp" },
  { id: 3, src: "/looping-portfolio/24.webp" },
  { id: 4, src: "/looping-portfolio/8.webp" },
  { id: 5, src: "/looping-portfolio/29.webp" },
  { id: 6, src: "/looping-portfolio/1.webp" },
  { id: 7, src: "/looping-portfolio/12.webp" },
  { id: 8, src: "/looping-portfolio/26.webp" },
  { id: 9, src: "/looping-portfolio/5.webp" },
  { id: 10, src: "/looping-portfolio/20.webp" },
  { id: 11, src: "/looping-portfolio/9.webp" },
  { id: 12, src: "/looping-portfolio/30.webp" },
  { id: 13, src: "/looping-portfolio/6.webp" },
  { id: 14, src: "/looping-portfolio/22.webp" },
  { id: 15, src: "/looping-portfolio/14%20(1).webp" },
  { id: 16, src: "/looping-portfolio/2.webp" },
  { id: 17, src: "/looping-portfolio/27.webp" },
  { id: 18, src: "/looping-portfolio/11.webp" },
  { id: 19, src: "/looping-portfolio/19.webp" },
  { id: 20, src: "/looping-portfolio/4.webp" },
  { id: 21, src: "/looping-portfolio/25.webp" },
  { id: 22, src: "/looping-portfolio/7.webp" },
  { id: 23, src: "/looping-portfolio/16.webp" },
  { id: 24, src: "/looping-portfolio/28.webp" },
  { id: 25, src: "/looping-portfolio/10.webp" },
  { id: 26, src: "/looping-portfolio/21.webp" },
  { id: 27, src: "/looping-portfolio/13.webp" },
  { id: 28, src: "/looping-portfolio/18.webp" },
  { id: 29, src: "/looping-portfolio/23.webp" },
  { id: 30, src: "/looping-portfolio/15.webp" },
] as const;

const FIRST_ROW_ITEMS = LOOPING_ITEMS.slice(0, 15);
const SECOND_ROW_ITEMS = LOOPING_ITEMS.slice(15);
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
