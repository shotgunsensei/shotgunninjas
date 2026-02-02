import { Link } from "react-router-dom";
import snpLogo from "@/assets/SNPlogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-strong border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 h-20">
          <Link to="/" className="flex items-center gap-3 font-display text-xl font-bold text-gradient tracking-wider">
            <img src={snpLogo} alt="Shotgun Ninjas Logo" className="h-10 w-auto" />
            SHOTGUN NINJAS
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              Services
            </Link>
            <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              Portfolio
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              About
            </Link>
            <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              Contact
            </a>
          </div>
          
          <p className="text-muted-foreground text-sm font-medium">
            © {currentYear} Shotgun Ninjas Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
