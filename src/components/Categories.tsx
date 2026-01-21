import { Leaf, Sun, Sparkles, Wrench } from "lucide-react";
import productFresh from "@/assets/product-fresh.jpg";
import productDry from "@/assets/product-dry.jpg";
import productPowder from "@/assets/product-powder.jpg";
import productEquipment from "@/assets/product-equipment.jpg";

const categories = [
  {
    title: "Fresh",
    description: "Farm-fresh mushrooms delivered daily",
    icon: Leaf,
    image: productFresh,
    count: 24,
  },
  {
    title: "Dry",
    description: "Long-lasting, concentrated flavor",
    icon: Sun,
    image: productDry,
    count: 18,
  },
  {
    title: "Powder",
    description: "Superfood supplements & seasonings",
    icon: Sparkles,
    image: productPowder,
    count: 12,
  },
  {
    title: "Equipment",
    description: "Everything for mushroom farming",
    icon: Wrench,
    image: productEquipment,
    count: 35,
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Are You Looking For?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you want to eat mushrooms or grow them, we've got you covered 
            with premium products for every need.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-bold text-primary-foreground mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-primary-foreground/70 mb-2">
                  {category.description}
                </p>
                <span className="text-xs font-medium text-primary-foreground/60">
                  {category.count} products
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
