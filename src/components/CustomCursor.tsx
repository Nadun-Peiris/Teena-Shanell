"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial position off-screen so cursor doesn't flash at (0,0) on mount
    gsap.set([dot, ring], { x: -100, y: -100 });

    // The physics: Dot is razor fast, Ring has a smooth elastic catch-up
    const xDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const isHoverable = (e.target as HTMLElement).closest(
        "button, a, .portfolio-card, input, select, textarea"
      );

      if (isHoverable) {
        gsap.to(ring, {
          scale: 1.8,
          backgroundColor: "rgba(212, 175, 55, 0.15)",
          borderColor: "rgba(212, 175, 55, 1)",
          duration: 0.3,
          overwrite: "auto", 
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(212, 175, 55, 0.7)",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2, overwrite: "auto" });
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Precision Gold Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full z-[10000] -translate-x-1/2 -translate-y-1/2"
      />

      {/* Trailing Gold Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-gold rounded-full z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}