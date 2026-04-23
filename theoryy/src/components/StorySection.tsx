import { motion } from 'framer-motion';
import { ArrowRight, Heart, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ingredientAlmond from '@/assets/ingredient-almond.png';
import ingredientPeanut from '@/assets/ingredient-peanut.png';
import ingredientCocoa from '@/assets/ingredient-cocoa.png';
import ingredientDates from '@/assets/ingredient-dates.png';
import ingredientWhey from '@/assets/ingredient-whey.png';
import ingredientCoffee from '@/assets/ingredient-coffee.png';

const pillars = [
  { icon: Zap, label: 'Functional Nutrition', color: 'from-amber-500 to-orange-500' },
  { icon: Shield, label: 'Clean Protein', color: 'from-emerald-500 to-teal-500' },
  { icon: Heart, label: 'Simple Daily Nutrition', color: 'from-rose-500 to-pink-500' },
];

// Center piece
const centerIngredient = { src: ingredientWhey, name: 'Whey Protein' };

// Surrounding ingredients — positioned via CSS for desktop; wrapped grid on mobile
const surroundingIngredients = [
  { src: ingredientAlmond, name: 'Premium Almonds', top: '2%', left: '8%', mobileOrder: 1 },
  { src: ingredientDates, name: 'Organic Dates', top: '2%', left: '62%', mobileOrder: 2 },
  { src: ingredientCoffee, name: 'Arabica Coffee', top: '40%', left: '0%', mobileOrder: 3 },
  { src: ingredientCocoa, name: 'Cocoa Beans', top: '40%', left: '72%', mobileOrder: 4 },
  { src: ingredientPeanut, name: 'Roasted Peanuts', top: '75%', left: '32%', mobileOrder: 5 },
];

const StorySection = () => {
  return (
    <section id="story" className="relative py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/5 blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-accent/5 blur-[70px] md:blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5 md:mb-6"
        >
          <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-primary/20 bg-primary/5">
            About Us
          </span>
        </motion.div>

        {/* Pillar Tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-card border border-border/60 shadow-sm"
            >
              <span className={`w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center`}>
                <pillar.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
              </span>
              <span className="text-xs md:text-sm font-semibold text-foreground tracking-wide">
                {pillar.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-heading uppercase text-center leading-tight mb-6 md:mb-8"
        >
          Clean Nutrition,{' '}
          <span className="text-gradient-brand">Built For Life</span>
        </motion.h2>

        {/* Description Block */}
        <div className="max-w-3xl mx-auto space-y-5 md:space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-xl text-center text-muted-foreground leading-relaxed"
          >
            <strong className="text-foreground font-semibold">THEORYY</strong> is a clean, functional nutrition brand
            helping you stay consistent with daily nutrition and build a healthy lifestyle — without confusion.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm md:text-lg text-center text-muted-foreground leading-relaxed"
          >
            We create high-quality, easy-to-consume products that support both{' '}
            <span className="text-foreground font-medium">physical performance</span> and{' '}
            <span className="text-foreground font-medium">mental clarity</span>.
          </motion.p>

          {/* Divider accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-sm md:text-lg text-center text-muted-foreground leading-relaxed"
          >
            This channel goes beyond THEORYY — it's not just about products, but about{' '}
            <span className="text-foreground font-medium">nutrition, lifestyle, and growth</span>.
            Expect simple insights, real conversations, and content on health, business, and discipline
            to help you stay consistent every day.
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-block relative">
            <p className="text-xl md:text-3xl font-heading uppercase tracking-wider text-foreground">
              One Body. One Mind.{' '}
              <span className="text-gradient-brand font-bold">No Plan B.</span>
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
          </div>
        </motion.div>

        {/* CTA to Founder's Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-10 md:mt-14 flex justify-center"
        >
          <Link
            to="/founders-note"
            className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold uppercase tracking-wider text-xs md:text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cta-glow"
          >
            Read the Founder's Note
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            Floating Ingredients Diagram — below the About Us text
           ═══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 md:mt-24"
        >
          {/* Label */}
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-8 md:mb-10">
            Crafted With Real Ingredients
          </p>

          {/* ─── Desktop: absolute positioned floating layout ─── */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-[520px] min-h-[420px]">
              {/* Center: Whey Protein */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
                className="absolute"
                style={{ top: '28%', left: '28%' }}
              >
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <img
                    src={centerIngredient.src}
                    alt={centerIngredient.name}
                    className="w-36 h-36 lg:w-44 lg:h-44 object-contain drop-shadow-2xl"
                    loading="lazy"
                    width={512}
                    height={512}
                  />
                  <span className="mt-2 text-xs font-bold text-primary uppercase tracking-wider">
                    {centerIngredient.name}
                  </span>
                </motion.div>
              </motion.div>

              {/* Surrounding ingredients */}
              {surroundingIngredients.map((ing, i) => (
                <motion.div
                  key={ing.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 150 }}
                  className="absolute"
                  style={{ top: ing.top, left: ing.left }}
                >
                  <motion.div
                    animate={{ y: [0, -16, 0] }}
                    transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={ing.src}
                      alt={ing.name}
                      className="w-24 h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                    <span className="mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {ing.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Mobile: symmetric 3×2 grid layout ─── */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-y-6 gap-x-3 max-w-[320px] mx-auto">
              {/* Row 1: Almonds | Whey (center, highlighted) | Dates */}
              {[
                { src: ingredientAlmond, name: 'Premium Almonds', isCenter: false },
                { src: ingredientWhey, name: 'Whey Protein', isCenter: true },
                { src: ingredientDates, name: 'Organic Dates', isCenter: false },
                { src: ingredientCoffee, name: 'Arabica Coffee', isCenter: false },
                { src: ingredientPeanut, name: 'Roasted Peanuts', isCenter: false },
                { src: ingredientCocoa, name: 'Cocoa Beans', isCenter: false },
              ].map((ing, i) => (
                <motion.div
                  key={ing.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 150 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ y: [0, ing.isCenter ? -10 : -7, 0] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={ing.src}
                      alt={ing.name}
                      className={`object-contain drop-shadow-xl ${
                        ing.isCenter
                          ? 'w-20 h-20 drop-shadow-2xl'
                          : 'w-16 h-16'
                      }`}
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                    <span
                      className={`mt-1.5 text-center leading-tight uppercase tracking-wider ${
                        ing.isCenter
                          ? 'text-[10px] font-bold text-primary'
                          : 'text-[9px] font-medium text-muted-foreground'
                      }`}
                    >
                      {ing.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
