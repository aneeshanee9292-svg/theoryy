import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';
import ingredientAlmond from '@/assets/ingredient-almond.png';
import ingredientPeanut from '@/assets/ingredient-peanut.png';
import ingredientCocoa from '@/assets/ingredient-cocoa.png';

const floatingIngredients = [
  { src: ingredientAlmond, alt: 'Almond', delay: 0, x: -180, y: -80, size: 60 },
  { src: ingredientPeanut, alt: 'Peanut', delay: 0.5, x: 200, y: -120, size: 50 },
  { src: ingredientCocoa, alt: 'Cocoa', delay: 1, x: -120, y: 100, size: 55 },
  { src: ingredientAlmond, alt: 'Almond', delay: 1.5, x: 160, y: 80, size: 45 },
  { src: ingredientPeanut, alt: 'Peanut', delay: 0.8, x: -60, y: -160, size: 40 },
  { src: ingredientCocoa, alt: 'Cocoa', delay: 1.2, x: 80, y: 140, size: 50 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      {/* Floating ingredients */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {floatingIngredients.map((ing, i) => (
          <motion.img
            key={i}
            src={ing.src}
            alt={ing.alt}
            className="absolute"
            style={{ width: ing.size, height: ing.size }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.8, 0.6],
              scale: 1,
              x: ing.x,
              y: ing.y,
            }}
            transition={{
              delay: 0.8 + ing.delay,
              duration: 1.2,
              ease: 'easeOut',
            }}
            loading="lazy"
            width={512}
            height={512}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm md:text-base uppercase tracking-[0.3em] text-primary font-medium mb-4"
        >
          Practically Balanced Nutrition
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading uppercase leading-none mb-6"
        >
          Protein You'll
          <br />
          <span className="text-gradient-brand">Actually Crave</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          20g protein, real ingredients, zero compromise on taste.
          Dessert-level flavor meets clean nutrition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
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
      </div>
    </section>
  );
};

export default HeroSection;
