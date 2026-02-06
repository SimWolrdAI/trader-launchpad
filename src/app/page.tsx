import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TraderScroll from "@/components/TraderScroll";
import WhatsThis from "@/components/WhatsThis";
import TraderGrid from "@/components/TraderGrid";
import HowItWorks from "@/components/HowItWorks";
import OnChainTracking from "@/components/OnChainTracking";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      <HeroSection />
      <TraderScroll />
      <WhatsThis />
      <TraderGrid />
      <HowItWorks />
      <OnChainTracking />
      <FooterCTA />
    </div>
  );
}
