import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import IngredientsSection from '@/components/IngredientsSection';
import GymPromoSection from '@/components/GymPromoSection';
import WheyPromoSection from '@/components/WheyPromoSection';
import BenefitsSection from '@/components/BenefitsSection';
import StorySection from '@/components/StorySection';
import SocialProofSection from '@/components/SocialProofSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <WheyPromoSection />
      <IngredientsSection />
      <GymPromoSection />
      <BenefitsSection />
      <StorySection />
      <SocialProofSection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
