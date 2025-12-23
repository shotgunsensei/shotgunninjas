import { Target, Lightbulb, Users } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every project is executed with meticulous attention to detail.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push boundaries and embrace cutting-edge technology.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with clients to bring their vision to life.",
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
              <span className="text-foreground">Where </span>
              <span className="text-gradient">Creativity</span>
              <span className="text-foreground"> Meets</span>
              <br />
              <span className="text-gradient-accent">Technology</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Shotgun Ninjas Productions is a creative technology studio dedicated to 
              building innovative products and delivering exceptional services. From 
              custom electronic gadgets to professional audio and video production, 
              we bring passion and expertise to every project.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-10">
              Whether you're looking for a complete solution or prefer the DIY approach 
              with our step-by-step instructions, we're here to help you unleash the 
              power of creativity.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary p-3 shrink-0">
                    <value.icon className="w-full h-full text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
