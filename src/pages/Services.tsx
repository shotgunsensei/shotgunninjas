import { Headphones, Video, Cog, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const audioServices = [
  "Music production & arrangement",
  "Podcast editing & mastering",
  "Voiceover cleanup & enhancement",
  "Sound design (intros, outros, branding)",
  "Mixing & mastering",
  "Audio restoration",
];

const videoServices = [
  "Short-form content (reels, promos, ads)",
  "YouTube & course editing",
  "AI-enhanced video cleanup",
  "Technical explainer videos",
  "Motion graphics & titles",
  "Color correction & grading",
];

const automationServices = [
  "Business process automation",
  "Custom bots & scripts",
  "API integrations (Stripe, CRMs, ticketing)",
  "AI-assisted workflows",
  "Internal tools for MSPs & businesses",
  "Data pipeline automation",
];

const Services = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
              What We Do
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Services</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              We don't sell templates or subscriptions. We build working systems, 
              polished productions, and solutions that solve real problems.
            </p>
          </div>
        </div>
      </section>

      {/* Audio Production */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Audio Production
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Professional audio services from raw recording to release-ready masters. 
                Whether you need a podcast polished, a track mixed, or custom sound design, 
                we deliver studio-grade results with efficient turnaround.
              </p>
              <p className="text-foreground/80 font-medium mb-6">
                For artists, creators, podcasters, and brands who value quality over quantity.
              </p>
              <a href="#contact">
                <Button variant="hero">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-bold text-foreground mb-6">What's Included</h3>
              <ul className="space-y-4">
                {audioServices.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-border" />
      </div>

      {/* Video Production */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 glass rounded-2xl p-8">
              <h3 className="font-display font-bold text-foreground mb-6">What's Included</h3>
              <ul className="space-y-4">
                {videoServices.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Video Production
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                From concept to final export, we turn raw footage into compelling visual content. 
                Clean edits, technical clarity, and brand polish—without the bloat of a 
                full production agency.
              </p>
              <p className="text-foreground/80 font-medium mb-6">
                For YouTubers, educators, businesses, and product creators who need results.
              </p>
              <a href="#contact">
                <Button variant="hero">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-border" />
      </div>

      {/* Automation & Code */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Cog className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Automation & Code
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We design and build automation systems that save time, reduce errors, 
                and eliminate repetitive work. Custom scripts, API integrations, 
                AI-assisted workflows, and internal tools—built for your specific needs.
              </p>
              <p className="text-foreground/80 font-medium mb-6">
                We don't sell software. We build working systems.
              </p>
              <a href="#contact">
                <Button variant="hero">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-bold text-foreground mb-6">What's Included</h3>
              <ul className="space-y-4">
                {automationServices.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to work together?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              If you need cheap, this isn't it.<br />
              If you need it done right, let's talk.
            </p>
            <a href="#contact">
              <Button variant="hero" size="lg">
                Start a Conversation
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
