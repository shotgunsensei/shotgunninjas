import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import snpLogo from "@/assets/SNPlogo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/#contact" },
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

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // If it's a hash link and we're on the home page, scroll to section
    if (href.startsWith("/#") && location.pathname === "/") {
      const sectionId = href.replace("/#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderNavLink = (link: { name: string; href: string }) => {
    const isHashLink = link.href.startsWith("/#");
    const isHome = link.href === "/";
    const isActive = location.pathname === link.href;
    
    // Special handling for Home link
    if (isHome) {
      return (
        <a
          key={link.name}
          href="/"
          className={`transition-colors duration-300 font-medium text-sm tracking-wide ${
            location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
          }`}
          onClick={handleHomeClick}
        >
          {link.name}
        </a>
      );
    }
    
    // Hash links (like /#contact)
    if (isHashLink) {
      if (location.pathname === "/") {
        return (
          <a
            key={link.name}
            href={link.href.replace("/", "")}
            className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium text-sm tracking-wide"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        );
      }
      return (
        <Link
          key={link.name}
          to={link.href}
          className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium text-sm tracking-wide"
          onClick={() => handleNavClick(link.href)}
        >
          {link.name}
        </Link>
      );
    }
    
    // Regular page links
    return (
      <Link
        key={link.name}
        to={link.href}
        className={`transition-colors duration-300 font-medium text-sm tracking-wide ${
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
        <div className="flex items-center justify-between h-20">
          <a 
            href="/" 
            onClick={handleHomeClick}
            className="flex items-center gap-3 font-display text-xl font-bold text-gradient tracking-wider"
          >
            <img src={snpLogo} alt="Shotgun Ninjas Logo" className="h-10 w-auto" />
            SHOTGUN NINJAS
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(renderNavLink)}
            {!loading && (
              user ? (
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.email?.split('@')[0]}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={signOut}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="hero" size="sm">
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isHashLink = link.href.startsWith("/#");
                const isHome = link.href === "/";
                const isActive = location.pathname === link.href;
                
                // Special handling for Home link
                if (isHome) {
                  return (
                    <a
                      key={link.name}
                      href="/"
                      className={`transition-colors duration-300 font-medium py-2 ${
                        location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={handleHomeClick}
                    >
                      {link.name}
                    </a>
                  );
                }
                
                if (isHashLink && location.pathname === "/") {
                  return (
                    <a
                      key={link.name}
                      href={link.href.replace("/", "")}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`transition-colors duration-300 font-medium py-2 ${
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
                    <Button
                      variant="outline"
                      onClick={() => { signOut(); setIsOpen(false); }}
                      className="gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" className="mt-4 w-full">
                      Sign In
                    </Button>
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
