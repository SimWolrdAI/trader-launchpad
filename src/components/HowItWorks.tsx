import { IconSearch, IconClipboard, IconRocket, IconMoney, IconDiamond, IconTrophy } from "./PixelIcons";

export default function HowItWorks() {
  const steps = [
    {
      icon: <IconSearch />,
      step: "Step 1",
      text: "Click on a trader you like",
    },
    {
      icon: <IconClipboard />,
      step: "Step 2",
      text: "Copy its name & image",
    },
    {
      icon: <IconRocket />,
      step: "Step 3",
      text: "Deploy on Pump.fun",
    },
    {
      icon: <IconMoney />,
      step: "Step 4",
      text: "Set fees to the trader's wallet",
    },
    {
      icon: <IconDiamond />,
      step: "Step 5",
      text: "Hold $50 worth",
    },
    {
      icon: <IconTrophy />,
      step: "Step 6",
      text: "Get listed on site",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="section-panel pixel-border bg-bg-panel p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h3
            className="text-xl md:text-2xl text-white font-bold flex items-center justify-center gap-3"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            <span className="inline-block w-4 h-4 bg-accent-gold border-2 border-accent-gold shadow-[2px_2px_0px_rgba(255,217,61,0.3)]" />
            How It Works
          </h3>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card bg-bg-card border-[3px] border-accent-green/40 shadow-[4px_4px_0px_rgba(34,197,94,0.15)] p-5 text-center"
            >
              {/* Pixel icon */}
              <div className="mx-auto pixel-icon-box mb-4">
                {step.icon}
              </div>

              {/* Step label */}
              <p
                className="step-label text-accent-gold text-xs mb-2 transition-all duration-300"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {step.step}
              </p>

              {/* Description */}
              <p className="text-white text-sm font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
