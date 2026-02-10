"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnimalScroll from "@/components/AnimalScroll";
import WhatsThis from "@/components/WhatsThis";
import AnimalGrid from "@/components/AnimalGrid";
import HowItWorks from "@/components/HowItWorks";
import OnChainTracking from "@/components/OnChainTracking";
import FooterCTA from "@/components/FooterCTA";

function Fireflies() {
  const flies = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 15,
    color:
      i % 3 === 0
        ? "rgba(240, 192, 64, 0.6)"
        : i % 3 === 1
        ? "rgba(48, 200, 120, 0.5)"
        : "rgba(160, 96, 240, 0.4)",
  }));

  return (
    <div className="fireflies">
      {flies.map((f) => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            backgroundColor: f.color,
            boxShadow: `0 0 ${f.size * 3}px ${f.color}`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-bg">
      <Fireflies />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <div className="reveal"><AnimalScroll /></div>
        <div className="section-divider my-2" />
        <div className="reveal"><WhatsThis /></div>
        <div className="section-divider my-2" />
        <div className="reveal"><AnimalGrid /></div>
        <div className="section-divider my-2" />
        <div className="reveal"><HowItWorks /></div>
        <div className="section-divider my-2" />
        <div className="reveal"><OnChainTracking /></div>
        <div className="section-divider my-2" />
        <div className="reveal"><FooterCTA /></div>
      </div>
    </div>
  );
}
