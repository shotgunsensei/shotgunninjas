import { Mail, MapPin, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
            Hire the Studio
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Let's Talk</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Have a project that needs creative + technical horsepower? Let's discuss.
          </p>
          <p className="text-foreground/80 font-medium text-sm max-w-xl mx-auto">
            If you need cheap, this isn't it. If you need it done right, let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-4 mb-8">
                <a
                  href="mailto:john@shotgunninjas.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
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

              <div className="pt-6 border-t border-border">
                <h4 className="font-display text-sm font-semibold text-foreground mb-4">
                  What to Expect
                </h4>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Response within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Clear scope and timeline discussion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Honest assessment of fit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Name
                  </label>
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
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
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
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="Audio / Video / Automation / Other"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Tell us about your project
                </label>
                <Textarea
                  placeholder="What are you building? What problem are you solving? What's your timeline?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-secondary/50 border-border focus:border-primary resize-none"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full">
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
