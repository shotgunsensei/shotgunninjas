import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Users, 
  Zap, 
  MessageCircle, 
  Brain, 
  Car, 
  Settings, 
  Heart,
  ExternalLink,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import torqueShedLogo from "@/assets/torqueshed-logo.png";
import torqueShedPhone from "@/assets/torqueshed-phone.png";
import torqueShedTablet from "@/assets/torqueshed-tablet.png";
import torqueShedSwap from "@/assets/torqueshed-swap.png";

const features = [
  {
    icon: MessageCircle,
    title: "Topic-Based Chat Rooms",
    description: "Jump straight into focused conversations on engines, swaps, suspension, electrical, diagnostics, tuning, fabrication, detailing, off-road builds, and more. No endless scrolling—just relevant discussions."
  },
  {
    icon: Brain,
    title: "Collective Automotive Intelligence",
    description: "Ask questions, share solutions, post build insights, or break down complex problems. TorqueShed is built around experience, not algorithms chasing clicks."
  },
  {
    icon: Car,
    title: "Builds, Projects, and Ideas",
    description: "Document your builds, follow others, and trade ideas—from stock daily drivers to full custom projects."
  },
  {
    icon: Settings,
    title: "DIY-Friendly by Design",
    description: "Perfect for hands-on learners who prefer understanding why something works, not just copying steps."
  },
  {
    icon: Heart,
    title: "Community Over Clout",
    description: "No influencer noise. No vanity metrics driving nonsense. TorqueShed prioritizes useful contributions and authentic engagement."
  }
];

const targetAudience = [
  "Automotive mechanics and technicians",
  "DIY car and truck enthusiasts",
  "Performance and tuning addicts",
  "Fabricators and builders",
  "Electrical and diagnostic problem-solvers",
  "Anyone who prefers a garage over a comment section"
];

const keyFeatures = [
  "Focused automotive chat rooms",
  "Clean, purpose-driven interface",
  "Knowledge sharing without clutter",
  "Community-driven growth",
  "Built by gearheads, for gearheads"
];

const TorqueShed = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[hsl(25_90%_50%/0.1)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[hsl(15_85%_45%/0.08)] rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Logo */}
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-[hsl(25_90%_50%/0.3)] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={torqueShedLogo} 
                alt="TorqueShed Logo" 
                className="w-56 h-56 lg:w-72 lg:h-72 object-contain relative z-10 drop-shadow-2xl"
              />
            </div>

            {/* Hero content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-[hsl(25_90%_55%)] to-[hsl(15_85%_50%)] bg-clip-text text-transparent">
                  TorqueShed
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl">
                The Garage for Real People
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground/80 mb-8 max-w-2xl leading-relaxed">
                TorqueShed is a purpose-built community for people who live and breathe engines, 
                fabrication, diagnostics, performance, and hands-on automotive problem solving. 
                Whether you're a professional mechanic, weekend wrench warrior, fabricator, tuner, 
                or lifelong gearhead, TorqueShed is your digital garage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="https://torqueshed.pro" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-[hsl(25_90%_50%)] to-[hsl(15_85%_45%)] hover:from-[hsl(25_90%_55%)] hover:to-[hsl(15_85%_50%)] text-white border-0 font-semibold px-10 py-6 text-lg"
                  >
                    Join TorqueShed
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What makes it different */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              This Isn't Another Generic Social Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              TorqueShed is designed specifically for automotive minds—focused on real-world knowledge, 
              practical experience, and intelligent discussion without the noise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-[hsl(25_90%_50%/0.5)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[hsl(25_90%_50%/0.15)] flex items-center justify-center mb-4 group-hover:bg-[hsl(25_90%_50%/0.25)] transition-colors">
                  <feature.icon className="w-6 h-6 text-[hsl(25_90%_50%)]" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots showcase */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[hsl(25_90%_50%/0.05)] rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              See TorqueShed in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A clean, purpose-driven interface designed for real conversations and knowledge sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(25_90%_50%/0.2)] rounded-3xl blur-2xl scale-90" />
                <img 
                  src={torqueShedPhone} 
                  alt="TorqueShed Mobile App - Bays View" 
                  className="relative z-10 w-64 rounded-2xl shadow-2xl border border-border/30"
                />
              </div>
            </div>

            {/* Tablet mockups */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(25_90%_50%/0.1)] rounded-2xl blur-xl" />
                <img 
                  src={torqueShedTablet} 
                  alt="TorqueShed Desktop - Community Bays" 
                  className="relative z-10 w-full rounded-xl shadow-2xl border border-border/30"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(25_90%_50%/0.1)] rounded-2xl blur-xl" />
                <img 
                  src={torqueShedSwap} 
                  alt="TorqueShed Desktop - Swap Shop" 
                  className="relative z-10 w-full rounded-xl shadow-2xl border border-border/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Who TorqueShed Is For
              </h2>
              <div className="space-y-4">
                {targetAudience.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(25_90%_50%)] flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-lg text-muted-foreground italic">
                If you've ever said "I'll just figure it out myself"—TorqueShed is for you.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/50 border border-border/50">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Why TorqueShed Exists
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most platforms weren't built for people who actually work on machines. TorqueShed 
                exists to bring back focused, intelligent discussion and shared learning—without 
                distractions, ads masquerading as content, or watered-down advice.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Think of it as a modern digital garage: open doors, real conversations, and mutual 
                respect for the craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Summary */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
              Key Features
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {keyFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="px-6 py-3 rounded-full bg-[hsl(25_90%_50%/0.1)] border border-[hsl(25_90%_50%/0.3)] text-[hsl(25_90%_55%)] font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-12">
              <p className="text-xl text-foreground font-display">
                TorqueShed is not about hype.
              </p>
              <p className="text-2xl font-bold text-foreground font-display">
                It's about{" "}
                <span className="bg-gradient-to-r from-[hsl(25_90%_55%)] to-[hsl(15_85%_50%)] bg-clip-text text-transparent">
                  torque, tools, and truth
                </span>.
              </p>
              <p className="text-xl text-muted-foreground font-display">
                Welcome to the garage.
              </p>
            </div>

            <a href="https://torqueshed.pro" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[hsl(25_90%_50%)] to-[hsl(15_85%_45%)] hover:from-[hsl(25_90%_55%)] hover:to-[hsl(15_85%_50%)] text-white border-0 font-semibold px-12 py-6 text-lg"
              >
                Enter TorqueShed
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TorqueShed;
