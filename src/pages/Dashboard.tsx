import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, CheckCircle, XCircle, RefreshCw, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Order } from "@/types/commerce";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { mockProducts } from "@/services/commerce-service";

// Mock order history data
const mockOrders: Order[] = [
  {
    id: 1001,
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[3], quantity: 1 }
    ],
    total: "1250",
    status: "completed",
    shippingAddress: {
      firstName: "Rahim",
      lastName: "Ahmed",
      phone: "+8801712345678",
      email: "rahim@example.com",
      address: "House 12, Road 5, Dhanmondi",
      city: "Dhaka",
      postalCode: "1205"
    },
    createdAt: "2024-01-15T10:30:00Z",
    paymentMethod: "whatsapp"
  },
  {
    id: 1002,
    items: [
      { product: mockProducts[5], quantity: 1 },
      { product: mockProducts[6], quantity: 2 }
    ],
    total: "2350",
    status: "processing",
    shippingAddress: {
      firstName: "Rahim",
      lastName: "Ahmed",
      phone: "+8801712345678",
      email: "rahim@example.com",
      address: "House 12, Road 5, Dhanmondi",
      city: "Dhaka",
      postalCode: "1205"
    },
    createdAt: "2024-01-20T14:45:00Z",
    paymentMethod: "whatsapp"
  },
  {
    id: 1003,
    items: [
      { product: mockProducts[9], quantity: 1 }
    ],
    total: "1200",
    status: "pending",
    shippingAddress: {
      firstName: "Rahim",
      lastName: "Ahmed",
      phone: "+8801712345678",
      email: "rahim@example.com",
      address: "House 12, Road 5, Dhanmondi",
      city: "Dhaka",
      postalCode: "1205"
    },
    createdAt: "2024-01-25T09:15:00Z",
    paymentMethod: "whatsapp"
  }
];

const Dashboard = () => {
  const { addToCart } = useCart();
  const [orders] = useState<Order[]>(mockOrders);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], string> = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-amber-100 text-amber-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={`${variants[status]} capitalize`}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity);
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />
      
      <main className="ml-16 md:ml-20 pt-24">
        <div className="container mx-auto px-6 py-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">My Dashboard</h1>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
              <TabsTrigger 
                value="orders"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Package className="w-4 h-4 mr-2" />
                My Orders
              </TabsTrigger>
              <TabsTrigger 
                value="profile"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              {orders.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                  <Button asChild>
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div 
                      key={order.id} 
                      className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="p-4 md:p-6 border-b border-border bg-muted/30">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(order.status)}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReorder(order)}
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-4 md:p-6">
                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <Link to={`/product/${item.product.slug}`}>
                                <img
                                  src={item.product.images[0]?.src}
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link 
                                  to={`/product/${item.product.slug}`}
                                  className="font-medium hover:text-primary transition-colors line-clamp-1"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ৳{item.product.price}
                                </p>
                              </div>
                              <p className="font-medium">
                                ৳{(parseFloat(item.product.price) * item.quantity).toFixed(0)}
                              </p>
                            </div>
                          ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Order Total</span>
                          <span className="text-xl font-bold text-secondary">৳{order.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
                <h2 className="font-heading text-xl font-semibold mb-6">Profile Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">First Name</p>
                      <p className="font-medium">Rahim</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Last Name</p>
                      <p className="font-medium">Ahmed</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">rahim@example.com</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">+880 1712-345678</p>
                  </div>

                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Default Shipping Address</p>
                    <p className="font-medium">
                      House 12, Road 5, Dhanmondi<br />
                      Dhaka, 1205
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                  Note: Profile editing will be available once you create an account.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
