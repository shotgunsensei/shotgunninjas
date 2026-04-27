import { ArrowRight, ExternalLink, Crosshair, Swords, Star, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import poolHallLogo from "@assets/ChatGPT_Image_Apr_27,_2026,_12_55_57_PM_1777309034433.png";
import poolHallHero from "@assets/ChatGPT_Image_Apr_27,_2026,_12_56_54_PM_1777309034433.png";
import poolHallBanner from "@assets/ChatGPT_Image_Apr_27,_2026,_12_56_38_PM_1777309034433.png";

const SNPOOLHALL_URL = "https://snpoolhall.com";

const features = [
  {
    icon: Crosshair,
    title: "Precise 2D Gameplay",
    description: "Smooth controls and realistic physics make every shot count. Perfect your aim, master english, and dominate the table.",
  },
  {
    icon: Swords,
    title: "Multiple Game Modes",
    description: "8-Ball, 9-Ball, Straight Pool, and more. Solo practice or tournament battles — pick your style and play.",
  },
  {
    icon: Star,
    title: "Customize Your Ninja",
    description: "Unlock cues, tables, and gear. Build your ninja, show off your style, and stand out at the hall.",
  },
  {
    icon: Trophy,
    title: "Climb the Ranks",
    description: "Compete, win, and rise through the dojo. Only legends reach the top of the leaderboard.",
  },
  {
    icon: Zap,
    title: "Fast. Fun. Addictive.",
    description: "Jump in for a quick match or stay for the grind. The hall is always open — and always ready.",
  },
];

export default function SnpoolHall() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[180px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-primary/10 text-primary border border-primary/30 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                NEW · SHOTGUN NINJAS ARSENAL
              </span>
              <p className="text-xs font-[var(--font-display)] tracking-[0.3em] text-primary mb-3 uppercase">
                Action. Precision. Honor. Pool.
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 font-[var(--font-display)] leading-tight">
                Shotgun Ninjas{" "}
                <span className="text-primary">Pool Hall</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-7 leading-relaxed max-w-xl">
                A fast-paced 2D pool game that brings skill, strategy, and style together. Play solo, challenge friends, and climb the ranks to become a legend.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={SNPOOLHALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                >
                  Play Now
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 border border-border bg-card/40 text-foreground font-semibold rounded-xl hover:bg-card hover:border-primary/40 transition-all"
                >
                  Inside the Hall
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-[10px] font-mono tracking-widest text-primary/70 uppercase">
                snpoolhall.com
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-xl opacity-70" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20">
                <img
                  src={poolHallHero}
                  alt="Shotgun Ninjas Pool Hall — cinematic ninja billiards artwork"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-[var(--font-display)] tracking-[0.3em] text-primary mb-3 uppercase">
              Pure Skill · Total Focus
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)]">
              Everything You Need to Run the Table
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/40 transition-colors group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Banner */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-border">
            <img
              src={poolHallBanner}
              alt="Shotgun Ninjas Pool Hall feature overview"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 bg-card relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[180px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src={poolHallLogo}
            alt="Shotgun Ninjas Pool Hall logo"
            className="w-32 sm:w-40 h-auto mx-auto mb-6"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 font-[var(--font-display)] leading-tight">
            Grab your cue.{" "}
            <span className="text-primary">Become legend.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
            The hall is always open. Sharpen your skills, challenge the dojo, and rise through the ranks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={SNPOOLHALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-base sm:text-lg"
            >
              Enter the Pool Hall
              <ExternalLink className="h-5 w-5" />
            </a>
            <Link
              to="/#platforms"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 border border-border text-foreground font-semibold rounded-xl hover:bg-card hover:border-primary/40 transition-all text-base sm:text-lg"
            >
              Browse the Arsenal
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <p className="mt-5 text-[10px] font-mono tracking-widest text-primary/70 uppercase">
            snpoolhall.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
