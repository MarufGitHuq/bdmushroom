import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/api';

interface CartItem {
  key: string;
  id: number;
  name: string;
  slug: string;
  quantity: number;
  price: string;
  image: string;
  // To keep compatibility with existing components
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    images: { src: string }[];
  };
}

interface CartContextType {
  items: CartItem[];
  cartTotals: any;
  loading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  removeFromCart: (itemKey: string) => Promise<void>;
  getCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COCART_URL = `${API_URL}/wp-json/cocart/v2`;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartTotals, setCartTotals] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getCartKey = () => {
    let key = localStorage.getItem('bdm_cart_key');
    if (!key) {
      key = Math.random().toString(36).substring(2, 11);
      localStorage.setItem('bdm_cart_key', key);
    }
    return key;
  };

  const getCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${COCART_URL}/cart`, {
        params: { cart_key: getCartKey() }
      });

      const cocartItems = response.data.items || [];
      const mappedItems: CartItem[] = cocartItems.map((item: any) => ({
        key: item.item_key,
        id: item.id,
        name: item.name,
        slug: item.slug || '',
        quantity: item.quantity.value,
        price: (parseFloat(item.price) / 100).toString(), // CoCart usually returns in cents depending on config, but wc-api style is string
        image: item.featured_image,
        product: {
          id: item.id,
          name: item.name,
          slug: item.slug || '',
          price: (parseFloat(item.price) / 100).toString(),
          images: [{ src: item.featured_image }]
        }
      }));

      setItems(mappedItems);
      setCartTotals(response.data.totals);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    setLoading(true);
    try {
      await axios.post(`${COCART_URL}/cart/add-item`, {
        id: productId.toString(),
        quantity: quantity.toString(),
      }, {
        params: { cart_key: getCartKey() }
      });
      await getCart();
      setIsCartOpen(true); // Open drawer on add
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemKey: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemKey);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${COCART_URL}/cart/item/${itemKey}`, {
        quantity: quantity.toString(),
      }, {
        params: { cart_key: getCartKey() }
      });
      await getCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemKey: string) => {
    setLoading(true);
    try {
      await axios.delete(`${COCART_URL}/cart/item/${itemKey}`, {
        params: { cart_key: getCartKey() }
      });
      await getCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await axios.post(`${COCART_URL}/cart/clear`, {}, {
        params: { cart_key: getCartKey() }
      });
      setItems([]);
      setCartTotals(null);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    if (!cartTotals) return 0;
    return parseFloat(cartTotals.total) / 100 || 0; // CoCart totals are often in cents
  };

  const getCartCount = () => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{
      items,
      cartTotals,
      loading,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      getCart,
      getCartTotal,
      getCartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
