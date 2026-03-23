import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Build Smarter.{" "}
          <span className="text-gradient">Operate Stronger.</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Stop duct-taping tools together. Start building systems that compound.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Book a Strategy Call
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#platforms"
            className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors"
          >
            Explore Platforms
          </a>
        </div>
      </div>
    </section>
  );
}
