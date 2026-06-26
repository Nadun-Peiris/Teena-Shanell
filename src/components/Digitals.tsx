"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const MEASUREMENTS = [
  { label: "Height", value: "168cm" },
  { label: "Bust", value: "37\"" },
  { label: "Waist", value: "33\"" },
  { label: "Hips", value: "41.5\"" },
  { label: "Shoe", value: "37 EU" },
  { label: "Hair", value: "Dark Black" },
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
    const isDesktop = window.innerWidth >= 768;

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
      const initialOffset = isDesktop ? (index === 1 ? 130 : 90) : 0;
      const finalOffset = isDesktop && index === 1 ? 40 : 0;
      
      gsap.fromTo(
        img,
        { opacity: 0, y: initialOffset },
        {
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: finalOffset,
          duration: isDesktop ? 1.2 : 0.8,
          delay: index * 0.15,
          ease: "power3.out",
        }
      );
    });
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-background pt-20 pb-8 text-foreground sm:py-32"
      id="digitals"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* TOP SECTION: Massive Title & Horizontal Measurements */}
        <div className="mb-14 flex flex-col items-center text-center sm:mb-16 md:mb-24">
          <p className="digitals-title mb-5 font-montserrat text-[9px] uppercase tracking-[0.38em] text-gold sm:text-[10px] sm:tracking-[0.5em] md:mb-6 md:text-xs">
            Raw & Unedited
          </p>
          
          <h2 className="digitals-title mb-8 font-playfair text-[18vw] uppercase leading-[0.84] tracking-tighter text-foreground sm:text-[15vw] md:mb-12 md:text-[10vw]">
            Digitals
          </h2>

          {/* Minimalist Horizontal ID Bar */}
          <div className="flex w-full max-w-5xl flex-wrap justify-center gap-x-4 gap-y-3 border-y border-foreground/10 py-5 sm:items-center sm:gap-x-6 sm:gap-y-4 md:gap-x-12 md:py-8">
            {MEASUREMENTS.map((stat, i) => (
              <div key={i} className="measurement-item flex items-center gap-2 text-left">
                <span className="font-montserrat text-[8px] uppercase tracking-[0.24em] text-foreground/50 sm:text-[9px] md:text-[10px] md:tracking-[0.3em]">
                  {stat.label}
                </span>
                <span className="font-montserrat text-[9px] uppercase tracking-[0.14em] text-foreground sm:text-[10px] md:text-xs md:tracking-[0.2em] md:font-medium">
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
          className="grid grid-cols-1 gap-6 sm:gap-5 sm:pb-10 md:grid-cols-3 md:gap-8"
        >
          {DIGITAL_IMAGES.map((img, i) => (
            <div 
              key={i} 
              className={`digital-image relative mx-auto w-full max-w-[34rem] overflow-hidden rounded-sm bg-foreground/5 aspect-[4/5] sm:aspect-[3/4] md:max-w-none md:aspect-[4/5] ${
                i === 1 ? "md:mt-12" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-full w-full object-cover grayscale-[15%] transition-all duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
