import { ArrowRight, ExternalLink, Network, Shield, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { trackOutbound } from "@/lib/trackOutbound";
import { motion } from "framer-motion";
import operatorOsImg from "@/assets/operatoros-hero.png";

export default function PlatformsSection() {
  return (
    <section id="platforms" className="relative py-32 bg-background overflow-hidden border-y border-border">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-primary uppercase">Sys::Active</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase"
          >
            THE ARSENAL
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            A unified ecosystem of command-grade tools. Every module in our arsenal is now operated through a single, secure control plane.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Central Hub Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
              <img
                src={operatorOsImg}
                alt="OperatorOS Control Plane"
                className="w-full h-auto relative z-10 object-cover opacity-90 mix-blend-screen"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzBBMGEwYSIvPjwvc3ZnPg==';
                }}
              />
              {/* Overlay UI Elements */}
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
                <div className="bg-background/80 backdrop-blur border border-border rounded px-3 py-1.5 flex items-center gap-2">
                  <Network className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono font-bold text-foreground">OperatorOS_Core</span>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="bg-background/80 backdrop-blur border border-border rounded px-2 py-1 text-[10px] font-mono text-emerald-400">
                    SSO: ONLINE
                  </div>
                  <div className="bg-background/80 backdrop-blur border border-border rounded px-2 py-1 text-[10px] font-mono text-emerald-400">
                    TENANT: SECURE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Module Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold font-[var(--font-display)] mb-4 text-foreground">
                  One Login. Total Control.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  OperatorOS is the command center that owns every module in the Shotgun Ninjas arsenal. One bill, one tenant-aware platform, seamless handoffs.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors flex gap-4">
                  <div className="mt-1">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-[var(--font-display)] uppercase tracking-wider mb-1">Unified Access</h4>
                    <p className="text-xs text-muted-foreground">Identity enters once. Modules launch with SSO.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors flex gap-4">
                  <div className="mt-1">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-[var(--font-display)] uppercase tracking-wider mb-1">Ecosystem Hub</h4>
                    <p className="text-xs text-muted-foreground">TechDeck, TradeFlowKit, PulseDesk, and more.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://operatoros.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound("https://operatoros.net", "platforms:hero-external")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] uppercase text-xs tracking-widest"
                >
                  Launch OperatorOS
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to="/operatoros"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground font-bold rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all uppercase text-xs tracking-widest"
                >
                  Explore The Platform
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
