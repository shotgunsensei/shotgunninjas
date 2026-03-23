import { Shield, Zap, Target, Lock } from "lucide-react";

const pillars = [
  { icon: Shield, title: "Control", text: "Every system we build puts you in the driver's seat. No vendor lock-in. No black boxes." },
  { icon: Zap, title: "Leverage", text: "Automation multiplies effort. We build systems that work harder than people." },
  { icon: Target, title: "Precision", text: "No bloat, no fluff. Every feature exists because it solves a real problem." },
  { icon: Lock, title: "Ownership", text: "Your data. Your stack. Your rules. We build it, you own it." },
];

export default function PhilosophySection() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            The Operator Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Build Leverage. Automate Chaos. Own Everything.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Most businesses are buried in tools they don't control and processes they can't see.
            We build systems that replace chaos with structure, and dependence with ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
