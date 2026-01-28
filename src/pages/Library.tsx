import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getMushroomLibrary } from "@/services/commerce-service";
import { MushroomSpecies } from "@/types/commerce";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Library = () => {
  const [mushrooms, setMushrooms] = useState<MushroomSpecies[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMushrooms = async () => {
      setLoading(true);
      const data = await getMushroomLibrary();
      setMushrooms(data);
      setLoading(false);
    };
    fetchMushrooms();
  }, []);

  const filteredMushrooms = mushrooms.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />
      
      <main className="ml-16 md:ml-20 pt-24">
        {/* Hero Section */}
        <div className="bg-secondary/5 py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mushroom Library
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Discover the fascinating world of mushrooms. Learn about different species, their growing conditions, culinary uses, and nutritional benefits.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search mushrooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-16 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMushrooms.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No mushrooms found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMushrooms.map(mushroom => (
                <Link 
                  key={mushroom.id}
                  to={`/library/${mushroom.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={mushroom.image}
                      alt={mushroom.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {mushroom.name}
                    </h2>
                    <p className="text-sm text-muted-foreground italic mb-3">
                      {mushroom.scientificName}
                    </p>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {mushroom.description}
                    </p>
                    
                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {mushroom.culinaryUses.slice(0, 3).map(use => (
                        <span 
                          key={use}
                          className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Library;
