import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    User,
    LogOut,
    Package,
    Settings,
    LayoutDashboard,
    ShoppingBag,
    Clock,
    ChevronRight,
    HelpCircle,
    Calendar,
    Mail,
    UserCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SideNav from '@/components/SideNav';
import { getCustomerOrders, getCustomerByEmail } from '@/services/commerce-service';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const Profile = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
    const [orders, setOrders] = useState<any[]>([]);
    const [customerInfo, setCustomerInfo] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated && user?.user_email) {
                setLoading(true);
                try {
                    const customer = await getCustomerByEmail(user.user_email);
                    if (customer) {
                        setCustomerInfo(customer);
                        const customerOrders = await getCustomerOrders(customer.id);
                        setOrders(customerOrders);
                    }
                } catch (error) {
                    console.error("Failed to fetch profile data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [isAuthenticated, user]);

    if (!isAuthenticated) {
        return <Navigate to="/?login=true" replace />;
    }

    const triggerAISupport = (orderId?: number) => {
        const lastOrder = orderId || orders[0]?.id;
        const lastProducts = orders[0]?.line_items?.map((item: any) => item.name).join(', ');

        const event = new CustomEvent('open-ai-chat', {
            detail: {
                message: lastOrder
                    ? `I see you're growing mushrooms from order #${lastOrder}${lastProducts ? ` (${lastProducts})` : ''}—how is the humidity looking?`
                    : "I'm looking for some help with my mushroom cultivation!"
            }
        });
        window.dispatchEvent(event);
    };

    const renderOverview = () => (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-secondary/5 border-secondary/20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Package className="w-12 h-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{orders.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <UserCircle className="w-12 h-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Loyalty Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">150</div>
                    </CardContent>
                </Card>

                <Card className="bg-muted overflow-hidden relative border-border/50">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Clock className="w-12 h-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">2</div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Call to Action */}
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-xl font-bold">Need help with your crop?</h3>
                        <p className="text-primary-foreground/80 text-sm">Our Mushroom AI is trained on your specific order history to provide personalized cultivation advice.</p>
                    </div>
                    <Button
                        onClick={() => triggerAISupport()}
                        variant="secondary"
                        size="lg"
                        className="font-bold shadow-md hover:scale-105 transition-transform"
                    >
                        Get Growth Advice
                        <HelpCircle className="ml-2 w-5 h-5" />
                    </Button>
                </CardContent>
            </Card>

            {/* Recent Orders Sneak Peek */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Order</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>View All</Button>
                </CardHeader>
                <CardContent>
                    {orders.length > 0 ? (
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <Package className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <p className="font-bold">Order #{orders[0].id}</p>
                                    <p className="text-sm text-muted-foreground">{format(new Date(orders[0].date_created), 'MMM dd, yyyy')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant={orders[0].status === 'completed' ? 'default' : 'secondary'}>
                                    {orders[0].status}
                                </Badge>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-muted-foreground">
                            <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p>No orders yet</p>
                            <Button variant="link" asChild>
                                <Link to="/products">Start Shopping</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );

    const renderOrders = () => (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold font-heading">Order History</h2>
            {orders.length > 0 ? (
                <div className="grid gap-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-muted rounded-xl">
                                            <Package className="w-6 h-6 text-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Order #{order.id}</h3>
                                            <p className="text-sm text-muted-foreground">Placed on {format(new Date(order.date_created), 'PPP')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            className={cn(
                                                "capitalize px-3 py-1",
                                                order.status === 'completed' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                                                    order.status === 'processing' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                                                        "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                            )}
                                        >
                                            {order.status}
                                        </Badge>
                                        <p className="font-bold text-lg">৳{order.total}</p>
                                    </div>
                                </div>
                                <div className="border-t border-border pt-4">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Items</h4>
                                    <div className="space-y-2">
                                        {order.line_items.map((item: any) => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span>{item.name} <span className="text-muted-foreground">× {item.quantity}</span></span>
                                                <span className="font-medium">৳{item.total}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <Button variant="outline" size="sm" onClick={() => triggerAISupport(order.id)}>Get Growth Advice</Button>
                                    <Button size="sm">Download Invoice</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                    <CardTitle>No orders found</CardTitle>
                    <CardDescription className="mt-2">When you purchase from our farm, your orders will appear here.</CardDescription>
                    <Button className="mt-6" asChild>
                        <Link to="/products">Browse Fresh Mushrooms</Link>
                    </Button>
                </Card>
            )}
        </div>
    );

    const renderSettings = () => (
        <div className="space-y-6 animate-fade-in shadow-sm">
            <h2 className="text-2xl font-bold font-heading">Account Settings</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and how we contact you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={customerInfo?.first_name || ""}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={customerInfo?.last_name || ""}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={user?.user_email || ""}
                            readOnly
                        />
                    </div>
                    <Button disabled>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar />
            <SideNav />

            <div className="container mx-auto px-4 pt-28 pb-16 md:ml-20 transition-all duration-300">
                <div className="max-w-6xl mx-auto">
                    {/* Header / Hero */}
                    <div className="bg-primary text-primary-foreground rounded-3xl p-8 mb-8 relative overflow-hidden shadow-xl">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/10">
                                    {customerInfo?.avatar_url ? (
                                        <img src={customerInfo.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <User className="w-12 h-12" />
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold font-heading">Welcome back, {customerInfo?.first_name || user?.user_display_name}!</h1>
                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2 text-primary-foreground/80 font-medium">
                                            <Mail className="w-4 h-4" />
                                            {user?.user_email}
                                        </div>
                                        {customerInfo?.date_created && (
                                            <Badge variant="secondary" className="bg-white/20 text-white border-none gap-1 py-1">
                                                <Calendar className="w-3 h-3" />
                                                Member Since {format(new Date(customerInfo.date_created), 'yyyy')}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                onClick={logout}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button
                                onClick={() => triggerAISupport()}
                                className="bg-white text-primary hover:bg-white/90 font-bold"
                            >
                                <HelpCircle className="w-4 h-4 mr-2" />
                                Get Growth Advice
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-transparent border-white/30 text-white hover:bg-white/10"
                                onClick={() => setActiveTab('orders')}
                            >
                                <Package className="w-4 h-4 mr-2" />
                                View Orders
                            </Button>
                        </div>
                        {/* Decorative background mycelium-style patterns would go here */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Tab Sidebar / Navigation */}
                        <div className="w-full lg:w-64 space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                                    activeTab === 'overview' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                                )}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                                    activeTab === 'orders' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                                )}
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Order History
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                                    activeTab === 'settings' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                                )}
                            >
                                <Settings className="w-5 h-5" />
                                Account Settings
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-h-[500px]">
                            {loading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-40 w-full rounded-2xl" />
                                    <Skeleton className="h-64 w-full rounded-2xl" />
                                </div>
                            ) : (
                                <>
                                    {activeTab === 'overview' && renderOverview()}
                                    {activeTab === 'orders' && renderOrders()}
                                    {activeTab === 'settings' && renderSettings()}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
