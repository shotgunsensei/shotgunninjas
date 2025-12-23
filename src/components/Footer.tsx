const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="font-display text-xl font-bold text-gradient tracking-wider">
              SHOTGUN NINJAS
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Unleash the Power of Creativity
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#products" className="hover:text-primary transition-colors">
              Products
            </a>
            <a href="#services" className="hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          
          <p className="text-muted-foreground text-sm">
            © {currentYear} Shotgun Ninjas Productions, LLC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
