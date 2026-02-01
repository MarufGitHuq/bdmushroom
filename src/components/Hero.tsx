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
      <div className="absolute bottom-0 left-0 md:left-20 right-0 z-10 transition-all duration-300">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-0 md:gap-12">

          <div className="w-full md:w-96 bg-secondary md:bg-primary text-secondary-foreground md:text-primary-foreground p-6 md:p-10">
            <h2 className="text-base md:text-xl font-semibold uppercase tracking-wider mb-4 md:mb-6">
              Shop Information
            </h2>

            <div className="space-y-4 md:space-y-5">
              <div className="flex items-center gap-3 md:gap-4">
                <ChefHat className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">Fresh & Dried Products</span>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">Farm-to-Table Quality</span>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <Clock className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">Same Day Delivery</span>
              </div>
            </div>

            <p className="mt-6 md:mt-8 text-[10px] md:text-sm uppercase tracking-widest font-medium text-primary-foreground/80">
              All About Mushroom
            </p>
            <p className="mt-2 md:mt-3 text-xs md:text-sm leading-relaxed text-primary-foreground/90 line-clamp-2 md:line-clamp-none">
              Bangladesh's premier destination for organic mushrooms directly to your table.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:gap-6 p-6 md:p-0">
            <h1 className="font-heading text-3xl md:text-6xl lg:text-7xl text-primary-foreground uppercase tracking-wide font-bold drop-shadow-lg text-left">
              Premium Organic
              <br />
              Mushrooms
            </h1>

            <div className="w-full max-w-sm md:max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center p-1 md:p-1.5 shadow-lg">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 text-white placeholder:text-white/70 h-8 md:h-10 text-sm md:text-base"
              />
              <button className="bg-primary text-white p-2 md:p-2.5 rounded-full hover:bg-primary/90 transition-colors">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
