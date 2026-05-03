import { ArrowRight, ExternalLink, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSEO } from "@/hooks/useSEO";
import { trackOutbound } from "@/lib/trackOutbound";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface RelatedProduct {
  name: string;
  tagline: string;
  link: string;
}

interface ProductPageLayoutProps {
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
  features: Feature[];
  ctaText?: string;
  ctaLink?: string;
  websiteUrl?: string;
  statusBadge?: string;
  relatedProducts?: RelatedProduct[];
}

function isExternal(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function ProductPageLayout({
  title,
  tagline,
  subtitle,
  description,
  features,
  ctaText = "Visit Website",
  ctaLink,
  websiteUrl,
  statusBadge,
  relatedProducts,
}: ProductPageLayoutProps) {
  const primaryLink = websiteUrl || ctaLink || "/contact";
  const external = isExternal(primaryLink);

  useSEO({
    title: title,
    description: subtitle,
  });

  const handleOutbound = () => {
    if (external) trackOutbound(primaryLink, `product-page:${title}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {statusBadge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-primary/10 text-primary border border-primary/30 mb-6">
              {statusBadge}
            </span>
          )}
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            {tagline}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">{subtitle}</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-10">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {external ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOutbound}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                {ctaText}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link
                to={primaryLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                {ctaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors"
            >
              Back to Arsenal
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16">Core Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-20 bg-background border-t border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
                Inside the Arsenal
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)]">
                Pairs well with
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Other operator-grade tools in the Shotgun Ninjas ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts.map((prod) => (
                <Link
                  key={prod.name}
                  to={prod.link}
                  className="flex items-center gap-4 rounded-xl p-5 border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Layers className="h-5 w-5 text-primary/70" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold font-[var(--font-display)] text-sm text-foreground truncate">
                      {prod.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{prod.tagline}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/#platforms"
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 font-medium font-[var(--font-display)] tracking-wider uppercase"
              >
                Browse the full arsenal
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Deploy?</h2>
          <p className="text-muted-foreground mb-8">
            Let's build something that gives you control, not dependence.
          </p>
          {external ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOutbound}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Visit {title}
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
