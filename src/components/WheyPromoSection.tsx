import { motion } from 'framer-motion';
import wheyPromoDesktop from '@/assets/whey_promtion_.png';
import wheyPromoMobile from '@/assets/whey_promotio_mobile.png';

const WheyPromoSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop Image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="hidden md:block"
      >
        <img
          src={wheyPromoDesktop}
          alt="Theoryy Protein Bars – Double Cocoa Fudge and Tiramisu Peanut Butter"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Mobile Image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="md:hidden"
      >
        <img
          src={wheyPromoMobile}
          alt="Theoryy Protein Bars – Double Cocoa Fudge and Tiramisu Peanut Butter"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
};

export default WheyPromoSection;
