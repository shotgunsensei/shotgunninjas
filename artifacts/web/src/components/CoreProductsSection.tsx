import {
  Ticket,
  Workflow,
  Users,
  ShieldCheck,
  BarChart3,
  ExternalLink,
  ArrowRight,
  FileText,
  CreditCard,
  ClipboardCheck,
  Wrench,
  ServerCog,
  Network,
  MonitorCheck,
  Activity,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { trackOutbound } from "@/lib/trackOutbound";
import techdeckLogo from "@/assets/techdeck-logo.png";
import techdeckHero from "@/assets/techdeck-hero.png";
import tradeflowLogo from "@/assets/tradeflow-logo.png";
import tradeflowHero from "@/assets/tradeflow-hero.png";
import pulsedeskLogo from "@assets/pulsedesklogo_1775761546445.webp";
import pulsedeskHero from "@assets/Modern_healthcare_tech_in_action_1775761546446.webp";

const OPERATOROS_URL = "https://operatoros.net";

type CoreProduct = {
  id: string;
  name: string;
  logo: string;
  hero: string;
  heroAlt: string;
  kicker: string;
  headline: React.ReactNode;
  description: string;
  highlights: { icon: React.ElementType; title: string; desc: string }[];
};

const products: CoreProduct[] = [
  {
    id: "tradeflowkit",
    name: "TradeFlowKit",
    logo: tradeflowLogo,
    hero: tradeflowHero,
    heroAlt: "TradeFlowKit dashboard — service business operations in one lane",
    kicker: "Own the Job.",
    headline: (
      <>
        Service work, <span className="text-gradient">one lane.</span>
      </>
    ),
    description:
      "TradeFlowKit keeps quotes, jobs, invoices, and payments in a single lane — so service businesses run the whole engagement without juggling tools.",
    highlights: [
      { icon: FileText, title: "Quotes to Jobs", desc: "Turn approved quotes into scheduled jobs without re-entering a thing." },
      { icon: ClipboardCheck, title: "Job Tracking", desc: "Every job's status, crew, and history visible at a glance." },
      { icon: CreditCard, title: "Invoices & Payments", desc: "Bill from the job record and get paid in the same flow." },
      { icon: Users, title: "Crew Coordination", desc: "Assign work, share updates, and keep the field in sync with the office." },
      { icon: BarChart3, title: "Pipeline Visibility", desc: "See what's quoted, booked, in progress, and paid — in real time." },
    ],
  },
  {
    id: "techdeck",
    name: "TechDeck",
    logo: techdeckLogo,
    hero: techdeckHero,
    heroAlt: "TechDeck interface — dense MSP command surface",
    kicker: "Own the Stack.",
    headline: (
      <>
        MSP ops, <span className="text-gradient">on one deck.</span>
      </>
    ),
    description:
      "TechDeck is a dense command surface for MSP teams and field technicians — clients, endpoints, tickets, and runbooks within reach of a single screen.",
    highlights: [
      { icon: ServerCog, title: "Client Command", desc: "Every client environment, documented and one click away." },
      { icon: MonitorCheck, title: "Endpoint Visibility", desc: "Know what's healthy, what's flagged, and what needs hands." },
      { icon: Wrench, title: "Field-Ready Runbooks", desc: "Procedures and fixes technicians can execute on site." },
      { icon: Network, title: "Stack Mapping", desc: "Networks, credentials, and dependencies mapped per client." },
      { icon: ShieldCheck, title: "Access Discipline", desc: "Role-aware access keeps sensitive client data on a need-to-know basis." },
    ],
  },
  {
    id: "pulsedesk",
    name: "PulseDesk",
    logo: pulsedeskLogo,
    hero: pulsedeskHero,
    heroAlt: "PulseDesk dashboard — support operations command center",
    kicker: "Own the Queue.",
    headline: (
      <>
        Support ops, <span className="text-gradient">under control.</span>
      </>
    ),
    description:
      "PulseDesk centralizes support requests, automates workflows, and gives healthcare operations teams full visibility into service delivery — so nothing slips and escalations never get lost.",
    highlights: [
      { icon: Ticket, title: "Ticket Command Center", desc: "Intake, triage, and resolve support requests from one organized dashboard." },
      { icon: Workflow, title: "Workflow Engine", desc: "Route tickets, trigger escalations, and automate status updates automatically." },
      { icon: Stethoscope, title: "Clinical Coordination", desc: "Keep clinical and support workflows moving without losing escalations." },
      { icon: ShieldCheck, title: "Team Accountability", desc: "Assign ownership, track workload, and ensure nothing falls through the cracks." },
      { icon: Activity, title: "Operational Insights", desc: "Dashboards that show ticket volume, resolution speed, and team performance." },
    ],
  },
];

export default function CoreProductsSection() {
  return (
    <section className="py-24 bg-card border-t border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-5">
            <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-primary/90 uppercase">
              Core Products · OperatorOS Ecosystem
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-display)] leading-[1.08]">
            Three flagships. <span className="text-gradient">One command center.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            TradeFlowKit, TechDeck, and PulseDesk are the fully unlocked core of
            the OperatorOS ecosystem — one login, one bill, every module a launch
            away.
          </p>
        </div>

        <div className="space-y-24">
          {products.map((p, i) => (
            <div
              key={p.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-background/60 mb-5">
                  <img src={p.logo} alt="" className="h-5 w-auto rounded object-contain" />
                  <span className="text-xs font-semibold tracking-wide">{p.name}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 font-[var(--font-display)] leading-[1.1]">
                  {p.headline}
                </h3>

                <p className="text-xs font-[var(--font-display)] tracking-widest text-primary/80 mb-5 uppercase">
                  {p.kicker}
                </p>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                  {p.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={OPERATOROS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutbound(OPERATOROS_URL, `core-products:${p.id}`)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                  >
                    Launch via OperatorOS
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    to="/operatoros"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                  {p.highlights.map((h) => (
                    <div
                      key={h.title}
                      className="bg-background border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                          <h.icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <h4 className="text-sm font-bold font-[var(--font-display)]">{h.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="absolute inset-[-16px] bg-gradient-to-br from-primary/8 via-transparent to-primary/4 rounded-3xl blur-xl" />
                <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/10">
                  <img src={p.hero} alt={p.heroAlt} className="w-full h-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
