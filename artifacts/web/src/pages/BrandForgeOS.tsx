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
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import brandforgeHero from "@assets/ChatGPT_Image_Apr_2,_2026,_02_21_38_AM_1775110912705.png";
import brandforgeLogo from "@assets/ChatGPT_Image_Apr_2,_2026,_02_21_28_AM_1775110912706.png";

const capabilities = [
  { icon: Palette, title: "Brand Setup & Messaging", description: "Define identity, voice, positioning, and core messaging with guided AI workflows." },
  { icon: Target, title: "Campaign Planning", description: "Map strategies, audiences, channels, and content calendars from one workspace." },
  { icon: PenTool, title: "Copy & Content Generation", description: "Generate ad copy, social posts, emails, blog drafts, and marketing assets." },
  { icon: Image, title: "Creative Asset Production", description: "Produce branded visuals, ad creatives, and collateral — no design team needed." },
  { icon: Layout, title: "Landing Page Workflows", description: "Build conversion-focused pages with guided templates and optimization." },
  { icon: BarChart3, title: "Analytics & Optimization", description: "Track performance, find what works, and get actionable improvement recs." },
];

const audiences = [
  { title: "Founders", description: "Launch your brand and first campaigns without hiring a marketing team." },
  { title: "Small Businesses", description: "Run professional marketing on a lean budget with AI-guided strategy." },
  { title: "Agencies", description: "Standardize onboarding, campaign workflows, and creative production at scale." },
  { title: "Multi-Brand Operators", description: "Manage messaging and campaigns across multiple brands from one system." },
];

const ecosystemProducts = [
  { name: "OperatorOS", tagline: "Cloud development control plane", link: "/operatoros" },
  { name: "Tech Deck", tagline: "MSP enablement platform", link: "/techdeck" },
  { name: "TradeFlow Kit", tagline: "Field service automation", link: "/tradeflow" },
  { name: "Torque Shed", tagline: "Automotive systems & community", link: "/torqueshed" },
  { name: "BrandForge OS", tagline: "Marketing operating system", link: "/brandforgeos", active: true },
  { name: "PlayPack Pilot", tagline: "PWA-to-Play Store packaging", link: "/playpackpilot" },
];

export default function BrandForgeOS() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "BrandForge OS — Marketing Operating System | Shotgun Ninjas";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    if (meta) {
      meta.setAttribute("content", "BrandForge OS is the AI-powered marketing operating system from Shotgun Ninjas — plan, create, launch, and improve campaigns from one guided workspace.");
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
                <img src={brandforgeLogo} alt="" className="h-5 w-5 rounded object-contain" />
                <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-primary/90 uppercase">
                  New in the Arsenal
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-[var(--font-display)] leading-[1.05]">
                Your marketing.{" "}
                <span className="text-gradient">One system.</span>
              </h1>

              <p className="text-xs font-[var(--font-display)] tracking-widest text-primary/80 mb-5 uppercase">
                Own the Campaign.
              </p>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                BrandForge OS brings brand strategy, content, creative production, landing pages, and campaign workflows into one guided workspace — powered by AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://bf-os.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                >
                  Try BrandForge OS
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
                >
                  See What's Inside
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-[-20px] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/10">
                <img
                  src={brandforgeHero}
                  alt="BrandForge OS — Marketing operating system for strategy, content, and campaign workflows"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              What's Inside
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Six modules. One marketing stack.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Everything from brand definition to campaign optimization — integrated, not duct-taped.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <cap.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 font-[var(--font-display)]">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
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
                className="flex gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-primary" />
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
                  prod.active ? "bg-primary/15" : "bg-primary/8"
                }`}>
                  {prod.active ? (
                    <img src={brandforgeLogo} alt="" className="h-5 w-5 rounded object-contain" />
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

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={brandforgeLogo} alt="" className="h-10 w-auto mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
            Stop duct-taping your marketing.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            One workspace. Brand to campaign. Strategy to results.
          </p>
          <a
            href="https://bf-os.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-lg"
          >
            Get Started at bf-os.com
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
