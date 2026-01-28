import { Product } from "@/types/commerce";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  loading?: boolean;
}

const ProductGrid = ({ products, columns = 4, loading = false }: ProductGridProps) => {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  if (loading) {
    return (
      <div className={`grid ${gridClasses[columns]} gap-6`}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
