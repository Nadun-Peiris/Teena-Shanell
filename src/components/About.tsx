"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect on the portrait image
    gsap.fromTo(
      imageRef.current,
      { scale: 1.1, y: -20 },
      {
        scale: 1,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Fade up the text paragraphs as you scroll
    const texts = gsap.utils.toArray<HTMLElement>(".about-text");
    texts.forEach((text) => {
      gsap.fromTo(
        text,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background py-20 text-foreground sm:py-32 md:py-40"
      id="about"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 lg:gap-32">
          
          {/* LEFT COLUMN: Sticky Portrait */}
          <div className="w-full md:w-1/2 lg:w-5/12 h-[60vh] md:h-[90vh] md:sticky md:top-10">
            <div className="relative h-full w-full overflow-hidden rounded-sm">
              <Image
                ref={imageRef}
                src="/about/img1.webp"
                alt="Teena Shanell Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="h-full w-full object-cover grayscale-[10%]"
              />
              {/* Elegant inner border */}
              <div className="pointer-events-none absolute inset-4 border border-white/20" />
            </div>
          </div>

          {/* RIGHT COLUMN: Scrolling Biography */}
          <div 
            ref={textContainerRef} 
            className="flex w-full flex-col justify-center py-0 md:w-1/2 md:py-32 lg:w-7/12"
          >
            <div className="mb-12 md:mb-16">
              <p className="about-text font-montserrat text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-6">
                The Muse
              </p>
              <h2 className="about-text font-playfair text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
                Beyond <br />
                The <span className="italic font-light text-foreground/70">Lens</span>
              </h2>
            </div>

            <div className="flex flex-col gap-8 md:gap-10 font-montserrat text-sm md:text-base leading-relaxed text-foreground/80 max-w-2xl">
              <p className="about-text">
                Teena Shanell Fernando is a prominent Sri Lankan fashion model and actress, known for seamlessly bridging the gap between high-fashion editorial work and cinematic storytelling.
              </p>
              
              <p className="about-text">
                Her journey began on the runway, gaining industry recognition after winning the prestigious Miss Globe International competition. This title launched her into a rigorous career of high-fashion, commercial, and traditional bridal modeling, establishing her as a highly sought-after muse for top-tier designers and photographers across the country.
              </p>

              <p className="about-text">
                Transitioning to the silver screen, Teena made her striking debut in the romantic drama <em>Dedunu Akase</em> (2017). She quickly proved her versatility, taking on the lead role in the action-thriller <em>Goree</em> (2019), and expanding her repertoire to television with the hit series <em>Iththo</em>. 
              </p>

              <p className="about-text font-medium text-foreground">
                Whether she is commanding the runway in Blanche Haute Culture or captivating audiences in a feature film, Teena brings an unmistakable blend of fierce elegance and cinematic depth to every project.
              </p>
            </div>

            {/* Signature & Call to Action */}
            <div className="about-text mt-16 md:mt-24 pt-12 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <span className="font-playfair text-4xl italic tracking-tight text-foreground/90">
                T. Shanell
              </span>
              
              <Link
                href="/contact"
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="font-montserrat text-[10px] uppercase tracking-[0.5em] text-foreground transition-colors group-hover:text-gold">
                  Direct Inquiries
                </span>
                <div className="w-12 h-[1px] bg-foreground transition-all duration-500 group-hover:w-20 group-hover:bg-gold" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
