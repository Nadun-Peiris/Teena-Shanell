"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const MEASUREMENTS = [
  { label: "Height", value: "173cm" },
  { label: "Bust", value: "32\"" },
  { label: "Waist", value: "24\"" },
  { label: "Hips", value: "35\"" },
  { label: "Shoe", value: "39 EU" },
  { label: "Hair", value: "Dark Brown" },
  { label: "Eyes", value: "Brown" },
];

const DIGITAL_IMAGES = [
  { src: "/digitals/img1.webp", alt: "Teena Shanell - Face Profile" },
  { src: "/digitals/img2.webp", alt: "Teena Shanell - Full Body" },
  { src: "/digitals/img3.webp", alt: "Teena Shanell - Side Profile" },
];

export default function Digitals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    // Animate Title
    tl.fromTo(
      ".digitals-title",
      { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "expo.out" }
    )
    // Animate Measurement Bar
    .fromTo(
      ".measurement-item",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
      "-=0.5"
    );

    // Staggered Parallax for Images
    const images = gsap.utils.toArray<HTMLElement>(".digital-image");
    images.forEach((img, index) => {
      // The center image gets a different y-offset for asymmetry
      const yOffset = index === 1 ? 80 : 40; 
      
      gsap.fromTo(
        img,
        { opacity: 0, y: yOffset + 50 },
        {
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: index === 1 ? 40 : 0, // Keep center image pushed down slightly at rest on desktop
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
        }
      );
    });
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background text-foreground py-24 sm:py-32 overflow-hidden"
      id="digitals"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* TOP SECTION: Massive Title & Horizontal Measurements */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <p className="font-montserrat text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-6 digitals-title">
            Raw & Unedited
          </p>
          
          <h2 className="font-playfair text-[15vw] md:text-[10vw] uppercase tracking-tighter leading-[0.8] mb-12 digitals-title text-foreground">
            Digitals
          </h2>

          {/* Minimalist Horizontal ID Bar */}
          <div className="w-full max-w-5xl flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-12 border-y border-foreground/10 py-6 md:py-8">
            {MEASUREMENTS.map((stat, i) => (
              <div key={i} className="measurement-item flex items-center gap-2">
                <span className="font-montserrat text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                  {stat.label}
                </span>
                <span className="font-montserrat text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-foreground">
                  {stat.value}
                </span>
                {/* Gold separator dot (hide on last item) */}
                {i !== MEASUREMENTS.length - 1 && (
                  <span className="hidden md:block w-1 h-1 rounded-full bg-gold/50 ml-12" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: 3-Column Staggered Grid */}
        <div 
          ref={imagesRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 pb-10"
        >
          {DIGITAL_IMAGES.map((img, i) => (
            <div 
              key={i} 
              className={`digital-image relative w-full overflow-hidden rounded-sm bg-foreground/5 aspect-[3/4] md:aspect-[4/5] ${
                i === 1 ? "md:mt-12" : "" // Native Tailwind stagger for the center image
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
