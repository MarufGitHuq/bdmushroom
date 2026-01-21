import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import productFresh from "@/assets/product-fresh.jpg";
import productDry from "@/assets/product-dry.jpg";
import productPowder from "@/assets/product-powder.jpg";
import productEquipment from "@/assets/product-equipment.jpg";

const products = [
  {
    id: 1,
    name: "Fresh Oyster Mushroom",
    weight: "500g pack",
    price: 180,
    image: productFresh,
  },
  {
    id: 2,
    name: "Dried Shiitake Premium",
    weight: "200g pack",
    price: 450,
    image: productDry,
  },
  {
    id: 3,
    name: "Lion's Mane Powder",
    weight: "100g jar",
    price: 850,
    image: productPowder,
  },
  {
    id: 4,
    name: "Mushroom Spawn Kit",
    weight: "Complete set",
    price: 1200,
    image: productEquipment,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 md:py-28 bg-muted ml-16 md:ml-20">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">
              Featured
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mt-3">
              Our Best Sellers
            </h2>
          </div>
          <Button variant="ghost" className="mt-6 md:mt-0 group text-foreground">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Quick Add */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Button variant="default" size="sm" className="w-full gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.weight}
                </p>
                <p className="text-xl font-bold text-primary">
                  ৳{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
