import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/data/products';   // ✅ changed import
import type { Product } from '@/store/cartStore';
import { ChevronLeft } from 'lucide-react';

const Shop = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cocoa' | 'peanut'>('all');
  const [products, setProducts] = useState<Product[]>([]);

  // ✅ fetch products from backend on load
  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedFilter === 'cocoa') return product.name.toLowerCase().includes('cocoa');
    if (selectedFilter === 'peanut') return product.name.toLowerCase().includes('peanut');
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Flavor Collection
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading uppercase mb-6">
            Explore Our <span className="text-gradient-brand">Products</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Discover our range of delicious, protein-packed flavors
          </p>
        </motion.div>
      </div>

      {/* Filter Section */}
      <div className="py-8 px-4 sm:px-6 border-b border-border/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            {[
              { id: 'all', label: 'All Products' },
              { id: 'cocoa', label: 'Cocoa Collection' },
              { id: 'peanut', label: 'Peanut Butter' },
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-border text-foreground hover:bg-border/80'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: false }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="relative z-10 container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading uppercase mb-6">
              Ready to <span className="text-gradient-brand">Satisfy Your Craving?</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Add any of our delicious flavors to your cart and enjoy free shipping on orders over ₹500
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-secondary/20 text-primary font-bold hover:bg-secondary/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Home
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Shop;
