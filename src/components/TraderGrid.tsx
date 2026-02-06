"use client";

import { useTraders } from "@/hooks/useTraders";
import Image from "next/image";
import Link from "next/link";

export default function TraderGrid() {
  const { traders } = useTraders();

  return (
    <section id="traders" className="max-w-7xl mx-auto px-4 py-10">
      {/* Meet The Traders Header */}
      <div className="gold-header pixel-border-gold bg-accent-gold p-4 mb-8 text-center cursor-default">
        <h3
          className="text-black text-xl md:text-2xl font-bold"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          Meet The Traders
        </h3>
        <p className="text-black/60 mt-1">Click any trader to get started!</p>
      </div>

      {/* Trader Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {traders.map((trader) => (
          <Link
            key={trader.id}
            href={`/trader/${trader.id}`}
            className="trader-card cursor-pointer pixel-border bg-bg-panel p-3 flex flex-col items-center gap-2"
          >
            {/* Avatar */}
            <div className="pixel-border bg-bg-card p-1 w-full">
              <div className="trader-avatar w-full aspect-square bg-bg-panel flex items-center justify-center relative overflow-hidden transition-all duration-300">
                {trader.logo ? (
                  <Image
                    src={trader.logo}
                    alt={trader.name}
                    fill
                    className="object-cover transition-all duration-300"
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                  />
                ) : (
                  <span className="trader-initials text-3xl font-bold text-text-muted transition-all duration-300">
                    {trader.name.charAt(0)}
                  </span>
                )}
                {trader.deployed && (
                  <div className="absolute -top-1 -right-1 pixel-icon-box !w-6 !h-6 !border-2 !shadow-[2px_2px_0px_#000] z-10">
                    <span className="text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <p
              className="text-white text-[10px] font-bold text-center truncate w-full"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              {trader.name}
            </p>

            {/* Status */}
            <div
              className={`trader-status w-full text-center text-[10px] font-bold px-2 py-1.5 transition-all duration-300 ${
                trader.deployed
                  ? "bg-accent-green/10 text-accent-green border-[2px] border-accent-green shadow-[2px_2px_0px_rgba(34,197,94,0.2)]"
                  : "bg-bg-card text-text-muted border-[2px] border-border-main"
              }`}
            >
              {trader.deployed ? "💎 DEPLOYED" : "Not Deployed"}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
