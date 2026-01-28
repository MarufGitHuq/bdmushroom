import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Truck, Shield, Leaf, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProductGrid from "@/components/ProductGrid";
import QuantitySelector from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { getProductBySlug, getRelatedProducts } from "@/services/commerce-service";
import { Product } from "@/types/commerce";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      const productData = await getProductBySlug(slug);
      setProduct(productData);
      
      if (productData) {
        const related = await getRelatedProducts(productData.id, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
      setQuantity(1);
      setSelectedImage(0);
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SideNav />
        <Navbar />
        <CartDrawer />
        <main className="ml-16 md:ml-20 pt-24">
          <div className="container mx-auto px-6 py-12">
            <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-muted rounded-2xl" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/3" />
                <div className="h-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <SideNav />
        <Navbar />
        <CartDrawer />
        <main className="ml-16 md:ml-20 pt-24">
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="font-heading text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const isOnSale = product.sale_price && product.sale_price !== product.regular_price;
  const isOutOfStock = product.stock_status === 'outofstock';
  const isLowStock = product.stock_quantity !== null && product.stock_quantity <= 10 && product.stock_quantity > 0;

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />
      
      <main className="ml-16 md:ml-20 pt-24">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.images[selectedImage]?.src}
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {product.categories[0]?.name}
              </p>

              {/* Name */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-secondary">
                  ৳{product.price}
                </span>
                {isOnSale && (
                  <span className="text-xl text-muted-foreground line-through">
                    ৳{product.regular_price}
                  </span>
                )}
                {isOnSale && (
                  <Badge className="bg-primary text-primary-foreground">
                    Save ৳{(parseFloat(product.regular_price) - parseFloat(product.price)).toFixed(0)}
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {isOutOfStock ? (
                  <Badge variant="destructive">Out of Stock</Badge>
                ) : isLowStock ? (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    Only {product.stock_quantity} left!
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Stock
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.short_description}
              </p>

              <Separator />

              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity(q => q + 1)}
                    onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                    max={product.stock_quantity || 99}
                  />
                </div>

                <Button 
                  size="lg" 
                  className="w-full text-lg"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>

              <Separator />

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Free Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Quality Assured</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-xs text-muted-foreground">100% Organic</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-6">
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Weight</p>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="font-medium">{product.categories[0]?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">SKU</p>
                    <p className="font-medium">{product.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Availability</p>
                    <p className="font-medium">
                      {product.stock_status === 'instock' ? 'In Stock' : 
                       product.stock_status === 'onbackorder' ? 'On Backorder' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">
                Related Products
              </h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default ProductDetail;
