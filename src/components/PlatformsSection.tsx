import { ArrowRight, Cloud, Server, Wrench, Car, Gamepad2, Zap, Swords, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type AppStatus = "ACTIVE" | "BETA" | "EXPERIMENTAL" | "COMING ONLINE";

interface AppEntry {
  icon: typeof Cloud;
  title: string;
  tagline: string;
  description: string;
  link: string;
  external?: boolean;
  status: AppStatus;
}

const platforms: AppEntry[] = [
  {
    icon: Cloud,
    title: "OperatorOS",
    tagline: "Own the Build.",
    description: "AI-native cloud development control plane for builders who ship.",
    link: "/operatoros",
    status: "ACTIVE",
  },
  {
    icon: Server,
    title: "Tech Deck",
    tagline: "Own the Stack.",
    description: "MSP enablement platform to reduce tool sprawl and restore margin.",
    link: "/techdeck",
    status: "ACTIVE",
  },
  {
    icon: Wrench,
    title: "TradeFlow Kit",
    tagline: "Own the Workflow.",
    description: "Workflow automation for blue-collar businesses that eliminate chaos.",
    link: "/tradeflow",
    status: "ACTIVE",
  },
  {
    icon: Car,
    title: "Torque Shed",
    tagline: "Own the Machine.",
    description: "Performance-driven automotive systems, diagnostics, and community.",
    link: "/torqueshed",
    status: "ACTIVE",
  },
  {
    icon: Zap,
    title: "Ninjamation",
    tagline: "Own the Automation.",
    description: "Automate like a ninja. Build, deploy, and control intelligent workflows with precision and speed.",
    link: "/ninjamation",
    status: "BETA",
  },
  {
    icon: Swords,
    title: "Labyrinth Ronin",
    tagline: "Own the Maze.",
    description: "Endless survival inside a living maze. Adapt, outmaneuver, and dominate the labyrinth.",
    link: "/labyrinthronin",
    status: "EXPERIMENTAL",
  },
  {
    icon: Gamepad2,
    title: "Neon Racer",
    tagline: "Own the Grid.",
    description: "Retro-futuristic evasive racing game. Dodge, survive, and dominate the leaderboard.",
    link: "/neonracer",
    status: "ACTIVE",
  },
];

const statusStyles: Record<AppStatus, string> = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  BETA: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  EXPERIMENTAL: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "COMING ONLINE": "bg-muted text-muted-foreground border-border",
};

const statusDot: Record<AppStatus, string> = {
  ACTIVE: "bg-emerald-400 shadow-[0_0_6px_theme(colors.emerald.400)]",
  BETA: "bg-amber-400 shadow-[0_0_6px_theme(colors.amber.400)]",
  EXPERIMENTAL: "bg-purple-400 shadow-[0_0_6px_theme(colors.purple.400)]",
  "COMING ONLINE": "bg-muted-foreground",
};

const PlatformsSection = () => {
  return (
    <section id="platforms" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-glow opacity-20" />
      <div className="absolute inset-0 arsenal-scanlines opacity-[0.02]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Arsenal Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/60" />
            <p className="text-primary font-display text-xs tracking-[0.4em] uppercase">
              Arsenal // Active Systems
            </p>
            <div className="h-px w-8 bg-primary/60" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground">
            The Operator Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every system in the arsenal. Built to give you control—not dependence.
          </p>
        </div>

        {/* Telemetry bar */}
        <div className="glass rounded-lg px-6 py-3 mb-10 flex items-center justify-between text-xs font-display tracking-wider overflow-x-auto gap-6">
          <span className="text-muted-foreground whitespace-nowrap">SYS::STATUS</span>
          <span className="text-emerald-400 flex items-center gap-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {platforms.filter(p => p.status === "ACTIVE").length} ONLINE
          </span>
          <span className="text-amber-400 whitespace-nowrap">
            {platforms.filter(p => p.status === "BETA").length} BETA
          </span>
          <span className="text-purple-400 whitespace-nowrap">
            {platforms.filter(p => p.status === "EXPERIMENTAL").length} EXPERIMENTAL
          </span>
          <span className="text-muted-foreground whitespace-nowrap">
            MODULES: {platforms.length}
          </span>
        </div>

        {/* Arsenal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <Link
              key={platform.title}
              to={platform.link}
              className="group glass rounded-xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-sm block relative overflow-hidden"
            >
              {/* Neon border pulse on hover */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(2_100%_44%/0.04)_0%,transparent_70%)]" />

              <div className="relative z-10">
                {/* Header row: icon + status */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 p-3.5 group-hover:shadow-glow-sm group-hover:bg-primary/15 transition-all duration-300">
                    <platform.icon className="w-full h-full text-primary" />
                  </div>
                  <Badge className={`text-[10px] font-display tracking-wider border ${statusStyles[platform.status]} flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[platform.status]}`} />
                    {platform.status}
                  </Badge>
                </div>

                <p className="text-primary font-display text-xs tracking-[0.2em] uppercase mb-2">
                  {platform.tagline}
                </p>

                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {platform.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {platform.description}
                </p>

                <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:gap-3 gap-2 transition-all">
                  Launch <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
