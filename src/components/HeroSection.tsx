import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(hsl(0 0% 15% / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(0 0% 15% / 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      <div className="absolute inset-0 bg-glow opacity-30" />

      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-primary" />

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-muted-foreground text-xs tracking-[0.2em] uppercase mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Shotgun Ninjas Productions
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            <span className="text-foreground">Control the System.</span>
            <br />
            <span className="text-gradient">Own the Stack.</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Systems, automation, and software built for real operators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <a href="#platforms">
              <Button variant="hero" size="lg">
                Explore the Stack
                <ArrowRight className="ml-2" />
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="glass" size="lg">
                <PhoneCall className="mr-2 w-4 h-4" />
                Book a Strategy Call
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-5 h-9 border-2 border-primary/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
