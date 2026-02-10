import { IconCompass, IconLeaf, IconRocket, IconTrophy } from "./Icons";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <IconCompass />,
      title: "Explore",
      desc: "Browse the full collection of animals, filtering by rarity. Each creature has a unique ticker, name, and personality.",
      accent: "from-accent-green to-accent-emerald",
      medallion: "medallion-green",
    },
    {
      num: "02",
      icon: <IconLeaf />,
      title: "Choose",
      desc: "Found your favourite? Click into the exhibit to get the complete data — image, ticker, and deploy-ready info.",
      accent: "from-accent-blue to-accent-cyan",
      medallion: "medallion-blue",
    },
    {
      num: "03",
      icon: <IconRocket />,
      title: "Deploy",
      desc: "Head to pump.fun and create the token using the animal's data. First to deploy wins the permanent feature spot.",
      accent: "from-accent-purple to-accent-pink",
      medallion: "medallion-purple",
    },
    {
      num: "04",
      icon: <IconTrophy />,
      title: "Win",
      desc: "Our system auto-detects your deployment on-chain. You get credited instantly — no forms, no waiting.",
      accent: "from-accent-gold to-accent-orange",
      medallion: "medallion-gold",
    },
  ];

  return (
    <section id="guide" className="max-w-7xl mx-auto px-5 py-10">
      <div className="sunset-section p-8 md:p-12 border border-accent-orange/8">
        <div className="relative text-center mb-10">
          <div className="ornament mb-4">
            <span className="text-accent-orange text-[10px] tracking-[0.35em] uppercase font-semibold">Explorer&apos;s Guide</span>
          </div>
          <h3
            className="text-2xl md:text-3xl text-text-primary mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How It <span className="text-gradient-fire italic">Works</span>
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            From discovery to deployment in four simple steps
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="guide-step p-5 group relative overflow-hidden">
              {/* Accent top bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${s.accent} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex items-center gap-3 mb-4">
                <div className={`icon-medallion ${s.medallion}`}>{s.icon}</div>
                <span className="text-text-muted/30 text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>
                  {s.num}
                </span>
              </div>

              <h4 className="text-text-primary font-semibold text-base mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {s.title}
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
