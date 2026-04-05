import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.png';
import heroMobile from '@/assets/hero-mobile.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden pt-16">
      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src={heroBg}
          alt="Theoryy Protein Bars"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroMobile}
          alt="Theoryy Protein Bars"
          className="w-full h-full object-cover object-top"
          width={800}
          height={1400}
        />
      </div>

      {/* Shop Now Button - positioned below the text area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 mb-[10vh] md:mb-[8vh] flex flex-col items-center"
      >
        <a
          href="#products"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform animate-pulse-glow shadow-lg"
        >
          Shop Now
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
