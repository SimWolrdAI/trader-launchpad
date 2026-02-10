"use client";

import { useAnimals } from "@/hooks/useAnimals";
import Link from "next/link";
import Image from "next/image";

export default function AnimalScroll() {
  const { animals } = useAnimals();

  return (
    <section className="max-w-7xl mx-auto px-5 py-4">
      <div className="zoo-panel p-4 border-accent-green/8">
        {/* Label */}
        <div className="flex items-center justify-between mb-3 px-2">
          <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="w-3 h-[1px] bg-accent-gold/40" />
            Quick Preview
          </p>
          <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
            {animals.length} species
            <span className="w-3 h-[1px] bg-accent-gold/40" />
          </p>
        </div>

        {/* Scroll */}
        <div className="flex gap-4 overflow-x-auto scroll-strip pb-3 px-1">
          {animals.map((animal) => (
            <Link
              key={animal.id}
              href={`/trader/${animal.id}`}
              className="scroll-item flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-[88px] h-[88px] rounded-2xl border border-white/5 transition-all duration-300 group-hover:border-accent-gold/30 group-hover:shadow-[0_0_25px_rgba(240,192,64,0.08)] overflow-hidden relative">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="88px"
                />
                {animal.deployed && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-emerald flex items-center justify-center z-10 shadow-[0_0_8px_rgba(32,224,112,0.4)]">
                    <span className="text-[9px] text-white font-bold">✓</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-text-muted text-[10px] tracking-wider mt-2 uppercase">
          ← Scroll to browse all creatures →
        </p>
      </div>
    </section>
  );
}
