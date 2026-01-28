import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import CartDrawer from "@/components/CartDrawer";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />
      
      <main className="ml-16 md:ml-20 pt-24">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            {/* Thank You Message */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank You for Your Order!
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8">
              Your order has been placed successfully. We've received your order and will contact you shortly to confirm the details.
            </p>

            {/* Order Info */}
            <div className="bg-card rounded-xl p-6 border border-border mb-8">
              <h2 className="font-heading text-lg font-semibold mb-4">What's Next?</h2>
              <ul className="text-left space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-sm font-bold text-secondary">1</span>
                  <span>Our team will verify your order details</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-sm font-bold text-secondary">2</span>
                  <span>We'll confirm availability and delivery time via WhatsApp/Phone</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-sm font-bold text-secondary">3</span>
                  <span>Your fresh mushrooms will be delivered to your doorstep</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Support Info */}
            <p className="text-sm text-muted-foreground mt-8">
              Have questions? Contact us at{' '}
              <a href="tel:+8801712345678" className="text-primary hover:underline">
                +880 1712-345678
              </a>{' '}
              or{' '}
              <a href="mailto:info@bdmushroom.com" className="text-primary hover:underline">
                info@bdmushroom.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
