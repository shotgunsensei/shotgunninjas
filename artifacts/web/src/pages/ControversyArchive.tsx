import { Search, FolderArchive, Sparkles, Fingerprint, FileSearch, Tags } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: Search, title: "Searchable Dossier", description: "Hunt through the internet's most hotly-debated anomalies, lost histories, and enduring conspiracies in seconds." },
  { icon: Tags, title: "Seven Categories", description: "Browse curated files across Artifacts, Conspiracies, Events, Inventions, Mysteries, and People." },
  { icon: Sparkles, title: "AI Deep Dives", description: "Go beyond the summary with AI-authored investigations that connect the dots across the archive." },
  { icon: FolderArchive, title: "Curated Entries", description: "Every case file is researched, sourced, and filed — a growing library of the unexplained and the disputed." },
  { icon: FileSearch, title: "Source Truth", description: "Each entry traces its claims, citations, and counter-claims so you can weigh the evidence yourself." },
  { icon: Fingerprint, title: "Destination Mystery", description: "Follow leads from one anomaly to the next and lose yourself in the rabbit holes of the unexplained." },
];

export default function ControversyArchive() {
  return (
    <ProductPageLayout
      title="Controversy Archive"
      tagline="Source Truth. Destination Mystery."
      subtitle="A searchable dossier of the internet's most hotly-debated anomalies, lost histories, and enduring conspiracies."
      description="Controversy Archive is a declassified-style library of the unexplained — 57+ researched entries across 7 categories, with AI deep dives that connect the dots. Search artifacts, conspiracies, events, inventions, mysteries, and the people behind them, then follow the leads wherever they go."
      features={features}
      websiteUrl="https://controversyarchive.com"
      statusBadge="NEW"
      relatedProducts={[
        { name: "Faultline Lab", tagline: "Cinematic troubleshooting simulator", link: "/faultline-lab" },
        { name: "BrandForge OS", tagline: "Own the campaign", link: "/brandforgeos" },
        { name: "OperatorOS", tagline: "AI-native dev control plane", link: "/operatoros" },
      ]}
    />
  );
}
