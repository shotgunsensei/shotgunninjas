import { Music, Video, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Music,
    title: "Music Production",
    description: "We produce music end-to-end — from raw ideas to finished, release-ready tracks. This includes composition, arrangement, recording guidance, editing, mixing, and mastering.",
    pricing: "Starting at $150/track | Packages: $400–$1,200+",
    features: ["Beat production & instrumentals", "Vocal recording cleanup", "Mixing & mastering", "Song structure refinement"],
    bestFor: "Artists, content creators, filmmakers, brands, and storytellers.",
  },
  {
    icon: Video,
    title: "Video Production",
    description: "We help turn ideas into compelling visual content — whether it's cinematic, promotional, instructional, or experimental. From concept to final export.",
    pricing: "Starting at $200 | Projects: $500–$3,000+",
    features: ["Video editing & post-production", "Motion graphics & titles", "Color correction & enhancement", "Audio cleanup & sound design"],
    bestFor: "YouTubers, musicians, businesses, educators, and product creators.",
  },
  {
    icon: Code,
    title: "Automation & Scripting",
    description: "We design and build automation scripts that save time, reduce errors, and eliminate repetitive work — for homes, labs, and businesses.",
    pricing: "Hourly: $120/hr | Projects: $300–$3,500+",
    features: ["Home automation scripts", "Network monitoring & alerts", "IT & MSP workflow scripts", "Custom dashboards & tooling"],
    bestFor: "Power users, small businesses, MSPs, homelabs, and tech-forward households.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Services built on experience — not theory.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Shotgun Ninjas offers hands-on creative production and automation services for individuals, creators, and businesses who want results — not excuses, templates, or outsourced mystery work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary p-3.5 shrink-0 group-hover:shadow-glow-sm transition-all duration-300 mb-6">
                <service.icon className="w-full h-full text-primary-foreground" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-primary font-semibold text-sm mb-4">
                {service.pricing}
              </p>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 mt-auto">
                <span className="font-semibold text-foreground">Best for:</span> {service.bestFor}
              </p>
              
              <a href="#contact">
                <Button variant="outline" className="w-full group/btn">
                  Request a Consultation
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Service Bundles */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Creator Starter Bundle</h3>
            <p className="text-3xl font-bold text-gradient mb-4">$600</p>
            <ul className="text-muted-foreground text-sm space-y-2 mb-6">
              <li>• One custom music track</li>
              <li>• One short-form video edit</li>
              <li>• Basic automation or workflow optimization</li>
            </ul>
            <a href="#contact">
              <Button variant="hero" className="w-full">Get Started</Button>
            </a>
          </div>
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Business Automation Bundle</h3>
            <p className="text-3xl font-bold text-gradient mb-4">$1,200+</p>
            <ul className="text-muted-foreground text-sm space-y-2 mb-6">
              <li>• Process analysis</li>
              <li>• Custom scripting</li>
              <li>• Documentation and handoff</li>
            </ul>
            <a href="#contact">
              <Button variant="hero" className="w-full">Get Started</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
