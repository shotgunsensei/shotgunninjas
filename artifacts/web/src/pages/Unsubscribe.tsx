import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

type Status = "idle" | "loading" | "success" | "error";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);

  useSEO({
    title: "Unsubscribe",
    description: "Manage your Shotgun Ninjas Productions newsletter subscription.",
  });

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("This unsubscribe link is missing its token. Please use the link from your email.");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
    fetch(`${base}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok) {
          setStatus("success");
          setMessage(data.message ?? "You have been unsubscribed.");
          setEmail(data.email ?? null);
        } else {
          setStatus("error");
          setMessage(data.message ?? "Could not unsubscribe. The link may be invalid or expired.");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
        setMessage("Network error. Please try again in a moment.");
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-4">
            NEWSLETTER
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 font-[var(--font-display)]">
            {status === "success" ? "Unsubscribed" : status === "error" ? "Something went wrong" : "Processing…"}
          </h1>
          <p className="text-muted-foreground mb-2">{message}</p>
          {email && (
            <p className="text-xs text-muted-foreground/70 font-mono mb-8">{email}</p>
          )}
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
