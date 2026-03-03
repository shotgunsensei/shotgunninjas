import { ArrowRight, Server, Wrench, Cloud, Car } from "lucide-react";

const caseStudies = [
  {
    icon: Server,
    category: "MSP Automation",
    title: "Reduced ticket volume by 40% with automated triage",
    description: "An MSP drowning in L1 tickets deployed Tech Deck's automation layer to classify, route, and resolve common issues without human intervention.",
    metric: "40% fewer tickets",
  },
  {
    icon: Wrench,
    category: "Field Service Optimization",
    title: "Dispatch-to-invoice in under 60 seconds",
    description: "A plumbing company replaced 4 disconnected tools with TradeFlow Kit, cutting admin time by 70% and eliminating lost invoices.",
    metric: "70% less admin",
  },
  {
    icon: Cloud,
    category: "AI App Build",
    title: "From idea to production in 3 weeks",
    description: "A solo founder used OperatorOS to architect, build, and deploy a SaaS product with AI-powered workflows—no DevOps team required.",
    metric: "3-week launch",
  },
  {
    icon: Car,
    category: "Performance Diagnostics",
    title: "Community-driven diagnostic knowledge base",
    description: "Torque Shed's diagnostic library helped an independent shop reduce misdiagnosis rates and build repeatable troubleshooting procedures.",
    metric: "2x faster diagnosis",
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">
            Case Studies
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Builds That Ship
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real systems solving real problems. Here's what operator-grade engineering looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {caseStudies.map((study) => (
            <div key={study.title} className="glass rounded-xl p-8 group hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <study.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-primary font-display text-xs tracking-[0.15em] uppercase">{study.category}</span>
              </div>

              <h3 className="font-display text-lg font-bold text-foreground mb-3">{study.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{study.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-primary font-display font-bold text-sm">{study.metric}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
