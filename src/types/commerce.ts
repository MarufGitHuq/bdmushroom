// WooCommerce-compatible commerce types for BD Mushroom

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: ProductImage[];
  categories: ProductCategory[];
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  description: string;
  short_description: string;
  sku: string;
  weight: string;
  featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: ProductImage | null;
  count: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: string;
  paymentMethod: 'woocommerce' | 'whatsapp';
}

export interface MushroomSpecies {
  id: number;
  name: string;
  slug: string;
  scientificName: string;
  description: string;
  growingConditions: {
    temperature: string;
    humidity: string;
    light: string;
    substrate: string;
  };
  culinaryUses: string[];
  nutritionalInfo: {
    calories: string;
    protein: string;
    fiber: string;
    vitamins: string[];
  };
  image: string;
  relatedProductSlug: string;
}
