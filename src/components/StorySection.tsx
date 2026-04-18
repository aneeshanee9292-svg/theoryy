import { motion } from 'framer-motion';
import ingredientAlmond from '@/assets/ingredient-almond.png';
import ingredientPeanut from '@/assets/ingredient-peanut.png';
import ingredientCocoa from '@/assets/ingredient-cocoa.png';
import ingredientDates from '@/assets/ingredient-dates.png';
import ingredientWhey from '@/assets/ingredient-whey.png';
import ingredientCoffee from '@/assets/ingredient-coffee.png';

// Center piece
const centerIngredient = { src: ingredientWhey, name: 'Whey Protein', delay: 0 };

// Surrounding ingredients
const surroundingIngredients = [
  { src: ingredientAlmond, name: 'Premium Almonds', delay: 0.1, top: '0%', left: '10%' },
  { src: ingredientDates, name: 'Organic Dates', delay: 0.15, top: '0%', left: '55%' },
  { src: ingredientCoffee, name: 'Arabica Coffee', delay: 0.2, top: '35%', left: '0%' },
  { src: ingredientCocoa, name: 'Cocoa Beans', delay: 0.25, top: '35%', left: '70%' },
  { src: ingredientPeanut, name: 'Roasted Peanuts', delay: 0.3, top: '72%', left: '30%' },
];

const StorySection = () => {
  return (
    <section id="story" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-heading uppercase mb-6 leading-tight">
              Built For People Who
              <br />
              <span className="text-gradient-brand">Hate Protein Bars</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We started Theoryy because every protein bar tasted like cardboard
              wrapped in broken promises. We believed you shouldn't have to
              choose between nutrition and actually enjoying what you eat.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every bar is crafted with real ingredients — no fillers, no sugar
              alcohols, no compromises. Just practically balanced nutrition that
              tastes like the dessert you've been craving.
            </p>
          </motion.div>

          {/* Ingredients visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center min-h-[400px]"
          >
            {/* Center: Whey Protein (hero ingredient) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
              className="absolute"
              style={{ top: '30%', left: '30%' }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center"
              >
                <img
                  src={centerIngredient.src}
                  alt={centerIngredient.name}
                  className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                  loading="lazy"
                  width={512}
                  height={512}
                />
                <span className="mt-2 text-xs font-bold text-primary uppercase tracking-wider">
                  {centerIngredient.name}
                </span>
              </motion.div>
            </motion.div>

            {/* Surrounding 5 ingredients */}
            {surroundingIngredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + ing.delay, type: 'spring', stiffness: 150 }}
                className="absolute"
                style={{
                  top: ing.top,
                  left: ing.left,
                }}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <img
                    src={ing.src}
                    alt={ing.name}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-2xl"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
