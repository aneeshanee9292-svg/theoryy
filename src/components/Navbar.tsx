import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import logo from '@/assets/theoryy-logo.png';

const Navbar = () => {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-surface"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <a href="/" className="flex items-center">
          <img src={logo} alt="Theoryy" className="h-10" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-foreground transition-colors">
            Products
          </a>
          <a href="#benefits" className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-foreground transition-colors">
            Benefits
          </a>
          <a href="#story" className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-foreground transition-colors">
            Our Story
          </a>
        </div>

        <button
          onClick={toggleCart}
          className="relative p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ShoppingBag className="w-6 h-6 text-foreground" />
          {totalItems() > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
            >
              {totalItems()}
            </motion.span>
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
