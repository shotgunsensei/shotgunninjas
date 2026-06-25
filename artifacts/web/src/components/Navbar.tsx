import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import snpLogo from "@/assets/SNPlogo.png";
import { trackOutbound } from "@/lib/trackOutbound";

const productLinks = [
  { name: "Faultline Lab", href: "/faultline-lab" },
  { name: "Controversy Archive", href: "/controversy-archive" },
  { name: "TradeFlow Kit", href: "/tradeflow" },
  { name: "Tech Deck", href: "/techdeck" },
  { name: "PulseDesk", href: "/pulsedesk" },
  { name: "SnapProof OS", href: "/snapproof-os" },
  { name: "Ninjamation", href: "/ninjamation" },
  { name: "Torque Shed", href: "/torqueshed" },
  { name: "OperatorOS", href: "/operatoros" },
  { name: "PlayPack Pilot", href: "/playpackpilot" },
  { name: "BrandForge OS", href: "/brandforgeos" },
];

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Ninja Village", href: "https://shotgunninjavillage.com" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
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
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && productsOpen) {
        setProductsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [productsOpen]);

  useEffect(() => {
    setIsOpen(false);
    setMobileProductsOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (productsOpen) {
      const first = menuRef.current?.querySelector<HTMLAnchorElement>("a[role='menuitem']");
      first?.focus();
    }
  }, [productsOpen]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) =>
              link.href === "/" ? (
                <a
                  key={link.name}
                  href="/"
                  onClick={handleHomeClick}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${focusRing} ${
                    location.pathname === "/"
                      ? "text-primary"
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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground ${focusRing}`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${focusRing} ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={productsOpen}
                aria-controls="arsenal-menu"
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors text-primary ${focusRing}`}
              >
                Arsenal
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {productsOpen && (
                <div
                  ref={menuRef}
                  id="arsenal-menu"
                  role="menu"
                  aria-label="Arsenal — products"
                  className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl shadow-black/40 overflow-hidden py-1.5"
                >
                  {productLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      role="menuitem"
                      className={`block px-4 py-2 text-sm transition-colors ${focusRing} ${
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
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
            type="button"
            className={`lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground ${focusRing}`}
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
          className="lg:hidden bg-background border-t border-border"
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

            <button
              type="button"
              onClick={() => setMobileProductsOpen((v) => !v)}
              aria-expanded={mobileProductsOpen}
              aria-controls="mobile-arsenal"
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground ${focusRing}`}
            >
              Arsenal
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {mobileProductsOpen && (
              <div id="mobile-arsenal" className="pl-4 space-y-1">
                {productLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-3 py-2 rounded-md text-sm ${focusRing} ${
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
