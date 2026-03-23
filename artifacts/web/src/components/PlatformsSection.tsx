import { ArrowRight, Cloud, Server, Wrench, Car, Gamepad2, Zap, Swords, Music } from "lucide-react";
import { Link } from "react-router-dom";

type AppStatus = "ACTIVE" | "BETA" | "EXPERIMENTAL";

interface AppEntry {
  icon: typeof Cloud;
  title: string;
  tagline: string;
  description: string;
  link: string;
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
    description: "Automate like a ninja. Build, deploy, and control intelligent workflows.",
    link: "/ninjamation",
    status: "BETA",
  },
  {
    icon: Swords,
    title: "Labyrinth Ronin",
    tagline: "Own the Maze.",
    description: "Endless survival inside a living maze. Adapt and dominate.",
    link: "/labyrinthronin",
    status: "EXPERIMENTAL",
  },
  {
    icon: Gamepad2,
    title: "Neon Racer",
    tagline: "Own the Grid.",
    description: "Retro-futuristic evasive racing game. Dodge, survive, dominate.",
    link: "/neonracer",
    status: "ACTIVE",
  },
  {
    icon: Music,
    title: "Sound Studio",
    tagline: "Own the Sound.",
    description: "Original music productions. Listen, download, and vibe.",
    link: "/soundstudio",
    status: "ACTIVE",
  },
];

const statusStyles: Record<AppStatus, string> = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  BETA: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  EXPERIMENTAL: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

const statusDot: Record<AppStatus, string> = {
  ACTIVE: "bg-emerald-400",
  BETA: "bg-amber-400",
  EXPERIMENTAL: "bg-purple-400",
};

export default function PlatformsSection() {
  const activeCount = platforms.filter((p) => p.status === "ACTIVE").length;
  const betaCount = platforms.filter((p) => p.status === "BETA").length;
  const experimentalCount = platforms.filter((p) => p.status === "EXPERIMENTAL").length;

  return (
    <section id="platforms" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            Arsenal // Active Systems
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Operator Ecosystem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Every system in the arsenal. Built to give you control—not dependence.
          </p>
        </div>

        <div className="flex justify-center gap-4 text-xs font-mono text-muted-foreground mb-12">
          <span className="bg-card border border-border rounded px-3 py-1">
            SYS::STATUS
          </span>
          <span className="text-emerald-400">{activeCount} ONLINE</span>
          <span className="text-amber-400">{betaCount} BETA</span>
          <span className="text-purple-400">{experimentalCount} EXPERIMENTAL</span>
          <span>MODULES: {platforms.length}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <Link
              key={platform.title}
              to={platform.link}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${statusStyles[platform.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[platform.status]}`} />
                  {platform.status}
                </span>
              </div>

              <p className="text-xs text-primary font-medium mb-1">{platform.tagline}</p>
              <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{platform.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{platform.description}</p>

              <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                Launch
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
