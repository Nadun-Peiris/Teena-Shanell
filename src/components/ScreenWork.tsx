"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const FILM_CREDITS = [
  { title: "Goree", year: "2019", genre: "Action / Thriller", role: "Lead Cast" },
  { title: "Dedunu Akase", year: "2017", genre: "Romantic Drama", role: "Supporting" },
  { title: "Iththo", year: "2020", genre: "Television Series", role: "Guest Appearance" },
  { title: "Sillara Kasi", year: "2021", genre: "Music Video", role: "Lead Muse" },
];

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
    // Animate the big featured video player
    .fromTo(
      ".featured-video",
      { scale: 0.95, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" },
      "-=0.4"
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

        {/* FEATURED VIDEO BLOCK */}
        <div className="featured-video relative w-full aspect-video md:aspect-[21/9] bg-white/5 overflow-hidden rounded-sm group cursor-pointer mb-20 md:mb-32">
          {/* Thumbnail */}
          <img 
            src="/photos 1/10.JPG" // Placeholder for her movie poster or still
            alt="Goree Movie Still"
            className="w-full h-full object-cover grayscale-[40%] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20 flex items-center justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/10">
              <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white ml-1 transition-colors duration-500 group-hover:border-l-gold" />
            </div>
          </div>
          
          {/* Bottom Left Title */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 overflow-hidden">
            <h3 className="font-playfair text-3xl md:text-5xl uppercase tracking-widest text-white translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Goree <span className="text-xl md:text-2xl text-gold/80 italic lowercase">(2019)</span>
            </h3>
          </div>
        </div>

        {/* FILMOGRAPHY LIST */}
        <div className="border-t border-white/10">
          {FILM_CREDITS.map((film, i) => (
            <div 
              key={i}
              className="film-row group flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 py-6 md:py-10 transition-colors duration-500 hover:bg-white/[0.02] cursor-pointer px-4 md:px-8 -mx-4 md:-mx-8"
            >
              {/* Title & Year */}
              <div className="flex items-baseline gap-4 md:gap-8 mb-2 md:mb-0 w-full md:w-1/2">
                <span className="font-montserrat text-xs tracking-widest text-white/30 group-hover:text-gold/50 transition-colors">
                  {film.year}
                </span>
                <h4 className="font-playfair text-2xl md:text-4xl uppercase tracking-widest text-white group-hover:text-gold transition-colors duration-500">
                  {film.title}
                </h4>
              </div>

              {/* Genre & Role */}
              <div className="flex items-center justify-between w-full md:w-1/2 text-left md:text-right">
                <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/50 w-1/2">
                  {film.genre}
                </span>
                <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/80 w-1/2 flex justify-end items-center gap-4">
                  {film.role}
                  {/* Hover Arrow */}
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-gold text-lg">
                    →
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
