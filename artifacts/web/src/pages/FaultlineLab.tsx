import { useEffect } from "react";
import {
  Activity,
  Wrench,
  FileSearch,
  Target,
  Calendar,
  Package,
  Smartphone,
  ArrowRight,
  Cpu,
  Network,
  Car,
  CircuitBoard,
  Server,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: AlertTriangle, title: "Handcrafted Incident Cases", description: "Real-feeling failure scenarios authored by operators — layered, ambiguous, full of red herrings." },
  { icon: Wrench, title: "Investigation Tools", description: "Run diagnostics, pull logs, query telemetry, and follow leads with in-sim technical instruments." },
  { icon: FileSearch, title: "Evidence Locker", description: "Collect, tag, and cross-reference findings as you build a case file toward the root cause." },
  { icon: Target, title: "Diagnosis & Scoring", description: "Submit your verdict. Get scored on accuracy, reasoning chain, and how cleanly you isolated the fault." },
  { icon: Calendar, title: "Daily Challenge", description: "A new incident every day. Fresh systems, fresh failure modes, replayable practice for sharp minds." },
  { icon: Package, title: "Premium Packs", description: "Expand into specialized domains: networking deep-dives, automotive electrical, embedded systems." },
  { icon: Smartphone, title: "Mobile-Ready", description: "Investigate from anywhere. The diagnostic console scales cleanly from desktop to phone." },
  { icon: Cpu, title: "Built to Grow", description: "New incidents, domains, and tools drop continuously without breaking the investigation flow." },
];

const domains = [
  { icon: Server, label: "Infrastructure" },
  { icon: Network, label: "Networking" },
  { icon: Cpu, label: "Systems" },
  { icon: Car, label: "Automotive" },
  { icon: CircuitBoard, label: "Electronics" },
];

const differentiators = [
  { title: "Tool-like, not toy-like", description: "Field equipment, not a quiz app. Every interaction respects your time and intelligence." },
  { title: "Real troubleshooting logic", description: "Faults follow plausible chains. Symptoms have causes. Evidence supports or eliminates a hypothesis." },
  { title: "Layered clues, real red herrings", description: "Not every signal matters. Discipline, pattern recognition, and elimination win cases — not button-mashing." },
  { title: "Built for technical minds", description: "Engineers, sysadmins, mechanics, technicians, hobbyists. If you've chased a fault, this is your arena." },
];

const ecosystemProducts = [
  { name: "OperatorOS", tagline: "Cloud development control plane", link: "/operatoros" },
  { name: "Tech Deck", tagline: "MSP enablement platform", link: "/techdeck" },
  { name: "TradeFlow Kit", tagline: "Workflow automation for trades", link: "/tradeflow" },
  { name: "PulseDesk", tagline: "Support operations command", link: "/pulsedesk" },
  { name: "SnapProof OS", tagline: "Field documentation & proof-of-work", link: "/snapproof-os" },
  { name: "Torque Shed", tagline: "Automotive systems & diagnostics", link: "/torqueshed" },
];

export default function FaultlineLab() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Faultline Lab — Cinematic Troubleshooting Simulator | Shotgun Ninjas";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    if (meta) {
      meta.setAttribute("content", "Faultline Lab is a cinematic troubleshooting simulator from Shotgun Ninjas Productions, built for technical minds who want to investigate real failures through evidence, tools, and disciplined analysis.");
    }
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#05080d]" />
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[180px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[180px] translate-y-1/3" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <Link
                to="/#platforms"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-5 sm:mb-6 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-[var(--font-display)] tracking-[0.2em] text-cyan-300/90 uppercase">
                  Flagship · Shotgun Ninjas Arsenal
                </span>
              </Link>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 font-[var(--font-display)] leading-[1.05]">
                <span className="text-foreground">Investigate the break.</span>{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                  Find the truth.
                </span>
              </h1>

              <p className="text-[10px] sm:text-xs font-[var(--font-display)] tracking-[0.25em] text-cyan-300/80 mb-4 sm:mb-5 uppercase">
                Faultline Lab · Diagnostic Simulator
              </p>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-7 sm:mb-8 leading-relaxed max-w-xl">
                A cinematic troubleshooting simulator for technical minds. Diagnose failures across infrastructure, networking, systems, automotive, and electronics through real investigation flow, evidence gathering, and disciplined analysis.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  Join Early Access
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 border border-orange-500/40 bg-orange-500/5 text-orange-200 font-semibold rounded-xl hover:bg-orange-500/10 hover:border-orange-400/60 transition-all"
                >
                  See Inside the Lab
                  <Activity className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-7 sm:mt-10 flex flex-wrap gap-2">
                {domains.map((d) => (
                  <div
                    key={d.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0a1118] border border-cyan-500/15 text-[11px] sm:text-xs font-mono text-cyan-200/80"
                  >
                    <d.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-400/80" />
                    {d.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute inset-[-20px] bg-gradient-to-br from-cyan-500/20 via-transparent to-orange-500/15 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#070b12] shadow-2xl shadow-cyan-500/10">
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-cyan-500/15 bg-[#0a1118]">
                    <div className="flex gap-1.5 flex-shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/70" />
                    </div>
                    <span className="ml-1.5 sm:ml-2 text-[10px] font-mono tracking-widest text-cyan-300/70 uppercase truncate">
                      faultline://case-2718
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-4 font-mono text-xs">
                    <div>
                      <div className="text-[10px] tracking-widest text-cyan-400/60 uppercase mb-1.5">Incident</div>
                      <div className="text-sm text-foreground font-bold">Edge router intermittent packet loss</div>
                      <div className="text-cyan-200/60 text-[11px] mt-0.5">Severity: <span className="text-orange-400">HIGH</span> · Domain: Networking</div>
                    </div>

                    <div className="h-px bg-cyan-500/15" />

                    <div>
                      <div className="text-[10px] tracking-widest text-cyan-400/60 uppercase mb-2">Evidence Locker</div>
                      <div className="space-y-1.5">
                        {[
                          { label: "syslog: link flap @02:14:07", state: "tagged" },
                          { label: "telemetry: CPU 78% spike", state: "tagged" },
                          { label: "snmp: optic temp nominal", state: "ruled-out" },
                          { label: "trace: BGP holdtimer expiry", state: "active" },
                        ].map((ev) => (
                          <div key={ev.label} className="flex items-center gap-2 text-[11px]">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              ev.state === "active" ? "bg-cyan-400 animate-pulse" :
                              ev.state === "tagged" ? "bg-orange-400" : "bg-muted-foreground/40"
                            }`} />
                            <span className={`${
                              ev.state === "ruled-out" ? "text-muted-foreground/50 line-through" : "text-cyan-100/85"
                            }`}>
                              {ev.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-cyan-500/15" />

                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] tracking-widest text-cyan-400/60 uppercase">Hypothesis</div>
                        <div className="text-cyan-100 text-[11px] mt-0.5 truncate">BGP session instability</div>
                      </div>
                      <button className="px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 uppercase flex-shrink-0">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 sm:py-20 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <p className="text-[10px] sm:text-xs font-[var(--font-display)] tracking-[0.25em] text-cyan-400 mb-3 uppercase">
              Inside the Lab · 01
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[var(--font-display)] leading-tight">
              Eight modules.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text text-transparent">
                One investigation.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Not a quiz app. A simulator with teeth. Every component built so you can chase the fault, not the interface.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="bg-background border border-border rounded-xl p-5 sm:p-6 hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/60 transition-colors" />
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/15 group-hover:border-cyan-400/40 transition-colors">
                  <feat.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-base font-bold mb-2 font-[var(--font-display)]">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <p className="text-[10px] sm:text-xs font-[var(--font-display)] tracking-[0.25em] text-orange-400 mb-3 uppercase">
              Why It Stands Out · 02
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[var(--font-display)] leading-tight">
              Built for people who{" "}
              <span className="bg-gradient-to-r from-orange-400 to-cyan-300 bg-clip-text text-transparent">
                actually fix things.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {differentiators.map((item, idx) => (
              <div
                key={item.title}
                className="relative bg-card border border-border rounded-xl p-6 hover:border-orange-500/30 transition-colors"
              >
                <div className="text-[10px] font-mono tracking-widest text-orange-400/60 mb-3 uppercase">
                  {String(idx + 1).padStart(2, "0")} //
                </div>
                <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARSENAL CROSS-LINK */}
      <section className="py-16 sm:py-20 bg-card border-t border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <p className="text-[10px] sm:text-xs font-[var(--font-display)] tracking-[0.25em] text-cyan-400 mb-3 uppercase">
              The Arsenal · 03
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[var(--font-display)] leading-tight">
              One weapon.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text text-transparent">
                Full arsenal.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Faultline Lab joins a family of operator-grade tools under the Shotgun Ninjas umbrella.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ecosystemProducts.map((prod) => (
              <Link
                key={prod.name}
                to={prod.link}
                className="flex items-center gap-4 rounded-xl p-4 sm:p-5 border bg-background border-border hover:border-cyan-500/40 hover:bg-card/80 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-lg bg-cyan-500/8 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/15 group-hover:border-cyan-400/40 transition-colors">
                  <Layers className="h-5 w-5 text-cyan-400/80" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold font-[var(--font-display)] text-sm text-foreground truncate">
                    {prod.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{prod.tagline}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/#platforms"
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium font-[var(--font-display)] tracking-wider uppercase"
            >
              Browse the full arsenal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-orange-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[180px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-cyan-300/90 uppercase">
              Early Access · Open
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 font-[var(--font-display)] leading-tight">
            Stop guessing.{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text text-transparent">
              Start investigating.
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
            Faultline Lab is built for technical minds who'd rather chase evidence than click answers. Get on the early access list.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 text-base sm:text-lg"
            >
              Join Early Access
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/#platforms"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 border border-border text-foreground font-semibold rounded-xl hover:bg-card hover:border-cyan-500/30 transition-all text-base sm:text-lg"
            >
              Browse the Arsenal
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
