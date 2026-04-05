import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.png';
import heroMobile from '@/assets/hero-mobile.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden pb-16 md:pb-24">
      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src={heroBg}
          alt="Theoryy Protein Bars"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroMobile}
          alt="Theoryy Protein Bars"
          className="w-full h-full object-cover"
          width={800}
          height={1400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full px-6 sm:px-0 max-w-sm sm:max-w-none mx-auto"
      >
        <a
          href="#products"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform animate-pulse-glow"
        >
          Shop Now
        </a>
        <a
          href="#story"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-foreground/20 text-foreground font-medium uppercase tracking-wider text-sm hover:bg-foreground/5 transition-colors"
        >
          Our Story
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
