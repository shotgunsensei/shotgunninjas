import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import snpLogo from "@/assets/SNPlogo.png";

const productLinks = [
  { name: "OperatorOS", href: "/operatoros" },
  { name: "Tech Deck", href: "/techdeck" },
  { name: "TradeFlow Kit", href: "/tradeflow" },
  { name: "Torque Shed", href: "/torqueshed" },
  { name: "Ninjamation", href: "/ninjamation" },
  { name: "Labyrinth Ronin", href: "/labyrinthronin" },
  { name: "Neon Racer", href: "/neonracer" },
  { name: "PlayPack Pilot", href: "/playpackpilot" },
  { name: "BrandForge OS", href: "https://bf-os.com" },
  { name: "SnapProof OS", href: "https://snapproofos.com" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Sound Studio", href: "/soundstudio" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

function FooterLink({ name, href }: { name: string; href: string }) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {name}
      </a>
    );
  }
  return (
    <Link
      to={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {name}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-background border border-border rounded-xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-2">
              THE SHOTGUN NINJAS UNIVERSE
            </p>
            <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)] mb-2">
              Discover the Village
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Characters, backstory, episodes, and the lore behind the Shotgun Ninjas brand — all in one place.
            </p>
          </div>
          <a
            href="https://shotgunninjavillage.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 flex-shrink-0"
          >
            Enter the Village
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={snpLogo} alt="SNP" className="h-8 w-8" />
              <span className="font-[var(--font-display)] text-sm font-bold tracking-wider">
                SHOTGUN NINJAS
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Systems, automation, and software built for real operators.
            </p>
          </div>

          <div>
            <h3 className="font-[var(--font-display)] text-xs font-semibold tracking-widest text-muted-foreground mb-4">
              ARSENAL
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink name={link.name} href={link.href} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[var(--font-display)] text-xs font-semibold tracking-widest text-muted-foreground mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink name={link.name} href={link.href} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Shotgun Ninjas Productions, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
