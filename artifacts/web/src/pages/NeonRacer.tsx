import { Gamepad2, Zap, Trophy, Timer, Palette, Wifi } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: Gamepad2, title: "Arcade Controls", description: "Tight, responsive controls designed for the perfect balance of speed and precision." },
  { icon: Zap, title: "Power-Ups", description: "Strategic power-up system that rewards skill and timing over luck." },
  { icon: Trophy, title: "Leaderboards", description: "Global and friend leaderboards with detailed run statistics and replay sharing." },
  { icon: Timer, title: "Time Trials", description: "Compete against your best times with ghost replays and split-second precision timing." },
  { icon: Palette, title: "Neon Aesthetic", description: "Stunning retro-futuristic visuals with dynamic lighting and particle effects." },
  { icon: Wifi, title: "Cross-Platform", description: "Play on any device with cloud save sync and seamless cross-platform progression." },
];

export default function NeonRacer() {
  return (
    <ProductPageLayout
      title="Neon Racer"
      tagline="Own the Grid."
      subtitle="Retro-futuristic evasive racing game. Dodge, survive, dominate."
      description="Neon Racer drops you into a synthwave-soaked grid where reflexes are everything. Dodge obstacles, collect power-ups, and chase the top of the leaderboard in this adrenaline-fueled arcade experience."
      features={features}
      websiteUrl="https://neonracer.net"
    />
  );
}
