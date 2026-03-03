import { ArrowRight, Wrench, Brain, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Wrench, title: "Builder Mindset", description: "We don't pitch decks. We build systems. Every project ships something real." },
  { icon: Brain, title: "Systems Thinking", description: "We connect the dots between tools, workflows, and outcomes. The whole stack matters." },
  { icon: Target, title: "Operator Focus", description: "Built for people who run things—not people who talk about running things." },
  { icon: Layers, title: "Leverage Over Labor", description: "Automation, structure, and repeatable processes. Work smarter, not harder." },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">About</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              The Studio Behind the Stack
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Shotgun Ninjas Productions is a systems studio. We build platforms, automation, and software for operators who want control—not complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-xl p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">The Origin</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Shotgun Ninjas started from a simple observation: most businesses are buried under tools they don't control and processes they can't see.
                </p>
                <p>
                  Founded by an IT engineer with years in MSP operations, field service, and software development, SNP exists to build the systems that operators actually need—not the ones vendors want to sell them.
                </p>
                <p>
                  We think in systems. We build for leverage. And we believe the best technology disappears into the workflow—making things faster, cleaner, and more reliable without adding complexity.
                </p>
                <p className="text-foreground font-medium">
                  If you're an operator, a builder, or someone who just wants their stack to work—we built this for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">How We Think</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="glass rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Let's build something that matters.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            If you've got a system that needs building or a stack that needs fixing, we should talk.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Partner With Us <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
