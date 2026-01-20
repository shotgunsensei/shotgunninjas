import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Users, Zap, ExternalLink } from "lucide-react";
import torqueShedLogo from "@/assets/torqueshed-logo.png";

const TorqueShedSpotlight = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(25_90%_50%/0.08)] rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Logo and branding */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-[hsl(25_90%_50%/0.3)] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={torqueShedLogo} 
              alt="TorqueShed Logo" 
              className="w-48 h-48 lg:w-64 lg:h-64 object-contain relative z-10 drop-shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(25_90%_50%/0.15)] border border-[hsl(25_90%_50%/0.3)] mb-6">
              <Zap className="w-4 h-4 text-[hsl(25_90%_50%)]" />
              <span className="text-sm font-medium text-[hsl(25_90%_50%)]">New Venture</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Introducing{" "}
              <span className="bg-gradient-to-r from-[hsl(25_90%_55%)] to-[hsl(15_85%_50%)] bg-clip-text text-transparent">
                TorqueShed
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
              A garage-built community for gearheads, mechanics, and DIY automotive minds.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-[hsl(25_90%_50%/0.15)] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-[hsl(25_90%_50%)]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Topic Rooms</p>
                  <p className="text-xs text-muted-foreground">Focused discussions</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-[hsl(25_90%_50%/0.15)] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[hsl(25_90%_50%)]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Real Community</p>
                  <p className="text-xs text-muted-foreground">No influencer noise</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-[hsl(25_90%_50%/0.15)] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[hsl(25_90%_50%)]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Swap Shop</p>
                  <p className="text-xs text-muted-foreground">Buy, sell, trade</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/torqueshed">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[hsl(25_90%_50%)] to-[hsl(15_85%_45%)] hover:from-[hsl(25_90%_55%)] hover:to-[hsl(15_85%_50%)] text-white border-0 font-semibold px-8"
                >
                  Learn More
                </Button>
              </Link>
              <a href="https://torqueshed.pro" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-[hsl(25_90%_50%/0.5)] text-[hsl(25_90%_55%)] hover:bg-[hsl(25_90%_50%/0.1)] hover:border-[hsl(25_90%_50%)] font-semibold px-8"
                >
                  Visit TorqueShed
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TorqueShedSpotlight;
