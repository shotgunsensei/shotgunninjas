import { Shield, Zap, Target, Lock } from "lucide-react";

const pillars = [
  { icon: Shield, title: "Control", text: "Every system we build puts you in the driver's seat. No vendor lock-in. No black boxes." },
  { icon: Zap, title: "Leverage", text: "Automation multiplies effort. We build systems that work harder than people." },
  { icon: Target, title: "Precision", text: "No bloat, no fluff. Every feature exists because it solves a real problem." },
  { icon: Lock, title: "Ownership", text: "Your data. Your stack. Your rules. We build it, you own it." },
];

const PhilosophySection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">
            The Operator Philosophy
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Build Leverage. Automate Chaos. Own Everything.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Most businesses are buried in tools they don't control and processes they can't see. 
            We build systems that replace chaos with structure, and dependence with ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2 text-lg">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
