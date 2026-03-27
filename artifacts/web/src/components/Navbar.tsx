import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
];

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Sound Studio", href: "/soundstudio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileProductsOpen(false);
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" onClick={handleHomeClick} className="flex items-center gap-3">
            <img src={snpLogo} alt="SNP" className="h-8 w-8" />
            <span className="font-[var(--font-display)] text-sm font-bold tracking-wider text-foreground hidden sm:block">
              SHOTGUN NINJAS
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) =>
              link.href === "/" ? (
                <a
                  key={link.name}
                  href="/"
                  onClick={handleHomeClick}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  productLinks.some((p) => location.pathname === p.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Arsenal
                <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl py-2 z-50">
                  {productLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setProductsOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {mainLinks.map((link) =>
              link.href === "/" ? (
                <a
                  key={link.name}
                  href="/"
                  onClick={handleHomeClick}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                    location.pathname === "/"
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                    location.pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Arsenal
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileProductsOpen && (
              <div className="pl-4 space-y-1">
                {productLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-3 py-2 rounded-md text-sm ${
                      location.pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
