import { Server, BarChart3, AlertTriangle, Wrench, Users, Settings } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: Server, title: "Unified Dashboard", description: "Single pane of glass for all client environments, tickets, and service health metrics." },
  { icon: BarChart3, title: "Margin Analytics", description: "Real-time visibility into per-client profitability and resource allocation efficiency." },
  { icon: AlertTriangle, title: "Smart Alerting", description: "AI-driven alert correlation that reduces noise and surfaces real issues faster." },
  { icon: Wrench, title: "Automated Remediation", description: "Self-healing scripts and runbooks that resolve common issues without human intervention." },
  { icon: Users, title: "Client Portal", description: "White-labeled client portals with real-time status, ticket tracking, and reporting." },
  { icon: Settings, title: "Tool Integration", description: "Connect your existing RMM, PSA, and monitoring tools into one unified workflow." },
];

export default function TechDeck() {
  return (
    <ProductPageLayout
      title="Tech Deck"
      tagline="Own the Stack."
      subtitle="MSP enablement platform to reduce tool sprawl and restore margin."
      description="Tech Deck eliminates the chaos of managing dozens of disconnected tools. Unify your MSP operations, automate L1 triage, and get real visibility into what's making—or losing—money."
      features={features}
    />
  );
}
