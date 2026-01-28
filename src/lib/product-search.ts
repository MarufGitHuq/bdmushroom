// AI Agent Product Search Utility
// Returns structured JSON for AI consumption

import { mockProducts, mockCategories } from '@/services/commerce-service';
import { Product } from '@/types/commerce';

export interface ProductSearchResult {
  success: boolean;
  query: string;
  totalResults: number;
  products: {
    id: number;
    name: string;
    slug: string;
    price: string;
    regularPrice: string;
    onSale: boolean;
    inStock: boolean;
    category: string;
    shortDescription: string;
    url: string;
  }[];
}

export interface SearchFilters {
  keyword?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

/**
 * Search products with filters - designed for AI agent use
 * Returns clean, structured JSON that can be easily parsed by AI
 */
export function searchProducts(filters: SearchFilters): ProductSearchResult {
  let results = [...mockProducts];
  const queryParts: string[] = [];

  // Keyword search
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    queryParts.push(`keyword: "${filters.keyword}"`);
    results = results.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.short_description.toLowerCase().includes(keyword) ||
      p.categories.some(c => c.name.toLowerCase().includes(keyword))
    );
  }

  // Category filter
  if (filters.category) {
    queryParts.push(`category: "${filters.category}"`);
    results = results.filter(p =>
      p.categories.some(c => 
        c.slug === filters.category || 
        c.name.toLowerCase() === filters.category?.toLowerCase()
      )
    );
  }

  // Price range filter
  if (filters.minPrice !== undefined) {
    queryParts.push(`min price: ৳${filters.minPrice}`);
    results = results.filter(p => parseFloat(p.price) >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    queryParts.push(`max price: ৳${filters.maxPrice}`);
    results = results.filter(p => parseFloat(p.price) <= filters.maxPrice!);
  }

  // Stock filter
  if (filters.inStockOnly) {
    queryParts.push('in stock only');
    results = results.filter(p => p.stock_status === 'instock');
  }

  return {
    success: true,
    query: queryParts.length > 0 ? queryParts.join(', ') : 'all products',
    totalResults: results.length,
    products: results.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: `৳${p.price}`,
      regularPrice: `৳${p.regular_price}`,
      onSale: p.sale_price !== '' && p.sale_price !== p.regular_price,
      inStock: p.stock_status === 'instock',
      category: p.categories[0]?.name || 'Uncategorized',
      shortDescription: p.short_description,
      url: `/product/${p.slug}`
    }))
  };
}

/**
 * Get all available categories
 */
export function getAvailableCategories(): { name: string; slug: string; count: number }[] {
  return mockCategories.map(c => ({
    name: c.name,
    slug: c.slug,
    count: c.count
  }));
}

/**
 * Get product recommendations based on type
 */
export function getProductRecommendations(type: 'featured' | 'sale' | 'fresh' | 'medicinal'): ProductSearchResult {
  let results: Product[] = [];
  let queryType = type;

  switch (type) {
    case 'featured':
      results = mockProducts.filter(p => p.featured);
      break;
    case 'sale':
      results = mockProducts.filter(p => p.sale_price !== '' && p.sale_price !== p.regular_price);
      break;
    case 'fresh':
      results = mockProducts.filter(p => p.categories.some(c => c.slug === 'fresh-mushrooms'));
      break;
    case 'medicinal':
      results = mockProducts.filter(p => p.categories.some(c => c.slug === 'mushroom-powder'));
      break;
  }

  return {
    success: true,
    query: `${queryType} products`,
    totalResults: results.length,
    products: results.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: `৳${p.price}`,
      regularPrice: `৳${p.regular_price}`,
      onSale: p.sale_price !== '' && p.sale_price !== p.regular_price,
      inStock: p.stock_status === 'instock',
      category: p.categories[0]?.name || 'Uncategorized',
      shortDescription: p.short_description,
      url: `/product/${p.slug}`
    }))
  };
}

/**
 * Format product for display in chat
 */
export function formatProductForChat(product: ProductSearchResult['products'][0]): string {
  const saleTag = product.onSale ? ' (ON SALE!)' : '';
  const stockTag = product.inStock ? '✓ In Stock' : '✗ Out of Stock';
  
  return `
**${product.name}**${saleTag}
${product.shortDescription}
Price: ${product.price}
${stockTag}
[View Product](${product.url})
  `.trim();
}
