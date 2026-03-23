import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import operatorOsImg from "@assets/OperatorOShero_1774285672020.png";
import techDeckImg from "@assets/techdeckfeature_1774285697731.png";
import tradeFlowImg from "@assets/tradeflowfeature_1774285697732.png";
import torqueShedImg from "@assets/torqueshedfeature1024500_1774285672020.png";
import neonRacerImg from "@assets/neonracerhero_1774285672019.png";

type AppStatus = "ACTIVE" | "BETA" | "EXPERIMENTAL";

interface AppEntry {
  title: string;
  tagline: string;
  description: string;
  link: string;
  status: AppStatus;
  image?: string;
}

const featured: AppEntry[] = [
  {
    title: "OperatorOS",
    tagline: "Own the Build.",
    description: "AI-native cloud development control plane for builders who ship.",
    link: "/operatoros",
    status: "ACTIVE",
    image: operatorOsImg,
  },
  {
    title: "Tech Deck",
    tagline: "Own the Stack.",
    description: "MSP enablement platform to reduce tool sprawl and restore margin.",
    link: "/techdeck",
    status: "ACTIVE",
    image: techDeckImg,
  },
  {
    title: "TradeFlow Kit",
    tagline: "Own the Workflow.",
    description: "Workflow automation for blue-collar businesses that eliminate chaos.",
    link: "/tradeflow",
    status: "ACTIVE",
    image: tradeFlowImg,
  },
  {
    title: "Torque Shed",
    tagline: "Own the Machine.",
    description: "Performance-driven automotive systems, diagnostics, and community.",
    link: "/torqueshed",
    status: "ACTIVE",
    image: torqueShedImg,
  },
  {
    title: "Neon Racer",
    tagline: "Own the Grid.",
    description: "Retro-futuristic evasive racing game. Dodge, survive, dominate.",
    link: "/neonracer",
    status: "ACTIVE",
    image: neonRacerImg,
  },
];

const additional: AppEntry[] = [
  {
    title: "Ninjamation",
    tagline: "Own the Automation.",
    description: "Automate like a ninja. Build, deploy, and control intelligent workflows.",
    link: "/ninjamation",
    status: "BETA",
  },
  {
    title: "Labyrinth Ronin",
    tagline: "Own the Maze.",
    description: "Endless survival inside a living maze. Adapt and dominate.",
    link: "/labyrinthronin",
    status: "EXPERIMENTAL",
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
  const allPlatforms = [...featured, ...additional];
  const activeCount = allPlatforms.filter((p) => p.status === "ACTIVE").length;
  const betaCount = allPlatforms.filter((p) => p.status === "BETA").length;
  const experimentalCount = allPlatforms.filter((p) => p.status === "EXPERIMENTAL").length;

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
          <span>MODULES: {allPlatforms.length}</span>
        </div>

        <div className="space-y-6 mb-8">
          {featured.map((platform, idx) => (
            <Link
              key={platform.title}
              to={platform.link}
              className={`group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 ${
                idx % 2 === 0 ? "" : ""
              }`}
            >
              <div className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="md:w-1/2 relative overflow-hidden">
                  {platform.image && (
                    <img
                      src={platform.image}
                      alt={platform.title}
                      className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card/40" />
                </div>

                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${statusStyles[platform.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[platform.status]}`} />
                      {platform.status}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-1 font-[var(--font-display)] tracking-wider">
                    {platform.tagline}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 font-[var(--font-display)]">
                    {platform.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {platform.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                    Launch
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {additional.length > 0 && (
          <div>
            <p className="text-xs font-[var(--font-display)] tracking-widest text-muted-foreground mb-4 text-center">
              More Systems
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {additional.map((platform) => (
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
        )}
      </div>
    </section>
  );
}
