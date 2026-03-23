import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import PhilosophySection from "@/components/PhilosophySection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <PhilosophySection />
      <CaseStudiesSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
