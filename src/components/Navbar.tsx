import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import logo from "@/assets/bd-mushroom-logo.png";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  
  const cartCount = getCartCount();

  return (
    <header className="fixed top-0 left-16 md:left-20 right-0 z-40 bg-transparent">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo - Centered */}
        <div className="flex-1" />
        
        <Link to="/" className="flex items-center justify-center">
          <img 
            src={logo} 
            alt="BD Mushroom - All About Mushroom" 
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {/* Search */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-10 h-10 flex items-center justify-center text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* User */}
          <Link 
            to="/dashboard"
            className="w-10 h-10 flex items-center justify-center text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md p-6 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for mushrooms, equipment..."
              className="w-full h-14 px-6 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
