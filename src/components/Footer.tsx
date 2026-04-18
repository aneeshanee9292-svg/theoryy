import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/theoryy-logo.png';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/theoryy.in/', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Facebook, href: 'https://facebook.com/theoryy', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: Youtube, href: 'https://youtube.com/@theoryy', label: 'YouTube', color: 'hover:text-red-500' },
  { icon: Twitter, href: 'https://twitter.com/theoryy', label: 'Twitter', color: 'hover:text-sky-400' },
];

const quickLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Our Story', href: '#story' },
  { label: 'Shop', href: '/shop' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Shipping Policy', href: '#' },
  { label: 'Refund Policy', href: '#' },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="relative bg-[hsl(var(--surface-dark))] text-[hsl(var(--surface-warm))] overflow-hidden">
      {/* Gradient top border */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Main footer content */}
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <img src={logo} alt="Theoryy" className="h-10 mb-5 brightness-0 invert opacity-90" />
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
              Practically balanced nutrition that actually tastes incredible. Real ingredients, zero junk.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300 ${social.color} hover:bg-white/10 hover:border-white/20 hover:scale-110`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-heading uppercase tracking-widest mb-5 text-white/90">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-heading uppercase tracking-widest mb-5 text-white/90">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter + Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-heading uppercase tracking-widest mb-5 text-white/90">Stay Connected</h3>
            <p className="text-sm text-white/50 mb-4">Get exclusive drops & offers straight to your inbox.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
              className="flex mb-6"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-l-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-r-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-3 text-sm text-white/50">
              <a href="mailto:hello@theoryy.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary/70" />
                hello@theoryy.in
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
                <span>India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Theoryy. Practically Balanced Nutrition. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={`bottom-${social.label}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
