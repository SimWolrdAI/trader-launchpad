import { IconLeaf, IconTrophy, IconRocket, IconCompass, IconShield } from "./Icons";

export default function WhatsThis() {
  const features = [
    {
      icon: <IconCompass />,
      title: "Choose Your Creature",
      desc: "Browse our curated collection of legendary animals. Each has a unique story, habitat, and rarity tier.",
      medallion: "medallion-green",
    },
    {
      icon: <IconTrophy />,
      title: "First Deployer Wins",
      desc: "Race to be the first to deploy. The fastest explorer gets permanently featured in the exhibit.",
      medallion: "medallion-gold",
    },
    {
      icon: <IconRocket />,
      title: "Deploy on Pump.fun",
      desc: "Take the animal data — name, ticker, image — and launch it as a token. That's all it takes.",
      medallion: "medallion-purple",
    },
    {
      icon: <IconLeaf />,
      title: "Build the Ecosystem",
      desc: "Each animal token grows its own community. The wilder the creature, the stronger the tribe.",
      medallion: "medallion-green",
    },
    {
      icon: <IconShield />,
      title: "On-Chain Verification",
      desc: "No manual submissions. We automatically track the blockchain and verify every deployment.",
      medallion: "medallion-blue",
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-5 py-10">
      <div className="tropical-section p-8 md:p-12 border border-accent-green/10">
        <div className="relative text-center mb-10">
          <div className="ornament mb-4">
            <span className="text-accent-gold text-[10px] tracking-[0.35em] uppercase font-semibold">About The Animals</span>
          </div>
          <h3
            className="text-2xl md:text-3xl text-text-primary mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What is <span className="text-gradient-gold italic">The Animals</span>?
          </h3>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A Animals launchpad where every creature has a story.
            Explore the collection, choose your animal, and bring it to life on-chain.
          </p>
        </div>

        {/* Feature cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {features.slice(0, 4).map((f, i) => (
            <div key={i} className="nature-card p-5 flex items-start gap-4">
              <div className={`icon-medallion ${f.medallion}`}>{f.icon}</div>
              <div>
                <h4 className="text-accent-gold font-semibold text-base mb-1.5">{f.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {features[4] && (
          <div className="relative flex justify-center mt-5 max-w-4xl mx-auto">
            <div className="nature-card p-5 flex items-start gap-4 w-full md:w-[calc(50%-10px)]">
              <div className={`icon-medallion ${features[4].medallion}`}>{features[4].icon}</div>
              <div>
                <h4 className="text-accent-gold font-semibold text-base mb-1.5">{features[4].title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{features[4].desc}</p>
              </div>
            </div>
          </div>
        )}

        <div className="relative mt-8 text-center">
          <div className="inline-block bg-bg-main/80 backdrop-blur-sm rounded-xl px-8 py-3 border border-accent-gold/15 cursor-pointer transition-all hover:scale-[1.03] hover:border-accent-gold/30 hover:shadow-[0_0_20px_rgba(240,192,64,0.08)]">
            <p className="text-accent-gold text-xs md:text-sm font-semibold tracking-wide">
              🌿 Choose → Deploy → Get Featured 🌿
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
