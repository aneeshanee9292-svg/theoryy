import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/theoryy-logo.png';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'About Us', href: '#story' },
];

const Navbar = () => {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const items = useCartStore((s) => s.items);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * If we're already on "/", just scroll to the hash.
   * Otherwise navigate to "/" first, then scroll after a short delay.
   */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Only intercept hash links
      if (!href.startsWith('#')) return;

      e.preventDefault();
      const sectionId = href.replace('#', '');

      if (location.pathname === '/') {
        // Already on home — scroll directly
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home, then scroll after page renders
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    },
    [location.pathname, navigate],
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 left-0 right-0 z-50 glass-surface"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Theoryy" className="h-10" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Instagram link */}
            <a
              href="https://www.instagram.com/beyond.theoryy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden md:flex p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-pink-500"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-foreground" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 py-3">
              <img src={logo} alt="Theoryy" className="h-10" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  onClick={(e) => {
                    setMobileOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className="text-3xl font-heading uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/shop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
              >
                Shop Now
              </motion.a>
            </div>

            {/* Social icons at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 pb-10"
            >
              <a
                href="https://www.instagram.com/beyond.theoryy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
