import {
  Shield,
  Video,
  Code,
  BookOpen,
  Users,
  Wrench,
  Zap,
  Lock,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  {
    icon: Wrench,
    title: "Build Vault",
    description:
      "Step-by-step gadget builds, schematics, and parts lists. Real projects with real results.",
  },
  {
    icon: Video,
    title: "Video Library",
    description:
      "Music production, programming, networking, and hardware project tutorials from the team.",
  },
  {
    icon: Code,
    title: "Code & Automation Vault",
    description:
      "Scripts, templates, configurations, and automation recipes you can deploy immediately.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Drops",
    description:
      'Monthly deep-dives, technical breakdowns, and "Why this failed" post-mortems.',
  },
];

const audience = [
  "Makers who build things with their hands and their code",
  "DIY technologists who refuse to outsource understanding",
  "Power users who want to go deeper than the surface",
];

const faq = [
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No contracts, no guilt trips. Cancel whenever you want.",
  },
  {
    q: "What kind of content is included?",
    a: "Build guides, video tutorials, automation scripts, templates, and monthly deep-dive articles.",
  },
  {
    q: "Is there a community aspect?",
    a: "Yes. Clan members get access to a private discussion forum to connect with other builders.",
  },
  {
    q: "Do I need to be technical?",
    a: "Some content is advanced, but we design everything to be approachable. If you can follow instructions, you can build.",
  },
];

export default function Clan() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider border border-primary/30 mb-6">
              <Lock className="h-3.5 w-3.5" />
              MEMBERS ONLY
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              The Shotgun Ninja{" "}
              <span className="text-gradient">Clan</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
              This is where we stop selling and start teaching.
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The Clan is a private community for builders who want to go deeper—real builds, real code, real knowledge.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center mb-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2 font-[var(--font-display)]">$20</h2>
            <p className="text-muted-foreground mb-6">per month</p>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
              {[
                "Full access to the Build Vault",
                "Complete Video Library",
                "Code & Automation templates",
                "Monthly Knowledge Drops",
                "Private discussion forum",
                "Cancel anytime — no contracts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Join the Clan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-muted-foreground mt-4">
              Contact us to get started with your membership.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-12 font-[var(--font-display)]">
              What You Get
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 font-[var(--font-display)]">
              Built For
            </h2>
            <div className="flex flex-col items-center gap-4">
              {audience.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-card border border-border rounded-lg px-6 py-4 max-w-lg w-full"
                >
                  <Users className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 font-[var(--font-display)]">
              <HelpCircle className="inline h-6 w-6 mr-2 text-primary" />
              FAQ
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {faq.map((item) => (
                <div
                  key={item.q}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <h3 className="font-bold text-sm mb-2 text-foreground">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground max-w-lg mx-auto">
              By joining the Clan, you acknowledge that content is provided as-is for educational
              purposes. You are responsible for how you apply what you learn. All builds and
              projects are attempted at your own risk.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
