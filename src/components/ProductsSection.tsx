import { Gamepad2, Car, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const products = [
  {
    icon: Gamepad2,
    title: "Indoor Gadgets",
    description: "Custom arcade cabinets, gaming setups, and entertainment systems. From portable OmniCade units to full-size stand-up cabinets.",
    price: "$200 - $650",
    color: "from-cyan-500 to-blue-500",
    link: "/indoor-gadgets",
  },
  {
    icon: Car,
    title: "Outdoor Gadgets",
    description: "FPV RC vehicles, ride-on EVs, and outdoor tech for adventure seekers of all ages.",
    price: "Starting at $300",
    color: "from-pink-500 to-rose-500",
    link: "/outdoor-gadgets",
  },
  {
    icon: Cpu,
    title: "Business Automation",
    description: "Custom automation solutions to streamline operations and boost productivity for your business.",
    price: "Custom Pricing",
    color: "from-emerald-500 to-teal-500",
    link: "/business-automation",
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
            <span className="text-gradient">Featured Products</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the thrill of DIY with step-by-step instructions or purchase completed products ready to use.
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
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
