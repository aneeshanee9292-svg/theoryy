import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import type { Product } from '@/store/cartStore';
import { fetchProducts } from '@/data/products';

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  return (
    <section id="products" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            The Collection
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading uppercase">
            Pick Your <span className="text-gradient-brand">Craving</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
