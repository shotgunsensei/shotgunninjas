import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Swords, Map, Brain, Trophy, Skull, Flame } from "lucide-react";

const features = [
  { icon: Map, title: "Procedural Mazes", desc: "Every run generates a unique labyrinth. No two games are ever the same." },
  { icon: Brain, title: "Adaptive AI", desc: "The maze learns your patterns and evolves to counter your strategies." },
  { icon: Swords, title: "Combat & Evasion", desc: "Fight or flee. Every encounter demands split-second tactical decisions." },
  { icon: Skull, title: "Permadeath Runs", desc: "One life. No saves. Pure survival intensity from start to finish." },
  { icon: Trophy, title: "Global Leaderboards", desc: "Compete against players worldwide. Prove you can outlast the labyrinth." },
  { icon: Flame, title: "Unlockable Ronin", desc: "Master different ronin classes, each with unique abilities and playstyles." },
];

const LabyrinthRonin = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(2_100%_44%/0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 arsenal-scanlines opacity-[0.03]" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase animate-fade-in">
            Survival Game
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Dominate the </span>
            <span className="text-gradient">Labyrinth.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Endless survival inside a living maze. Adapt, outmaneuver, and dominate the labyrinth.
          </p>
          <a href="https://labyrinthronin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg">
              Enter the Labyrinth
              <ArrowRight className="ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">Gameplay</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Survive the Unknown
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 p-2.5 mb-6 group-hover:shadow-glow-sm transition-all">
                  <f.icon className="w-full h-full text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(2_100%_44%/0.06)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            The maze is waiting.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Step in. Survive. Or don't.
          </p>
          <a href="https://labyrinthronin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg">
              Play Now <ArrowRight className="ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LabyrinthRonin;
