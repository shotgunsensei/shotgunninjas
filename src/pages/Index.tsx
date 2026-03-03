import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import PhilosophySection from "@/components/PhilosophySection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <PhilosophySection />
      <CaseStudiesSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
