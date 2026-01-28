import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, Mail, Instagram, Facebook, Youtube, Globe, ShoppingBag, BookOpen, LayoutDashboard, Home, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/products", icon: ShoppingBag, label: "Shop" },
    { to: "/library", icon: BookOpen, label: "Library" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <nav className={cn(
        "fixed left-0 top-0 h-screen bg-secondary z-50 flex flex-col items-center py-6 justify-center gap-4 transition-all duration-300",
        isExpanded ? "w-48" : "w-16 md:w-20"
      )}>
        {/* Top Section - Menu Toggle */}
        <div className="flex flex-col items-center gap-6 w-full">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="fixed top-6 z-[60] side-nav-icon text-white hover:bg-black/20"
          >
            {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-4 w-full px-2 mt-24">
            {navLinks.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsExpanded(false)}
                className={cn(
                  "w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive(to)
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isExpanded && <span className="text-sm font-medium">{label}</span>}
              </Link>
            ))}
          </div>
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
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="side-nav-icon">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="side-nav-icon">
            <Youtube className="w-4 h-4" />
          </a>

        </div>

        {/* Bottom Section - Language */}
        <div className="flex flex-col items-center gap-4">
          <button className="side-nav-icon flex items-center gap-1">
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
