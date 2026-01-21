import { Shield, Truck, Leaf, Award, Clock, HeadphonesIcon } from "lucide-react";

const badges = [
  {
    icon: Leaf,
    title: "Certified Organic",
    description: "100% organic farming practices",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ৳500",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
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
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "We're here to help",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-4 group-hover:bg-primary-foreground/20 transition-colors duration-300">
                <badge.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-primary-foreground mb-1">
                {badge.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-primary-foreground/70">
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
