import { ChefHat, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-mushrooms.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen">
      {/* Full-bleed Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium organic mushrooms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Centered Title */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground uppercase tracking-wide font-bold drop-shadow-lg">
          Premium Organic
          <br />
          Mushrooms
        </h1>
      </div>

      {/* Info Card - Mitrofresh style red accent */}
      <div className="absolute bottom-0 left-16 md:left-20 w-full max-w-md">
        <div className="bg-primary text-primary-foreground p-8 md:p-10">
          <h2 className="text-lg md:text-xl font-semibold uppercase tracking-wider mb-6">
            Shop Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <ChefHat className="w-6 h-6" />
              <span className="text-base">Fresh & Dried Products</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Users className="w-6 h-6" />
              <span className="text-base">Farm-to-Table Quality</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6" />
              <span className="text-base">Same Day Delivery</span>
            </div>
          </div>

          <p className="mt-8 text-sm uppercase tracking-widest font-medium text-primary-foreground/80">
            All About Mushroom
          </p>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
            Bangladesh's premier destination for organic mushrooms. From fresh oyster mushrooms 
            to premium cultivation equipment, we bring nature's finest directly to your table.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
