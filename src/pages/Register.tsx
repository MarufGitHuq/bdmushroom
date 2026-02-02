import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { registerUser } from "@/services/commerce-service";
import { triggerN8N } from "@/services/automationService";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }

        try {
            // 1. Register via WooCommerce API
            await registerUser({
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                password: formData.password,
            });

            // 2. Trigger Automation
            await triggerN8N("customer_registered", {
                email: formData.email,
                name: `${formData.first_name} ${formData.last_name}`,
                username: formData.username,
                timestamp: new Date().toISOString(),
            });

            toast({
                title: "Account created!",
                description: "Welcome to BDMushroom. Logging you in...",
            });

            // 3. Automatically login
            await login(formData.username, formData.password);

            // 4. Redirect
            navigate("/profile");

        } catch (err: any) {
            setError(err.message || "Something went wrong during registration");
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: err.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <SideNav />

            <main className="pt-24 pb-16 px-4 md:ml-20 transition-all duration-300">
                <div className="max-w-md mx-auto">
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-xl animate-fade-up">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-foreground">Create Account</h1>
                            <p className="text-muted-foreground mt-2">Join the BDMushroom community</p>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-lg mb-6 animate-shake">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        placeholder="John"
                                        required
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Doe"
                                        required
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="johndoe123"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="h-12"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="••••••"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base gap-2 mt-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Sign Up
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border text-center">
                            <p className="text-muted-foreground text-sm">
                                Already have an account?{" "}
                                <button
                                    onClick={() => {
                                        // This is a hacky way to open the login modal from another page, 
                                        // ideally we should use a global state or search params
                                        document.getElementById('user-login-trigger')?.click();
                                    }}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Register;
