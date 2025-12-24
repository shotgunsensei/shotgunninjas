import { ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BusinessAutomation = () => {
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-5 mx-auto mb-6 shadow-glow-sm">
              <Cpu className="w-full h-full text-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Business Automation</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Custom automation solutions to streamline your business operations and boost productivity.
            </p>
          </div>

          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-muted-foreground text-lg">
              Products coming soon. Check back later for our business automation solutions!
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default BusinessAutomation;
