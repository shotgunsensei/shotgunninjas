import { ArrowRight, Car, Wrench, Cpu, Users, Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import torqueShedLogo from "@/assets/torqueshed-logo.png";

const sections = [
  { icon: BookOpen, title: "Performance Build Guides", description: "Step-by-step guides for engine builds, forced induction, suspension, and drivetrain upgrades. Written by builders, not bloggers." },
  { icon: Cpu, title: "Wiring & Diagnostic Tools", description: "Schematics, connector pinouts, and diagnostic flowcharts for common platforms. The reference library your shop needs." },
  { icon: Wrench, title: "Tuning Walkthroughs", description: "Learn the fundamentals of fuel, timing, boost control, and datalog analysis. No gatekeeping—just knowledge." },
  { icon: Users, title: "Community (Coming Soon)", description: "A focused forum for builders, tuners, and fabricators. Real conversations. No vanity metrics." },
  { icon: Download, title: "Digital Downloads", description: "Templates, checklists, wiring diagrams, and reference sheets you can use in your garage or shop." },
];

const TorqueShed = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <img src={torqueShedLogo} alt="Torque Shed" className="w-40 h-40 lg:w-56 lg:h-56 object-contain" />
            </div>
            <div>
              <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">Torque Shed</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Own the Machine.
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                Performance-driven automotive systems platform focused on diagnostics, tuning education, and mechanical mastery.
              </p>
              <a href="https://torqueshed.pro" target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg">
                  Explore Builds <ArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {sections.map((s) => (
              <div key={s.title} className="glass rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Torque, tools, and truth.</h2>
          <p className="text-muted-foreground text-lg mb-8">Welcome to the garage.</p>
          <a href="https://torqueshed.pro" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg">
              Enter Torque Shed <ArrowRight className="ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TorqueShed;
