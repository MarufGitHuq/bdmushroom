import { Leaf, Truck, Shield, Clock, Award, Headphones } from "lucide-react";

const badges = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Certified organic farming",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Orders over ৳500",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Fresh or money back",
  },
  {
    icon: Clock,
    title: "Same Day Delivery",
    description: "Order before 2 PM",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Best mushroom farm 2024",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary ml-0 md:ml-20 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center group animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-secondary-foreground/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <badge.icon className="w-6 h-6 text-secondary-foreground" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-secondary-foreground mb-1">
                {badge.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-secondary-foreground/70">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
