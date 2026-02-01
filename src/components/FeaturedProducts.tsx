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
    <section className="py-16 md:py-28 bg-muted ml-0 md:ml-20 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
          <div>
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">
              Featured
            </span>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mt-3">
              Our Best Sellers
            </h2>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 group text-foreground w-fit" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products Grid - With horizontal scroll on very small screens if needed, otherwise normal grid is fine since we have 1 col */}
        <div className="md:block">
          <ProductGrid products={products} loading={loading} columns={4} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
