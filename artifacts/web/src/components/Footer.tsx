import { Link } from "react-router-dom";
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
  { name: "SnapProof OS", href: "/snapproof-os" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Sound Studio", href: "/soundstudio" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
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
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
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
