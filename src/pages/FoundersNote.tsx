import { motion } from 'framer-motion';
import { ArrowLeft, Quote, Heart, Brain, Shield, Star, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const values = [
  {
    icon: Heart,
    title: 'Quality Over Quantity',
    description: 'In a world full of excess, we stand for balance, intention, and mindful nourishment.',
    gradient: 'from-rose-500/80 to-pink-600/80',
  },
  {
    icon: Brain,
    title: 'Body Fuels Mind',
    description: 'Physical health is directly proportional to mental strength. Nourish right, think clear.',
    gradient: 'from-violet-500/80 to-purple-600/80',
  },
  {
    icon: Shield,
    title: 'No Shortcuts',
    description: "We don't believe in \"good enough.\" When it comes to your body — quality is non-negotiable.",
    gradient: 'from-emerald-500/80 to-teal-600/80',
  },
  {
    icon: Star,
    title: 'Beyond Barriers',
    description: 'Making everyone seamlessly fit into a balanced, quality-over-quantity lifestyle.',
    gradient: 'from-amber-500/80 to-orange-600/80',
  },
];

const FoundersNote = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── Elegant Hero ─── */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 overflow-hidden">
        {/* Subtle ambient light */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
          <div className="absolute top-10 right-1/3 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-primary/[0.04] blur-[100px] md:blur-[160px]" />
          <div className="absolute bottom-0 left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-accent/[0.03] blur-[80px] md:blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground/70 hover:text-foreground transition-colors mb-12 md:mb-16 group uppercase tracking-widest"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Home
            </Link>
          </motion.div>

          {/* Elegant label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-primary/40" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-primary/80 font-medium">
              Founder's Note
            </span>
          </motion.div>

          {/* Title — editorial style */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-heading uppercase leading-[1.1] mb-8 md:mb-10"
          >
            Better Choices
            <br />
            Shouldn't Feel Like
            <br />
            <span className="text-gradient-brand">Compromises</span>
          </motion.h1>

          {/* Thin separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-16 h-px bg-gradient-to-r from-primary/60 to-accent/60 origin-left mb-8 md:mb-10"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-lg font-light"
          >
            A personal letter on why THEORYY exists, the philosophy behind
            clean nutrition, and why there is no Plan B.
          </motion.p>
        </div>
      </section>

      {/* ─── Content ─── */}
      <section className="px-4 md:px-6 pb-20 md:pb-32">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-20">

            {/* ── Main Article ── */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Opening Quote */}
              <div className="relative mb-10 md:mb-14">
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/15 mb-4" />
                <p className="text-xl md:text-2xl lg:text-[1.7rem] font-heading text-foreground leading-snug tracking-wide uppercase">
                  Our mission is simple — to make everyday nutrition smarter, cleaner, and genuinely enjoyable.
                </p>
              </div>

              {/* Body */}
              <div className="space-y-6 md:space-y-8 text-sm md:text-[15px] lg:text-base text-muted-foreground leading-[1.85] font-light">
                <p>
                  At <strong className="text-foreground font-semibold tracking-wide">THEORYY</strong>, we believe
                  that better choices shouldn't feel like compromises. Our mission is simple — to make everyday
                  nutrition smarter, cleaner, and genuinely enjoyable.
                </p>

                <p>
                  As a <strong className="text-foreground font-semibold">doctor</strong>, I can strongly state that
                  physical health is directly proportional to mental strength. When you nourish your body right,
                  you build <em className="text-foreground not-italic font-medium">clarity</em>,{' '}
                  <em className="text-foreground not-italic font-medium">resilience</em>, and the strength to
                  show up fully in every aspect of life.
                </p>

                <p>
                  This belief has driven us to go beyond barriers and make everyone seamlessly fit into a balanced,{' '}
                  <strong className="text-foreground font-semibold">quality-over-quantity</strong> lifestyle.
                  In a world full of excess, we stand for balance, intention, and mindful nourishment.
                </p>

                {/* Highlighted Block — minimal, premium */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative my-10 md:my-14 py-8 md:py-12 px-6 md:px-10 border-t border-b border-border/40"
                >
                  <p className="text-base md:text-lg lg:text-xl text-foreground font-heading uppercase tracking-wider text-center leading-relaxed">
                    We don't believe in shortcuts.
                    <br />
                    We don't believe in "good enough."
                  </p>

                  <div className="flex items-center justify-center gap-2 my-5">
                    <Minus className="w-4 h-4 text-primary/30" />
                    <div className="w-2 h-2 rounded-full bg-primary/30" />
                    <Minus className="w-4 h-4 text-primary/30" />
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed font-light">
                    Because when it comes to your body and your life —{' '}
                    <strong className="text-foreground font-semibold">quality isn't optional, it's non-negotiable</strong>{' '}
                    and there's{' '}
                    <br />
                    <span className="text-gradient-brand font-bold uppercase tracking-wider">No Plan B</span>.
                  </p>
                </motion.div>

                {/* Closing philosophy */}
                <div className="pt-4">
                  <p className="text-sm md:text-base text-muted-foreground font-light italic mb-3">
                    This is not just our Philosophy —
                  </p>
                  <p className="text-2xl md:text-3xl font-heading uppercase tracking-wider">
                    This is our{' '}
                    <span className="text-gradient-brand">THEORYY</span>
                  </p>
                </div>
              </div>

              {/* ── Signature — clean, no avatar ── */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 md:mt-16 pt-8 border-t border-border/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-primary/50" />
                  <Minus className="w-3 h-3 text-primary/40" />
                </div>
                <p className="text-base md:text-lg font-heading text-foreground uppercase tracking-[0.15em]">
                  Dr. Hari Gayathri Chalumuri
                </p>
                <p className="text-xs md:text-sm text-muted-foreground/60 tracking-widest uppercase mt-1">
                  Founder, THEORYY
                </p>
              </motion.div>
            </motion.article>

            {/* ── Sidebar — Values ── */}
            <motion.aside
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="space-y-4 lg:sticky lg:top-28 lg:self-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-primary/40" />
                <h3 className="text-[10px] md:text-xs font-heading uppercase tracking-[0.4em] text-primary/70">
                  Our Values
                </h3>
              </div>

              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="group p-4 rounded-lg bg-card/50 border border-border/30 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-8 h-8 rounded-md bg-gradient-to-br ${val.gradient} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <val.icon className="w-4 h-4 text-white" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-foreground mb-0.5 uppercase tracking-wider">
                        {val.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/70 leading-relaxed font-light">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* CTA — refined */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="pt-4 mt-2"
              >
                <Link
                  to="/shop"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:opacity-90 transition-opacity"
                >
                  Shop THEORYY
                </Link>
              </motion.div>
            </motion.aside>

          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default FoundersNote;
