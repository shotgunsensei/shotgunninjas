import { useEffect } from "react";
import {
  Camera,
  Mic,
  ClipboardCheck,
  Sparkles,
  FileText,
  Share2,
  ArrowRight,
  Shield,
  Search,
  FolderOpen,
  Wand2,
  Eye,
  Send,
  Zap,
  Clock,
  BadgeCheck,
  Receipt,
  UserMinus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import snapproofHero from "@assets/snapproof-hero_1775232639391.png";
import snapproofLogo from "@assets/snapproof_1775232639389.png";

const features = [
  { icon: Camera, title: "Photo Capture", description: "Snap job-site photos directly into structured reports — tagged, timestamped, and organized automatically." },
  { icon: Mic, title: "Voice Notes", description: "Record voice memos in the field and let AI transcribe findings into clean, client-ready documentation." },
  { icon: ClipboardCheck, title: "Findings Tracker", description: "Log issues, observations, and recommendations as you work — everything stays linked to the job." },
  { icon: Sparkles, title: "AI Report Generation", description: "Turn raw captures into polished summaries, proof-of-work reports, and branded deliverables in seconds." },
  { icon: FileText, title: "Branded PDF Exports", description: "Generate professional, white-labeled PDF reports your clients can trust — your logo, your layout." },
  { icon: Share2, title: "Instant Delivery", description: "Share completed reports via link, email, or download — clients get proof before you leave the site." },
];

const audiences = [
  { title: "MSPs", description: "Document site visits, rack installs, and network audits with structured proof your clients expect." },
  { title: "IT Field Technicians", description: "Capture findings on-site, generate reports on the move, and close tickets faster." },
  { title: "Contractors", description: "Build a professional paper trail for every job — inspections, repairs, installs, punch lists." },
  { title: "Mechanics & Auto Shops", description: "Photo-document diagnostics, part conditions, and completed repairs for customer transparency." },
  { title: "Service Teams", description: "Standardize how your crew captures, reports, and delivers proof of work across every job." },
];

const workflow = [
  { icon: Search, step: "01", label: "Capture", description: "Photos, voice notes, and findings logged on-site in real time." },
  { icon: FolderOpen, step: "02", label: "Organize", description: "Everything auto-tagged and linked to the job — no manual sorting." },
  { icon: Wand2, step: "03", label: "Generate", description: "AI builds a polished report from your raw captures in seconds." },
  { icon: Eye, step: "04", label: "Review", description: "Preview the report, tweak if needed, and approve for delivery." },
  { icon: Send, step: "05", label: "Deliver", description: "Share branded PDF or link with the client — done before you leave." },
];

const whyItMatters = [
  { icon: Zap, title: "Faster client communication", description: "Deliver proof and reports while the job is still fresh — not days later." },
  { icon: BadgeCheck, title: "Stronger proof of work", description: "Photo-backed, AI-summarized documentation that stands up to scrutiny." },
  { icon: Shield, title: "More professional handoff", description: "Branded, structured reports that make your operation look enterprise-grade." },
  { icon: Receipt, title: "Better billing justification", description: "Clear documentation that supports every line item on the invoice." },
  { icon: UserMinus, title: "Less admin drag", description: "Stop spending evenings writing reports. Let the system do the paperwork." },
];

const ecosystemProducts = [
  { name: "OperatorOS", tagline: "Cloud development control plane", link: "/operatoros" },
  { name: "Tech Deck", tagline: "MSP enablement platform", link: "/techdeck" },
  { name: "TradeFlow Kit", tagline: "Field service automation", link: "/tradeflow" },
  { name: "Torque Shed", tagline: "Automotive systems & community", link: "/torqueshed" },
  { name: "BrandForge OS", tagline: "Marketing operating system", link: "/brandforgeos" },
  { name: "SnapProof OS", tagline: "Field documentation & proof-of-work", link: "/snapproof-os", active: true },
];

export default function SnapProofOS() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "SnapProof OS — Field Documentation & Proof-of-Work | Shotgun Ninjas";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    if (meta) {
      meta.setAttribute("content", "SnapProof OS turns job-site photos, voice notes, and findings into polished, client-ready reports and proof-of-work documentation — powered by AI.");
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
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/4 rounded-full blur-[200px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[160px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
                <img src={snapproofLogo} alt="" className="h-5 w-auto rounded object-contain" />
                <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-primary/90 uppercase">
                  New in the Arsenal
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-[var(--font-display)] leading-[1.05]">
                Turn field chaos into{" "}
                <span className="text-gradient">client-ready proof.</span>
              </h1>

              <p className="text-xs font-[var(--font-display)] tracking-widest text-primary/80 mb-5 uppercase">
                Capture it once. Prove it. Bill faster.
              </p>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                SnapProof OS helps field technicians, contractors, and service operators turn photos, notes, and findings into polished reports and proof-of-work documentation — in minutes, not hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                >
                  Explore SnapProof OS
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
                >
                  Request Early Access
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-[-20px] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/10">
                <img
                  src={snapproofHero}
                  alt="SnapProof OS — capture photos, voice notes, and findings to generate polished client-ready reports"
                  className="w-full h-auto"
                />
              </div>
            </div>
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
            <p className="text-muted-foreground max-w-xl mx-auto">
              Anyone who does the work but hates the paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audiences.map((aud) => (
              <div
                key={aud.title}
                className="bg-background border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                  <h3 className="text-sm font-bold font-[var(--font-display)]">{aud.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{aud.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Core Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six integrated tools that take you from job site to client inbox.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
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

      <section className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              From job site to client inbox in five steps.
            </h2>
          </div>

          <div className="space-y-4">
            {workflow.map((step, idx) => (
              <div
                key={step.label}
                className="flex items-start gap-5 bg-background border border-border rounded-xl p-5 sm:p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono text-primary/60 tracking-wider">{step.step}</span>
                    <h3 className="text-base font-bold font-[var(--font-display)]">{step.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {idx < workflow.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-primary/30 flex-shrink-0 mt-4 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Why It Matters
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Stop writing reports at midnight.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              SnapProof OS eliminates the gap between doing the work and proving you did it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyItMatters.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1 font-[var(--font-display)]">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Part of the Shotgun Ninjas stack
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Systems built for operators who value control, execution, and results.
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
                    : "bg-background border-border hover:border-primary/20 hover:bg-card/80"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  prod.active ? "bg-primary/15 overflow-hidden" : "bg-primary/8"
                }`}>
                  {prod.active ? (
                    <img src={snapproofLogo} alt="" className="h-6 w-auto object-contain" />
                  ) : (
                    <Shield className={`h-5 w-5 ${prod.active ? "text-primary" : "text-primary/60"}`} />
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

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={snapproofLogo} alt="" className="h-10 w-auto mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
            Your work speaks for itself. Now prove it.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            From photos to polished reports in minutes. SnapProof OS is field documentation, done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-lg"
            >
              Request Early Access
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
