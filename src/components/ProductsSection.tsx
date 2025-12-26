import { Home, TreePine, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const products = [
  {
    icon: Home,
    title: "Indoor Gadgets",
    description: "Smart Power Strip, Network Guardian, Environment Sentinel, Noise Monitor — privacy-first devices for your home and lab.",
    price: "$99 - $299",
    color: "from-cyan-500 to-blue-500",
    link: "/indoor-gadgets",
  },
  {
    icon: TreePine,
    title: "Outdoor Gadgets",
    description: "Solar Gate Controller, Perimeter Sensors, Tool Battery Power Station, Smart Siren — rugged tech for rural and remote applications.",
    price: "$79 - $499",
    color: "from-emerald-500 to-green-500",
    link: "/outdoor-gadgets",
  },
  {
    icon: Zap,
    title: "Electric Vehicles",
    description: "EV Power Module, Telemetry Box, Sound Module, Load Balancer — smart accessories for e-bikes, UTVs, and DIY EV builds.",
    price: "$99 - $499",
    color: "from-amber-500 to-orange-500",
    link: "/electric-vehicles",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
            What We Build
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Products designed to give you control — not dependence.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            All Shotgun Ninja products are designed to work locally, integrate cleanly, and respect your ownership of your data and systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.title}
              className="group glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${product.color} p-4 mb-6 group-hover:shadow-glow-sm transition-all duration-300`}>
                <product.icon className="w-full h-full text-foreground" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {product.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-primary font-display font-semibold">
                  {product.price}
                </span>
                <Link to={product.link}>
                  <Button variant="ghost" size="sm" className="group/btn">
                    View Products
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
