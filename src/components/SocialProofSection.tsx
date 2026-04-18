import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

const SocialProofSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/40 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Follow The Movement
          </p>
          <h2 className="text-4xl md:text-5xl font-heading uppercase mb-4">
            Join The <span className="text-gradient-brand">Theoryy</span> Tribe
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real people. Real gains. Follow us on Instagram for recipes, tips, and behind-the-scenes drops.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
        >
          {[
            { value: '10K+', label: 'Happy Customers' },
            { value: '4.8★', label: 'Average Rating' },
            { value: '100%', label: 'Clean Ingredients' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center px-6 py-4"
            >
              <span className="block text-3xl md:text-4xl font-heading text-gradient-brand">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1 block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-[2px]">
            <div className="rounded-2xl bg-card/95 backdrop-blur-sm p-8 md:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center mx-auto mb-5">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading uppercase mb-2">@theoryy.in</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                Follow us for daily motivation, new flavor drops, exclusive giveaways, 
                and the cleanest protein bar content on Instagram.
              </p>
              <a
                href="https://www.instagram.com/theoryy.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold uppercase tracking-wider text-sm hover:scale-105 hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
                Follow on Instagram
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-14 text-muted-foreground"
        >
          {['🔒 Secure Payments', '🚚 Fast Delivery', '💯 Quality Assured', '↩️ Easy Returns'].map((badge) => (
            <span key={badge} className="text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 bg-muted/50 px-4 py-2 rounded-full border border-border/50">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
