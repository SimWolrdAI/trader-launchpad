"use client";

import { useTraders } from "@/hooks/useTraders";
import Image from "next/image";
import Link from "next/link";

export default function TraderScroll() {
  const { traders } = useTraders();

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="section-panel pixel-border-gold bg-accent-gold/5 p-4">
        {/* Scrollable row */}
        <div className="flex gap-4 overflow-x-auto scroll-strip pb-3">
          {traders.map((trader) => (
            <Link
              key={trader.id}
              href={`/trader/${trader.id}`}
              className="scroll-item flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
            >
              {/* Avatar */}
              <div className="scroll-avatar pixel-border bg-bg-card p-1.5 transition-all duration-300">
                <div className="scroll-gradient w-24 h-24 bg-bg-panel flex items-center justify-center relative overflow-hidden transition-all duration-300">
                  {trader.logo ? (
                    <Image
                      src={trader.logo}
                      alt={trader.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-text-muted">
                      {trader.name.charAt(0)}
                    </span>
                  )}
                  {trader.deployed && (
                    <div className="absolute -top-1 -right-1 pixel-icon-box !w-5 !h-5 !border-2 !shadow-[2px_2px_0px_#000] z-10">
                      <span className="text-[10px]">✓</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status badge */}
              <div
                className={`text-[10px] font-bold px-3 py-1 transition-all duration-300 ${
                  trader.deployed
                    ? "bg-accent-green/10 text-accent-green border-[2px] border-accent-green shadow-[2px_2px_0px_rgba(34,197,94,0.2)]"
                    : "bg-bg-card text-text-muted border-[2px] border-border-main"
                }`}
              >
                {trader.deployed ? "✓ Deployed" : "Not Deployed"}
              </div>
            </Link>
          ))}
        </div>

        {/* Hint */}
        <p
          className="text-center text-text-muted text-[10px] mt-2"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          ← Hover to explore the traders →
        </p>
      </div>
    </section>
  );
}
