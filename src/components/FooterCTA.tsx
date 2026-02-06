export default function FooterCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 pb-16">
      <div className="section-panel pixel-border-gold bg-accent-gold p-8 md:p-12 text-center relative overflow-hidden">
        {/* Decorative pixel dots */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-black/30 border border-black/30" />
          <div className="w-2.5 h-2.5 bg-black/20 border border-black/20" />
          <div className="w-2.5 h-2.5 bg-black/10 border border-black/10" />
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-black/10 border border-black/10" />
          <div className="w-2.5 h-2.5 bg-black/20 border border-black/20" />
          <div className="w-2.5 h-2.5 bg-black/30 border border-black/30" />
        </div>

        {/* Pixel icon */}
        <div
          className="mx-auto !w-16 !h-16 mb-6 flex items-center justify-center flex-shrink-0"
          style={{
            background: "#000",
            border: "3px solid #000",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.3)",
            imageRendering: "pixelated",
          }}
        >
          <svg viewBox="0 0 16 16" fill="var(--accent-gold)" className="w-8 h-8" shapeRendering="crispEdges">
            <rect x="7" y="0" width="2" height="2" />
            <rect x="7" y="2" width="2" height="2" />
            <rect x="0" y="5" width="16" height="2" />
            <rect x="2" y="7" width="12" height="2" />
            <rect x="3" y="9" width="4" height="2" />
            <rect x="9" y="9" width="4" height="2" />
            <rect x="2" y="11" width="2" height="2" />
            <rect x="12" y="11" width="2" height="2" />
            <rect x="1" y="13" width="2" height="2" />
            <rect x="13" y="13" width="2" height="2" />
          </svg>
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl text-black font-bold mb-4"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          New Traders Weekly!
        </h3>

        {/* Description */}
        <p className="text-black/60 text-base md:text-lg max-w-md mx-auto mb-6">
          We release 15-20 new trader designs every week.
          <br />
          Follow us to catch them first!
        </p>

        {/* Follow button */}
        <a
          href="https://x.com/i/communities/2019838381752996131"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-follow inline-flex items-center gap-3 bg-black border-[3px] border-black text-accent-gold px-8 py-3 text-sm font-bold shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          FOLLOW ON X
        </a>
      </div>
    </section>
  );
}
