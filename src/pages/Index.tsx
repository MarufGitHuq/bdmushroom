import SideNav from "@/components/SideNav";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustBadges from "@/components/TrustBadges";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Navbar />
      <CartDrawer />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <TrustBadges />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
