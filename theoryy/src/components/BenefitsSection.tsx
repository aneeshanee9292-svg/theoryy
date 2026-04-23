import { motion } from 'framer-motion';
import { Leaf, Dumbbell, Heart, Flame, ShieldCheck, Sparkles } from 'lucide-react';

const benefits = [
  { icon: Dumbbell, title: '15+ gm Protein', desc: 'Premium whey & plant blend' },
  { icon: Leaf, title: 'All Natural', desc: 'No artificial sweeteners' },
  { icon: Heart, title: 'Pre + Probiotics', desc: 'Gut-friendly formula' },
  { icon: Flame, title: 'Low Sugar', desc: 'Under 3g per bar' },
  { icon: ShieldCheck, title: 'High Fiber', desc: '6g dietary fiber' },
  { icon: Sparkles, title: 'Clean Label', desc: 'Only real ingredients' },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Why Theoryy
          </p>
          <h2 className="text-4xl md:text-5xl font-heading uppercase">
            Nutrition That Doesn't
            <br />
            <span className="text-gradient-brand">Compromise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group rounded-2xl bg-card border border-border p-6 text-center hover-lift cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg uppercase mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
