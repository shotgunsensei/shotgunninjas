import { ExternalLink, Swords, Flame, Users, Film } from "lucide-react";

const highlights = [
  { icon: Swords, label: "Characters & Lore" },
  { icon: Film, label: "Episodes & Videos" },
  { icon: Flame, label: "Origin Stories" },
  { icon: Users, label: "Community Hub" },
];

export default function VillageSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/3 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
            The Shotgun Ninjas Universe
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[var(--font-display)]">
            Enter the Village.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
            Every system has a story. The Village is where the Shotgun Ninjas universe comes to life — characters, backstory, episodes, and the lore behind the brand. This isn't just software. It's a world.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2.5 bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-[var(--font-display)] font-bold tracking-wider text-foreground text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://shotgunninjavillage.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-lg"
          >
            Enter the Village
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
