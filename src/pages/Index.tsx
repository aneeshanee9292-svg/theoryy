import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
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
      <BenefitsSection />
      <StorySection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
