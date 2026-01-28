import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/services/commerce-service";
import { Product } from "@/types/commerce";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const featured = await getProducts({ featured: true, per_page: 4 });
      setProducts(featured);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
          <Button variant="ghost" className="mt-6 md:mt-0 group text-foreground" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} columns={4} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
