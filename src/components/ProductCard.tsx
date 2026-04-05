import { motion } from 'framer-motion';
import type { Product } from '@/store/cartStore';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative rounded-2xl bg-card border border-border overflow-hidden hover-lift"
    >
      {/* Image with floating animation */}
      <div className="relative aspect-square overflow-hidden bg-muted/50 p-6 sm:p-8 flex items-center justify-center">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
          whileHover={{ scale: 1.08, rotate: 2 }}
          loading="lazy"
          width={800}
          height={800}
        />
      </div>

      {/* Info */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
            {product.protein} Protein
          </span>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl uppercase mb-1">{product.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4">{product.flavor}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-bold">₹{product.price}</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => addItem(product)}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wide transition-shadow hover:shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
