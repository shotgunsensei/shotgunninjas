import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Shield, Database, CreditCard, Key, Activity, GitBranch, Layers, Server, Cpu, Box, Wrench, Gamepad2, Megaphone, Zap, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { trackOutbound } from "@/lib/trackOutbound";
import operatorOsImg from "@/assets/operatoros-hero.png";
import snpLogo from "@/assets/SNPlogo.png";

// Reusable components for this page
const ModuleCard = ({ title, tagline, description, icon: Icon, tag, href, index }: any) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackOutbound(href, `operatoros-page:module-${title.toLowerCase()}`)}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group relative flex flex-col bg-card border border-border p-6 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 flex justify-between items-start mb-6">
      <div className="p-3 bg-background border border-border rounded-lg group-hover:border-primary/50 group-hover:text-primary transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      {tag && (
        <span className="text-[10px] font-mono tracking-widest text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20 uppercase">
          {tag}
        </span>
      )}
    </div>
    <div className="relative z-10 flex-grow">
      <h3 className="text-xl font-bold font-[var(--font-display)] mb-1 text-foreground group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-xs font-mono text-primary/70 mb-3 tracking-widest uppercase">{tagline}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
    <div className="relative z-10 mt-6 flex items-center text-xs font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-widest gap-2">
      Launch Module <ExternalLink className="w-3.5 h-3.5" />
    </div>
  </motion.a>
);

const SectionHeading = ({ pre, title, desc }: any) => (
  <div className="max-w-3xl mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="h-px w-8 bg-primary" />
      <span className="text-xs font-mono tracking-widest text-primary uppercase">{pre}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl sm:text-4xl md:text-5xl font-black font-[var(--font-display)] mb-6 text-foreground uppercase tracking-tight"
    >
      {title}
    </motion.h2>
    {desc && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground leading-relaxed"
      >
        {desc}
      </motion.p>
    )}
  </div>
);

export default function OperatorOS() {
  useSEO({
    title: "OperatorOS | The Command Center",
    description: "Run every operation from one secure place. Identity, billing, access, and module handoffs stay connected behind the scenes.",
  });

  return (
    <div className="min-h-screen bg-[#030303] text-foreground selection:bg-primary/30">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
          {/* Grid Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              backgroundPosition: "center center"
            }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[150px] opacity-50" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#030303] to-transparent z-10" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center justify-center p-4 bg-card/40 backdrop-blur-xl border border-border rounded-2xl mb-8 shadow-2xl"
            >
              <img src={snpLogo} alt="SNP" className="w-12 h-12" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/40 bg-primary/10 mb-6 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-primary uppercase">System Online</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-[var(--font-display)] tracking-tighter mb-6 uppercase leading-none"
            >
              Run Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-red-600">Operation</span><br/>
              From One Place
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-light"
            >
              One secure place to enter, manage, and launch every tool an operation depends on. Identity, billing, access, and module handoffs stay connected behind the scenes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="https://operatoros.net/login?mode=register"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutbound("https://operatoros.net/login?mode=register", "operatoros-page:hero-register")}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] w-full sm:w-auto uppercase tracking-widest text-sm"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">Initialize Account <ExternalLink className="w-4 h-4" /></span>
              </a>
              <a
                href="https://operatoros.net/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutbound("https://operatoros.net/login", "operatoros-page:hero-login")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-border text-foreground hover:bg-card hover:border-primary/50 font-bold rounded-lg transition-all w-full sm:w-auto uppercase tracking-widest text-sm"
              >
                Operator Login
              </a>
            </motion.div>

            {/* Quick stats / trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-xs font-mono text-muted-foreground uppercase tracking-widest"
            >
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Sign In Once</span>
              <span className="flex items-center gap-2"><Database className="w-4 h-4 text-primary" /> Team Access</span>
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> One Clear Bill</span>
              <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Connected Apps</span>
            </motion.div>
          </div>
        </section>

        {/* THE VISUAL SEPARATOR / HERO IMAGE */}
        <section className="relative -mt-20 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-primary/20 bg-[#070b12] p-2 shadow-2xl shadow-primary/10 overflow-hidden"
          >
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video sm:aspect-[21/9]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent opacity-80 z-10" />
              <img 
                src={operatorOsImg} 
                alt="OperatorOS Control Interface" 
                className="w-full h-full object-cover opacity-70 mix-blend-screen"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzBBMGEwYSIvPjwvc3ZnPg==';
                }}
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center bg-background/50 backdrop-blur-md shadow-[0_0_50px_hsl(var(--primary)/0.3)]">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* THE FLOW SECTION */}
        <section className="py-24 sm:py-32 relative border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              pre="Architecture" 
              title="The Operation Flow" 
              desc="How OperatorOS centralizes your tools without adding friction." 
            />

            <div className="grid md:grid-cols-4 gap-4 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />
              
              {[
                { step: "01", title: "Identity", desc: "User enters once through the central login portal.", icon: Key },
                { step: "02", title: "Billing", desc: "Centralized subscription management activates module access.", icon: CreditCard },
                { step: "03", title: "Tenant", desc: "Teams, roles, and scope follow the user seamlessly.", icon: Database },
                { step: "04", title: "SSO", desc: "Child apps launch instantly through the parent, no extra passwords.", icon: Zap },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative z-10 bg-card border border-border p-6 rounded-xl hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-background border border-border rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/50 group-hover:text-primary transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono text-primary mb-2">PHASE {item.step}</div>
                  <h3 className="text-lg font-bold font-[var(--font-display)] mb-2 uppercase">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PARENT PLATFORM CAPABILITIES */}
        <section className="py-24 sm:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <SectionHeading 
                  pre="Control Plane" 
                  title="Platform Capabilities" 
                  desc="Underneath every module is a robust parent architecture built to handle the administrative heavy lifting." 
                />
                
                <div className="space-y-6 mt-8">
                  <a
                    href="https://operatoros.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutbound("https://operatoros.net", "operatoros-page:capabilities-explore")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground font-bold rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all uppercase tracking-widest text-xs"
                  >
                    View Technical Specs
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Parent Auth", desc: "Centralized login & role-aware access control." },
                  { title: "Tenant Management", desc: "Organize teams, roles, and aggregate memberships." },
                  { title: "Unified Billing", desc: "Stripe checkout maps directly to module access. No fake client-side unlocks." },
                  { title: "SSO & Handoff", desc: "Child apps launch through the parent with secure token exchanges." },
                  { title: "Unified Dashboard", desc: "Your entire arsenal status visible from a single pane of glass." },
                  { title: "Operator Analytics", desc: "System-wide telemetry and usage insights." },
                ].map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-background border border-border/50 p-5 rounded-lg flex gap-4"
                  >
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground font-[var(--font-display)] uppercase tracking-wider mb-1">{cap.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* THE ARSENAL - CORE PRODUCTS */}
        <section className="py-24 sm:py-32 bg-card/30 border-y border-border/50 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading 
              pre="Flagship Modules" 
              title="Core Products" 
              desc="Fully unlocked flagship platforms designed for intense operational lanes." 
            />

            <div className="grid md:grid-cols-3 gap-6">
              <ModuleCard 
                title="TradeFlow Kit" 
                tagline="Own the Workflow" 
                description="Service businesses & operators: quotes, jobs, invoices, and payments in one unified lane."
                icon={Wrench}
                tag="Core Flagship"
                href="https://operatoros.net/modules/tradeflow"
                index={0}
              />
              <ModuleCard 
                title="Tech Deck" 
                tagline="Own the Stack" 
                description="MSP teams & field technicians: a dense command surface to reduce tool sprawl and restore margins."
                icon={Server}
                tag="Core Flagship"
                href="https://operatoros.net/modules/techdeck"
                index={1}
              />
              <ModuleCard 
                title="PulseDesk" 
                tagline="Own the Queue" 
                description="Healthcare operations teams: coordinate clinical and support workflows without losing escalations."
                icon={Activity}
                tag="Core Flagship"
                href="https://operatoros.net/modules/pulsedesk"
                index={2}
              />
            </div>
          </div>
        </section>

        {/* THE ARSENAL - FREE TIER */}
        <section className="py-24 sm:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              pre="Unrestricted" 
              title="Free With Any Account" 
              desc="Essential tools included automatically. No credit card required to launch." 
            />

            <div className="grid md:grid-cols-3 gap-6">
              <ModuleCard 
                title="Torque Shed" 
                tagline="Own the Machine" 
                description="Mechanics & repair shops: diagnostics → repair → proof → closeout."
                icon={Cpu}
                tag="Included"
                href="https://operatoros.net/modules/torqueshed"
                index={0}
              />
              <ModuleCard 
                title="Faultline Lab" 
                tagline="Investigate the Break" 
                description="Troubleshooters & tech leads: turn hard failures into documented diagnostic evidence trails."
                icon={GitBranch}
                tag="Included"
                href="https://operatoros.net/modules/faultlinelab"
                index={1}
              />
              <ModuleCard 
                title="Ninja Pool Hall" 
                tagline="Take a Break" 
                description="A fast-paced 2D ninja pool game to reset the mind between intense operations."
                icon={Gamepad2}
                tag="Included"
                href="https://operatoros.net/modules/poolhall"
                index={2}
              />
            </div>
          </div>
        </section>

        {/* COMPANION & COMING SOON */}
        <section className="py-24 sm:py-32 bg-card/30 border-y border-border/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <SectionHeading 
                  pre="Expansion" 
                  title="Companion Modules" 
                  desc="Specialized systems to augment your primary operations." 
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <ModuleCard 
                    title="SnapProof OS" 
                    tagline="Field Documentation" 
                    description="Turn job-site photos & notes into proof-of-work reports."
                    icon={Box}
                    href="https://operatoros.net/modules/snapproof"
                    index={0}
                  />
                  <ModuleCard 
                    title="BrandForge OS" 
                    tagline="Campaign Ops" 
                    description="Plan, create, and launch marketing campaigns."
                    icon={Megaphone}
                    href="https://operatoros.net/modules/brandforge"
                    index={1}
                  />
                  <ModuleCard 
                    title="Ninjamation" 
                    tagline="Workflow Automation" 
                    description="AI-driven workflow automations."
                    icon={Sparkles}
                    href="https://operatoros.net/modules/ninjamation"
                    index={2}
                  />
                </div>
              </div>

              <div>
                <div className="max-w-3xl mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-muted-foreground/50" />
                    <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Future</span>
                  </div>
                  <h2 className="text-3xl font-black font-[var(--font-display)] mb-4 text-foreground/50 uppercase tracking-tight">
                    Coming Soon
                  </h2>
                  <p className="text-muted-foreground">The ecosystem is constantly expanding.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "StudyForge AI", desc: "Automated learning and documentation synthesis." },
                    { name: "Ninja Launch Kit", desc: "Rapid deployment scaffolding for new projects." },
                    { name: "CallCommand AI", desc: "Voice-driven operational dispatch." }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 border border-dashed border-border/50 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-foreground/70 font-[var(--font-display)] uppercase tracking-wider text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground/70">{item.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-background px-2 py-1 rounded text-muted-foreground">IN_DEV</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPERATING LANES SUMMARY */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Coverage</p>
            <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] uppercase tracking-widest mb-12">Supported Operating Lanes</h2>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "Business Operations",
                "IT & MSP Operations",
                "Automotive & Diagnostics",
                "Healthcare Workflow Coordination",
                "Branding & Launch Systems",
                "AI Automation"
              ].map((lane, i) => (
                <span key={i} className="px-4 py-2 border border-border bg-card rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                  {lane}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative border-t border-border bg-card">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-16 h-16 text-primary mx-auto mb-8 opacity-80" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-[var(--font-display)] mb-8 uppercase tracking-tighter">
              Command Your Operations.
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Enter the ecosystem. Manage your stack. Deploy with absolute confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://operatoros.net/login?mode=register"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutbound("https://operatoros.net/login?mode=register", "operatoros-page:cta-register")}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] uppercase tracking-widest text-sm"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">Initialize Account <ArrowRight className="w-4 h-4" /></span>
              </a>
            </div>
            
            <div className="mt-8 text-xs font-mono text-muted-foreground">
              TorqueShed, FaultlineLab, and Ninja Pool Hall are <span className="text-foreground">free with any account</span>.
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
