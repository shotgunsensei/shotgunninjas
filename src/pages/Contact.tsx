import { Mail, MapPin, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inquiryTypes = [
  { value: "strategy", label: "Strategy Call" },
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "general", label: "General Question" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "strategy",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent. We'll be in touch.");
    setFormData({ name: "", email: "", type: "strategy", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-display text-xs tracking-[0.3em] mb-4 uppercase">Contact</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Let's Talk Strategy
            </h1>
            <p className="text-muted-foreground text-lg">
              Have a system to build, a stack to optimize, or a workflow to fix? Start here.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <div className="space-y-8">
              <div className="glass rounded-xl p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <a href="mailto:john@shotgunninjas.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span>john@shotgunninjas.com</span>
                  </a>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span>United States</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <h4 className="font-display text-sm font-semibold text-foreground mb-4">What to Expect</h4>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Response within 24-48 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Clear scope and next steps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>No sales pitch—just strategy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="glass rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Inquiry Type</label>
                  <div className="flex flex-wrap gap-3">
                    {inquiryTypes.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: t.value })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          formData.type === t.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-muted-foreground border border-border hover:border-primary/50"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <Textarea
                    placeholder="What are you building? What problem are you solving?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-secondary/50 border-border focus:border-primary resize-none"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
