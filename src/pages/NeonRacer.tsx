import { ArrowRight, Gamepad2, Zap, Trophy, Timer, Gauge, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import neonracerHero from "@/assets/neonracer-hero.png";
import neonracerTitle from "@/assets/neonracer-title.png";
import neonracerLogo from "@/assets/neonracer-logo.png";

const features = [
  { icon: Gamepad2, title: "Evasive Gameplay", description: "Dodge, weave, and outrun obstacles in a fast-paced neon-drenched environment built for reflexes." },
  { icon: Zap, title: "Instant Action", description: "No loading screens. No tutorials. Jump straight into the action and start racing immediately." },
  { icon: Trophy, title: "Leaderboards", description: "Compete globally and climb the ranks. Every run counts toward your all-time best score." },
  { icon: Timer, title: "Endless Mode", description: "How long can you survive? The longer you last, the faster and harder it gets." },
  { icon: Gauge, title: "Speed Mechanics", description: "Dynamic speed scaling that rewards skilled players with faster, more intense gameplay." },
  { icon: Smartphone, title: "Play Anywhere", description: "Browser-based and mobile-friendly. Play on any device, anytime, anywhere." },
];

const NeonRacer = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with background image */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <img src={neonracerHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <img src={neonracerLogo} alt="Neon Racer" className="w-36 h-36 lg:w-48 lg:h-48 object-contain drop-shadow-[0_0_30px_rgba(180,0,255,0.5)]" />
            </div>
            <div>
              <img src={neonracerTitle} alt="Neon Racer" className="h-16 md:h-20 lg:h-24 object-contain mb-6" />
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                A retro-futuristic evasive racing game. Dodge obstacles, push your reflexes, and survive the neon grid as long as you can.
              </p>
              <a href="https://neonracer.net" target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg">
                  Play Now
                  <ArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Game Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple to pick up, impossible to put down. Neon Racer is pure arcade adrenaline.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="glass rounded-xl p-12 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Ready to Race?</h2>
            <p className="text-muted-foreground text-lg mb-6">Jump into the neon grid and test your reflexes.</p>
            <a href="https://neonracer.net" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg">
                Play Neon Racer <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NeonRacer;
