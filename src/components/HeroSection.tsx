import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden pb-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Theoryy Protein Bars"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Buttons only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center"
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
