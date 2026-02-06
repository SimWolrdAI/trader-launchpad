"use client";

import Image from "next/image";
import { useState } from "react";

const CA = "5MdCvrX1htrtR4jbVayKFNKnjQi51zjK8im2hYNdpump";
const PUMP_FUN_URL = `https://pump.fun/coin/${CA}`;

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="hero-panel pixel-border bg-bg-panel p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left — Text */}
          <div className="flex-1 space-y-6">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              <span className="text-white">Traders</span>
              <br />
              <span className="text-accent-gold">
                {"LAUNCH PAD.".split("").map((char, i) => (
                  <span
                    key={i}
                    className="bounce-letter"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>

            <div className="space-y-2 text-text-muted text-base md:text-lg">
              <p>Welcome to the world of Trader LaunchPad.</p>
              <p>Deploy tokens for famous traders — <span className="text-accent-gold font-semibold">all fees go directly to their wallets.</span></p>
              <p>Scroll down to start!</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                className="btn-primary flex items-center gap-2 text-sm"
                onClick={() =>
                  document
                    .getElementById("traders")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>⚡</span> LAUNCH!
              </button>
              <button
                className="btn-secondary text-sm"
                onClick={() =>
                  document
                    .getElementById("whats-this")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                WHAT&apos;S THIS?
              </button>
            </div>
          </div>

          {/* Right — Token Card */}
          <div className="flex-shrink-0">
            <div className="animate-sway" style={{ overflow: "visible" }}>
              {/* Pixel frame wrapper with badge */}
              <div className="relative" style={{ overflow: "visible" }}>
                {/* Badge */}
                <div
                  className="z-20 pixel-icon-box !w-10 !h-10 text-sm font-black"
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "-12px",
                  }}
                >
                  #1
                </div>

                {/* Pixel frame */}
                <div className="pixel-frame w-64 md:w-72">
                  <div className="pixel-frame-inner w-full h-56 md:h-64 bg-bg-panel flex items-center justify-center relative">
                    <Image
                      src="/main.jpg"
                      alt="Token"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 288px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* CA + PUMP.FUN buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={copyCA}
                  className="pixel-btn-gold flex-1 gap-2"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 flex-shrink-0" shapeRendering="crispEdges">
                    <rect x="4" y="0" width="10" height="2" />
                    <rect x="4" y="0" width="2" height="12" />
                    <rect x="4" y="10" width="10" height="2" />
                    <rect x="12" y="0" width="2" height="12" />
                    <rect x="0" y="4" width="10" height="2" />
                    <rect x="0" y="4" width="2" height="12" />
                    <rect x="0" y="14" width="10" height="2" />
                    <rect x="8" y="4" width="2" height="12" />
                  </svg>
                  {copied ? "COPIED!" : "COPY CA"}
                </button>
                <a
                  href={PUMP_FUN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn-green flex-1"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  PUMP.FUN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
