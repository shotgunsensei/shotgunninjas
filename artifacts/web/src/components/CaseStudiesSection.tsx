import { Server, Wrench, Cloud, Car } from "lucide-react";

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

export default function CaseStudiesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            Case Studies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Builds That Ship</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real systems solving real problems. Here's what operator-grade engineering looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <study.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-primary font-medium tracking-wider uppercase">
                  {study.category}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-3 font-[var(--font-display)]">{study.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{study.description}</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                {study.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
