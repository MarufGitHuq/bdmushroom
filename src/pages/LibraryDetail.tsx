import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Thermometer, Droplets, Sun, Layers, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getMushroomBySlug, getProductBySlug } from "@/services/commerce-service";
import { MushroomSpecies, Product } from "@/types/commerce";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const LibraryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [mushroom, setMushroom] = useState<MushroomSpecies | null>(null);
  const [relatedProduct, setRelatedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      
      const mushroomData = await getMushroomBySlug(slug);
      setMushroom(mushroomData);
      
      if (mushroomData?.relatedProductSlug) {
        const product = await getProductBySlug(mushroomData.relatedProductSlug);
        setRelatedProduct(product);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SideNav />
        <Navbar />
        <CartDrawer />
        <main className="ml-16 md:ml-20 pt-24">
          <div className="container mx-auto px-6 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-10 bg-muted rounded w-1/2" />
              <div className="aspect-video bg-muted rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!mushroom) {
    return (
      <div className="min-h-screen bg-background">
        <SideNav />
        <Navbar />
        <CartDrawer />
        <main className="ml-16 md:ml-20 pt-24">
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="font-heading text-3xl font-bold mb-4">Mushroom Not Found</h1>
            <p className="text-muted-foreground mb-8">The mushroom species you're looking for doesn't exist in our library.</p>
            <Button asChild>
              <Link to="/library">Browse Library</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />
      
      <main className="ml-16 md:ml-20 pt-24">
        <article className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <Link 
            to="/library" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={mushroom.image}
                alt={mushroom.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {mushroom.name}
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  {mushroom.scientificName}
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {mushroom.description}
              </p>

              <Separator />

              {/* Growing Conditions */}
              <div>
                <h2 className="font-heading text-xl font-semibold mb-4">Growing Conditions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <Thermometer className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium">{mushroom.growingConditions.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <Droplets className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-medium">{mushroom.growingConditions.humidity}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <Sun className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Light</p>
                      <p className="font-medium">{mushroom.growingConditions.light}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <Layers className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Substrate</p>
                      <p className="font-medium">{mushroom.growingConditions.substrate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buy Related Product CTA */}
              {relatedProduct && (
                <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20">
                  <div className="flex items-center gap-4">
                    <img
                      src={relatedProduct.images[0]?.src}
                      alt={relatedProduct.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Ready to try?</p>
                      <h3 className="font-heading font-semibold">{relatedProduct.name}</h3>
                      <p className="text-lg font-bold text-secondary">৳{relatedProduct.price}</p>
                    </div>
                    <Button onClick={() => addToCart(relatedProduct)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* More Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Culinary Uses */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-heading text-xl font-semibold mb-4">Culinary Uses</h2>
              <div className="flex flex-wrap gap-2">
                {mushroom.culinaryUses.map(use => (
                  <Badge key={use} variant="secondary" className="text-sm">
                    {use}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-heading text-xl font-semibold mb-4">Nutritional Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Calories</span>
                  <span className="font-medium">{mushroom.nutritionalInfo.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protein</span>
                  <span className="font-medium">{mushroom.nutritionalInfo.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fiber</span>
                  <span className="font-medium">{mushroom.nutritionalInfo.fiber}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Key Vitamins:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mushroom.nutritionalInfo.vitamins.map(vitamin => (
                      <Badge key={vitamin} variant="outline" className="text-xs">
                        {vitamin}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Library */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/library">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Explore More Mushrooms
              </Link>
            </Button>
          </div>
        </article>

        <Footer />
      </main>
    </div>
  );
};

export default LibraryDetail;
