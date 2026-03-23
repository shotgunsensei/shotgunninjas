import { Code, Wrench, Shield, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              About // Origin Story
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Built by Operators.{" "}
              <span className="text-gradient">For Operators.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Shotgun Ninjas Productions is a systems-first software studio.
              We build tools that give operators leverage—not dependence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 font-[var(--font-display)]">The Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most software exists to create dependence. We build the opposite—systems
                that make you more capable, not more dependent. Every product in our arsenal
                is designed to give you control over your stack, your data, and your workflow.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe the best technology disappears into the background, amplifying
                human capability without demanding constant attention.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 font-[var(--font-display)]">The Approach</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We start with real problems—not market trends. Every product begins as a
                solution to something we've experienced firsthand in operations, field service,
                development, or business management.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We ship fast, iterate relentlessly, and never build features that don't
                solve a real problem for a real operator.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12 font-[var(--font-display)]">
              Core Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Code, title: "Ship Real Code", text: "No mockups. No vapor. Everything we show, you can use." },
                { icon: Wrench, title: "Solve Real Problems", text: "Built from pain points, not pitch decks." },
                { icon: Shield, title: "Own Your Stack", text: "No vendor lock-in. Your data stays yours." },
                { icon: Rocket, title: "Move Fast", text: "Speed is a feature. We ship, learn, and iterate." },
              ].map((p) => (
                <div key={p.title} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <p.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 font-[var(--font-display)]">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
