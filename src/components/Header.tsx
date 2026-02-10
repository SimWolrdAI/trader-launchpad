"use client";

import { useAnimals } from "@/hooks/useAnimals";

export default function Header() {
  const { deployedCount: deployed, remainingCount: remaining } = useAnimals();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 zoo-header">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(48,200,120,0.2)] group-hover:scale-110 group-hover:rotate-[-5deg]">
            <img src="/icon.jpg" alt="The Animals" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1
              className="text-text-primary text-lg tracking-[0.12em] uppercase transition-colors duration-300 group-hover:text-accent-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Animals
            </h1>
          </div>
        </a>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-3">
          <div className="stat-badge flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_6px_rgba(32,224,112,0.5)]" />
            <span className="text-text-muted text-[10px] uppercase tracking-widest">Deployed</span>
            <span className="text-accent-emerald font-bold">{deployed}</span>
          </div>
          <div className="stat-badge flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-gold/50" />
            <span className="text-text-muted text-[10px] uppercase tracking-widest">Waiting</span>
            <span className="text-accent-gold font-bold">{remaining}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-5">
          <button onClick={() => scrollTo("about")} className="nav-link text-text-secondary text-sm hidden sm:block">About</button>
          <button onClick={() => scrollTo("animals")} className="nav-link text-text-secondary text-sm hidden sm:block">Collection</button>
          <button onClick={() => scrollTo("guide")} className="nav-link text-text-secondary text-sm hidden sm:block">Guide</button>
        </nav>
      </div>
    </header>
  );
}
