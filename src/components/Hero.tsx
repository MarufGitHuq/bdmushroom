import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Truck } from "lucide-react";
import heroImage from "@/assets/hero-mushrooms.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fresh organic oyster mushrooms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6 animate-fade-up">
            <Leaf className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">100% Organic & Fresh</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up stagger-1">
            From Farm to Table:
            <span className="block mt-2">Premium Organic Mushrooms</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up stagger-2 max-w-xl">
            Discover the finest selection of fresh, dried, and specialty mushrooms. 
            Grown with care in Bangladesh's premier mushroom farms.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up stagger-3">
            <Button variant="hero" className="group">
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline">
              Farming Tools
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 mt-10 animate-fade-up stagger-4">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-foreground">Free Delivery</p>
                <p className="text-xs text-primary-foreground/60">Orders over ৳500</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-foreground">100% Organic</p>
                <p className="text-xs text-primary-foreground/60">Certified farms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
