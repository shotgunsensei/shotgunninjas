import { Headphones, Video, Cog, ArrowRight, ExternalLink, Shield, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const audioProjects = [
  {
    title: "Brand Audio Package",
    description: "Complete sonic identity including intro, outro, transition sounds, and background music for a tech podcast.",
    tags: ["Sound Design", "Music Production"],
  },
  {
    title: "Album Mixing & Mastering",
    description: "Full mixing and mastering for an 8-track indie rock album, delivering release-ready audio.",
    tags: ["Mixing", "Mastering"],
  },
  {
    title: "Podcast Post-Production",
    description: "Ongoing editing, noise removal, and enhancement for a weekly business podcast with 50+ episodes.",
    tags: ["Podcast Editing", "Audio Cleanup"],
  },
];

const videoProjects = [
  {
    title: "Product Launch Campaign",
    description: "Series of short-form promotional videos for a hardware product launch across social platforms.",
    tags: ["Short-form", "Promotional"],
  },
  {
    title: "Technical Course Series",
    description: "20+ hours of educational content with motion graphics, screen recordings, and professional editing.",
    tags: ["Course Editing", "Motion Graphics"],
  },
  {
    title: "YouTube Channel Rebrand",
    description: "Complete visual overhaul including new intro, lower thirds, thumbnails, and editing style guide.",
    tags: ["Branding", "YouTube"],
  },
];

const automationProjects = [
  {
    title: "MSP Ticketing Integration",
    description: "Custom integration connecting CRM, ticketing system, and billing platform with automated workflows.",
    outcome: "70% reduction in manual data entry",
    tags: ["API Integration", "Automation"],
  },
  {
    title: "Content Pipeline Automation",
    description: "End-to-end automation for content creators: from upload to transcription to social distribution.",
    outcome: "4 hours saved per video",
    tags: ["AI Workflow", "Automation"],
  },
  {
    title: "E-commerce Order System",
    description: "Custom order processing system with Stripe integration, inventory sync, and automated fulfillment triggers.",
    outcome: "Zero manual order processing",
    tags: ["Stripe", "Custom Tools"],
  },
];

const Portfolio = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
              Our Work
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Real projects, real outcomes. Here's a sample of what we've built 
              for clients across creative and technical domains.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-8 uppercase text-center">
            Featured Platforms
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shotgun Ninja Vault */}
            <div className="glass rounded-xl p-8 md:p-10 flex flex-col hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    Shotgun Ninja Vault
                  </h3>
                  <p className="text-primary text-sm font-medium">
                    Compliance, evidence, and operational truth — centralized.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                <p>
                  Shotgun Ninja Vault is a modular, security-focused vault platform built to collect, organize, and prove operational truth. It centralizes evidence, audit logs, compliance artifacts, system status, and API access into a single tenant-isolated system designed for real-world accountability.
                </p>
                <p>
                  The platform includes a cryptographically hashed evidence locker, compliance report generation, public status pages, webhook automation, client portals, and an API-only mode for headless integrations. Every action is auditable, exportable, and defensible by design.
                </p>
                <p>
                  Shotgun Ninja Vault reflects a systems-first approach to security and compliance — built to hold up under scrutiny, not just look good in screenshots.
                </p>
              </div>
              <a href="https://www.snpvault.pro" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  View Platform
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>

            {/* TorqueShed */}
            <div className="glass rounded-xl p-8 md:p-10 flex flex-col hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    TorqueShed
                  </h3>
                  <p className="text-primary text-sm font-medium">
                    Automotive diagnostics, data, and community — unified.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                <p>
                  TorqueShed is a platform built around modern automotive diagnostics, data analysis, and enthusiast collaboration. It focuses on turning raw vehicle data — logs, sensor readings, fault codes, and performance metrics — into meaningful insights for builders, tuners, and technicians.
                </p>
                <p>
                  Beyond diagnostics, TorqueShed blends community discussion, knowledge sharing, and project tracking into a single ecosystem. The goal is to bridge the gap between technical data and real-world wrenching, enabling smarter builds and faster problem-solving.
                </p>
                <p>
                  TorqueShed represents Shotgun Ninjas' ability to merge software, hardware, and domain expertise into practical, enthusiast-driven platforms.
                </p>
              </div>
              <a href="https://www.torqueshed.pro" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Audio Production</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audioProjects.map((project) => (
              <div key={project.title} className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <h3 className="font-display font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Projects */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Video Production</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoProjects.map((project) => (
              <div key={project.title} className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <h3 className="font-display font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cog className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Automation & Code</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {automationProjects.map((project) => (
              <div key={project.title} className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <h3 className="font-display font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.description}</p>
                {project.outcome && (
                  <p className="text-primary text-sm font-medium mb-4">→ {project.outcome}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss what you're building and see if we're the right fit.
            </p>
            <a href="/#contact">
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

export default Portfolio;
