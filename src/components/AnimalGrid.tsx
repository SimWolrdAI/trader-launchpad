"use client";

import { useAnimals } from "@/hooks/useAnimals";
import Link from "next/link";
import Image from "next/image";

export default function AnimalGrid() {
  const { animals } = useAnimals();

  return (
    <section id="animals" className="max-w-7xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="gold-banner p-5 mb-8 text-center">
        <div className="relative">
          <div className="ornament mb-2">
            <span className="text-[#1a1000]/40 text-[9px] tracking-[0.4em] uppercase font-semibold">Exhibit Hall</span>
          </div>
          <h3 className="text-[#1a1000] text-xl md:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
            The Collection
          </h3>
          <p className="text-[#1a1000]/50 mt-1 text-sm">Click any creature to enter its exhibit</p>
        </div>
      </div>

      {/* Grid with stagger */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 stagger-grid">
        {animals.map((animal) => (
          <Link
            key={animal.id}
            href={`/trader/${animal.id}`}
            className="group cursor-pointer block"
          >
            <div className="bg-[#18181b] rounded-2xl overflow-hidden card-glow border border-[#2a2a2a]">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none" />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#18181b] to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="px-3.5 pt-1 pb-3.5 space-y-0.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-white text-[13px] font-bold truncate">{animal.name}</span>
                  <span className="text-[#555] text-[11px] ml-1 flex-shrink-0">#{animal.id}</span>
                </div>
                <p className="text-[#666] text-[11px]">{animal.habitat}</p>
                <p className="text-[#888] text-[10px] leading-relaxed line-clamp-2">{animal.description}</p>
                <p className="text-accent-gold text-[12px] font-bold pt-1">{animal.symbol}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
