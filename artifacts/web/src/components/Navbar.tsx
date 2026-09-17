import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import snpLogo from "@/assets/SNPlogo.png";
import { trackOutbound } from "@/lib/trackOutbound";

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "OperatorOS", href: "/operatoros" },
  { name: "Controversy Archive", href: "/controversy-archive" },
  { name: "Sound Studio", href: "/soundstudio" },
  { name: "Neon Racer", href: "https://neonracer.net" },
  { name: "Play Pack Pilot", href: "https://playpackpilot.com" },
  { name: "Ninja DAW", href: "https://shotgunninjas.studio" },
  { name: "Ninja Village", href: "https://shotgunninjavillage.com" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function ShurikenSeparator() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0 text-primary drop-shadow-[0_0_4px_rgba(239,0,0,0.7)]"
      fill="currentColor"
    >
      <path d="M12 1.5c1.7 3.2 2.2 5.8 1.4 7.7 1.9-.8 4.5-.3 7.7 1.4-3.2 1.7-5.8 2.2-7.7 1.4.8 1.9.3 4.5-1.4 7.7-1.7-3.2-2.2-5.8-1.4-7.7-1.9.8-4.5.3-7.7-1.4 3.2-1.7 5.8-2.2 7.7-1.4C9.8 7.3 10.3 4.7 12 1.5Z" />
      <circle cx="12" cy="10.6" r="1.65" className="fill-background" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="w-full px-4 sm:px-5 2xl:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="/"
            onClick={handleHomeClick}
            className={`flex items-center gap-3 rounded-md ${focusRing}`}
            aria-label="Shotgun Ninjas — Home"
          >
            <img src={snpLogo} alt="" className="h-8 w-8" />
            <span className="font-[var(--font-display)] text-sm font-bold tracking-wider text-foreground hidden sm:block">
              SHOTGUN NINJAS
            </span>
          </a>

          <div className="hidden xl:flex min-w-0 items-center justify-end">
            {mainLinks.map((link, index) => (
              <div key={link.name} className="flex shrink-0 items-center">
                {index > 0 && <ShurikenSeparator />}
                {link.href === "/" ? (
                  <a
                    href="/"
                    onClick={handleHomeClick}
                    className={`whitespace-nowrap px-1.5 2xl:px-2.5 py-2 rounded-md text-xs 2xl:text-sm font-medium transition-colors ${focusRing} ${
                      location.pathname === "/"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                ) : link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutbound(link.href, `navbar:${link.name}`)}
                    className={`whitespace-nowrap px-1.5 2xl:px-2.5 py-2 rounded-md text-xs 2xl:text-sm font-medium transition-colors text-muted-foreground hover:text-foreground ${focusRing}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`whitespace-nowrap px-1.5 2xl:px-2.5 py-2 rounded-md text-xs 2xl:text-sm font-medium transition-colors ${focusRing} ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`xl:hidden p-2 rounded-md text-muted-foreground hover:text-foreground ${focusRing}`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden bg-background border-t border-border"
        >
          <div className="px-4 py-3 space-y-1">
            {mainLinks.map((link) =>
              link.href === "/" ? (
                <a
                  key={link.name}
                  href="/"
                  onClick={handleHomeClick}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium ${focusRing} ${
                    location.pathname === "/"
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              ) : link.href.startsWith("http") ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(link.href, `navbar:${link.name}`)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground ${focusRing}`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium ${focusRing} ${
                    location.pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
