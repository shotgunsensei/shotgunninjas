import { useEffect } from "react";
import {
  Ticket,
  Workflow,
  Users,
  Clock,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Layers,
  Headphones,
  Eye,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import pulsedeskHero from "@assets/Modern_healthcare_tech_in_action_1775761546446.webp";
import pulsedeskLogo from "@assets/pulsedesklogo_1775761546445.webp";

const features = [
  { icon: Ticket, title: "Ticket Command Center", description: "Intake, triage, and resolve support requests from one organized dashboard — no scattered inboxes." },
  { icon: Workflow, title: "Workflow Engine", description: "Route tickets, trigger escalations, and automate status updates with configurable workflow rules." },
  { icon: Users, title: "Client Portal", description: "Give clients a branded window into their requests — real-time status, history, and communication." },
  { icon: Clock, title: "SLA Tracking", description: "Set response and resolution targets, track compliance, and surface breaches before they happen." },
  { icon: ShieldCheck, title: "Team Accountability", description: "Assign ownership, track workload, and ensure nothing falls through the cracks across your team." },
  { icon: BarChart3, title: "Operational Insights", description: "Dashboards and reports that show ticket volume, resolution speed, bottlenecks, and team performance." },
];

const audiences = [
  { title: "Service Teams", description: "Manage client requests, internal tickets, and field service coordination from one system." },
  { title: "IT & Support Desks", description: "Streamline incident handling, knowledge routing, and SLA compliance tracking." },
  { title: "Operations Managers", description: "Get clear visibility into workload, throughput, and service delivery metrics." },
  { title: "Agencies & MSPs", description: "Run multi-client support operations without losing track of who needs what." },
];

const ecosystemProducts = [
  { name: "OperatorOS", tagline: "Cloud development control plane", link: "/operatoros" },
  { name: "Tech Deck", tagline: "MSP enablement platform", link: "/techdeck" },
  { name: "TradeFlow Kit", tagline: "Field service automation", link: "/tradeflow" },
  { name: "SnapProof OS", tagline: "Field documentation system", link: "/snapproof-os" },
  { name: "PulseDesk", tagline: "Support operations platform", link: "/pulsedesk", active: true },
  { name: "BrandForge OS", tagline: "Marketing operating system", link: "/brandforgeos" },
];

export default function PulseDesk() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "PulseDesk — Support Operations Platform | Shotgun Ninjas";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    if (meta) {
      meta.setAttribute("content", "PulseDesk is the support command center from Shotgun Ninjas — manage tickets, workflows, client requests, and service visibility from one platform.");
    }
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/3 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-500/4 rounded-full blur-[200px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-[160px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
                <img src={pulsedeskLogo} alt="" className="h-5 w-auto rounded object-contain" />
                <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-primary/90 uppercase">
                  Shotgun Ninjas Product
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-[var(--font-display)] leading-[1.05]">
                Support ops,{" "}
                <span className="text-gradient">under control.</span>
              </h1>

              <p className="text-xs font-[var(--font-display)] tracking-widest text-primary/80 mb-5 uppercase">
                Own the Queue.
              </p>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                PulseDesk centralizes support requests, automates workflows, and gives your team full visibility into service delivery — so nothing slips and clients stay informed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://pulsedesk.support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                >
                  Open PulseDesk
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
                >
                  See What's Inside
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-[-20px] bg-gradient-to-br from-cyan-500/10 via-transparent to-primary/5 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-cyan-500/10">
                <img
                  src={pulsedeskHero}
                  alt="PulseDesk — Support operations command center for tickets, workflows, and service visibility"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              What's Inside
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Six modules. One support stack.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Everything from ticket intake to resolution analytics — integrated, not scattered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feat.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 font-[var(--font-display)]">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              From request to resolution.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A clear pipeline that keeps your team sharp and your clients in the loop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Headphones, title: "Intake", desc: "Tickets arrive via form, email, or portal — automatically categorized and assigned." },
              { step: "02", icon: Eye, title: "Triage", desc: "Prioritize, tag, and route requests to the right team member instantly." },
              { step: "03", icon: Bell, title: "Execute", desc: "Work tickets with status tracking, internal notes, and client-facing updates." },
              { step: "04", icon: BarChart3, title: "Report", desc: "Track resolution times, SLA compliance, and team throughput in real time." },
            ].map((item) => (
              <div key={item.step} className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group">
                <span className="text-5xl font-bold font-[var(--font-display)] text-primary/8 absolute top-4 right-5 select-none group-hover:text-primary/12 transition-colors">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 font-[var(--font-display)]">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Built For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Who it's for
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {audiences.map((aud) => (
              <div
                key={aud.title}
                className="flex gap-4 bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1.5 font-[var(--font-display)]">{aud.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{aud.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Part of the Shotgun Ninjas stack
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Purpose-built digital tools under one operator umbrella.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecosystemProducts.map((prod) => (
              <Link
                key={prod.name}
                to={prod.link}
                className={`flex items-center gap-4 rounded-xl p-5 border transition-all duration-300 ${
                  prod.active
                    ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/5"
                    : "bg-card border-border hover:border-primary/20 hover:bg-card/80"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  prod.active ? "bg-primary/15" : "bg-primary/8"
                }`}>
                  {prod.active ? (
                    <img src={pulsedeskLogo} alt="" className="h-5 w-5 rounded object-contain" />
                  ) : (
                    <Layers className={`h-5 w-5 ${prod.active ? "text-primary" : "text-primary/60"}`} />
                  )}
                </div>
                <div>
                  <p className={`font-bold font-[var(--font-display)] text-sm ${prod.active ? "text-primary" : "text-foreground"}`}>
                    {prod.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{prod.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={pulsedeskLogo} alt="" className="h-10 w-auto mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
            Stop losing tickets. Start owning the queue.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            One platform. Every request. Full visibility. PulseDesk is support operations, done right.
          </p>
          <a
            href="https://pulsedesk.support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-lg"
          >
            Get Started at pulsedesk.support
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
