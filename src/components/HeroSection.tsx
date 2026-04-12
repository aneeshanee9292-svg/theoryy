import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.png';
import heroMobile from '@/assets/hero-mobile.png';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-end overflow-hidden">

      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src={heroBg}
          alt="Theoryy Protein Bars"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        />
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroMobile}
          alt="Theoryy Protein Bars"
          className="w-full h-full object-cover object-center"
          width={800}
          height={1400}
        />
      </div>

      {/* Shop Now Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 w-full mb-[6vh] flex justify-center md:justify-start md:pl-[22%] md:mb-[6vh]"
      >
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform animate-pulse-glow shadow-lg"
        >
          Shop Now
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
