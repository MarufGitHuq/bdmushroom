import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🍄</span>
              </div>
              <span className="font-bold text-xl">BD Mushroom</span>
            </div>
            <p className="text-secondary-foreground/70 mb-6">
              Bangladesh's premier destination for organic mushrooms and farming supplies. 
              From farm to table, quality you can trust.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Fresh Mushrooms</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Dried Mushrooms</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Mushroom Powder</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Farming Equipment</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Grow Kits</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Track Order</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-secondary-foreground/70">
                  Mirpur-10, Dhaka 1216<br />Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+8801712345678" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  +880 1712 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@bdmushroom.com" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  info@bdmushroom.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © 2024 BD Mushroom. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
