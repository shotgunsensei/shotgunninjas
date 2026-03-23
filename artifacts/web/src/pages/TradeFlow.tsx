import { Wrench, FileText, MapPin, DollarSign, Clock, Smartphone } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: MapPin, title: "Smart Dispatch", description: "AI-optimized scheduling that considers location, skill requirements, and availability in real-time." },
  { icon: FileText, title: "Digital Invoicing", description: "Generate and send professional invoices on-site. No more lost paperwork or delayed billing." },
  { icon: DollarSign, title: "Payment Processing", description: "Accept payments in the field with integrated payment processing and automatic reconciliation." },
  { icon: Wrench, title: "Job Management", description: "Track jobs from quote to completion with real-time status updates and photo documentation." },
  { icon: Clock, title: "Time Tracking", description: "Automated time tracking with GPS verification for accurate billing and payroll." },
  { icon: Smartphone, title: "Mobile-First", description: "Built for the field. Full functionality on any device, even with spotty connectivity." },
];

export default function TradeFlow() {
  return (
    <ProductPageLayout
      title="TradeFlow Kit"
      tagline="Own the Workflow."
      subtitle="Workflow automation for blue-collar businesses that eliminate chaos."
      description="TradeFlow Kit replaces the patchwork of spreadsheets, paper forms, and disconnected apps that plague field service businesses. From dispatch to invoice in under 60 seconds."
      features={features}
    />
  );
}
