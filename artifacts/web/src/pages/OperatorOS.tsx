import { Cloud, Bot, GitBranch, Layers, Shield, Zap } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: Cloud, title: "Cloud-Native Architecture", description: "Deploy across any cloud provider with infrastructure-as-code templates and automated provisioning." },
  { icon: Bot, title: "AI-Powered Dev Tools", description: "Integrated AI assistants that understand your codebase and accelerate development workflows." },
  { icon: GitBranch, title: "Version Control Integration", description: "Deep Git integration with automated branching strategies and merge conflict resolution." },
  { icon: Layers, title: "Stack Management", description: "Manage your entire technology stack from a single control plane with real-time monitoring." },
  { icon: Shield, title: "Security First", description: "Built-in security scanning, dependency auditing, and compliance checking for every deployment." },
  { icon: Zap, title: "Instant Deployment", description: "One-click deployments with rollback capabilities, blue-green deployment strategies, and canary releases." },
];

export default function OperatorOS() {
  return (
    <ProductPageLayout
      title="OperatorOS"
      tagline="Own the Build."
      subtitle="AI-native cloud development control plane for builders who ship."
      description="OperatorOS is the command center for modern development teams. Manage infrastructure, automate deployments, and leverage AI-powered tools—all from a single, unified platform designed for operators who build."
      features={features}
    />
  );
}
