import { useState, useCallback } from 'react';
import axios from 'axios';
import { triggerN8N } from '@/services/automationService';

const AUTH_URL = import.meta.env.VITE_JWT_AUTH_URL;

interface User {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('bdm_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(AUTH_URL, {
                username,
                password,
            });

            const userData = response.data;
            setUser(userData);
            localStorage.setItem('bdm_user', JSON.stringify(userData));

            // Trigger Automation
            await triggerN8N('successful_login', {
                email: userData.user_email,
                name: userData.user_display_name,
                timestamp: new Date().toISOString()
            });

            return userData;
        } catch (err: any) {
            const msg = err.response?.data?.message || "Login failed";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('bdm_user');
    }, []);

    return { user, login, logout, loading, error, isAuthenticated: !!user };
};
