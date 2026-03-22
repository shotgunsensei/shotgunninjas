import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Cpu, Workflow, Bot, Layers, Shield } from "lucide-react";

const features = [
  { icon: Workflow, title: "Visual Workflow Builder", desc: "Drag-and-drop automation chains with conditional logic and branching." },
  { icon: Bot, title: "Intelligent Agents", desc: "Deploy AI-powered agents that learn, adapt, and execute autonomously." },
  { icon: Cpu, title: "Multi-System Orchestration", desc: "Connect APIs, databases, and services into unified execution pipelines." },
  { icon: Zap, title: "Real-Time Triggers", desc: "Event-driven automation that fires instantly on webhooks, schedules, or conditions." },
  { icon: Layers, title: "Modular Architecture", desc: "Stack and reuse automation blocks across projects and teams." },
  { icon: Shield, title: "Secure Execution", desc: "Encrypted runtime, audit logging, and role-based access on every workflow." },
];

const Ninjamation = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(2_100%_44%/0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 arsenal-scanlines opacity-[0.03]" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase animate-fade-in">
            Automation Platform
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Automate like a </span>
            <span className="text-gradient">Ninja.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Build, deploy, and control intelligent workflows with precision and speed.
          </p>
          <a href="https://ninjamation.com" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg">
              Launch Ninjamation
              <ArrowRight className="ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">Capabilities</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Precision Automation
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 p-2.5 mb-6 group-hover:shadow-glow-sm transition-all">
                  <f.icon className="w-full h-full text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(2_100%_44%/0.06)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Stop repeating. Start automating.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Ninjamation turns manual chaos into automated precision.
          </p>
          <a href="https://ninjamation.com" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Ninjamation;
