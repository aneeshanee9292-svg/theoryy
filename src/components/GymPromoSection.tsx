import { motion } from 'framer-motion';
import promoPeanut from '@/assets/promo-peanut-butter.png';
import promoCocoa from '@/assets/promo-cocoa-fudge.png';

const promos = [
  {
    image: promoPeanut,
    title: 'Tiramisu Peanut Butter',
    tagline: 'Crush Your PR. Then Crush This Bar.',
    stat: '20g Protein',
  },
  {
    image: promoCocoa,
    title: 'Double Cocoa Fudge',
    tagline: 'Post-Workout Fuel That Hits Different.',
    stat: '22g Protein',
  },
];

const GymPromoSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-[hsl(var(--surface-dark))]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Built For The Gym
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading uppercase text-[hsl(var(--surface-warm))]">
            Fuel Your <span className="text-gradient-brand">Beast Mode</span>
          </h2>
          <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
            Real protein. Real ingredients. The bar that keeps up with your grind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {promos.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative rounded-2xl overflow-hidden hover-lift"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GymPromoSection;
