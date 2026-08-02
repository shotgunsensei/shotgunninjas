import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import snpLogo from "@/assets/SNPlogo.png";
import { subscribeNewsletter } from "@/lib/api";

const productLinks = [
  { name: "OperatorOS", href: "/operatoros" },
  { name: "OperatorOS.net", href: "https://operatoros.net" },
  { name: "Explore the Modules", href: "https://operatoros.net/modules" },
  { name: "Controversy Archive", href: "/controversy-archive" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Sound Studio", href: "/soundstudio" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Unsubscribe", href: "/unsubscribe" },
];

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || done) return;
    const trimmed = email.trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await subscribeNewsletter({ email: trimmed, source: "footer" });
      toast.success(res.message);
      setDone(true);
      setEmail("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not subscribe.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={submitting || done}
        className="flex-1 px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-60 transition-all"
      />
      <button
        type="submit"
        disabled={submitting || done}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : done ? (
          "Subscribed"
        ) : (
          <>
            Subscribe
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}

function FooterLink({ name, href }: { name: string; href: string }) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {name}
      </a>
    );
  }
  return (
    <Link
      to={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {name}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-background border border-border rounded-xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-2">
              THE SHOTGUN NINJAS UNIVERSE
            </p>
            <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)] mb-2">
              Discover the Village
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Characters, backstory, episodes, and the lore behind the Shotgun Ninjas brand — all in one place.
            </p>
          </div>
          <a
            href="https://shotgunninjavillage.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 flex-shrink-0"
          >
            Enter the Village
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={snpLogo} alt="SNP" className="h-8 w-8" />
              <span className="font-[var(--font-display)] text-sm font-bold tracking-wider">
                SHOTGUN NINJAS
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Systems, automation, and software built for real operators.
            </p>
            <p className="text-[10px] font-[var(--font-display)] tracking-[0.2em] text-muted-foreground/70 uppercase mb-5">
              The Shotgun Ninjas Productions Ecosystem
            </p>
            <p className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-muted-foreground/60 uppercase mb-3">
              Stay in the loop
            </p>
            <FooterNewsletter />
          </div>

          <div>
            <h3 className="font-[var(--font-display)] text-xs font-semibold tracking-widest text-muted-foreground mb-4">
              OPERATOROS ECOSYSTEM
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink name={link.name} href={link.href} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[var(--font-display)] text-xs font-semibold tracking-widest text-muted-foreground mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink name={link.name} href={link.href} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Shotgun Ninjas Productions, LLC. All rights reserved.
          </p>
          <p className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-muted-foreground/50 uppercase">
            Est. 2024 · Built by Operators
          </p>
        </div>
      </div>
    </footer>
  );
}
