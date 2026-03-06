import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import snpLogo from "@/assets/SNPlogo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "OperatorOS", href: "/operatoros" },
  { name: "Tech Deck", href: "/techdeck" },
  { name: "TradeFlow Kit", href: "/tradeflow" },
  { name: "Torque Shed", href: "/torqueshed" },
  { name: "Neon Racer", href: "/neonracer" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

  const renderNavLink = (link: { name: string; href: string }) => {
    const isHome = link.href === "/";
    const isActive = location.pathname === link.href;

    if (isHome) {
      return (
        <a
          key={link.name}
          href="/"
          className={`transition-colors duration-300 font-medium text-xs tracking-widest uppercase ${
            location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
          }`}
          onClick={handleHomeClick}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.href}
        className={`transition-colors duration-300 font-medium text-xs tracking-widest uppercase ${
          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-3 font-display text-lg font-bold text-gradient tracking-wider"
          >
            <img src={snpLogo} alt="Shotgun Ninjas" className="h-8 w-auto" />
            <span className="hidden sm:inline">SNP</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(renderNavLink)}
            {!loading && (
              user ? (
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {user.email?.split('@')[0]}
                  </span>
                  <Button variant="outline" size="sm" onClick={signOut} className="gap-1 text-xs">
                    <LogOut className="h-3 w-3" />
                    Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="hero" size="sm" className="text-xs">Sign In</Button>
                </Link>
              )
            )}
          </div>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isHome = link.href === "/";
                const isActive = location.pathname === link.href;

                if (isHome) {
                  return (
                    <a
                      key={link.name}
                      href="/"
                      className={`transition-colors duration-300 font-medium py-2 text-sm tracking-widest uppercase ${
                        location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={handleHomeClick}
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`transition-colors duration-300 font-medium py-2 text-sm tracking-widest uppercase ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {!loading && (
                user ? (
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <span className="text-muted-foreground text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user.email?.split('@')[0]}
                    </span>
                    <Button variant="outline" onClick={() => { signOut(); setIsOpen(false); }} className="gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" className="mt-4 w-full">Sign In</Button>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
