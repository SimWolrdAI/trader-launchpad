"use client";


export default function FooterCTA() {
  return (
    <footer className="max-w-7xl mx-auto px-5 pt-6 pb-14">
      {/* CTA Banner */}
      <div className="gold-banner p-8 md:p-12 mb-12">
        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#1a1000]/50 text-[10px] tracking-[0.3em] uppercase font-semibold mb-2">
              Ready to Explore?
            </p>
            <h3
              className="text-[#1a1000] text-xl md:text-2xl mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Join The Animals Today
            </h3>
            <p className="text-[#1a1000]/60 text-sm leading-relaxed max-w-md">
              Be the first to deploy a creature and claim your spot in the exhibit hall forever.
            </p>
          </div>

          {/* Right */}
          <div className="flex gap-3">
            <button
              className="bg-[#1a1000] text-accent-gold font-bold px-7 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg text-sm"
              onClick={() => {
                const el = document.getElementById("animals");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🔥 Explore Now
            </button>
            <a
              href="https://x.com/i/communities/2021252505582141541/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm text-[#1a1000] font-semibold px-7 py-3 rounded-xl border border-white/30 transition-all duration-200 hover:bg-white/30 hover:translate-y-[-2px] text-sm"
            >
              𝕏 Follow Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <img src="/icon.jpg" alt="The Animals" className="w-full h-full object-cover" />
          </div>
          <p className="text-text-secondary text-xs tracking-wider uppercase" style={{ fontFamily: "var(--font-display)" }}>
            The Animals
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#about" className="text-text-muted text-xs transition-colors hover:text-accent-gold">About</a>
          <a href="#animals" className="text-text-muted text-xs transition-colors hover:text-accent-gold">Collection</a>
          <a href="#guide" className="text-text-muted text-xs transition-colors hover:text-accent-gold">Guide</a>
        </div>

      </div>
    </footer>
  );
}
