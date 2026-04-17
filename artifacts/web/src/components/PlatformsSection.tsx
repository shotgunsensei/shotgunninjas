import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import operatorOsImg from "@assets/OperatorOShero_1774285672020.png";
import techDeckImg from "@assets/techdeckfeature_1774285697731.png";
import tradeFlowImg from "@assets/tradeflowfeature_1774285697732.png";
import torqueShedImg from "@assets/torqueshedfeature1024500_1774285672020.png";
import neonRacerImg from "@assets/neonracerhero_1774285672019.png";
import ninjamationImg from "@assets/ninjamationfeatured_1774292377935.png";
import labyrinthRoninImg from "@assets/labyrinthroninfeatured_1774292377934.png";
import playpackPilotImg from "@assets/ChatGPT_Image_Mar_27,_2026,_04_06_32_PM_1774642220480.png";
import brandforgeOsImg from "@assets/ChatGPT_Image_Apr_2,_2026,_02_21_38_AM_1775110912705.png";
import snapproofOsImg from "@assets/snapproof-hero_1775232639391.png";
import pulsedeskImg from "@assets/Modern_healthcare_tech_in_action_1775761546446.png";

type AppStatus = "ACTIVE" | "BETA" | "EXPERIMENTAL" | "NEW" | "FLAGSHIP";

interface AppEntry {
  title: string;
  tagline: string;
  description: string;
  link: string;
  status: AppStatus;
  image?: string;
}

const flagship: AppEntry = {
  title: "Faultline Lab",
  tagline: "Investigate the Break. Find the Truth.",
  description: "A cinematic troubleshooting simulator for technical minds. Investigate layered failures, gather evidence, and diagnose the real fault across infrastructure, networking, systems, automotive, and electronics.",
  link: "/faultline-lab",
  status: "FLAGSHIP",
};

const featured: AppEntry[] = [
  {
    title: "TradeFlow Kit",
    tagline: "Own the Workflow.",
    description: "Workflow automation for blue-collar businesses that eliminate chaos.",
    link: "/tradeflow",
    status: "ACTIVE",
    image: tradeFlowImg,
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
    title: "PulseDesk",
    tagline: "Own the Queue.",
    description: "Centralize support requests, automate workflows, and keep service delivery on track — from one command center.",
    link: "/pulsedesk",
    status: "NEW",
    image: pulsedeskImg,
  },
  {
    title: "SnapProof OS",
    tagline: "Own the Proof.",
    description: "Turn job-site photos, voice notes, and findings into polished, client-ready reports and proof-of-work documentation.",
    link: "/snapproof-os",
    status: "ACTIVE",
    image: snapproofOsImg,
  },
  {
    title: "Ninjamation",
    tagline: "Own the Automation.",
    description: "Automate like a ninja. Build, deploy, and control intelligent workflows.",
    link: "/ninjamation",
    status: "BETA",
    image: ninjamationImg,
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
    title: "OperatorOS",
    tagline: "Own the Build.",
    description: "AI-native cloud development control plane for builders who ship.",
    link: "/operatoros",
    status: "ACTIVE",
    image: operatorOsImg,
  },
  {
    title: "PlayPack Pilot",
    tagline: "Own the Package.",
    description: "Analyze your website or upload your repo, then generate a Play Store packaging kit in minutes.",
    link: "/playpackpilot",
    status: "NEW",
    image: playpackPilotImg,
  },
  {
    title: "BrandForge OS",
    tagline: "Own the Campaign.",
    description: "Plan, create, launch, and optimize marketing campaigns from one AI-guided workspace — brand to results.",
    link: "/brandforgeos",
    status: "NEW",
    image: brandforgeOsImg,
  },
  {
    title: "Neon Racer",
    tagline: "Own the Grid.",
    description: "Retro-futuristic evasive racing game. Dodge, survive, dominate.",
    link: "/neonracer",
    status: "ACTIVE",
    image: neonRacerImg,
  },
  {
    title: "Labyrinth Ronin",
    tagline: "Own the Maze.",
    description: "Endless survival inside a living maze. Adapt and dominate.",
    link: "/labyrinthronin",
    status: "EXPERIMENTAL",
    image: labyrinthRoninImg,
  },
];

const statusStyles: Record<AppStatus, string> = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  BETA: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  EXPERIMENTAL: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  NEW: "bg-sky-500/20 text-sky-400 border border-sky-500/30",
  FLAGSHIP: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40",
};

const statusDot: Record<AppStatus, string> = {
  ACTIVE: "bg-emerald-400",
  BETA: "bg-amber-400",
  EXPERIMENTAL: "bg-purple-400",
  NEW: "bg-sky-400",
  FLAGSHIP: "bg-cyan-400",
};

export default function PlatformsSection() {
  const activeCount = featured.filter((p) => p.status === "ACTIVE").length;
  const newCount = featured.filter((p) => p.status === "NEW").length;
  const betaCount = featured.filter((p) => p.status === "BETA").length;
  const experimentalCount = featured.filter((p) => p.status === "EXPERIMENTAL").length;

  return (
    <section id="platforms" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            Arsenal // Active Systems
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Operator Ecosystem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            A family of purpose-built digital tools under one umbrella — each one designed to give you control, not dependence.
          </p>
        </div>

        <div className="flex justify-center gap-4 text-xs font-mono text-muted-foreground mb-12">
          <span className="bg-card border border-border rounded px-3 py-1">
            SYS::STATUS
          </span>
          <span className="text-emerald-400">{activeCount} ONLINE</span>
          <span className="text-sky-400">{newCount} NEW</span>
          <span className="text-amber-400">{betaCount} BETA</span>
          <span className="text-purple-400">{experimentalCount} EXPERIMENTAL</span>
          <span className="text-cyan-300">1 FLAGSHIP</span>
          <span>MODULES: {featured.length + 1}</span>
        </div>

        <Link
          to={flagship.link}
          className="group block mb-10 rounded-2xl overflow-hidden relative"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/40 via-cyan-400/30 to-orange-500/40 opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-[#070b12] rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-[55%] relative overflow-hidden min-h-[280px] lg:min-h-[360px]">
                <div className="absolute inset-0 opacity-[0.09]" style={{
                  backgroundImage: "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }} />
                <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[340px] h-[340px] bg-orange-500/12 rounded-full blur-[120px] translate-y-1/3" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                <div className="relative h-full flex items-center justify-center p-8 lg:p-10">
                  <div className="w-full max-w-sm rounded-xl border border-cyan-500/25 bg-[#0a1118]/90 overflow-hidden shadow-2xl shadow-cyan-500/10">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-cyan-500/15 bg-[#0d1620]">
                      <span className="w-2 h-2 rounded-full bg-orange-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-cyan-500/70" />
                      <span className="ml-1.5 text-[9px] font-mono tracking-widest text-cyan-300/70 uppercase truncate">
                        case-2718.investigate
                      </span>
                    </div>
                    <div className="p-4 space-y-3 font-mono text-[11px]">
                      <div>
                        <div className="text-[9px] tracking-widest text-cyan-400/60 uppercase mb-1">Incident</div>
                        <div className="text-foreground font-bold text-xs">Edge router packet loss</div>
                        <div className="text-cyan-200/60 text-[10px] mt-0.5">SEV: <span className="text-orange-400">HIGH</span> · Networking</div>
                      </div>
                      <div className="h-px bg-cyan-500/15" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-cyan-100/85"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />syslog: link.flap</div>
                        <div className="flex items-center gap-2 text-cyan-100/85"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />telemetry: cpu.spike</div>
                        <div className="flex items-center gap-2 text-muted-foreground/50 line-through"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />snmp: optic.ok</div>
                        <div className="flex items-center gap-2 text-cyan-100/85"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />trace: bgp.hold</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-[45%] p-7 sm:p-9 lg:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    FLAGSHIP
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase">
                    New Release
                  </span>
                </div>
                <p className="text-xs text-cyan-300 font-medium mb-2 font-[var(--font-display)] tracking-wider">
                  {flagship.tagline}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold mb-3 font-[var(--font-display)] leading-tight">
                  Faultline Lab
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
                  {flagship.description}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-sm w-fit group-hover:from-cyan-400 group-hover:to-cyan-500 transition-all shadow-lg shadow-cyan-500/20">
                  Enter the Lab
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>

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
                  {platform.image ? (
                    <img
                      src={platform.image}
                      alt={platform.title}
                      className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-64 relative bg-[#05080d] overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.08]" style={{
                        backgroundImage: "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }} />
                      <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] -translate-y-1/2" />
                      <div className="absolute bottom-0 right-1/4 w-[260px] h-[260px] bg-orange-500/12 rounded-full blur-[100px] translate-y-1/3" />
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[9px] font-mono tracking-widest text-cyan-300/80 uppercase">faultline://active</span>
                          </div>
                          <div className="font-[var(--font-display)] text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-orange-400 bg-clip-text text-transparent tracking-tight">
                            FAULTLINE LAB
                          </div>
                          <div className="mt-2 text-[10px] font-mono tracking-widest text-cyan-300/50 uppercase">
                            Diagnostic Simulator
                          </div>
                        </div>
                      </div>
                    </div>
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

      </div>
    </section>
  );
}
