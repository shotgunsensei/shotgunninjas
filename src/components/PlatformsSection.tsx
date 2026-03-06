import { ArrowRight, Cloud, Server, Wrench, Car, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const platforms = [
  {
    icon: Cloud,
    title: "OperatorOS",
    tagline: "Own the Build.",
    description: "AI-native cloud development control plane for builders who ship.",
    link: "/operatoros",
    accent: "from-primary to-primary/60",
  },
  {
    icon: Server,
    title: "Tech Deck",
    tagline: "Own the Stack.",
    description: "MSP enablement platform to reduce tool sprawl and restore margin.",
    link: "/techdeck",
    accent: "from-primary to-primary/60",
  },
  {
    icon: Wrench,
    title: "TradeFlow Kit",
    tagline: "Own the Workflow.",
    description: "Workflow automation for blue-collar businesses that eliminate chaos.",
    link: "/tradeflow",
    accent: "from-primary to-primary/60",
  },
  {
    icon: Car,
    title: "Torque Shed",
    tagline: "Own the Machine.",
    description: "Performance-driven automotive systems, diagnostics, and community.",
    link: "/torqueshed",
    accent: "from-primary to-primary/60",
  },
  {
    icon: Gamepad2,
    title: "Neon Racer",
    tagline: "Own the Grid.",
    description: "Retro-futuristic evasive racing game. Dodge, survive, and dominate the leaderboard.",
    link: "/neonracer",
    accent: "from-primary to-primary/60",
  },
];

const PlatformsSection = () => {
  return (
    <section id="platforms" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-glow opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">
            The Ecosystem
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Our Platforms
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four systems. One operator philosophy. Each built to give you control—not dependence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <Link
              key={platform.title}
              to={platform.link}
              className="group glass rounded-xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 block"
            >
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${platform.accent} p-3.5 mb-6 group-hover:shadow-glow-sm transition-all duration-300`}>
                <platform.icon className="w-full h-full text-primary-foreground" />
              </div>

              <p className="text-primary font-display text-xs tracking-[0.2em] uppercase mb-2">
                {platform.tagline}
              </p>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {platform.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {platform.description}
              </p>

              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:gap-3 gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
