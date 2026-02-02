// Mock WooCommerce REST API Service
// Designed to match /wp-json/wc/v3 response format for easy migration

import { Product, Category, MushroomSpecies } from '@/types/commerce';
import productFresh from '@/assets/product-fresh.jpg';
import productDry from '@/assets/product-dry.jpg';
import productPowder from '@/assets/product-powder.jpg';
import productEquipment from '@/assets/product-equipment.jpg';

// Mock Products matching WooCommerce REST API structure
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Fresh Oyster Mushroom",
    slug: "fresh-oyster-mushroom",
    price: "350",
    regular_price: "400",
    sale_price: "350",
    images: [{ id: 1, src: productFresh, alt: "Fresh Oyster Mushroom" }],
    categories: [{ id: 1, name: "Fresh Mushrooms", slug: "fresh-mushrooms" }],
    stock_status: "instock",
    stock_quantity: 50,
    description: "Farm-fresh oyster mushrooms harvested daily. Perfect for stir-fries, soups, and gourmet dishes. Our oyster mushrooms are grown using organic methods without any pesticides.",
    short_description: "Farm-fresh oyster mushrooms, harvested daily for maximum freshness.",
    sku: "FRESH-OYS-001",
    weight: "500g",
    featured: true
  },
  {
    id: 2,
    name: "Fresh Shiitake Mushroom",
    slug: "fresh-shiitake-mushroom",
    price: "450",
    regular_price: "450",
    sale_price: "",
    images: [{ id: 2, src: productFresh, alt: "Fresh Shiitake Mushroom" }],
    categories: [{ id: 1, name: "Fresh Mushrooms", slug: "fresh-mushrooms" }],
    stock_status: "instock",
    stock_quantity: 30,
    description: "Premium shiitake mushrooms with rich umami flavor. Excellent for Asian cuisine, soups, and medicinal preparations.",
    short_description: "Premium shiitake with rich umami flavor.",
    sku: "FRESH-SHI-001",
    weight: "500g",
    featured: true
  },
  {
    id: 3,
    name: "Fresh Button Mushroom",
    slug: "fresh-button-mushroom",
    price: "280",
    regular_price: "280",
    sale_price: "",
    images: [{ id: 3, src: productFresh, alt: "Fresh Button Mushroom" }],
    categories: [{ id: 1, name: "Fresh Mushrooms", slug: "fresh-mushrooms" }],
    stock_status: "instock",
    stock_quantity: 100,
    description: "Classic white button mushrooms, perfect for everyday cooking. Versatile and delicious in salads, pizzas, and pasta dishes.",
    short_description: "Classic white button mushrooms for everyday cooking.",
    sku: "FRESH-BTN-001",
    weight: "500g",
    featured: false
  },
  {
    id: 4,
    name: "Dried Shiitake Mushroom",
    slug: "dried-shiitake-mushroom",
    price: "550",
    regular_price: "600",
    sale_price: "550",
    images: [{ id: 4, src: productDry, alt: "Dried Shiitake Mushroom" }],
    categories: [{ id: 2, name: "Dried Mushrooms", slug: "dried-mushrooms" }],
    stock_status: "instock",
    stock_quantity: 80,
    description: "Sun-dried shiitake mushrooms with concentrated flavor. Rehydrate in warm water for 20 minutes before use. Long shelf life.",
    short_description: "Sun-dried shiitake with concentrated flavor.",
    sku: "DRY-SHI-001",
    weight: "100g",
    featured: true
  },
  {
    id: 5,
    name: "Dried Black Fungus",
    slug: "dried-black-fungus",
    price: "380",
    regular_price: "380",
    sale_price: "",
    images: [{ id: 5, src: productDry, alt: "Dried Black Fungus" }],
    categories: [{ id: 2, name: "Dried Mushrooms", slug: "dried-mushrooms" }],
    stock_status: "instock",
    stock_quantity: 60,
    description: "Premium wood ear mushrooms, also known as black fungus. Popular in Chinese cuisine for soups and stir-fries.",
    short_description: "Premium wood ear mushrooms for Asian cuisine.",
    sku: "DRY-BLK-001",
    weight: "50g",
    featured: false
  },
  {
    id: 6,
    name: "Reishi Mushroom Powder",
    slug: "reishi-mushroom-powder",
    price: "850",
    regular_price: "950",
    sale_price: "850",
    images: [{ id: 6, src: productPowder, alt: "Reishi Mushroom Powder" }],
    categories: [{ id: 3, name: "Mushroom Powder", slug: "mushroom-powder" }],
    stock_status: "instock",
    stock_quantity: 40,
    description: "Pure reishi mushroom powder for immune support. Add to smoothies, tea, or coffee. Known as the 'Mushroom of Immortality'.",
    short_description: "Pure reishi powder for immune support.",
    sku: "PWD-REI-001",
    weight: "100g",
    featured: true
  },
  {
    id: 7,
    name: "Lion's Mane Powder",
    slug: "lions-mane-powder",
    price: "750",
    regular_price: "750",
    sale_price: "",
    images: [{ id: 7, src: productPowder, alt: "Lion's Mane Powder" }],
    categories: [{ id: 3, name: "Mushroom Powder", slug: "mushroom-powder" }],
    stock_status: "instock",
    stock_quantity: 25,
    description: "Lion's Mane mushroom powder for cognitive health. Supports brain function and nerve health. Add to your daily wellness routine.",
    short_description: "Lion's Mane powder for cognitive health.",
    sku: "PWD-LIO-001",
    weight: "100g",
    featured: false
  },
  {
    id: 8,
    name: "Oyster Mushroom Spawn",
    slug: "oyster-mushroom-spawn",
    price: "200",
    regular_price: "200",
    sale_price: "",
    images: [{ id: 8, src: productEquipment, alt: "Oyster Mushroom Spawn" }],
    categories: [{ id: 4, name: "Growing Supplies", slug: "growing-supplies" }],
    stock_status: "instock",
    stock_quantity: 200,
    description: "High-quality oyster mushroom spawn for home cultivation. Easy to grow, suitable for beginners. Each bag can produce 2-3 harvests.",
    short_description: "High-quality spawn for home cultivation.",
    sku: "SPW-OYS-001",
    weight: "500g",
    featured: false
  },
  {
    id: 9,
    name: "Shiitake Mushroom Spawn",
    slug: "shiitake-mushroom-spawn",
    price: "250",
    regular_price: "250",
    sale_price: "",
    images: [{ id: 9, src: productEquipment, alt: "Shiitake Mushroom Spawn" }],
    categories: [{ id: 4, name: "Growing Supplies", slug: "growing-supplies" }],
    stock_status: "onbackorder",
    stock_quantity: 0,
    description: "Premium shiitake spawn for log or bag cultivation. Requires patience but produces gourmet quality mushrooms.",
    short_description: "Premium spawn for shiitake cultivation.",
    sku: "SPW-SHI-001",
    weight: "500g",
    featured: false
  },
  {
    id: 10,
    name: "Mushroom Growing Kit",
    slug: "mushroom-growing-kit",
    price: "1200",
    regular_price: "1500",
    sale_price: "1200",
    images: [{ id: 10, src: productEquipment, alt: "Mushroom Growing Kit" }],
    categories: [{ id: 4, name: "Growing Supplies", slug: "growing-supplies" }],
    stock_status: "instock",
    stock_quantity: 15,
    description: "Complete mushroom growing kit for beginners. Includes substrate, spawn, humidity tent, and detailed instructions. Start growing in 7 days!",
    short_description: "Complete kit for beginners to start growing.",
    sku: "KIT-GRW-001",
    weight: "2kg",
    featured: true
  },
  {
    id: 11,
    name: "Cordyceps Powder",
    slug: "cordyceps-powder",
    price: "1100",
    regular_price: "1100",
    sale_price: "",
    images: [{ id: 11, src: productPowder, alt: "Cordyceps Powder" }],
    categories: [{ id: 3, name: "Mushroom Powder", slug: "mushroom-powder" }],
    stock_status: "outofstock",
    stock_quantity: 0,
    description: "Premium cordyceps militaris powder for energy and endurance. Popular among athletes for natural performance enhancement.",
    short_description: "Cordyceps powder for energy and endurance.",
    sku: "PWD-COR-001",
    weight: "100g",
    featured: false
  },
  {
    id: 12,
    name: "Fresh King Oyster Mushroom",
    slug: "fresh-king-oyster-mushroom",
    price: "480",
    regular_price: "480",
    sale_price: "",
    images: [{ id: 12, src: productFresh, alt: "Fresh King Oyster Mushroom" }],
    categories: [{ id: 1, name: "Fresh Mushrooms", slug: "fresh-mushrooms" }],
    stock_status: "instock",
    stock_quantity: 20,
    description: "Large king oyster mushrooms with meaty texture. Perfect for grilling, roasting, or as a meat substitute. Thick stems with excellent umami.",
    short_description: "Meaty king oysters perfect for grilling.",
    sku: "FRESH-KOY-001",
    weight: "400g",
    featured: false
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Fresh Mushrooms",
    slug: "fresh-mushrooms",
    image: { id: 1, src: productFresh, alt: "Fresh Mushrooms" },
    count: 4,
    description: "Farm-fresh mushrooms harvested daily"
  },
  {
    id: 2,
    name: "Dried Mushrooms",
    slug: "dried-mushrooms",
    image: { id: 2, src: productDry, alt: "Dried Mushrooms" },
    count: 2,
    description: "Long-lasting dried mushrooms with concentrated flavor"
  },
  {
    id: 3,
    name: "Mushroom Powder",
    slug: "mushroom-powder",
    image: { id: 3, src: productPowder, alt: "Mushroom Powder" },
    count: 3,
    description: "Medicinal mushroom powders for health benefits"
  },
  {
    id: 4,
    name: "Growing Supplies",
    slug: "growing-supplies",
    image: { id: 4, src: productEquipment, alt: "Growing Supplies" },
    count: 3,
    description: "Everything you need to grow mushrooms at home"
  }
];

// Mock Mushroom Library
export const mockMushroomLibrary: MushroomSpecies[] = [
  {
    id: 1,
    name: "Oyster Mushroom",
    slug: "oyster-mushroom",
    scientificName: "Pleurotus ostreatus",
    description: "Oyster mushrooms are one of the most popular edible mushrooms worldwide. They have a mild, slightly sweet flavor and a velvety texture. Named for their oyster-shaped caps, they grow in shelf-like clusters on dead or dying hardwood trees.",
    growingConditions: {
      temperature: "18-24°C",
      humidity: "80-95%",
      light: "Indirect sunlight, 12 hours",
      substrate: "Straw, coffee grounds, hardwood sawdust"
    },
    culinaryUses: ["Stir-fries", "Soups", "Grilled dishes", "Pasta", "Risotto"],
    nutritionalInfo: {
      calories: "33 per 100g",
      protein: "3.3g",
      fiber: "2.3g",
      vitamins: ["B1", "B2", "B5", "D2"]
    },
    image: productFresh,
    relatedProductSlug: "fresh-oyster-mushroom"
  },
  {
    id: 2,
    name: "Shiitake Mushroom",
    slug: "shiitake-mushroom",
    scientificName: "Lentinula edodes",
    description: "Shiitake mushrooms are native to East Asia and have been cultivated for over 1,000 years. They have a rich, savory umami flavor and meaty texture. In addition to culinary uses, shiitake has been used in traditional medicine.",
    growingConditions: {
      temperature: "15-21°C",
      humidity: "75-85%",
      light: "Low to moderate indirect light",
      substrate: "Hardwood logs or sawdust blocks"
    },
    culinaryUses: ["Asian soups", "Stir-fries", "Sushi", "Dried for seasoning", "Tea"],
    nutritionalInfo: {
      calories: "34 per 100g",
      protein: "2.2g",
      fiber: "2.5g",
      vitamins: ["B2", "B5", "B6", "D2"]
    },
    image: productFresh,
    relatedProductSlug: "fresh-shiitake-mushroom"
  },
  {
    id: 3,
    name: "Reishi Mushroom",
    slug: "reishi-mushroom",
    scientificName: "Ganoderma lucidum",
    description: "Known as the 'Mushroom of Immortality' in Chinese medicine, reishi has been used for thousands of years for its potential health benefits. It has a woody, bitter taste and is typically consumed as a tea or powder supplement.",
    growingConditions: {
      temperature: "20-30°C",
      humidity: "90-95%",
      light: "Low light conditions",
      substrate: "Hardwood logs or supplemented sawdust"
    },
    culinaryUses: ["Tea", "Powder supplements", "Tinctures", "Capsules"],
    nutritionalInfo: {
      calories: "Low (consumed in small amounts)",
      protein: "Trace",
      fiber: "High in beta-glucans",
      vitamins: ["B vitamins", "Triterpenes", "Polysaccharides"]
    },
    image: productPowder,
    relatedProductSlug: "reishi-mushroom-powder"
  },
  {
    id: 4,
    name: "Lion's Mane Mushroom",
    slug: "lions-mane-mushroom",
    scientificName: "Hericium erinaceus",
    description: "Lion's Mane is distinctive for its long, flowing white spines that resemble a lion's mane. It's gaining popularity for potential cognitive health benefits and has a mild, slightly sweet flavor similar to seafood.",
    growingConditions: {
      temperature: "18-24°C",
      humidity: "85-95%",
      light: "Indirect light",
      substrate: "Hardwood sawdust or logs"
    },
    culinaryUses: ["Sautéed as a meat substitute", "Soup", "Powder supplement", "Tea"],
    nutritionalInfo: {
      calories: "35 per 100g",
      protein: "2.5g",
      fiber: "2.4g",
      vitamins: ["B vitamins", "Hericenones", "Erinacines"]
    },
    image: productPowder,
    relatedProductSlug: "lions-mane-powder"
  },
  {
    id: 5,
    name: "King Oyster Mushroom",
    slug: "king-oyster-mushroom",
    scientificName: "Pleurotus eryngii",
    description: "The King Oyster is the largest species in the oyster mushroom family. It has a thick, meaty white stem and small brown cap. The texture is firm and chewy, making it an excellent meat substitute.",
    growingConditions: {
      temperature: "15-21°C",
      humidity: "80-90%",
      light: "Moderate indirect light",
      substrate: "Straw or sawdust with supplements"
    },
    culinaryUses: ["Grilling", "Roasting", "Scallop substitute", "Stir-fry", "BBQ"],
    nutritionalInfo: {
      calories: "35 per 100g",
      protein: "3.3g",
      fiber: "2.5g",
      vitamins: ["B1", "B2", "B3", "D2"]
    },
    image: productFresh,
    relatedProductSlug: "fresh-king-oyster-mushroom"
  }
];

import { apiFetch } from '@/lib/api';

// API Functions (matching WooCommerce REST API patterns)

export async function getProducts(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
  per_page?: number;
  orderby?: 'price' | 'name' | 'date' | 'id' | 'include' | 'title' | 'slug';
  order?: 'asc' | 'desc';
}): Promise<Product[]> {
  try {
    const data = await apiFetch("products", {
      ...params,
      category: params?.category ? params.category : undefined,
    });
    return data;
  } catch (error) {
    console.error('getProducts failed, using mock data:', error);
    // Basic filtering for mock products to simulate API behavior
    let filtered = [...mockProducts];
    if (params?.category) {
      filtered = filtered.filter(p => p.categories.some(c => c.slug === params.category));
    }
    return filtered as any;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await apiFetch("products", {
      slug: slug
    });
    return data[0] || null;
  } catch (error) {
    console.error('getProductBySlug failed, using mock data:', error);
    return mockProducts.find(p => p.slug === slug) as any || null;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const data = await apiFetch(`products/${id}`);
    return data;
  } catch (error) {
    console.error('getProductById failed, using mock data:', error);
    return mockProducts.find(p => p.id === id) as any || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiFetch("products/categories", {
      per_page: 100,
      hide_empty: true
    });
    return data;
  } catch (error) {
    console.error('getCategories failed, using mock data:', error);
    return mockCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await apiFetch("products/categories", {
      slug: slug
    });
    return data[0] || null;
  } catch (error) {
    console.error('getCategoryBySlug failed, using mock data:', error);
    return mockCategories.find(c => c.slug === slug) || null;
  }
}

export async function checkInventory(productId: number): Promise<{
  inStock: boolean;
  quantity: number | null;
  status: 'instock' | 'outofstock' | 'onbackorder';
}> {
  try {
    const product = await getProductById(productId);
    if (!product) {
      return { inStock: false, quantity: 0, status: 'outofstock' };
    }

    return {
      inStock: product.stock_status === 'instock',
      quantity: product.stock_quantity,
      status: product.stock_status as any
    };
  } catch (error) {
    const product = mockProducts.find(p => p.id === productId);
    return {
      inStock: product?.stock_status === 'instock',
      quantity: product?.stock_quantity ?? 0,
      status: (product?.stock_status as any) || 'outofstock'
    };
  }
}

export async function getMushroomLibrary(): Promise<MushroomSpecies[]> {
  return mockMushroomLibrary;
}

export async function getMushroomBySlug(slug: string): Promise<MushroomSpecies | null> {
  return mockMushroomLibrary.find(m => m.slug === slug) || null;
}

export async function getRelatedProducts(productId: number, limit: number = 4): Promise<Product[]> {
  try {
    const data = await apiFetch("products", {
      exclude: [productId.toString()],
      per_page: limit
    });
    return data;
  } catch (error) {
    const categorySlug = mockProducts.find(p => p.id === productId)?.categories[0]?.slug;
    return mockProducts
      .filter(p => p.id !== productId && p.categories.some(c => c.slug === categorySlug))
      .slice(0, limit) as any;
  }
}
export async function registerUser(userData: {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
}): Promise<any> {
  try {
    const data = await apiFetch("customers", {}, "POST", userData);
    return data;
  } catch (error: any) {
    console.error('registerUser failed:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Registration failed. Please try again later.");
  }
}

export async function getCustomerOrders(customerId: number): Promise<any[]> {
  try {
    const data = await apiFetch("orders", { customer: customerId });
    return data;
  } catch (error) {
    console.error('getCustomerOrders failed, returning empty list:', error);
    return [];
  }
}

export async function getCustomerByEmail(email: string): Promise<any | null> {
  try {
    const data = await apiFetch("customers", { email: email });
    return data[0] || null;
  } catch (error) {
    console.error('getCustomerByEmail failed:', error);
    return null;
  }
}
