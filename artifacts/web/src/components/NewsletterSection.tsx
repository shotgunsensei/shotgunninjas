import { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/lib/api";

interface NewsletterSectionProps {
  source?: string;
}

export default function NewsletterSection({
  source = "home",
}: NewsletterSectionProps) {
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
      const res = await subscribeNewsletter({ email: trimmed, source });
      toast.success(res.message);
      setDone(true);
      setEmail("");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not subscribe right now. Try again shortly.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.12)_0%,transparent_55%)]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-[var(--font-display)] tracking-[0.3em] text-primary/90 uppercase">
                Direct From The Dojo
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[var(--font-display)] leading-tight">
              Get launches, drops, and{" "}
              <span className="text-primary">ninja-grade tools</span>
              <br className="hidden sm:block" />
              before anyone else.
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              One email. Zero spam. New product launches, beta invites, and
              behind-the-scenes builds straight from Shotgun Ninjas Productions.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              aria-label="Subscribe to the Shotgun Ninjas newsletter"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting || done}
                className="flex-1 px-5 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-60 transition-all"
              />
              <button
                type="submit"
                disabled={submitting || done}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining
                  </>
                ) : done ? (
                  <>You're in</>
                ) : (
                  <>
                    Join the List
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-muted-foreground/60 mt-5">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
