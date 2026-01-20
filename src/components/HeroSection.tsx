import { ArrowRight } from "lucide-react";
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
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      <div className="absolute inset-0 bg-glow opacity-30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-display text-sm md:text-base tracking-[0.3em] mb-6 animate-fade-in uppercase">
            Build Smarter. Create Harder.
          </p>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">CONTROL YOUR</span>
            <br />
            <span className="text-gradient">SYSTEMS</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Shotgun Ninjas designs intelligent gadgets, creative productions, and 
            automation systems for people who want real control — not locked-down 
            tech or shallow tutorials.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#products">
              <Button variant="hero" size="lg">
                Explore Products
                <ArrowRight className="ml-2" />
              </Button>
            </a>
            <Link to="/clan">
              <Button variant="glass" size="lg">
                Join the Clan
              </Button>
            </Link>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            <div className="glass rounded-xl p-6">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-display font-bold text-foreground mb-2">Intelligent Gadgets</h3>
              <p className="text-muted-foreground text-sm">
                Indoor, outdoor, and electric-vehicle tech designed to be practical, repairable, and upgradeable.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-2xl mb-2">🎵</div>
              <h3 className="font-display font-bold text-foreground mb-2">Creative Production</h3>
              <p className="text-muted-foreground text-sm">
                Music and video production that supports storytelling, branding, and impact — not filler content.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="font-display font-bold text-foreground mb-2">Automation & Knowledge</h3>
              <p className="text-muted-foreground text-sm">
                Scripts, systems, and instruction for homes, businesses, and builders who want leverage.
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
