"use client";

import { animals } from "@/data/animals";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconPaw } from "@/components/Icons";
import Image from "next/image";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="btn-green flex-shrink-0 w-10 h-10 bg-bg-card border border-accent-green/25 text-accent-green flex items-center justify-center rounded-xl text-sm transition-all hover:bg-accent-green/10 hover:border-accent-green/40"
      title={label || "Copy"}
    >
      {copied ? "✓" : "📋"}
    </button>
  );
}

export default function AnimalPage() {
  const params = useParams();
  const router = useRouter();
  const animalId = Number(params.id);
  const animal = animals.find((a) => a.id === animalId);

  // Fetch dynamic data
  const [dynamicData, setDynamicData] = useState<{
    deployed: boolean;
    contractAddress?: string;
  } | null>(null);

  useEffect(() => {
    fetch(`/api/traders/${animalId}`)
      .then((res) => res.json())
      .then((data) => setDynamicData(data))
      .catch(() => {});
  }, [animalId]);

  if (!animal) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 text-accent-gold mx-auto mb-4 opacity-30">
            <IconPaw />
          </div>
          <h1
            className="text-2xl text-text-primary mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Creature Not Found
          </h1>
          <p className="text-text-muted text-sm mb-6">This species doesn&apos;t exist in our collection.</p>
          <button
            onClick={() => router.push("/")}
            className="btn-primary text-sm"
          >
            ← Return to Collection
          </button>
        </div>
      </div>
    );
  }

  const isDeployed = dynamicData?.deployed ?? animal.deployed;
  const contractAddress =
    dynamicData?.contractAddress || animal.contractAddress;

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-5 pt-6">
        <button
          onClick={() => router.push("/")}
          className="nav-link text-accent-gold text-sm font-medium flex items-center gap-2 hover:text-text-primary transition-colors tracking-wide"
        >
          ← Back to Collection
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="zoo-panel p-6 md:p-10 relative overflow-hidden">
          {/* Subtle background orb */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.04] blur-[80px] pointer-events-none bg-accent-gold" />

          <div className="relative flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:w-[420px] flex-shrink-0 space-y-6">
              {/* Animal image */}
              <div className="exhibit-card card-uncommon p-0 relative overflow-hidden">
                {isDeployed && (
                  <div className="absolute top-4 right-4 z-10 status-tag status-deployed shadow-md">
                    ✓ Deployed
                  </div>
                )}

                <div className="w-full aspect-square relative">
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    fill
                    className="object-cover"
                    sizes="420px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />
                </div>

                {/* Habitat bar */}
                <div className="p-4 flex items-center justify-between">
                  <span className="text-text-primary text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                    {animal.name}
                  </span>
                  <span className="text-text-muted text-xs tracking-wide">
                    🌍 {animal.habitat}
                  </span>
                </div>
              </div>

              {/* Guide */}
              <div className="guide-step p-5">
                <h4
                  className="text-accent-green font-semibold text-sm mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_6px_rgba(48,200,120,0.4)]" />
                  Deployment Guide
                </h4>
                <ol className="space-y-3 text-text-secondary text-sm">
                  {[
                    "Copy the name, ticker, and description below",
                    "Go to Pump.fun and create a new token",
                    "Paste the animal data into the token form",
                    "Add at least $50 of initial liquidity",
                    "Hold $50+ to get featured on the site",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent-gold font-bold text-xs w-5">
                        {["I.", "II.", "III.", "IV.", "V."][i]}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Info box */}
              <div className="nature-card p-4">
                <p className="text-accent-gold text-[10px] font-semibold mb-2 tracking-[0.15em] uppercase">
                  ⚡ First Deployer Wins
                </p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  Be the first to deploy this creature with proper liquidity, and you&apos;ll be permanently
                  featured in the exhibit. We track everything on-chain — automatically.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 space-y-6">
              {/* Name & desc */}
              <div>
                <div className="ornament justify-start mb-3">
                  <span className="text-accent-gold text-[10px] tracking-[0.3em] uppercase font-medium">
                    Species #{animal.id}
                  </span>
                </div>
                <h1
                  className="text-3xl md:text-4xl text-text-primary mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {animal.name}
                </h1>
                <p className="text-text-secondary text-base leading-relaxed italic">
                  &ldquo;{animal.description}&rdquo;
                </p>
              </div>

              {/* Lore */}
              <div className="nature-card p-6">
                <h3
                  className="text-accent-gold text-sm font-semibold mb-3 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-base">📜</span> Lore
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {animal.lore}
                </p>
              </div>

              {/* Token Data */}
              <div className="space-y-4">
                <h3
                  className="text-text-primary text-lg flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                  Token Data
                </h3>

                {/* NAME */}
                <div className="data-row flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-text-muted text-[10px] mb-1 uppercase tracking-[0.15em] font-semibold">Name</p>
                    <p className="text-text-primary font-semibold text-lg truncate">{animal.name}</p>
                  </div>
                  <CopyButton text={animal.name} label="Copy name" />
                </div>

                {/* TICKER */}
                <div className="data-row flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-text-muted text-[10px] mb-1 uppercase tracking-[0.15em] font-semibold">Ticker</p>
                    <p className="text-accent-gold font-semibold text-lg truncate">{animal.symbol}</p>
                  </div>
                  <CopyButton text={animal.symbol} label="Copy ticker" />
                </div>

                {/* DESCRIPTION */}
                <div className="data-row flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-text-muted text-[10px] mb-1 uppercase tracking-[0.15em] font-semibold">Description</p>
                    <p className="text-text-primary text-sm leading-relaxed">{animal.description}</p>
                  </div>
                  <CopyButton text={animal.description} label="Copy description" />
                </div>

                {/* HABITAT */}
                <div className="data-row flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-text-muted text-[10px] mb-1 uppercase tracking-[0.15em] font-semibold">Habitat</p>
                    <p className="text-text-primary text-sm font-medium">{animal.habitat}</p>
                  </div>
                  <CopyButton text={animal.habitat} label="Copy habitat" />
                </div>

                {/* CA */}
                <div className="data-row flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-text-muted text-[10px] mb-1 uppercase tracking-[0.15em] font-semibold">Contract Address</p>
                    {contractAddress ? (
                      <p className="text-text-primary text-sm font-mono break-all">{contractAddress}</p>
                    ) : (
                      <p className="text-text-muted text-sm italic">Awaiting deployment...</p>
                    )}
                  </div>
                  {contractAddress && (
                    <CopyButton text={contractAddress} label="Copy CA" />
                  )}
                </div>

                {/* VIEW ON PUMP.FUN */}
                {isDeployed && contractAddress ? (
                  <a
                    href={`https://pump.fun/coin/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-banner block gold-banner p-4 text-center"
                  >
                    <span
                      className="text-[#1a1000] text-sm font-semibold flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      🚀 View on Pump.fun
                    </span>
                  </a>
                ) : (
                  <div className="data-row text-center border-dashed">
                    <span className="text-text-muted text-sm italic">
                      This creature hasn&apos;t been deployed yet — be the first explorer!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
