"use client";

import { FormEvent, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Stagger in the left side text
    tl.fromTo(
      ".contact-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    )
    // Stagger in the form inputs on the right
    .fromTo(
      ".form-element",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your request right now.");
      }

      form.reset();
      setStatus({ type: "success", message: "Your request has been sent." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send your request right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground pt-32 md:pt-48 pb-24">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 md:px-16 lg:px-24">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Typography & Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div className="mb-16">
              <p className="contact-text font-montserrat text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-6">
                Booking & Inquiries
              </p>
              <h1 className="contact-text font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] uppercase tracking-tighter leading-[0.85] mb-8">
                Let&apos;s <br />
                <span className="italic font-light text-foreground/70">Connect</span>
              </h1>
              <p className="contact-text font-montserrat text-sm md:text-base leading-relaxed text-foreground/60 max-w-md">
                For editorial bookings, commercial campaigns, film casting, or press inquiries, please submit the form below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 border-t border-foreground/10 pt-10 contact-text">
              <div className="flex flex-col gap-3">
                <p className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-foreground/40">
                  Location
                </p>
                <p className="font-montserrat text-[11px] uppercase tracking-widest text-foreground">
                  Colombo HQ
                </p>
                <p className="font-montserrat text-[11px] uppercase tracking-widest text-foreground">
                  Sri Lanka
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Form */}
          <div className="w-full lg:w-1/2 lg:pl-10 xl:pl-20">
            <form className="flex flex-col gap-8 md:gap-12" onSubmit={handleSubmit}>
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                <div className="w-full form-element relative group">
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-transparent border-b border-foreground/20 py-4 font-montserrat text-xs uppercase tracking-widest text-foreground outline-none transition-colors focus:border-gold peer placeholder-transparent"
                    placeholder="First Name"
                  />
                  <label htmlFor="firstName" className="absolute left-0 top-4 font-montserrat text-[10px] uppercase tracking-widest text-foreground/40 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[8px]">
                    First Name
                  </label>
                </div>
                
                <div className="w-full form-element relative group">
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full bg-transparent border-b border-foreground/20 py-4 font-montserrat text-xs uppercase tracking-widest text-foreground outline-none transition-colors focus:border-gold peer placeholder-transparent"
                    placeholder="Last Name"
                  />
                  <label htmlFor="lastName" className="absolute left-0 top-4 font-montserrat text-[10px] uppercase tracking-widest text-foreground/40 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[8px]">
                    Last Name
                  </label>
                </div>
              </div>

              <div className="w-full form-element relative group">
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-foreground/20 py-4 font-montserrat text-xs tracking-widest text-foreground outline-none transition-colors focus:border-gold peer placeholder-transparent"
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="absolute left-0 top-4 font-montserrat text-[10px] uppercase tracking-widest text-foreground/40 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[8px]">
                  Email Address
                </label>
              </div>

              <div className="w-full form-element relative group">
                <input 
                  type="text" 
                  id="company"
                  name="company"
                  required
                  className="w-full bg-transparent border-b border-foreground/20 py-4 font-montserrat text-xs uppercase tracking-widest text-foreground outline-none transition-colors focus:border-gold peer placeholder-transparent"
                  placeholder="Company or Agency"
                />
                <label htmlFor="company" className="absolute left-0 top-4 font-montserrat text-[10px] uppercase tracking-widest text-foreground/40 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[8px]">
                  Company or Agency
                </label>
              </div>

              <div className="w-full form-element relative group">
                <select 
                  id="inquiryType"
                  name="inquiryType"
                  required
                  defaultValue=""
                  className="w-full bg-transparent border-b border-foreground/20 py-4 font-montserrat text-xs uppercase tracking-widest text-foreground outline-none transition-colors focus:border-gold cursor-pointer appearance-none"
                >
                  <option value="" disabled className="bg-background text-foreground">Select Inquiry Type</option>
                  <option value="editorial" className="bg-background text-foreground">Editorial / Fashion</option>
                  <option value="commercial" className="bg-background text-foreground">Commercial Campaign</option>
                  <option value="film" className="bg-background text-foreground">Film / Screen Casting</option>
                  <option value="press" className="bg-background text-foreground">Press & Media</option>
                  <option value="other" className="bg-background text-foreground">General Inquiry</option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-foreground/40 text-xs">▼</span>
                </div>
              </div>

              <div className="w-full form-element relative group h-40">
                <textarea 
                  id="message"
                  name="message"
                  required
                  className="w-full h-full resize-none bg-transparent border-b border-foreground/20 py-4 font-montserrat text-xs uppercase tracking-widest text-foreground outline-none transition-colors focus:border-gold peer placeholder-transparent"
                  placeholder="Project Details"
                />
                <label htmlFor="message" className="absolute left-0 top-4 font-montserrat text-[10px] uppercase tracking-widest text-foreground/40 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[8px]">
                  Project Details
                </label>
              </div>

              {status ? (
                <p
                  className={`form-element text-[10px] uppercase tracking-[0.3em] ${
                    status.type === "success" ? "text-gold" : "text-red-400"
                  }`}
                >
                  {status.message}
                </p>
              ) : null}

              <div className="form-element mt-4 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-montserrat text-[10px] uppercase tracking-[0.5em] text-foreground transition-colors group-hover:text-gold">
                    {isSubmitting ? "Sending..." : "Submit Request"}
                  </span>
                  <div className="w-12 h-[1px] bg-foreground transition-all duration-500 group-hover:w-20 group-hover:bg-gold" />
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
