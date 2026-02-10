"use client";

import { useAnimals } from "@/hooks/useAnimals";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const { animals, deployedCount, remainingCount } = useAnimals();
  const [copied, setCopied] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-5 pt-6 pb-4 md:pt-12 md:pb-6">
      <div className="rounded-[32px] p-8 md:p-14 border border-white/[0.06] relative overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/back.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-[1]" />

        <div className="relative z-[2] flex flex-col lg:flex-row gap-12 items-center">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <h2
              className="animate-hero-title text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.08] mb-7"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-text-primary">Discover</span>
              <br />
              <span className="text-gradient-gold italic">The Animals.</span>
            </h2>

            <p className="animate-hero-fade-d1 text-text-secondary text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed mb-7">
              A curated collection of animals. Each waiting to be unleashed on-chain.
            </p>

            <div className="animate-hero-fade-d2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                className="btn-primary flex items-center gap-2 text-base"
                onClick={() => document.getElementById("animals")?.scrollIntoView({ behavior: "smooth" })}
              >
                Launch
              </button>
              <button
                className="btn-secondary"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right — Token card */}
          <div className="flex-shrink-0 animate-card-float">
            <div className="animate-float">
              <div className="relative w-72 md:w-80 animate-glow-pulse rounded-[20px]">
                <div className="exhibit-card card-legendary overflow-hidden">
                  {/* Icon */}
                  <div className="w-full h-48 md:h-56 relative overflow-hidden border-b border-accent-gold/10">
                    <Image
                      src="/icon.jpg"
                      alt="The Animals"
                      fill
                      className="object-cover"
                      sizes="320px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg text-text-primary" style={{ fontFamily: "var(--font-display)" }}>
                        The Animals
                      </h3>
                      <span className="text-accent-gold text-sm font-bold">$ANIMALS</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { val: deployedCount, label: "Deployed", color: "text-accent-emerald" },
                        { val: remainingCount, label: "Available", color: "text-accent-gold" },
                        { val: animals.length, label: "Total", color: "text-accent-blue" },
                      ].map((s) => (
                        <div key={s.label} className="bg-bg-main/60 rounded-xl p-2.5 text-center backdrop-blur-sm">
                          <p className={`${s.color} text-lg font-bold`}>{s.val}</p>
                          <p className="text-text-muted text-[9px] uppercase tracking-wider">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Copy CA & Pump.fun */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText("9eEBFbywX2zdgJMyvW8iPWpeh8PoG5bhyuyCJvqZpump");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-bg-main/80 hover:bg-accent-gold/10 border border-border-light hover:border-accent-gold/30 rounded-xl py-2.5 text-text-secondary hover:text-accent-gold text-xs font-semibold transition-all duration-200"
                      >
                        {copied ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <rect x="9" y="9" width="13" height="13" rx="2" />
                              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            Copy CA
                          </>
                        )}
                      </button>
                      <a
                        href="https://pump.fun/coin/9eEBFbywX2zdgJMyvW8iPWpeh8PoG5bhyuyCJvqZpump"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/20 hover:border-accent-gold/40 rounded-xl py-2.5 text-accent-gold text-xs font-semibold transition-all duration-200"
                      >
                        🚀 Pump.fun
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
