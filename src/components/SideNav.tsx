import { Menu, Phone, Mail, Linkedin, Instagram, Facebook, Youtube, Twitter, Globe } from "lucide-react";
import logo from "@/assets/bd-mushroom-logo.png";

const SideNav = () => {
  return (
    <nav className="fixed left-0 top-0 h-screen w-16 md:w-20 bg-secondary z-50 flex flex-col items-center py-6 justify-between">
      {/* Top Section - Menu */}
      <div className="flex flex-col items-center gap-6">
        <button className="side-nav-icon">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Middle Section - Contact & Social */}
      <div className="flex flex-col items-center gap-4">
        <a href="tel:+8801712345678" className="side-nav-icon">
          <Phone className="w-4 h-4" />
        </a>
        <a href="mailto:info@bdmushroom.com" className="side-nav-icon">
          <Mail className="w-4 h-4" />
        </a>
        
        <div className="w-8 h-px bg-secondary-foreground/20 my-2" />
        
        <a href="#" className="side-nav-icon">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="#" className="side-nav-icon">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="#" className="side-nav-icon">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="#" className="side-nav-icon">
          <Youtube className="w-4 h-4" />
        </a>
        <a href="#" className="side-nav-icon">
          <Twitter className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom Section - Language */}
      <div className="flex flex-col items-center gap-4">
        <button className="side-nav-icon flex items-center gap-1">
          <Globe className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
