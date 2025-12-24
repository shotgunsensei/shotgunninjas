import { ArrowLeft, Monitor, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    name: "OmniCade Mobile",
    description: "2 player joystick mobile setup with HDMI out, 3.5mm audio out, and VGA out. Perfect for gaming on the go or connecting to any display.",
    price: "$200",
    features: ["2 Player Joystick Setup", "HDMI Output", "3.5mm Audio Out", "VGA Output", "Portable Design"],
  },
  {
    name: "OmniCade Tabletop",
    description: "2 player joystick 36\" tabletop cabinet with 22\" monitor. Classic arcade experience in a compact form factor.",
    price: "$500",
    features: ["2 Player Joystick Setup", "36\" Tabletop Cabinet", "22\" Monitor", "3 Color Choices: Red, Blue, Green"],
  },
  {
    name: "OmniCade Stand-Up",
    description: "2 player joystick 72\" stand-up arcade cabinet with 22\" monitor. The ultimate home arcade experience.",
    price: "$650",
    features: ["2 Player Joystick Setup", "72\" Stand-Up Cabinet", "22\" Monitor", "3 Color Choices: Red, Blue, Green"],
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-5 mx-auto mb-6 shadow-glow-sm">
              <Gamepad2 className="w-full h-full text-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Indoor Gadgets</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transform your space with our custom-built arcade machines and gaming setups. From portable solutions to full-size cabinets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 p-3 mb-6">
                  <Monitor className="w-full h-full text-foreground" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {product.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
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
