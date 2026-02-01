import { Product } from "@/types/commerce";
import ProductCard from "./ProductCard";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  loading?: boolean;
  isOffline?: boolean;
}

const ProductGrid = ({ products, columns = 4, loading = false, isOffline = false }: ProductGridProps) => {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  if (loading) {
    return (
      <div className="space-y-6">
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isOffline && (
        <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-800" />
          <AlertTitle>Offline Mode</AlertTitle>
          <AlertDescription>
            Could not connect to the live BDMushroom API. Showing local hardcoded product data for preview.
          </AlertDescription>
        </Alert>
      )}

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No products found.</p>
        </div>
      ) : (
        <div className={`grid ${gridClasses[columns]} gap-6`}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
