import { useEffect } from "react";
import {
  Palette,
  Target,
  PenTool,
  Image,
  Layout,
  BarChart3,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Layers,
  Sparkles,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const capabilities = [
  { icon: Palette, title: "Brand Setup & Messaging", description: "Define your brand identity, voice, positioning, and core messaging framework with guided AI workflows." },
  { icon: Target, title: "Campaign Planning", description: "Map out campaign strategies, audience segments, channel plans, and content calendars from a single workspace." },
  { icon: PenTool, title: "Copy & Content Generation", description: "Generate ad copy, social posts, email sequences, blog drafts, and marketing assets with AI assistance." },
  { icon: Image, title: "Creative Asset Production", description: "Produce branded visuals, ad creatives, social graphics, and marketing collateral without a design team." },
  { icon: Layout, title: "Landing Page Workflows", description: "Build conversion-focused landing pages with guided templates, copy suggestions, and optimization guidance." },
  { icon: BarChart3, title: "Analytics & Optimization", description: "Track campaign performance, identify what works, and get actionable recommendations to improve results." },
];

const audiences = [
  { title: "Founders", description: "Launch your brand and first campaigns without hiring a marketing team or learning ten different tools." },
  { title: "Small Businesses", description: "Run professional marketing operations on a lean budget with AI-guided strategy and content production." },
  { title: "Agencies", description: "Standardize client onboarding, campaign workflows, and creative production across your entire portfolio." },
  { title: "Multi-Brand Operators", description: "Manage messaging, campaigns, and creative assets across multiple brands from one unified system." },
];

const ecosystemProducts = [
  { name: "OperatorOS", tagline: "Cloud development control plane", link: "/operatoros" },
  { name: "Tech Deck", tagline: "MSP enablement platform", link: "/techdeck" },
  { name: "TradeFlow Kit", tagline: "Workflow automation for field service", link: "/tradeflow" },
  { name: "Torque Shed", tagline: "Automotive systems & community", link: "/torqueshed" },
  { name: "BrandForge OS", tagline: "Marketing operating system", link: "/brandforgeos", active: true },
  { name: "PlayPack Pilot", tagline: "PWA-to-Play Store packaging", link: "/playpackpilot" },
];

export default function BrandForgeOS() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "BrandForge OS | Marketing Operating System by Shotgun Ninjas";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    if (meta) {
      meta.setAttribute("content", "BrandForge OS is the AI-powered marketing operating system from Shotgun Ninjas, built to help businesses plan, create, launch, and improve campaigns in one guided workspace.");
    }
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-[160px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-primary/90 uppercase">
              Shotgun Ninjas Product
            </span>
          </div>

          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            Own the Campaign.
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-[var(--font-display)]">
            BrandForge OS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            The marketing operating system for businesses that want to plan, create, launch, and improve campaigns from one guided workspace.
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            BrandForge OS helps founders, agencies, and growing businesses move from scattered tools and guesswork to a structured marketing system — with AI-assisted strategy, content, creative production, landing pages, and campaign workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://bf-os.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              Visit BrandForge OS
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="#what-it-does"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
            >
              See How It Works
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="what-it-does" className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              One system. Full marketing stack.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Six integrated modules that cover the entire journey from brand definition to campaign optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <cap.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Built For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Who uses BrandForge OS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {audiences.map((aud) => (
              <div
                key={aud.title}
                className="flex gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{aud.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{aud.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Megaphone className="h-8 w-8 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
            Why it matters
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Most businesses piece together marketing from a dozen disconnected tools — one for copy, one for design, one for analytics, one for landing pages. BrandForge OS reduces that fragmentation by bringing planning, creative production, and execution into one guided system. Less context-switching. More output. Better results.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Part of the Shotgun Ninjas stack
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              BrandForge OS sits alongside the rest of the Shotgun Ninjas product family — systems built for operators who value control, execution, and results.
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
                  <Layers className={`h-5 w-5 ${prod.active ? "text-primary" : "text-primary/60"}`} />
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
            Ready to build smarter marketing systems?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Stop assembling your marketing stack from scattered tools. Start operating from one guided system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://bf-os.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              Launch BrandForge OS
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://bf-os.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
            >
              Go to bf-os.com
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
