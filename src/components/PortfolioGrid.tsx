"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// --- Mock Data ---
const CATEGORIES = ["All", "Editorial", "Commercial", "Bridal"];

const PORTFOLIO_ITEMS = [
  { id: 1, category: "Editorial", src: "/photos 1/1.JPG", title: "Vogue Cover Story" },
  { id: 2, category: "Bridal", src: "/photos 1/2.JPG", title: "Sutra Collection" },
  { id: 3, category: "Commercial", src: "/photos 1/3.JPG", title: "La Rocher Campaign" },
  { id: 4, category: "Editorial", src: "/photos 1/4.JPG", title: "Blanche Haute Culture" },
  { id: 5, category: "Commercial", src: "/photos 1/5.JPG", title: "Rivera Ceylon" },
  { id: 6, category: "Bridal", src: "/photos 1/6.JPG", title: "Traditional Kandyan" },
  { id: 7, category: "Editorial", src: "/photos 1/7.JPG", title: "Elegant Magazine" },
  { id: 8, category: "Bridal", src: "/photos 1/8.JPG", title: "Vows & Veils" },
  { id: 9, category: "Commercial", src: "/photos 1/9.JPG", title: "Luxe Cosmetics" },
];

type PortfolioItem = (typeof PORTFOLIO_ITEMS)[number];

export default function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const [isAnimating, setIsAnimating] = useState(false); // 1. Added Animation Lock
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeTab === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab).slice(0, 3);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      ".portfolio-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }
    ).fromTo(
      contentWrapperRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  const handleFilter = (category: string) => {
    // Prevent lag from click-spamming
    if (category === activeTab || isAnimating) return;
    
    setIsAnimating(true);

    // Fade out (Removed scale for performance)
    gsap.to(contentWrapperRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(category);

        // 2. Give React 1 frame to swap the DOM before GSAP animates again
        setTimeout(() => {
          gsap.fromTo(
            contentWrapperRef.current,
            { opacity: 0, y: 15 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.35, 
              ease: "power2.out",
              onComplete: () => setIsAnimating(false) // Unlock clicks
            }
          );
        }, 10);
      },
    });
  };

  const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
    <div className="group relative overflow-hidden rounded-sm bg-foreground/5 cursor-pointer w-full h-full transform-gpu will-change-transform">
      <img
        src={item.src}
        alt={item.title}
        // 3. Added decoding="async" for smoother scrolling and loading
        decoding="async"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
        <p className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-gold mb-2 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 delay-100">
          {item.category}
        </p>
        <h3 className="font-playfair text-2xl md:text-3xl text-white translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 delay-150">
          {item.title}
        </h3>
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background text-foreground py-24 sm:py-32 overflow-hidden"
      id="portfolio"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* HEADER & FILTER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12 md:mb-20 portfolio-header">
          <div>
            <h2 className="font-playfair text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none">
              Selected
              <br className="hidden md:block" /> Works
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`font-montserrat text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all duration-300 relative ${
                  activeTab === cat ? "text-foreground" : "text-foreground/40 hover:text-gold"
                }`}
              >
                {cat}
                {activeTab === cat && (
                  <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div ref={contentWrapperRef} className="w-full">
        {activeTab === "All" ? (
          <div className="flex overflow-x-auto gap-4 md:gap-8 px-5 sm:px-8 md:px-16 lg:px-24 pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="flex-none w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] aspect-[3/4] snap-center"
              >
                <PortfolioCard item={item} />
              </div>
            ))}
            <div className="flex-none w-5 sm:w-8 md:w-16 lg:w-24" />
          </div>
        ) : (
          <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="w-full aspect-[3/4]">
                  <PortfolioCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
