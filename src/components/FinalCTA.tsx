import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
          Build Smarter.
          <br />
          <span className="text-gradient">Operate Stronger.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Stop duct-taping tools together. Start building systems that compound.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Book a Strategy Call
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <a href="#platforms">
            <Button variant="glass" size="lg">
              Explore Platforms
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
