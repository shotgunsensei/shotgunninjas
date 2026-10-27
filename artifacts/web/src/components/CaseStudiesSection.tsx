import { Server, Wrench, Cloud, Car } from "lucide-react";

const caseStudies = [
  {
    icon: Server,
    category: "MSP Automation",
    title: "Keep the context with the ticket",
    description:
      "Bring an issue, its assets, and the steps taken into TechDeck so the next person can pick up the work with context.",
    metric: "Support operations",
  },
  {
    icon: Wrench,
    category: "Field Service Optimization",
    title: "Follow a job from quote to invoice",
    description:
      "Organize the customer, estimate, scheduled work, and invoice in TradeFlowKit instead of reconstructing the job from disconnected notes.",
    metric: "Field service workflow",
  },
  {
    icon: Cloud,
    category: "Unified Operations",
    title: "Find the right workspace for the work",
    description:
      "Use OperatorOS to reach connected applications, manage your workspace, and return to the tools your team uses.",
    metric: "Connected applications",
  },
  {
    icon: Car,
    category: "Performance Diagnostics",
    title: "Build a repeatable diagnostic record",
    description:
      "Keep the symptoms, tests, findings, and next steps together in TorqueShed so an investigation has a useful history.",
    metric: "Diagnostic workspace",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            Workflow examples
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built around everyday work.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the jobs these tools are designed to support, from the first
            request to a clear record of the work.
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
              <h3 className="text-lg font-bold mb-3 font-[var(--font-display)]">
                {study.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {study.description}
              </p>
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
