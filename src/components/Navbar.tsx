import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";
import logo from "@/assets/bd-mushroom-logo.png";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "./LoginModal";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();

  const cartCount = getCartCount();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check for login query param
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === 'true' && !isAuthenticated) {
      setIsLoginModalOpen(true);
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated]);

  const handleUserClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm py-2 border-border h-16"
        : "bg-transparent py-4 h-20 md:h-24"
        }`}
    >
      <div className="container mx-auto h-full flex items-center px-4 md:px-6">
        {/* Left Section (Desktop: Spacer, Mobile: Logo) */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center md:hidden shrink-0">
            <img
              src={logo}
              alt="BD Mushroom"
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-10" : "h-12"}`}
            />
          </Link>
        </div>

        {/* Center Section (Desktop Only Logo) */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="BD Mushroom"
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-10 md:h-12" : "h-12 md:h-16"}`}
            />
          </Link>
        </div>

        {/* Right Section (Search, User, Cart, Menu) */}
        <div className="flex-1 flex items-center justify-end gap-0.5 md:gap-4">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-10 h-10 flex items-center justify-center text-[#656565] hover:text-primary transition-colors hover:shadow-sm rounded-full"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* User */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="w-10 h-10 flex items-center justify-center text-[#656565] hover:text-primary transition-colors hover:shadow-sm rounded-full"
              title={`Logged in as ${user?.user_display_name}`}
            >
              <User className="w-5 h-5 text-primary" />
            </Link>
          ) : (
            <button
              id="user-login-trigger"
              onClick={handleUserClick}
              className="w-10 h-10 flex items-center justify-center text-[#656565] hover:text-primary transition-colors hover:shadow-sm rounded-full"
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center text-[#656565] hover:text-primary transition-colors hover:shadow-sm rounded-full"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              const sideNavToggle = document.getElementById('side-nav-toggle');
              if (sideNavToggle) sideNavToggle.click();
            }}
            className="md:hidden w-10 h-10 ml-2 flex items-center justify-center bg-primary text-white rounded-lg shadow-md transition-transform active:scale-95"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

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
