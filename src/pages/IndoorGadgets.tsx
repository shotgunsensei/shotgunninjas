import { ArrowLeft, Plug, Shield, Thermometer, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    name: "Smart Power Strip",
    icon: Plug,
    hero: "Control every outlet. Kill wasted power. No cloud nonsense.",
    description: "The Shotgun Ninja Smart Power Strip gives you precise control over every plugged-in device — individually. Turn outlets on or off remotely, monitor power usage in real time, and create profiles for work, gaming, sleep, or travel.",
    price: "$119–$149",
    features: [
      "Individually controllable outlets",
      "Real-time power monitoring",
      "Local network control (cloud optional)",
      "Surge protection + intelligent load handling",
      "Ideal for offices, studios, and home labs",
    ],
  },
  {
    name: "Network Guardian",
    icon: Shield,
    hero: "A firewall for people who don't want to become network engineers.",
    description: "Plug it in. Protect everything. The Network Guardian filters malicious traffic, blocks trackers, and shields smart devices without complicated setup. No apps spying on you. No subscriptions required.",
    price: "$199–$299",
    features: [
      "Plug-and-play network security",
      "Blocks malware, trackers, and unsafe domains",
      "Visual activity dashboard",
      "No recurring fees",
      "Works with existing routers",
    ],
  },
  {
    name: "Environment Sentinel",
    icon: Thermometer,
    hero: "Know why a room feels wrong — before it affects you.",
    description: "Temperature is only part of the story. This compact module tracks temperature, humidity, air quality, and CO₂ — then gives actionable insights instead of useless graphs. Use it standalone or integrate it into automated climate control systems.",
    price: "$99–$149",
    features: [
      "Temp, humidity, CO₂, and air quality monitoring",
      "Intelligent suggestions, not raw data dumps",
      "Desktop or wall-mount design",
      "Local dashboard access",
      "Optional automation triggers",
    ],
  },
  {
    name: "Noise-Aware Room Monitor",
    icon: Volume2,
    hero: "Understands sound. Never records it.",
    description: "This device listens without listening. It detects sound patterns — not conversations. Glass breaking. Baby crying. Aggressive noise. Sudden impact. Privacy-first design with no audio recordings or microphones streaming data.",
    price: "$149–$199",
    features: [
      "Pattern-based audio detection",
      "Zero audio storage or playback",
      "Privacy-first design",
      "Instant alerts",
      "Works offline or local-only",
    ],
  },
];

const IndoorGadgets = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <Link to="/#products">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Products
            </Button>
          </Link>
          
          <div className="text-center mb-16">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
              Indoor Gadgets
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Smart devices that respect your privacy.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Indoor tech designed for control, not dependence. No forced subscriptions, no data harvesting — just visible protection and intelligent awareness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 p-3 mb-6">
                  <product.icon className="w-full h-full text-foreground" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                
                <p className="text-primary font-semibold text-sm mb-3">
                  {product.hero}
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <ul className="space-y-2 mb-6 flex-grow">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="text-2xl font-display font-bold text-primary">
                    {product.price}
                  </span>
                  <Button>Order Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default IndoorGadgets;
