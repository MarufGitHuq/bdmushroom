import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/bd-mushroom-logo.png";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground ml-16 md:ml-20">
      {/* Main Footer */}
      <div className="container mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src={logo} 
              alt="BD Mushroom" 
              className="h-20 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 leading-relaxed">
              Bangladesh's premier destination for organic mushrooms and farming supplies. 
              From farm to table, quality you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Fresh Mushrooms
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Dried Mushrooms
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Mushroom Powder
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Farming Equipment
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Grow Kits
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display text-xl mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  Mirpur-10, Dhaka 1216<br />Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+8801712345678" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  +880 1712 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@bdmushroom.com" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  info@bdmushroom.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/50">
              © 2024 BD Mushroom. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/50 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
