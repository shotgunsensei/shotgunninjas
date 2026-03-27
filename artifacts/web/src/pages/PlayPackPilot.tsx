import {
  Globe,
  FolderUp,
  ShieldCheck,
  Link2,
  Terminal,
  GitBranch,
  Gauge,
  Package,
  ArrowRight,
  ExternalLink,
  Rocket,
  Search,
  FileCheck,
  Download,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import playpackHero from "@assets/ChatGPT_Image_Mar_27,_2026,_04_06_32_PM_1774642220480.png";
import playpackLogo from "@assets/playpack_pilot_1774642220483.png";

const features = [
  { icon: Globe, title: "Website Scan", description: "Analyze any live URL for PWA readiness, manifest quality, service worker status, and mobile compatibility." },
  { icon: FolderUp, title: "Repo Upload Analysis", description: "Upload your project repository and get instant feedback on deployment configuration and packaging requirements." },
  { icon: ShieldCheck, title: "PWA Validation", description: "Deep validation of your Progressive Web App against Play Store requirements including icons, manifest fields, and HTTPS." },
  { icon: Link2, title: "AssetLinks Generator", description: "Auto-generate Digital Asset Links files for verified app-to-domain association required by Google Play." },
  { icon: Terminal, title: "Bubblewrap Build Prep", description: "Generate ready-to-run Bubblewrap CLI commands and configuration for Trusted Web Activity packaging." },
  { icon: GitBranch, title: "GitHub Actions Generator", description: "Export pre-configured CI/CD workflow files for automated Android builds and deployment pipelines." },
  { icon: Gauge, title: "Deployment Readiness Score", description: "Get a clear score and checklist showing exactly how close your app is to Play Store packaging readiness." },
  { icon: Package, title: "Export Package Builder", description: "Bundle all generated configs, assets, docs, and workflows into a single downloadable deployment kit." },
];

const workflowSteps = [
  { icon: Search, label: "Analyze", description: "Scan your website or upload your repo for PWA readiness assessment." },
  { icon: FileCheck, label: "Review", description: "Review validation results, readiness score, and required fixes." },
  { icon: Terminal, label: "Generate", description: "Generate configs, asset links, build commands, and CI workflows." },
  { icon: Download, label: "Export", description: "Download your complete deployment kit with all generated files." },
  { icon: Rocket, label: "Deploy", description: "Use the kit to package and submit your app to Google Play." },
];

const useCases = [
  { title: "Indie Developers", description: "Skip the Android Studio learning curve. Go from PWA to Play Store listing with a structured packaging workflow." },
  { title: "SaaS Founders", description: "Give your web app a native presence on the Play Store without rebuilding in Kotlin or React Native." },
  { title: "Agencies", description: "Standardize PWA-to-Android delivery across client projects with repeatable packaging outputs." },
  { title: "Technical Builders", description: "Stop copy-pasting configs from scattered docs. Get a clean, validated deployment package every time." },
];

export default function PlayPackPilot() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
                <img src={playpackLogo} alt="" className="h-5 w-5 rounded" />
                <span className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-primary/90 uppercase">
                  New in the Arsenal
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-[var(--font-display)] leading-[1.05]">
                Turn your PWA into a{" "}
                <span className="text-gradient">Play Store-ready</span>{" "}
                app without the chaos
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Analyze your site or repo, generate deployment assets, and streamline Android packaging — all from your browser.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://playpackpilot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                >
                  Try PlayPack Pilot
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
                >
                  View Features
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-[-20px] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/10">
                <img
                  src={playpackHero}
                  alt="PlayPack Pilot — Package your PWA for the Play Store in minutes"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              What It Does
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Your PWA deployment assistant
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              PlayPack Pilot walks you through the entire process of preparing a Progressive Web App for Android packaging — from initial analysis to exportable deployment kit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <Globe className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">Website Analysis</h3>
              <p className="text-sm text-muted-foreground">Enter any URL and get instant feedback on PWA readiness, manifest quality, and Play Store compatibility.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <FolderUp className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">Repo Upload Analysis</h3>
              <p className="text-sm text-muted-foreground">Upload your project files directly for deep configuration analysis and packaging recommendations.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <FileCheck className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">Config Generation</h3>
              <p className="text-sm text-muted-foreground">Auto-generate manifest files, Digital Asset Links, Bubblewrap commands, and GitHub Actions workflows.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <Package className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">Exportable Deployment Kit</h3>
              <p className="text-sm text-muted-foreground">Bundle everything into a downloadable package — configs, docs, workflows, and validation results.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Feature Grid
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Everything you need to ship
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Eight core modules that cover the full PWA-to-Android packaging workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold mb-2 font-[var(--font-display)]">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Five steps to deployment-ready
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {workflowSteps.map((step, i) => (
                <div key={step.label} className="relative text-center group">
                  <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <step.icon className="h-7 w-7 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-[var(--font-display)] mb-1">{step.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
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
              Who uses PlayPack Pilot
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="flex gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm mb-4 italic">
            "You don't need ten browser tabs and scattered docs. You need a clean system."
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
            Stop assembling. Start shipping.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            PlayPack Pilot gives you a structured, repeatable workflow for turning PWAs into Play Store-ready packages. No guesswork. No scattered tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://playpackpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              Try PlayPack Pilot
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/50 transition-all"
            >
              Back to Arsenal
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="bg-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-[10px] text-muted-foreground/50 text-center">
            PlayPack Pilot assists with packaging, validation, and deployment preparation. It does not directly submit apps to Google Play.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
