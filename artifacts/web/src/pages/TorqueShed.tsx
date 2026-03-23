import { Car, Gauge, BookOpen, Users, Wrench, BarChart3 } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: Car, title: "Vehicle Profiles", description: "Detailed vehicle management with mod tracking, maintenance logs, and performance baselines." },
  { icon: Gauge, title: "Performance Diagnostics", description: "OBD-II integration with real-time data logging, fault code analysis, and tuning recommendations." },
  { icon: BookOpen, title: "Knowledge Base", description: "Community-driven diagnostic library with verified procedures and troubleshooting guides." },
  { icon: Users, title: "Community Hub", description: "Connect with other enthusiasts, share builds, and get advice from experienced mechanics." },
  { icon: Wrench, title: "Build Tracker", description: "Document every modification with parts lists, costs, and before/after performance data." },
  { icon: BarChart3, title: "Dyno Analytics", description: "Track and compare dyno runs with detailed power curve analysis and trend visualization." },
];

export default function TorqueShed() {
  return (
    <ProductPageLayout
      title="Torque Shed"
      tagline="Own the Machine."
      subtitle="Performance-driven automotive systems, diagnostics, and community."
      description="Torque Shed is where gearheads meet data. Track your build, diagnose issues with real data, and connect with a community that speaks your language."
      features={features}
      websiteUrl="https://torqueshed.pro"
    />
  );
}
