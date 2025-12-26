import { Shield, Wrench, Eye, Brain } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Control",
    description: "Products that give you ownership, not dependence on third-party services.",
  },
  {
    icon: Wrench,
    title: "Reliability",
    description: "Built to work locally, integrate cleanly, and last for years.",
  },
  {
    icon: Eye,
    title: "Privacy",
    description: "No data harvesting, no forced subscriptions, no cloud nonsense.",
  },
  {
    icon: Brain,
    title: "Practical Intelligence",
    description: "Smart tech that solves real problems — not gimmicks or disposable solutions.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Built by people who </span>
              <span className="text-gradient">understand how things fail.</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Shotgun Ninjas Productions is a creative technology studio dedicated to 
              building intelligent gadgets, creative productions, and automation systems 
              for people who want real control — not locked-down tech or shallow tutorials.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-10">
              We design products that work locally, integrate cleanly, and respect your 
              ownership of your data and systems. Whether you're looking for a complete 
              solution or prefer the DIY approach with our Clan build guides, we're here 
              to help you build smarter.
            </p>

            {/* Quote */}
            <div className="glass rounded-xl p-6 border-l-4 border-primary">
              <p className="text-foreground italic text-lg">
                "Built by people who understand how things fail."
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary p-3 mb-4">
                  <value.icon className="w-full h-full text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
