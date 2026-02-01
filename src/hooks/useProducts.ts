import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { mockProducts } from '@/services/commerce-service';

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    regular_price: string;
    sale_price: string;
    images: { src: string; alt: string }[];
    description: string;
    short_description: string;
    categories: { name: string }[];
    stock_status?: string;
    stock_quantity?: number | null;
    featured?: boolean;
    weight?: string;
    sku?: string;
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiFetch("products", {
                    per_page: 20,
                });

                if (!data || data.length === 0) {
                    throw new Error("No products returned from API");
                }

                setProducts(data);
                setIsOffline(false);
            } catch (err: any) {
                console.error("WooCommerce API Fetch Error Details:", {
                    message: err.message,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data,
                    config: err.config
                });

                setError(err.message || "Failed to fetch products");

                // Fallback to local data
                console.warn("Falling back to local dummy data.");
                setProducts(mockProducts as any);
                setIsOffline(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error, isOffline };
};
