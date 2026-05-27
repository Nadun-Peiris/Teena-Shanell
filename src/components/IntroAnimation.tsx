"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set([leftPanelRef.current, rightPanelRef.current], { width: "50%" });

      tl.fromTo(
        textRef.current,
        {
          opacity: 0,
          letterSpacing: "1.5em",
          filter: "blur(15px)",
          scale: 0.9,
        },
        {
          opacity: 1,
          letterSpacing: "0.3em",   // reduced from 0.6em — prevents overflow on narrow phones
          filter: "blur(0px)",
          scale: 1,
          duration: 2,
          ease: "expo.out",
        }
      )
      .to(leftPanelRef.current, {
        xPercent: -100,
        duration: 1.6,
        ease: "expo.inOut",
      }, "+=0.5")
      .to(rightPanelRef.current, {
        xPercent: 100,
        duration: 1.6,
        ease: "expo.inOut",
      }, "<")
      .to(textRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=1.2")
      .set(container.current, {
        visibility: "hidden",
        pointerEvents: "none",
      });

    }, container);

    const lenis = (window as Window & {
      __lenis?: {
        stop?: () => void;
        start?: () => void;
      };
    }).__lenis;
    lenis?.stop?.();

    const timer = setTimeout(() => {
      lenis?.start?.();
    }, 4200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      lenis?.start?.();
    };
  }, []);

  return (
    <div ref={container} className="fixed inset-0 z-[100]">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 h-full bg-[#FAFAFA]"
      />

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 h-full bg-[#FAFAFA]"
      />

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
        <h1
          ref={textRef}
          className="font-playfair text-[7vw] sm:text-3xl md:text-5xl uppercase text-[#1A1A1A] text-center"
        >
          Teena Shanell
        </h1>
      </div>
    </div>
  );
}
