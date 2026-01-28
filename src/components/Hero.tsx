import { ChefHat, Users, Clock, Search } from "lucide-react";
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

      {/* Content Container - Bottom Left */}
      <div className="absolute bottom-0 left-16 md:left-20 right-0 z-10">
        <div className="flex flex-row items-center gap-8 md:gap-12">

          <div className="w-96 bg-primary text-primary-foreground p-8 md:p-10">
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

          <div className="flex flex-col items-start gap-6">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground uppercase tracking-wide font-bold drop-shadow-lg text-left">
              Premium Organic
              <br />
              Mushrooms
            </h1>

            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center p-1.5 shadow-lg">
              <input
                type="text"
                placeholder="Search for mushrooms..."
                className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-white/70 h-10"
              />
              <button className="bg-primary text-white p-2.5 rounded-full hover:bg-primary/90 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
