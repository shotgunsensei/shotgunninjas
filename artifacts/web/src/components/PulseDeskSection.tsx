import {
  Ticket,
  Workflow,
  Users,
  ShieldCheck,
  BarChart3,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import pulsedeskLogo from "@assets/pulsedesklogo_1775761546445.png";
import pulsedeskHero from "@assets/Modern_healthcare_tech_in_action_1775761546446.png";

const highlights = [
  { icon: Ticket, title: "Ticket Command Center", desc: "Intake, triage, and resolve support requests from one organized dashboard." },
  { icon: Workflow, title: "Workflow Engine", desc: "Route tickets, trigger escalations, and automate status updates automatically." },
  { icon: Users, title: "Client Portal", desc: "Give clients a branded window into their requests with real-time status." },
  { icon: ShieldCheck, title: "Team Accountability", desc: "Assign ownership, track workload, and ensure nothing falls through the cracks." },
  { icon: BarChart3, title: "Operational Insights", desc: "Dashboards that show ticket volume, resolution speed, and team performance." },
];

export default function PulseDeskSection() {
  return (
    <section className="py-24 bg-card border-t border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-5">
            <img src={pulsedeskLogo} alt="" className="h-5 w-auto rounded object-contain" />
            <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-primary/90 uppercase">
              New in the Arsenal
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[var(--font-display)] leading-[1.08]">
              Support ops,{" "}
              <span className="text-gradient">under control.</span>
            </h2>

            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary/80 mb-5 uppercase">
              Own the Queue.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              PulseDesk centralizes support requests, automates workflows, and gives your team full visibility into service delivery — so nothing slips and clients stay informed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://pulsedesk.support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                Open PulseDesk
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                to="/pulsedesk"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-[-16px] bg-gradient-to-br from-cyan-500/8 via-transparent to-primary/4 rounded-3xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-cyan-500/10">
              <img
                src={pulsedeskHero}
                alt="PulseDesk dashboard — support operations command center"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-background border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                <h.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold mb-1.5 font-[var(--font-display)]">{h.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
