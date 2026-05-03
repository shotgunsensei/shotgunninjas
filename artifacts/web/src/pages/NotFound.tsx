import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const quickLinks = [
  { name: "Sound Studio", href: "/soundstudio" },
  { name: "Faultline Lab", href: "/faultline-lab" },
  { name: "PulseDesk", href: "/pulsedesk" },
  { name: "Pool Hall", href: "/snpoolhall" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center pt-32 pb-20">
        <p className="text-[10px] font-[var(--font-display)] tracking-[0.4em] text-primary/70 uppercase mb-4">
          Off the grid
        </p>
        <h1 className="text-7xl sm:text-8xl font-bold text-primary mb-4 font-[var(--font-display)] drop-shadow-[0_0_40px_rgba(220,38,38,0.3)]">
          404
        </h1>
        <p className="text-xl sm:text-2xl text-foreground font-[var(--font-display)] mb-3">
          This page slipped into the shadows.
        </p>
        <p className="text-base text-muted-foreground max-w-md mb-10">
          The link you followed doesn't exist — but the rest of the arsenal is
          still here, fully armed.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all mb-12"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="w-full max-w-2xl">
          <p className="text-[10px] font-[var(--font-display)] tracking-[0.3em] text-muted-foreground/60 uppercase mb-4">
            Or jump straight to
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                {l.name}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
