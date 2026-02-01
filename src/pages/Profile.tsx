import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, LogOut, Package, Settings, Bell } from 'lucide-react';

const Profile = () => {
    const { user, logout, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 space-y-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <User className="w-12 h-12 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold">{user?.user_display_name}</h2>
                                    <p className="text-muted-foreground text-sm">{user?.user_email}</p>
                                </div>
                                <div className="mt-6 space-y-2">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Package className="w-4 h-4 mr-2" />
                                        My Orders
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Bell className="w-4 h-4 mr-2" />
                                        Notifications
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Account Settings
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={logout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Welcome back, {user?.user_display_name}!</CardTitle>
                                <CardDescription>
                                    Manage your orders, profile information and preferences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                                        <h3 className="font-semibold text-sm text-secondary mb-1">Total Orders</h3>
                                        <p className="text-2xl font-bold">0</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                        <h3 className="font-semibold text-sm text-primary mb-1">Loyalty Points</h3>
                                        <p className="text-2xl font-bold">150</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>You haven't placed any orders yet.</p>
                                    <Button variant="link" className="mt-2">Start Shopping</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
