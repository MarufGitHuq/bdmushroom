import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/services/commerce-service";
import { Product, Category } from "@/types/commerce";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Products = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categorySlug || null);
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'default');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const [productsData, categoriesData] = await Promise.all([
        getProducts({
          category: selectedCategory || undefined,
          orderby: sortBy === 'price-asc' || sortBy === 'price-desc' ? 'price' : 
                   sortBy === 'name' ? 'name' : undefined,
          order: sortBy === 'price-desc' ? 'desc' : 'asc'
        }),
        getCategories()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    setSelectedCategory(categorySlug || null);
  }, [categorySlug]);

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setSearchParams(prev => {
      if (value === 'default') {
        prev.delete('sort');
      } else {
        prev.set('sort', value);
      }
      return prev;
    });
  };

  const currentCategory = categories.find(c => c.slug === selectedCategory);

  const CategoryFilters = () => (
    <div className="space-y-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
          !selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
        }`}
      >
        All Products
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === category.slug ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
          }`}
        >
          {category.name}
          <span className="float-right text-sm opacity-60">({category.count})</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />
      
      <main className="ml-16 md:ml-20 pt-24">
        {/* Hero Section */}
        <div className="bg-secondary/5 py-12">
          <div className="container mx-auto px-6">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentCategory ? currentCategory.name : 'All Products'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {currentCategory 
                ? currentCategory.description 
                : 'Explore our complete range of premium mushrooms and growing supplies.'}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 space-y-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
                  <CategoryFilters />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <CategoryFilters />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Active Filters */}
                  {selectedCategory && (
                    <Badge 
                      variant="secondary" 
                      className="gap-1 cursor-pointer"
                      onClick={() => handleCategoryChange(null)}
                    >
                      {currentCategory?.name}
                      <X className="w-3 h-3" />
                    </Badge>
                  )}

                  <span className="text-sm text-muted-foreground">
                    {products.length} products
                  </span>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Grid */}
              <ProductGrid products={products} loading={loading} columns={3} />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Products;
