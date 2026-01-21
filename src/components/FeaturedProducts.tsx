import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import productFresh from "@/assets/product-fresh.jpg";
import productDry from "@/assets/product-dry.jpg";
import productPowder from "@/assets/product-powder.jpg";
import productEquipment from "@/assets/product-equipment.jpg";

const products = [
  {
    id: 1,
    name: "Fresh Oyster Mushroom",
    category: "Fresh",
    price: 180,
    originalPrice: 220,
    rating: 4.9,
    reviews: 128,
    image: productFresh,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Dried Shiitake Premium",
    category: "Dry",
    price: 450,
    originalPrice: null,
    rating: 4.8,
    reviews: 89,
    image: productDry,
    badge: null,
  },
  {
    id: 3,
    name: "Lion's Mane Powder",
    category: "Powder",
    price: 850,
    originalPrice: 950,
    rating: 4.7,
    reviews: 56,
    image: productPowder,
    badge: "New",
  },
  {
    id: 4,
    name: "Mushroom Spawn Kit",
    category: "Equipment",
    price: 1200,
    originalPrice: null,
    rating: 4.9,
    reviews: 234,
    image: productEquipment,
    badge: "Popular",
  },
  {
    id: 5,
    name: "Button Mushroom Fresh",
    category: "Fresh",
    price: 150,
    originalPrice: 180,
    rating: 4.6,
    reviews: 167,
    image: productFresh,
    badge: null,
  },
  {
    id: 6,
    name: "Reishi Extract Powder",
    category: "Powder",
    price: 1100,
    originalPrice: null,
    rating: 4.8,
    reviews: 42,
    image: productPowder,
    badge: "Organic",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Featured Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Best Sellers
            </h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            View All Products
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {product.badge}
                  </span>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
                  <Heart className="w-5 h-5" />
                </button>

                {/* Quick Add */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Button variant="organic" className="w-full gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Quick Add to Cart
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category */}
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>

                {/* Name */}
                <h3 className="text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
                    ৳{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ৳{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
