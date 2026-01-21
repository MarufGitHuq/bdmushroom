import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Search, MapPin, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Dhaka");

  const cities = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🍄</span>
            </div>
            <span className="font-bold text-xl text-foreground">BD Mushroom</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Fresh
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Dry
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Powder
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Farming Tools
            </a>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* City Selector */}
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 cursor-pointer transition-colors">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{selectedCity}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Search */}
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                3
              </span>
            </Button>

            <Button variant="organic" size="sm">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Fresh
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Dry
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Powder
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Farming Tools
              </a>
              <div className="pt-4 border-t border-border flex gap-3">
                <Button variant="organic" className="flex-1">
                  Sign In
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
