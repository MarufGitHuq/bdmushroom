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
      setIsScrolled(window.scrollY > 20);
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

  const categories = [
    { name: "Fresh Mushrooms", slug: "fresh-mushrooms" },
    { name: "Dried Mushrooms", slug: "dried-mushrooms" },
    { name: "Mushroom Powder", slug: "mushroom-powder" },
    { name: "Growing Supplies", slug: "growing-supplies" }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Hidden button for Navbar communication */}
      <button
        id="side-nav-toggle"
        className="hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      />

      {/* Overlay for mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <nav className={cn(
        "fixed left-0 top-0 h-screen bg-secondary text-secondary-foreground z-[70] flex flex-col transition-all duration-300 shadow-2xl overflow-y-auto",
        isExpanded ? "w-[280px] translate-x-0" : "w-16 md:w-20 -translate-x-full md:translate-x-0"
      )}>
        {/* Header/Close on expanded */}
        <div className="p-6 flex items-center justify-between">
          {isExpanded && <span className="font-heading font-bold text-xl">Menu</span>}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center justify-center p-2 rounded-lg hover:bg-black/10 transition-colors",
              !isExpanded && "mx-auto"
            )}
          >
            {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-2 px-3 mt-4">
          <div className="text-[10px] uppercase tracking-wider text-secondary-foreground/40 font-bold mb-2 px-3">
            {isExpanded ? "Main Navigation" : "Main"}
          </div>
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsExpanded(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                isActive(to)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-black/5 text-secondary-foreground/80 hover:text-secondary-foreground"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {isExpanded && <span className="font-medium">{label}</span>}
            </Link>
          ))}

          {isExpanded && (
            <div className="mt-8 space-y-4">
              <div className="text-[10px] uppercase tracking-wider text-secondary-foreground/40 font-bold px-3">
                Shop Categories
              </div>
              <div className="grid gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsExpanded(false)}
                    className="px-3 py-2 text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="p-4 mt-auto border-t border-black/5">
          <div className={cn(
            "flex items-center gap-4",
            isExpanded ? "flex-row justify-start px-2" : "flex-col justify-center"
          )}>
            <a href="tel:+8801712345678" className="p-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <a href="mailto:info@bdmushroom.com" className="p-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            {isExpanded && (
              <div className="flex gap-2 ml-auto">
                <a href="#" className="p-2 hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="p-2 hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
