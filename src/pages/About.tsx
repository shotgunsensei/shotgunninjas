import { Wrench, Brain, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Wrench,
    title: "Builder Mindset",
    description: "We don't just talk about ideas—we build them. Every project is an opportunity to create something that works, not something that looks good in a pitch deck.",
  },
  {
    icon: Brain,
    title: "Cross-Disciplinary Skills",
    description: "Audio, video, code, automation—we connect the dots between creative and technical. The best solutions often come from unexpected combinations.",
  },
  {
    icon: Target,
    title: "Results Over Marketing",
    description: "We'd rather show you what we've built than tell you what we could build. No buzzwords, no fluff, no promises we can't deliver.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
              Who We Are
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">About</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Shotgun Ninjas is a boutique studio that blends creative production 
              with technical engineering. We build things that work.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
                The Short Version
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Shotgun Ninjas exists because most agencies are either all creative 
                  or all technical—and clients end up needing both. We bridge that gap.
                </p>
                <p>
                  We've spent years in audio production, video editing, software development, 
                  and business automation. Instead of specializing in one thing, we got good 
                  at connecting them.
                </p>
                <p>
                  The result? A studio that can take a project from concept to completion 
                  without handing it off to five different vendors. Sound, visuals, systems—all 
                  built with the same attention to detail.
                </p>
                <p className="text-foreground font-medium">
                  We're not the cheapest option. We're the option for people who want it done right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              How We Work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="glass rounded-xl p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
              What We Don't Do
            </h2>
            <div className="glass rounded-2xl p-8">
              <ul className="text-muted-foreground space-y-3 text-left max-w-xl mx-auto">
                <li className="flex items-start gap-3">
                  <span className="text-primary">×</span>
                  <span>We don't oversell or overpromise</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">×</span>
                  <span>We don't outsource core work to anonymous contractors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">×</span>
                  <span>We don't pad timelines or inflate budgets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">×</span>
                  <span>We don't disappear after delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">×</span>
                  <span>We don't chase trends over fundamentals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Let's build something.
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              If you've got a project that needs creative + technical horsepower, 
              we should talk.
            </p>
            <a href="/#contact">
              <Button variant="hero" size="lg">
                Get in Touch
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
