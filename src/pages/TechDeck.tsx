import { ArrowRight, Server, Shield, FileText, Settings, Zap, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { icon: BarChart, title: "Stack Optimization Audits", description: "We audit your entire MSP stack—RMM, PSA, security, backup—and identify redundancy, waste, and risk. You get a clear roadmap to a leaner operation." },
  { icon: Shield, title: "RMM & Security Automation", description: "Automate patch management, alerting, and remediation. Reduce noise, reduce risk, and free your techs from repetitive tasks." },
  { icon: FileText, title: "Compliance & Reporting", description: "Generate compliance reports, audit trails, and client-facing documentation automatically. Stay audit-ready without the manual grind." },
  { icon: Settings, title: "Done-With-You Implementation", description: "We don't just hand you a playbook. We build it alongside your team, configure the systems, and train your people." },
  { icon: Zap, title: "Subscription Automation Packs", description: "Pre-built automation bundles for common MSP workflows—onboarding, offboarding, alerting, billing reconciliation." },
];

const TechDeck = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back
          </Link>
          <div className="max-w-3xl">
            <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">Tech Deck</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Own the Stack.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              MSP enablement system built to reduce tool sprawl, automate operations, and restore margin.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Book Stack Audit <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {sections.map((s, i) => (
              <div key={s.title} className="glass rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Stop leaking margin.</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Get a clear picture of your stack, your spend, and your opportunities.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Book Stack Audit <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TechDeck;
