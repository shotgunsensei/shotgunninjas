import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    q: "What is Shotgun Ninjas Productions?",
    a: (
      <>
        Shotgun Ninjas Productions is an independent studio shipping a family of
        tools, games, and creative platforms for builders, makers, and operators.
        Every module in the arsenal — from blue-collar workflow software to MSP
        enablement, support ops, marketing systems, and diagnostic games — now
        lives under{" "}
        <Link to="/operatoros" className="text-primary hover:underline">
          OperatorOS
        </Link>
        , the command center for the whole ecosystem.
      </>
    ),
  },
  {
    q: "What is OperatorOS and how do the modules work?",
    a: (
      <>
        <a
          href="https://operatoros.net"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          OperatorOS.net
        </a>{" "}
        is the parent platform that owns every module in the arsenal — one
        login, one bill, and tenant-aware access across TradeFlowKit, TechDeck,
        PulseDesk, TorqueShed, FaultlineLab, and the rest. Sign in once and
        launch any module through the command layer.
      </>
    ),
  },
  {
    q: "How do I try a module or get pricing?",
    a: (
      <>
        Create a free account at{" "}
        <a
          href="https://operatoros.net"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          OperatorOS.net
        </a>{" "}
        — TorqueShed, FaultlineLab, and Ninja Pool Hall are free with any
        account, no credit card required. Pricing and module details live on
        OperatorOS, not here — this is the studio's brand hub.
      </>
    ),
  },
  {
    q: "Do you take on partnerships, custom builds, or strategy work?",
    a: (
      <>
        Yes. The fastest path is the{" "}
        <Link to="/contact" className="text-primary hover:underline">
          contact form
        </Link>{" "}
        — pick the inquiry type that matches (Strategy Call, Partnership,
        Media). We typically reply within 24–48 hours.
      </>
    ),
  },
  {
    q: "Where can I hear the music from Sound Studio?",
    a: (
      <>
        Head to{" "}
        <Link to="/soundstudio" className="text-primary hover:underline">
          Sound Studio
        </Link>{" "}
        — stream, search, and download tracks for free.
      </>
    ),
  },
  {
    q: "How do I stay in the loop on launches and beta invites?",
    a: (
      <>
        Subscribe to the newsletter using the form below or in the footer. One
        email per drop — no spam, easy unsubscribe.
      </>
    ),
  },
];

function FAQRow({ item, open, onToggle }: { item: FAQItem; open: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden transition-colors hover:border-primary/30">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-semibold text-foreground pr-2">
          {item.q}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      {open && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-muted-foreground leading-relaxed">
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-24 bg-card/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-[var(--font-display)] tracking-[0.3em] text-primary/90 uppercase">
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] mb-3">
            Quick answers, no fluff.
          </h2>
          <p className="text-muted-foreground">
            Still curious? The{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact page
            </Link>{" "}
            is the fastest path.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <FAQRow
              key={item.q}
              item={item}
              open={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
