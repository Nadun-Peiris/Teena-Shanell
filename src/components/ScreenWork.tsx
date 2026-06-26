"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const FILM_TITLES = ["Goree", "Dedunu Akase", "Iththo", "Sillara Kasi"];

export default function ScreenWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    // Animate Header Texts
    tl.fromTo(
      ".screen-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    )
    // Stagger in the filmography list
    .fromTo(
      ".film-row",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#0A0A0A] text-white py-24 sm:py-32 md:py-40"
      id="screen-work"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <p className="screen-text font-montserrat text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-6">
              Cinematic Archive
            </p>
            <h2 className="screen-text font-playfair text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none">
              Screen <span className="text-white/30 italic font-light">Work</span>
            </h2>
          </div>
          <div className="screen-text max-w-sm">
            <p className="font-montserrat text-xs md:text-sm text-white/50 leading-relaxed uppercase tracking-widest">
              From winning Miss Globe International to headlining Sri Lankan cinema in romantic dramas and action thrillers.
            </p>
          </div>
        </div>

        {/* FILMOGRAPHY LIST */}
        <div className="border-t border-white/10">
          {FILM_TITLES.map((title) => (
            <div 
              key={title}
              className="film-row border-b border-white/10 py-6 md:py-10"
            >
              <h4 className="font-playfair text-2xl md:text-4xl uppercase tracking-widest text-white">
                {title}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
