import { motion } from 'framer-motion';
import ingredientsShowcase from '@/assets/ingredients-showcase.png';

const highlights = [
  { label: 'Clean Ingredients', icon: '🌿' },
  { label: '15g Whey Protein', icon: '💪' },
  { label: 'Naturally Sweetened', icon: '🍯' },
  { label: 'No Refined Sugar', icon: '🚫' },
  { label: 'Authentic Tiramisu Flavor', icon: '☕' },
  { label: '100% Whey Blend', icon: '🥛' },
];

const IngredientsSection = () => {
  return (
    <section id="ingredients" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            What Goes Inside
          </p>
          <h2 className="text-4xl md:text-5xl font-heading uppercase">
            Real <span className="text-gradient-brand">Ingredients</span>, Zero Junk
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <img
              src={ingredientsShowcase}
              alt="Theoryy protein bar with real ingredients"
              className="w-full rounded-2xl"
              loading="lazy"
            />
          </motion.div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
