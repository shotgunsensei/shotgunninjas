import { Music, Video, Workflow, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Music,
    title: "Music Production",
    description: "Professional audio production, mixing, mastering, and drum lessons for all skill levels.",
    features: ["Recording & Mixing", "Mastering", "Drum Lessons", "Sound Design"],
  },
  {
    icon: Video,
    title: "Video Production",
    description: "High-quality video content creation from concept to final delivery.",
    features: ["Filming & Editing", "Motion Graphics", "Color Grading", "Post-Production"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline your business processes with custom automation solutions.",
    features: ["Process Analysis", "Custom Solutions", "Integration", "Training"],
  },
  {
    icon: Code,
    title: "Script Building",
    description: "Custom scripts and tools to automate repetitive tasks and boost productivity.",
    features: ["Custom Scripts", "API Integration", "Data Processing", "Automation"],
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
            <span className="text-gradient">Exclusive Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From creative production to technical solutions, we bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary p-3.5 shrink-0 group-hover:shadow-glow-sm transition-all duration-300">
                  <service.icon className="w-full h-full text-primary-foreground" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  
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
                  
                  <Button variant="ghost" size="sm" className="group/btn -ml-2">
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
