import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.webp";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[min(880px,100svh)] items-center overflow-hidden pb-20 pt-36 sm:pb-24 sm:pt-44">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <p className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Independent software & creative studio
        </p>

        <h1 className="mb-7 max-w-4xl text-[clamp(2.6rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
          Control the System.
          <br />
          <span className="text-gradient">Own the Stack.</span>
        </h1>

        <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Practical tools for service teams. A free studio for music makers.
          Original games and worlds for the moments in between.
        </p>

        <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
          <Link
            to="/operatoros"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Explore OperatorOS
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 bg-background/30 px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Contact the studio
          </Link>
        </div>

        <a
          href="#platforms"
          className="mt-12 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Discover the ecosystem{" "}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
