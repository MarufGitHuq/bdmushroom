import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/commerce";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const isOnSale = product.sale_price && product.sale_price !== product.regular_price;
  const isOutOfStock = product.stock_status === 'outofstock';
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  return (
    <Link 
      to={`/product/${product.slug}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]?.src}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <Badge className="bg-primary text-primary-foreground font-semibold">
              Sale
            </Badge>
          )}
          {product.featured && !isOnSale && (
            <Badge className="bg-accent text-accent-foreground font-semibold">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Stock Status */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-base px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
        
        {/* Quick Add Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.categories[0]?.name}
        </p>
        
        {/* Name */}
        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-secondary">
            ৳{product.price}
          </span>
          {isOnSale && (
            <span className="text-sm text-muted-foreground line-through">
              ৳{product.regular_price}
            </span>
          )}
        </div>
        
        {/* Weight */}
        <p className="text-xs text-muted-foreground mt-1">
          {product.weight}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
