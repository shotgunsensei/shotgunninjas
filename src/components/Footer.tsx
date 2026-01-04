import snpLogo from "@/assets/SNPlogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-strong border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 h-20">
          <a href="#home" className="flex items-center gap-3 font-display text-xl font-bold text-gradient tracking-wider">
            <img src={snpLogo} alt="Shotgun Ninjas Logo" className="h-10 w-auto" />
            SHOTGUN NINJAS
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#products" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              Products
            </a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              Services
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium tracking-wide">
              Contact
            </a>
          </div>
          
          <p className="text-muted-foreground text-sm font-medium">
            © {currentYear} Shotgun Ninjas Productions, LLC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
