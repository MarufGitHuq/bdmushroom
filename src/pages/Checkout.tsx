import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, MessageCircle, MapPin, User, Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { ShippingAddress } from "@/types/commerce";
import SideNav from "@/components/SideNav";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { useToast } from "@/hooks/use-toast";
import { triggerN8N } from "@/services/automationService";
import { z } from "zod";

const shippingSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  phone: z.string().trim().min(10, "Valid phone number is required").max(15),
  email: z.string().trim().email("Valid email is required").max(100),
  address: z.string().trim().min(10, "Full address is required").max(200),
  city: z.string().trim().min(2, "City is required").max(50),
  postalCode: z.string().trim().min(4, "Postal code is required").max(10),
  notes: z.string().trim().max(500).optional()
});

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'woocommerce' | 'whatsapp'>('whatsapp');
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getCartTotal();
  const shippingCost = total >= 1000 ? 0 : 60;
  const grandTotal = total + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const result = shippingSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const generateWhatsAppMessage = (): string => {
    const itemsList = items.map(item =>
      `• ${item.product.name} x ${item.quantity} = ৳${(parseFloat(item.product.price) * item.quantity).toFixed(0)}`
    ).join('\n');

    const message = `🍄 *New Order from BD Mushroom*

*Order Details:*
${itemsList}

*Subtotal:* ৳${total.toFixed(0)}
*Shipping:* ${shippingCost === 0 ? 'Free' : `৳${shippingCost}`}
*Total:* ৳${grandTotal.toFixed(0)}

*Shipping Address:*
${formData.firstName} ${formData.lastName}
${formData.address}
${formData.city}, ${formData.postalCode}

*Contact:*
📱 ${formData.phone}
📧 ${formData.email}

${formData.notes ? `*Notes:* ${formData.notes}` : ''}`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some products before checkout.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    if (paymentMethod === 'whatsapp') {
      // Open WhatsApp with pre-filled message
      const whatsappNumber = '8801712345678'; // Replace with actual BD Mushroom WhatsApp number
      const message = generateWhatsAppMessage();
      // Trigger Automation
      await triggerN8N('order_placed', {
        customer: formData,
        items: items.map(i => ({ name: i.product.name, qty: i.quantity, price: parseFloat(i.product.price) })),
        total: grandTotal,
        payment_method: paymentMethod,
        timestamp: new Date().toISOString()
      });

      // Clear cart and redirect
      clearCart();
      navigate('/order-confirmation');
    } else {
      // WooCommerce checkout redirect (placeholder for future integration)
      // In production, this would redirect to the actual WooCommerce checkout
      toast({
        title: "WooCommerce Integration",
        description: "This will redirect to WooCommerce checkout in production.",
      });

      // Simulate redirect
      setTimeout(() => {
        clearCart();
        navigate('/order-confirmation');
      }, 1500);
    }

    setIsSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SideNav />
        <Navbar />
        <CartDrawer />
        <main className="ml-16 md:ml-20 pt-24">
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="font-heading text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products before checkout.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />

      <main className="ml-16 md:ml-20 pt-24">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Info */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    Contact Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+880 1XXX-XXXXXX"
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    Shipping Address
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Full Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House/Flat, Road, Area"
                        className={errors.address ? 'border-destructive' : ''}
                      />
                      {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code *</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={errors.postalCode ? 'border-destructive' : ''}
                        />
                        {errors.postalCode && <p className="text-destructive text-sm mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-secondary" />
                    Payment Method
                  </h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as 'woocommerce' | 'whatsapp')}
                    className="space-y-4"
                  >
                    <label
                      className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'whatsapp' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                        }`}
                    >
                      <RadioGroupItem value="whatsapp" id="whatsapp" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium">
                          <MessageCircle className="w-5 h-5 text-green-600" />
                          Pay via WhatsApp
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Place your order via WhatsApp and pay upon delivery (Cash on Delivery)
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'woocommerce' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                        }`}
                    >
                      <RadioGroupItem value="woocommerce" id="woocommerce" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium">
                          <CreditCard className="w-5 h-5 text-primary" />
                          Complete Payment Online
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay securely via bKash, Nagad, or Card (Coming Soon)
                        </p>
                      </div>
                    </label>
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 border border-border sticky top-28">
                  <h2 className="font-heading text-xl font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.images[0]?.src}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-sm">
                          ৳{(parseFloat(item.product.price) * item.quantity).toFixed(0)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>৳{total.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? 'Free' : `৳${shippingCost}`}</span>
                    </div>
                    {total < 1000 && (
                      <p className="text-xs text-muted-foreground">
                        Add ৳{(1000 - total).toFixed(0)} more for free shipping!
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-secondary">৳{grandTotal.toFixed(0)}</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' :
                      paymentMethod === 'whatsapp' ? 'Order via WhatsApp' : 'Complete Payment'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
