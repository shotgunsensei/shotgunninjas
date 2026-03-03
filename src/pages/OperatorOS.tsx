import { ArrowRight, Cloud, Cpu, Rocket, Code, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Cpu, title: "AI Workspace Control", description: "Structured AI agents that follow your architecture decisions, not random suggestions. Build with intent." },
  { icon: Rocket, title: "Deployment & Publish Assistant", description: "One-click deploys with rollback, preview environments, and automated health checks built in." },
  { icon: Code, title: "Built for Builders Who Ship", description: "No tutorials. No hand-holding. OperatorOS is for developers and founders who move fast and build clean." },
  { icon: Layers, title: "Workspace Management", description: "Organize projects, environments, and deployments in a unified control plane. No tab chaos." },
  { icon: Zap, title: "Automation Pipelines", description: "Connect build steps, testing, and deployment into repeatable automated workflows." },
  { icon: Cloud, title: "Cloud-Native Architecture", description: "Built on modern infrastructure. Scales from prototype to production without re-architecting." },
];

const OperatorOS = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back
          </Link>
          <div className="max-w-3xl">
            <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">OperatorOS</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Own the Build.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              AI-native cloud development environment designed for builders. Move from idea to deployed application with precision and speed.
            </p>
            <Button variant="hero" size="lg">
              Join Early Access
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">What Makes It Different</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              OperatorOS combines workspace management, automation, and publish assistance into a unified operator interface.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Placeholder */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="glass rounded-xl p-12 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Pricing</h2>
            <p className="text-muted-foreground text-lg mb-6">Coming Soon</p>
            <p className="text-muted-foreground text-sm">Join early access to lock in founder pricing.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to build?</h2>
          <p className="text-muted-foreground text-lg mb-8">Get early access to OperatorOS and start shipping.</p>
          <Button variant="hero" size="lg">
            Join Early Access <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OperatorOS;
