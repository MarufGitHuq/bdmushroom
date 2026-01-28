
# Headless WooCommerce Implementation Plan for BD Mushroom

## Overview
Transform BD Mushroom into a high-performance headless e-commerce application with a mock WooCommerce data layer, global cart state, slide-out cart drawer, checkout flow, mushroom library, customer dashboard, and AI agent integration.

---

## Architecture Diagram

```text
+----------------------------------------------------------+
|                     BD MUSHROOM APP                       |
+----------------------------------------------------------+
|                                                          |
|  +-----------------+    +------------------+             |
|  |  CartContext    |    | commerce-service |             |
|  | (localStorage)  |<-->| (Mock WooCommerce)|            |
|  +-----------------+    +------------------+             |
|         |                       |                        |
|  +------v-----------------------v---------+              |
|  |              React Router              |              |
|  +----------------------------------------+              |
|  |   /         | /products | /product/:slug              |
|  |   /checkout | /library  | /dashboard                  |
|  +----------------------------------------+              |
|                     |                                    |
|  +------------------v--------------------+               |
|  |        CartDrawer (Slide-out)         |               |
|  +---------------------------------------+               |
|                     |                                    |
|  +------------------v--------------------+               |
|  |        AIChatWindow (Product Search)  |               |
|  +---------------------------------------+               |
+----------------------------------------------------------+
```

---

## Phase 1: WooCommerce Data Layer

### 1.1 Create Commerce Service (`src/services/commerce-service.ts`)
- Define TypeScript interfaces for Product, Category, and Inventory
- Implement mock data matching WooCommerce REST API structure
- Create functions: `getProducts()`, `getProductBySlug()`, `getCategories()`, `checkInventory()`
- Design data to support future WooCommerce API integration by matching `/wp-json/wc/v3` response format

### 1.2 Create Product Types (`src/types/commerce.ts`)
```text
- Product: id, name, slug, price, regularPrice, salePrice, images[], categories[], stockStatus, stockQuantity, description, shortDescription
- Category: id, name, slug, image, count
- CartItem: product, quantity
- Order: id, items[], total, status, shippingAddress
```

---

## Phase 2: Product Display Components

### 2.1 Product Grid Component (`src/components/ProductGrid.tsx`)
- Responsive grid layout (1/2/3/4 columns)
- Forest Green price badges
- Product image with hover zoom effect
- "Quick Add to Cart" button
- Stock status indicator
- Links to product detail page

### 2.2 Product Detail Page (`src/pages/ProductDetail.tsx`)
- Route: `/product/:slug`
- Large product image gallery
- Product name, price (with sale price support)
- Stock status badge (In Stock/Out of Stock)
- Quantity selector with +/- buttons
- "Add to Cart" button
- Product description tabs
- Related products section

### 2.3 Products Listing Page (`src/pages/Products.tsx`)
- Route: `/products` and `/products/:category`
- Category filter sidebar
- Sort options (price, name, newest)
- Product count display

---

## Phase 3: Cart & State Management

### 3.1 Cart Context (`src/context/CartContext.tsx`)
- Global cart state with React Context
- LocalStorage persistence (cart survives refresh)
- Functions: addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal
- Cart item count for navbar badge

### 3.2 Cart Drawer Component (`src/components/CartDrawer.tsx`)
- Slide-out drawer from right side (using Vaul/Sheet)
- Product list with images, names, prices
- Quantity update controls (+/-)
- Remove item button
- Subtotal calculation
- "Proceed to Checkout" button
- Organic styling: soft borders, cream background

### 3.3 Update Navbar
- Add cart icon with dynamic item count badge
- Click triggers cart drawer open

---

## Phase 4: Checkout Flow

### 4.1 Checkout Page (`src/pages/Checkout.tsx`)
- Route: `/checkout`
- Shipping form: name, phone, address, city, postal code
- Order summary sidebar
- Form validation with Zod
- Two payment options:
  1. "Complete Payment" - Redirect to WooCommerce (with URL structure for future integration)
  2. "Pay via WhatsApp" - Opens WhatsApp with pre-filled order message

### 4.2 Order Confirmation (`src/pages/OrderConfirmation.tsx`)
- Route: `/order-confirmation`
- Thank you message
- Order details summary
- "Continue Shopping" button

---

## Phase 5: Brand Expansion Pages

### 5.1 Mushroom Library (`src/pages/Library.tsx`)
- Route: `/library`
- SEO-optimized mushroom encyclopedia
- Grid of mushroom species cards
- Each entry links to detailed mushroom page

### 5.2 Library Detail Page (`src/pages/LibraryDetail.tsx`)
- Route: `/library/:slug`
- Mushroom species information
- Growing conditions, culinary uses, nutritional info
- "Buy [Mushroom] Spawn" button linking to relevant product

### 5.3 Customer Dashboard (`src/pages/Dashboard.tsx`)
- Route: `/dashboard`
- "My Orders" section (mock order history)
- Order status tracking
- Profile information display
- Reorder functionality

---

## Phase 6: AI Agent Integration

### 6.1 Product Search Utility (`src/lib/product-search.ts`)
- Function to search products by keyword
- Returns structured JSON format for AI consumption
- Filter by category, price range, stock status

### 6.2 AI Chat Window (`src/components/AIChatWindow.tsx`)
- Floating chat button (bottom-right)
- Expandable chat interface
- "Search Products" function for AI agent
- Product recommendation display with quick-add buttons
- Integration-ready for AI service

---

## Phase 7: Update Routing & Navigation

### 7.1 Update App Router (`src/App.tsx`)
- Add routes: /products, /product/:slug, /checkout, /order-confirmation, /library, /library/:slug, /dashboard

### 7.2 Update SideNav (`src/components/SideNav.tsx`)
- Add navigation links: Shop, Library, Dashboard
- Active state indicators

### 7.3 Create Layout Component (`src/components/Layout.tsx`)
- Wrap pages with consistent SideNav, Navbar, Footer
- Include CartDrawer globally

---

## File Structure Summary

```text
src/
+-- context/
|   +-- CartContext.tsx
+-- services/
|   +-- commerce-service.ts
+-- types/
|   +-- commerce.ts
+-- lib/
|   +-- utils.ts
|   +-- product-search.ts
+-- components/
|   +-- Layout.tsx
|   +-- ProductGrid.tsx
|   +-- ProductCard.tsx
|   +-- CartDrawer.tsx
|   +-- AIChatWindow.tsx
|   +-- QuantitySelector.tsx
+-- pages/
|   +-- Index.tsx
|   +-- Products.tsx
|   +-- ProductDetail.tsx
|   +-- Checkout.tsx
|   +-- OrderConfirmation.tsx
|   +-- Library.tsx
|   +-- LibraryDetail.tsx
|   +-- Dashboard.tsx
```

---

## Technical Details

### LocalStorage Cart Persistence
```text
Key: "bd-mushroom-cart"
Value: JSON array of { productId, quantity }
```

### Mock Product Data Structure
Products will follow WooCommerce REST API format for seamless future migration:
- 8-12 mock products across 4 categories
- Realistic pricing in Taka
- Mix of in-stock and limited-stock items

### WhatsApp Checkout Integration
Generate message format:
```text
New Order from BD Mushroom:
- [Product Name] x [Qty] = [Price]
Total: [Total]
Shipping: [Address]
```

### Styling Approach
- Maintain Mitrofresh-inspired design language
- Forest Green (#2D5A27) for price badges and accents
- Soft organic shadows
- Clean white/cream backgrounds
- Playfair Display for headings, Inter for body

---

## Implementation Order

1. Commerce types and service (data layer foundation)
2. Cart context with localStorage
3. Cart drawer component
4. Product grid and product card
5. Products listing page
6. Product detail page
7. Checkout page with WhatsApp option
8. Update navigation and routing
9. Library pages (encyclopedia)
10. Dashboard with order history
11. AI chat window with product search
