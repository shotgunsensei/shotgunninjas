import { Swords, Map, Skull, Sparkles, Shield, Users } from "lucide-react";
import ProductPageLayout from "@/components/ProductPageLayout";

const features = [
  { icon: Map, title: "Procedural Mazes", description: "Every run generates a unique labyrinth with dynamic difficulty scaling and hidden secrets." },
  { icon: Swords, title: "Combat System", description: "Fast-paced melee combat with combo chains, parry mechanics, and weapon mastery progression." },
  { icon: Skull, title: "Permadeath Stakes", description: "True roguelike experience—death means starting over, but knowledge carries forward." },
  { icon: Sparkles, title: "Ability System", description: "Unlock and combine abilities for unique build synergies that change how you approach each run." },
  { icon: Shield, title: "Boss Encounters", description: "Challenging boss fights that test mastery of movement, timing, and resource management." },
  { icon: Users, title: "Community Runs", description: "Weekly challenge runs with shared seeds, leaderboards, and community-voted modifiers." },
];

export default function LabyrinthRonin() {
  return (
    <ProductPageLayout
      title="Labyrinth Ronin"
      tagline="Own the Maze."
      subtitle="Endless survival inside a living maze. Adapt and dominate."
      description="Labyrinth Ronin is a roguelike survival experience set in an ever-shifting maze. Every run is different. Every death teaches you something. Only the most adaptable operators survive."
      features={features}
      statusBadge="EXPERIMENTAL"
    />
  );
}
