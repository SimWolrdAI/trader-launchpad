"use client";

import { useTraders } from "@/hooks/useTraders";
import Image from "next/image";

export default function Header() {
  const { deployedCount: deployed, remainingCount: remaining } = useTraders();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-panel/95 backdrop-blur-md border-b-[3px] border-border-main">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 border-[3px] border-accent-gold shadow-[3px_3px_0px_rgba(255,217,61,0.3)] overflow-hidden transition-all duration-300 group-hover:shadow-[3px_3px_0px_rgba(255,217,61,0.5)] group-hover:rotate-[-5deg] relative">
            <Image
              src="/main.jpg"
              alt="Logo"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <h1
            className="text-white text-sm md:text-base tracking-wider transition-all duration-300 group-hover:text-accent-gold"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            $TRADERS
          </h1>
        </a>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-3">
          <div className="stat-box stat-box-gold pixel-border-gold bg-bg-card px-4 py-2 text-sm cursor-default">
            <span className="text-accent-gold font-bold" style={{ fontFamily: "var(--font-pixel)" }}>
              LAUNCHED:{" "}
            </span>
            <span className="text-white font-bold text-lg">{deployed}</span>
          </div>
          <div className="stat-box stat-box-default pixel-border bg-bg-card px-4 py-2 text-sm cursor-default">
            <span className="text-text-muted font-bold" style={{ fontFamily: "var(--font-pixel)" }}>
              REMAINING:{" "}
            </span>
            <span className="text-white font-bold text-lg">{remaining}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => scrollTo("whats-this")}
            className="nav-link text-text-muted text-sm hidden sm:block"
          >
            What&apos;s this?
          </button>
          <span className="text-border-main hidden sm:block">|</span>
          <button
            onClick={() => scrollTo("traders")}
            className="nav-link text-text-muted text-sm hidden sm:block"
          >
            Traders
          </button>
        </div>
      </div>
    </header>
  );
}
