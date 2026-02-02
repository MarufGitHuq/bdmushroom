import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            toast({
                title: "Success",
                description: "You have been logged in successfully.",
            });
            onClose();
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: err.message || "Invalid credentials",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Customer Login</DialogTitle>
                    <DialogDescription>
                        Enter your credentials to access your BDMushroom account.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username or Email</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="example@email.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                        onClick={() => {
                            onClose();
                            window.location.href = '/register';
                        }}
                        className="text-primary font-semibold hover:underline"
                    >
                        Register
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
