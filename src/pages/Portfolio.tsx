import { Headphones, Video, Cog, ArrowRight, ExternalLink } from "lucide-react";
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

      {/* Platform We Build */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
              Platform We Build
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
              TorqueShed
            </h2>
            <p className="text-muted-foreground mb-6">
              A community platform we designed and built for automotive enthusiasts—
              focused on real knowledge sharing without the noise.
            </p>
            <a href="https://torqueshed.pro" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                Visit TorqueShed
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
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
