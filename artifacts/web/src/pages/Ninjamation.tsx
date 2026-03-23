import { Zap, Bot, GitBranch, Workflow, Shield, BarChart3 } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: Zap, title: "Visual Workflow Builder", description: "Drag-and-drop automation builder with real-time preview and instant deployment." },
  { icon: Bot, title: "AI Actions", description: "Pre-built AI-powered actions for data processing, classification, and decision-making." },
  { icon: GitBranch, title: "Conditional Logic", description: "Complex branching, loops, and error handling without writing a single line of code." },
  { icon: Workflow, title: "Multi-System Integration", description: "Connect APIs, databases, file systems, and third-party services in unified workflows." },
  { icon: Shield, title: "Error Recovery", description: "Automatic retry logic, dead-letter queues, and alerting for failed automation runs." },
  { icon: BarChart3, title: "Run Analytics", description: "Detailed execution logs, performance metrics, and cost tracking for every automation." },
];

export default function Ninjamation() {
  return (
    <ProductPageLayout
      title="Ninjamation"
      tagline="Own the Automation."
      subtitle="Automate like a ninja. Build, deploy, and control intelligent workflows."
      description="Ninjamation is automation for people who hate repetitive work. Build complex multi-step workflows visually, power them with AI, and let them run while you focus on what matters."
      features={features}
      statusBadge="BETA"
    />
  );
}
