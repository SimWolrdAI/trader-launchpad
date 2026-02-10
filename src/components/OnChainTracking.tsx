import { IconChart, IconShield, IconCompass } from "./Icons";
import Image from "next/image";

export default function OnChainTracking() {
  const trackingFeatures = [
    {
      icon: <IconCompass />,
      title: "Auto-Scanning",
      desc: "Our bots monitor pump.fun in real-time for any new deployments matching our collection.",
      medallion: "medallion-blue",
    },
    {
      icon: <IconShield />,
      title: "Verified Ownership",
      desc: "Once a deployment is found, the deployer's wallet is verified and permanently credited on the exhibit page.",
      medallion: "medallion-green",
    },
    {
      icon: <IconChart />,
      title: "Live Analytics",
      desc: "Track each animal's on-chain performance — market cap, holders, volume — all from the exhibit dashboard.",
      medallion: "medallion-purple",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <div className="aurora-section p-8 md:p-12 border border-accent-cyan/8">
        <div className="relative text-center mb-10">
          <div className="ornament mb-4">
            <span className="text-accent-cyan text-[10px] tracking-[0.35em] uppercase font-semibold">Tracking System</span>
          </div>
          <h3
            className="text-2xl md:text-3xl text-text-primary mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            On-Chain <span className="text-gradient-nature italic">Tracking</span>
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            Fully automated blockchain verification — no manual submissions, zero friction
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-8">
          {trackingFeatures.map((f, i) => (
            <div key={i} className="nature-card p-5 text-center">
              <div className={`icon-medallion ${f.medallion} mx-auto mb-3`}>{f.icon}</div>
              <h4 className="text-text-primary font-semibold text-base mb-2">{f.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
