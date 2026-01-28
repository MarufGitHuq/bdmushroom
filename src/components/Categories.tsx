import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import productFresh from "@/assets/product-fresh.jpg";
import productDry from "@/assets/product-dry.jpg";
import productPowder from "@/assets/product-powder.jpg";
import productEquipment from "@/assets/product-equipment.jpg";

const categories = [
  {
    title: "Fresh Mushrooms",
    subtitle: "Farm-fresh, delivered daily",
    image: productFresh,
    slug: "fresh-mushrooms",
  },
  {
    title: "Dried Mushrooms",
    subtitle: "Long-lasting, intense flavor",
    image: productDry,
    slug: "dried-mushrooms",
  },
  {
    title: "Mushroom Powder",
    subtitle: "Superfood supplements",
    image: productPowder,
    slug: "mushroom-powder",
  },
  {
    title: "Growing Supplies",
    subtitle: "Start your own farm",
    image: productEquipment,
    slug: "growing-supplies",
  },
];

const Categories = () => {
  return (
    <section className="py-20 md:py-28 bg-background ml-16 md:ml-20">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            Our Products
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mt-3">
            Explore Our Collection
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={`/products/${category.slug}`}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-display text-primary-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm md:text-base mb-4">
                  {category.subtitle}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
