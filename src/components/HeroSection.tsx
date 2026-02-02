import { ArrowRight, Headphones, Video, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroNinja from "@/assets/hero-ninja.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with ninja mascot */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroNinja})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
      <div className="absolute inset-0 bg-glow opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-display text-sm md:text-base tracking-[0.3em] mb-6 animate-fade-in uppercase">
            Creative + Technical Studio
          </p>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Shotgun Ninjas is a creative</span>
            <br />
            <span className="text-gradient">and automation studio.</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            We build sound, visuals, and systems that actually work.
          </p>
          
          <p className="text-foreground/80 text-base md:text-lg font-medium mb-10">
            Audio production. Video production. Business automation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact">
              <Button variant="hero" size="lg">
                Hire the Studio
                <ArrowRight className="ml-2" />
              </Button>
            </a>
            <Link to="/services">
              <Button variant="glass" size="lg">
                View Services
              </Button>
            </Link>
          </div>

          {/* Three Service Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            <div className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Audio Production</h3>
              <p className="text-muted-foreground text-sm">
                Studio-grade music, podcast editing, voiceover cleanup, and sound design.
              </p>
            </div>
            <div className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Video Production</h3>
              <p className="text-muted-foreground text-sm">
                Short-form content, YouTube editing, AI-enhanced cleanup, and technical explainers.
              </p>
            </div>
            <div className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Cog className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Automation & Code</h3>
              <p className="text-muted-foreground text-sm">
                Business process automation, custom bots, API integrations, and AI workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
