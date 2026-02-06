import { IconTarget, IconTrophy, IconLightning, IconMoney, IconStar } from "./PixelIcons";

export default function WhatsThis() {
  const features = [
    {
      icon: <IconTarget />,
      title: "Deploy via Pump.fun",
      description:
        "Each trader has a unique name, image & wallet. Pick one and deploy it on Pump.fun!",
    },
    {
      icon: <IconTrophy />,
      title: "First Wins!",
      description:
        "First to deploy with $50 liquidity gets featured on the site forever!",
    },
    {
      icon: <IconLightning />,
      title: "Set Fees to Trader",
      description:
        "IMPORTANT: Set the token fees to the trader's wallet address. This ensures they get paid directly!",
    },
    {
      icon: <IconMoney />,
      title: "Fees Go to Traders",
      description:
        "All collected fees are sent directly to the trader's wallet. You support your favorite trader with every trade!",
    },
    {
      icon: <IconStar />,
      title: "Auto Detection",
      description:
        "No manual submission! Site automatically detects and lists your trader token.",
    },
  ];

  return (
    <section id="whats-this" className="max-w-7xl mx-auto px-4 py-10">
      <div className="section-panel pixel-border-gold bg-accent-gold p-8 md:p-12">
        {/* Decorative pixel dots */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-black border-2 border-black" />
          <div className="w-3 h-3 bg-black/60 border-2 border-black/60" />
          <div className="w-3 h-3 bg-black/30 border-2 border-black/30" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h3
            className="text-2xl md:text-3xl text-black font-bold flex items-center justify-center gap-3"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            ⚡ WHAT&apos;S THIS? ⚡
          </h3>
          <p className="text-black/60 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Trader LaunchPad is a crypto experiment where anyone can deploy a
            token for their favorite trader — and all fees go directly to the trader&apos;s wallet
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.slice(0, 4).map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-bg-panel border-[3px] border-border-light shadow-[5px_5px_0px_rgba(0,0,0,0.5)] p-5 flex items-start gap-4"
            >
              <div className="pixel-icon-box">
                {feature.icon}
              </div>
              <div>
                <h4 className="feature-title text-accent-gold font-bold text-lg mb-1 transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* 5th card centered */}
        {features[4] && (
          <div className="flex justify-center mt-6 max-w-4xl mx-auto">
            <div className="feature-card bg-bg-panel border-[3px] border-border-light shadow-[5px_5px_0px_rgba(0,0,0,0.5)] p-5 flex items-start gap-4 w-full md:w-[calc(50%-12px)]">
              <div className="pixel-icon-box">
                {features[4].icon}
              </div>
              <div>
                <h4 className="feature-title text-accent-gold font-bold text-lg mb-1 transition-all duration-300">
                  {features[4].title}
                </h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  {features[4].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <div className="cta-banner inline-block bg-black border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] px-8 py-3 cursor-pointer">
            <p
              className="text-accent-gold text-xs md:text-sm font-bold"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              🚀 Copy → Deploy → Set Fees → Get Featured! 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
