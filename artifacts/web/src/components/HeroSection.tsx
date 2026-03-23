import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import snpLogo from "@/assets/SNPlogo.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent to-primary" />

        <div className="mt-24 mb-8">
          <img
            src={snpLogo}
            alt="Shotgun Ninjas Productions"
            className="w-20 h-20 mx-auto mb-6 drop-shadow-lg"
          />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Control the System.{" "}
          <span className="text-gradient">Own the Stack.</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Systems, automation, and software built for real operators.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#platforms"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explore the Stack
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors"
          >
            Book a Strategy Call
          </Link>
        </div>

        <div className="mt-16 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}
