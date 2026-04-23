import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, Mail, ArrowRight, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state as {
    orderId?: string;
    paymentId?: string;
    amount?: number;
    email?: string;
    fullName?: string;
  } | null;

  useEffect(() => {
    // If someone navigates here directly without order data, redirect home
    if (!orderData) {
      const timer = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(timer);
    }
  }, [orderData, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <main className="flex-1 relative z-10 py-8 pt-24 px-4 sm:px-6 flex items-center justify-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-card rounded-2xl border border-border p-8 sm:p-12 text-center"
          >
            {/* Success icon with animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-3xl sm:text-4xl uppercase mb-3"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              {orderData?.fullName ? `Thank you, ${orderData.fullName}!` : 'Thank you!'} Your payment was successful and your order has been placed.
            </motion.p>

            {/* Order details */}
            {orderData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-muted/30 rounded-xl border border-border p-6 mb-8 text-left space-y-3"
              >
                {orderData.orderId && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Package className="w-4 h-4" /> Order ID
                    </span>
                    <span className="font-mono font-semibold text-xs">{orderData.orderId}</span>
                  </div>
                )}
                {orderData.paymentId && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" /> Payment ID
                    </span>
                    <span className="font-mono font-semibold text-xs">{orderData.paymentId}</span>
                  </div>
                )}
                {orderData.amount && (
                  <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="text-lg font-bold text-primary">₹{orderData.amount}</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Email notification */}
            {orderData?.email && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8 p-3 rounded-xl bg-green-500/5 border border-green-500/20"
              >
                <Mail className="w-4 h-4 text-green-500" />
                <span>Invoice has been sent to <strong className="text-foreground">{orderData.email}</strong></span>
              </motion.div>
            )}

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/shop')}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm cta-glow hover:brightness-110 transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-muted text-foreground font-bold uppercase tracking-wider text-sm hover:bg-muted/80 transition-all"
              >
                Back to Home
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
