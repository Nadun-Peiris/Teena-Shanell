"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const PRESS_ITEMS = [
  { 
    publication: "Elegant Magazine", 
    date: "October 2023", 
    title: "The Modern Muse: Redefining Sri Lankan Fashion", 
    src: "/photos 1/9.JPG" 
  },
  { 
    publication: "Daily Mirror Life", 
    date: "August 2022", 
    title: "From the Runway to the Silver Screen", 
    src: "/photos 1/9.JPG" 
  },
  { 
    publication: "Vogue Trends", 
    date: "January 2024", 
    title: "Bridal Elegance & Cinematic Ambition", 
    src: "/photos 1/9.JPG" 
  },
];

export default function Press() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    // Animate Section Header
    tl.fromTo(
      ".press-header",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    )
    // Staggered reveal for the press cards
    .fromTo(
      ".press-card",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background text-foreground py-24 sm:py-32 md:py-40 border-t border-foreground/5"
      id="press"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <p className="press-header font-montserrat text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-6">
            Publications & PR
          </p>
          <h2 className="press-header font-playfair text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none">
            In The <span className="italic font-light text-foreground/70">Press</span>
          </h2>
        </div>

        {/* PRESS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {PRESS_ITEMS.map((item, i) => (
            <div key={i} className="press-card group cursor-pointer flex flex-col">
              
              {/* Image Container */}
              <div className="w-full overflow-hidden bg-foreground/5 aspect-[3/4] mb-6 md:mb-8 rounded-sm">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Typography Details */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-montserrat text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                      {item.publication}
                    </span>
                    <span className="font-montserrat text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold">
                      {item.date}
                    </span>
                  </div>
                  
                  <h3 className="font-playfair text-2xl md:text-3xl uppercase tracking-widest leading-snug text-foreground transition-colors duration-300 group-hover:text-gold">
                    {item.title}
                  </h3>
                </div>

                {/* Read Article Link */}
                <div className="mt-8 flex items-center gap-3 overflow-hidden">
                  <span className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-foreground font-medium">
                    Read Article
                  </span>
                  <div className="w-8 h-[1px] bg-foreground transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-20 md:mt-32 press-header">
          <button className="px-10 py-4 border border-foreground/20 rounded-full font-montserrat text-[10px] tracking-widest uppercase text-foreground hover:bg-foreground hover:border-foreground hover:text-background transition-all duration-500">
            View All Press
          </button>
        </div>

      </div>
    </section>
  );
}
