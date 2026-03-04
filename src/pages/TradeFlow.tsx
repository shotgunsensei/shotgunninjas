import { ArrowRight, Wrench, FileText, Users, MapPin, Smartphone, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import tradeflowLogo from "@/assets/tradeflow-logo.png";
import tradeflowHero from "@/assets/tradeflow-hero.png";

const sections = [
  { icon: ClipboardList, title: "Dispatch & Job Tracking Templates", description: "Pre-built templates for scheduling, dispatching, and tracking jobs from call to completion. No more whiteboards and sticky notes." },
  { icon: FileText, title: "Quote to Invoice Automation", description: "Generate quotes in the field, convert to invoices on completion, and get paid faster. One workflow, zero data re-entry." },
  { icon: Users, title: "CRM Simplification", description: "A customer database that actually gets used. Track jobs per customer, follow-up reminders, and service history—without the enterprise bloat." },
  { icon: Smartphone, title: "Implementation Support", description: "We set it up with you. Training, configuration, and ongoing support so the system actually sticks." },
  { icon: MapPin, title: "Local & Remote Setup", description: "Whether you're across town or across the country, we'll get your workflows running. In-person or remote—your call." },
];

const TradeFlow = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <img src={tradeflowHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <img src={tradeflowLogo} alt="TradeFlow Kit" className="w-40 h-40 lg:w-52 lg:h-52 object-contain drop-shadow-[0_0_30px_rgba(255,150,0,0.4)]" />
            </div>
            <div>
              <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">TradeFlow Kit</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Own the Workflow.
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                Eliminate chaos through structured digital workflows built for small blue-collar businesses.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Get Workflow Assessment <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {sections.map((s) => (
              <div key={s.title} className="glass rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Your business runs on workflows.</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Let's make sure they actually work.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Get Workflow Assessment <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TradeFlow;
