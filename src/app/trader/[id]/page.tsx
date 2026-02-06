"use client";

import { traders } from "@/data/traders";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      className="btn-green flex-shrink-0 w-10 h-10 bg-bg-card border-[3px] border-accent-green text-accent-green flex items-center justify-center shadow-[3px_3px_0px_rgba(34,197,94,0.2)] text-sm"
      title={label || "Copy"}
    >
      {copied ? "✓" : "📋"}
    </button>
  );
}

export default function TraderPage() {
  const params = useParams();
  const router = useRouter();
  const traderId = Number(params.id);
  const trader = traders.find((t) => t.id === traderId);

  if (!trader) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-2xl text-accent-gold mb-4"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Trader not found
          </h1>
          <button
            onClick={() => router.push("/")}
            className="btn-primary text-sm"
          >
            ← Back to Traders
          </button>
        </div>
      </div>
    );
  }

  // Fetch dynamic data from Redis
  const [dynamicData, setDynamicData] = useState<{
    deployed: boolean;
    contractAddress?: string;
  } | null>(null);

  useEffect(() => {
    fetch(`/api/traders/${traderId}`)
      .then((res) => res.json())
      .then((data) => setDynamicData(data))
      .catch(() => {});
  }, [traderId]);

  // Merge static + dynamic
  const isDeployed = dynamicData?.deployed ?? trader.deployed;
  const contractAddress =
    dynamicData?.contractAddress || trader.contractAddress;

  // Extract twitter username from URL
  const twitterUsername = trader.twitterUrl.split("/").pop() || "";

  const handleDownload = async () => {
    if (!trader.logo) return;
    try {
      const response = await fetch(trader.logo);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${trader.name}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(trader.logo, "_blank");
    }
  };

  const handleCopyURL = () => {
    if (trader.logo) {
      navigator.clipboard.writeText(trader.logo);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button
          onClick={() => router.push("/")}
          className="nav-link text-accent-gold text-sm font-bold flex items-center gap-2 hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          ← Back to Traders
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="pixel-border bg-bg-panel p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN — Image + Actions + How to Deploy */}
            <div className="lg:w-[420px] flex-shrink-0 space-y-6">
              {/* Trader image */}
              <div className="pixel-border-gold bg-bg-card p-4 relative">
                {/* Deployed badge */}
                {isDeployed && (
                  <div className="absolute top-6 right-6 z-10 pixel-icon-box !w-auto !px-3 !h-8 text-xs font-black">
                    DEPLOYED
                  </div>
                )}

                <div className="w-full aspect-square bg-bg-panel relative overflow-hidden">
                  {trader.logo ? (
                    <Image
                      src={trader.logo}
                      alt={trader.name}
                      fill
                      className="object-cover"
                      sizes="420px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-8xl font-bold text-text-muted">
                        {trader.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="btn-green flex-1 flex items-center justify-center gap-2 bg-bg-card border-[3px] border-accent-green text-accent-green px-4 py-3 text-xs font-bold shadow-[3px_3px_0px_rgba(34,197,94,0.2)]"
                >
                  ⬇ DOWNLOAD
                </button>
                <button
                  onClick={handleCopyURL}
                  className="btn-green flex-1 flex items-center justify-center gap-2 bg-bg-card border-[3px] border-accent-green text-accent-green px-4 py-3 text-xs font-bold shadow-[3px_3px_0px_rgba(34,197,94,0.2)]"
                >
                  📋 COPY URL
                </button>
                <a
                  href={trader.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green flex items-center justify-center bg-bg-card border-[3px] border-accent-green text-accent-green w-12 h-12 shadow-[3px_3px_0px_rgba(34,197,94,0.2)]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* How to Deploy */}
              <div className="pixel-border-green bg-accent-green/10 p-5">
                <h4
                  className="text-accent-green font-bold text-sm mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  <span className="inline-block w-3 h-3 bg-accent-green border-2 border-accent-green" />
                  How to Deploy
                </h4>
                <ol className="space-y-3 text-text-muted text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold">1.</span>
                    Copy the name, ticker, description, and download the image
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold">2.</span>
                    Go to Pump.fun and create a new token
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold">3.</span>
                    Paste the trader data into the token form
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold font-bold">4.</span>
                    <span className="text-accent-gold font-semibold">⚠️ IMPORTANT: Set the token fees to the trader&apos;s wallet address!</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold">5.</span>
                    Hold $50 worth to get featured on the site
                  </li>
                </ol>
              </div>

              {/* Fees warning box */}
              <div className="pixel-border-gold bg-accent-gold/10 p-4">
                <p
                  className="text-accent-gold text-[10px] font-bold mb-2"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  ⚠️ FEES ARE KEY
                </p>
                <p className="text-text-muted text-xs leading-relaxed">
                  When deploying your token, make sure to set the fee recipient to the trader&apos;s wallet address. This is how traders get paid — all trading fees go directly to their wallet. Without this step, the trader won&apos;t receive any rewards!
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN — Name + Token Data */}
            <div className="flex-1 space-y-6">
              {/* Trader name & desc */}
              <div>
                <h1
                  className="text-3xl md:text-4xl text-white font-bold mb-3"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  {trader.name}
                </h1>
                <p className="text-text-muted text-base leading-relaxed">
                  {trader.description}
                </p>
              </div>

              {/* Token Data */}
              <div className="space-y-4">
                <h3
                  className="text-white text-lg font-bold flex items-center gap-2"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  <span className="inline-block w-3 h-3 bg-white border-2 border-white" />
                  Token Data
                  <span className="inline-block w-3 h-3 bg-white border-2 border-white" />
                </h3>

                {/* NAME */}
                <div className="pixel-border-gold bg-bg-card p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-text-muted text-[10px] mb-1 tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      NAME
                    </p>
                    <p className="text-white font-bold text-lg truncate">
                      {twitterUsername}
                    </p>
                  </div>
                  <CopyButton text={twitterUsername} label="Copy name" />
                </div>

                {/* TICKER */}
                <div className="pixel-border-gold bg-bg-card p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-text-muted text-[10px] mb-1 tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      TICKER
                    </p>
                    <p className="text-white font-bold text-lg truncate">
                      ${trader.name}
                    </p>
                  </div>
                  <CopyButton text={`$${trader.name}`} label="Copy ticker" />
                </div>

                {/* DESCRIPTION */}
                <div className="pixel-border-gold bg-bg-card p-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-text-muted text-[10px] mb-1 tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      DESCRIPTION
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      {trader.description}
                    </p>
                  </div>
                  <CopyButton text={trader.description} label="Copy description" />
                </div>

                {/* WALLET */}
                {trader.walletAddress && (
                  <div className="pixel-border-gold bg-bg-card p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className="text-text-muted text-[10px] mb-1 tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-pixel)" }}
                      >
                        WALLET (FEES)
                      </p>
                      <p className="text-white text-sm font-mono break-all">
                        {trader.walletAddress}
                      </p>
                    </div>
                    <CopyButton text={trader.walletAddress} label="Copy wallet" />
                  </div>
                )}

                {/* X LINK */}
                <div className="pixel-border-gold bg-bg-card p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-text-muted text-[10px] mb-1 tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      X (TWITTER)
                    </p>
                    <a
                      href={trader.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-gold text-sm font-bold hover:text-white transition-colors"
                    >
                      {trader.twitterUrl}
                    </a>
                  </div>
                  <CopyButton text={trader.twitterUrl} label="Copy X link" />
                </div>

                {/* CA */}
                <div className="pixel-border-gold bg-bg-card p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-text-muted text-[10px] mb-1 tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      CA
                    </p>
                    {contractAddress ? (
                      <p className="text-white text-sm font-mono break-all">
                        {contractAddress}
                      </p>
                    ) : (
                      <p className="text-text-muted text-sm">Not deployed</p>
                    )}
                  </div>
                  {contractAddress && (
                    <CopyButton text={contractAddress} label="Copy CA" />
                  )}
                </div>

                {/* VIEW ON PUMP.FUN — only when deployed */}
                {isDeployed && contractAddress ? (
                  <a
                    href={`https://pump.fun/coin/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-banner block bg-accent-gold pixel-border-gold p-4 text-center"
                  >
                    <span
                      className="text-black text-sm font-bold flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      🚀 VIEW ON PUMP.FUN
                    </span>
                  </a>
                ) : (
                  <div className="pixel-border-gold bg-bg-card p-4 text-center">
                    <span
                      className="text-text-muted text-sm font-bold"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      Not deployed
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

