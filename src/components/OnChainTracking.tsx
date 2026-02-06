import { IconLightning } from "./PixelIcons";

export default function OnChainTracking() {
  const badges = [
    "Real-time on-chain monitoring",
    "First deployer gets featured",
    "$50+ liquidity required",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="relative bg-bg-panel p-10 md:p-14">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-accent-gold" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-[3px] border-r-[3px] border-accent-gold" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-[3px] border-l-[3px] border-accent-gold" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-accent-gold" />

        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto pixel-icon-box !w-14 !h-14">
            <IconLightning />
          </div>

          {/* Title */}
          <h3
            className="text-accent-gold text-xl md:text-2xl font-bold italic"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Automatic On-Chain Tracking
          </h3>

          {/* Description */}
          <div className="text-text-muted text-sm md:text-base max-w-xl mx-auto space-y-1">
            <p>No need to submit anything manually.</p>
            <p>
              We automatically monitor the blockchain and detect who deployed each
              trader first.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="step-card bg-accent-green/20 border-[3px] border-accent-green/50 text-accent-green px-5 py-2.5 text-xs md:text-sm font-bold shadow-[3px_3px_0px_rgba(34,197,94,0.15)]"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

