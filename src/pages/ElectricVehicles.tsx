import { ArrowLeft, Plug, Activity, Volume2, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    name: "EV Accessory Power Module",
    icon: Plug,
    hero: "Clean power for everything you add to your EV.",
    description: "Safely power accessories without hacking factory wiring. This module intelligently manages auxiliary loads, preventing battery drain and electrical faults. Ideal for e-bikes, electric motorcycles, UTVs, and DIY EV builds.",
    price: "$149–$249",
    features: [
      "Smart electronic load protection",
      "Multiple accessory outputs",
      "Vehicle-safe design",
      "App-controlled switching",
      "Clean install — no splicing required",
    ],
  },
  {
    name: "EV Telemetry Box",
    icon: Activity,
    hero: "Understand your battery before it fails you.",
    description: "This compact telemetry unit monitors EV battery health, temperature, usage patterns, and degradation trends — giving you real insight instead of guesswork. Designed for long-term ownership and peace of mind.",
    price: "$249–$399",
    features: [
      "Battery health analytics",
      "Usage pattern tracking",
      "Predictive alerts",
      "Local data ownership",
      "Works across multiple EV platforms",
    ],
  },
  {
    name: "EV Sound & Alert Module",
    icon: Volume2,
    hero: "Safety sounds — with personality.",
    description: "Add configurable low-speed alert sounds for pedestrians or off-road environments. Choose practical, compliant tones — or custom profiles for private land.",
    price: "$99–$179",
    features: [
      "Low-speed safety alerts",
      "Configurable sound profiles",
      "Weatherproof design",
      "Easy installation",
    ],
  },
  {
    name: "Smart EV Charger Load Balancer",
    icon: Gauge,
    hero: "Charge faster — without tripping breakers.",
    description: "This system dynamically manages EV charging based on total household load. No rewiring. No service upgrades. Just smarter power usage. A must-have for EV owners with limited electrical capacity.",
    price: "$299–$499",
    features: [
      "Prevents overloads automatically",
      "Works with existing chargers",
      "Real-time load monitoring",
      "Installer-friendly design",
      "Saves costly electrical upgrades",
    ],
  },
];

const ElectricVehicles = () => {
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
              Electric Vehicles
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Smart accessories for your EV.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Intelligent modules for e-bikes, electric motorcycles, UTVs, and DIY EV builds. Real data, real protection, real control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-3 mb-6">
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

export default ElectricVehicles;
