import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import PulseDeskSection from "@/components/PulseDeskSection";
import PhilosophySection from "@/components/PhilosophySection";
import VillageSection from "@/components/VillageSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function Index() {
  useSEO({
    title: "Shotgun Ninjas Productions — Control the System. Own the Stack.",
    description:
      "An indie studio building purpose-built operator tools, automations, and games — Faultline Lab, TradeFlow Kit, PulseDesk, Tech Deck and more.",
  });
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <PulseDeskSection />
      <PhilosophySection />
      <VillageSection />
      <CaseStudiesSection />
      <FAQSection />
      <NewsletterSection source="home" />
      <FinalCTA />
      <Footer />
    </div>
  );
}
