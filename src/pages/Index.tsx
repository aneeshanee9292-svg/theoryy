import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import IngredientsSection from '@/components/IngredientsSection';
import GymPromoSection from '@/components/GymPromoSection';
import BenefitsSection from '@/components/BenefitsSection';
import StorySection from '@/components/StorySection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <IngredientsSection />
      <GymPromoSection />
      <BenefitsSection />
      <StorySection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
