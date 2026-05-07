import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle2,
  Package,
  CreditCard,
  Loader2,
  ShoppingBag,
  Tag,
  Truck,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStates, getCitiesByState } from '@/data/indianStatesAndCities';

import { API_BASE } from '@/config';

/* ─── Types ─────────────────────────────────────────── */
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

type Step = 'details' | 'verify' | 'review';

/* ─── Razorpay type ──────────────────────────────── */
declare global {
  interface Window {
    Razorpay: any;
  }
}

/* ─── Component ──────────────────────────────────── */
const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems } = useCartStore();

  /* redirect if cart empty */
  useEffect(() => {
    if (items.length === 0) navigate('/');
  }, [items, navigate]);

  /* ── form state ── */
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 15));

  /* ── OTP state (mobile only) ── */
  const [phoneOTPInput, setPhoneOTPInput] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOTPSent, setPhoneOTPSent] = useState(false);
  const [phoneOTPError, setPhoneOTPError] = useState('');
  const [sendingPhoneOTP, setSendingPhoneOTP] = useState(false);

  /* ── coupon state ── */
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  /* ── payment state ── */
  const [paying, setPaying] = useState(false);

  /* ── Countdown timer ── */
  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const phoneTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
    };
  }, []);

  /* ── shipping charge ── */
  const SHIPPING_THRESHOLD = 500;
  const SHIPPING_CHARGE = 49;
  const subtotal = totalPrice();
  const shippingCharge = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;

  /* ── state/city helpers ── */
  const statesList = useMemo(() => getStates(), []);
  const citiesList = useMemo(() => getCitiesByState(form.state), [form.state]);

  /* ── helpers ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'state') {
      // Reset city when state changes
      setForm((prev) => ({ ...prev, state: value, city: '' }));
      setErrors((prev) => ({ ...prev, state: '', city: '' }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateDetails = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = 'Enter a valid 10-digit phone';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToVerify = () => {
    if (validateDetails()) setStep('verify');
  };

  /* ── OTP sending (via Email — free) ── */
  const sendPhoneOTP = async () => {
    setSendingPhoneOTP(true);
    setPhoneOTPError('');
    try {
      await fetch(
        `${API_BASE}/otp/send?mobileNumber=${encodeURIComponent(form.phone)}&email=${encodeURIComponent(form.email)}`,
        { method: 'POST' }
      );
      setPhoneOTPSent(true);
      setPhoneCountdown(30);
      phoneTimerRef.current = setInterval(() => {
        setPhoneCountdown((c) => {
          if (c <= 1) {
            if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (e) {
      setPhoneOTPError('Failed to send OTP.');
    } finally {
      setSendingPhoneOTP(false);
    }
  };

  const verifyPhoneOTP = async () => {
    try {
      const res = await fetch(`${API_BASE}/otp/verify?mobileNumber=${encodeURIComponent(form.phone)}&otp=${encodeURIComponent(phoneOTPInput)}`, { method: 'POST' });
      if (res.ok) {
        setPhoneVerified(true);
        setPhoneOTPError('');
      } else {
        setPhoneOTPError('Invalid OTP. Please try again.');
      }
    } catch (e) {
      setPhoneOTPError('Invalid OTP. Please try again.');
    }
  };

  /* ── Razorpay ── */
  const loadRazorpayScript = (): Promise<boolean> =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setPaying(true);

    try {
      // 1. Sync cart items to backend using sessionId
      for (const item of items) {
        await fetch(`${API_BASE}/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId,
            productId: parseInt(item.product.id),
            quantity: item.quantity,
            price: item.product.price
          })
        });
      }

      // 2. Checkout the order via backend — include ALL delivery details
      const checkoutRes = await fetch(`${API_BASE}/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          mobileNumber: form.phone,
          email: form.email,
          fullName: form.fullName,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          couponCode: couponApplied ? couponCode : null
        })
      });

      if (!checkoutRes.ok) {
        const errBody = await checkoutRes.text();
        throw new Error(errBody || "Failed to create order on server");
      }

      const checkoutData = await checkoutRes.json();
      const rzpOrderId = checkoutData.data?.razorpayOrderId;
      // Backend returns amount in rupees; Razorpay expects paise
      const amountInPaise = Math.round((checkoutData.data?.amount || 0) * 100);

      if (!rzpOrderId) {
        throw new Error("No Razorpay order ID received from server. Check backend logs.");
      }

      if (amountInPaise < 100) {
        throw new Error("Order amount must be at least ₹1 (100 paise) for Razorpay.");
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Failed to load Razorpay. Check your internet connection.');
        setPaying(false);
        return;
      }

      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKeyId) {
        throw new Error("Razorpay key not configured. Check VITE_RAZORPAY_KEY_ID in .env");
      }

      const options = {
        key: razorpayKeyId,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Theoryy',
        description: `Order of ${totalItems()} item(s)`,
        image: '/theoryy-logo.png',
        order_id: rzpOrderId,
        handler: async (response: any) => {
          console.log('Payment success:', response);
          try {
            const verifyRes = await fetch(`${API_BASE}/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            if (verifyRes.ok) {
              // Clear cart fully
              const currentItems = useCartStore.getState().items;
              currentItems.forEach((ci) =>
                useCartStore.getState().removeItem(ci.product.id)
              );
              // Redirect to success page with order details
              navigate('/order-success', {
                state: {
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  amount: amountInPaise / 100,
                  email: form.email,
                  fullName: form.fullName,
                },
              });
            } else {
              const errText = await verifyRes.text();
              alert("Payment verification failed: " + errText);
              setPaying(false);
            }
          } catch (e) {
            alert("Error during payment verification. Please contact support.");
            setPaying(false);
          }
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: `+91${form.phone}`,
        },
        notes: {
          address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        },
        theme: {
          color: '#8b2525',
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setPaying(false);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert('Oops! Something went wrong.\n' + err.message);
      setPaying(false);
    }
  };

  /* ── step indicator ── */
  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: 'details', label: 'Details', icon: <User className="w-4 h-4" /> },
    { key: 'verify', label: 'Verify', icon: <Shield className="w-4 h-4" /> },
    { key: 'review', label: 'Pay', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  /* ── Slide animation variants ── */
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };
  const [direction, setDirection] = useState(1);

  const goStep = (s: Step) => {
    const newIndex = steps.findIndex((st) => st.key === s);
    setDirection(newIndex > stepIndex ? 1 : -1);
    setStep(s);
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <main className="flex-1 relative z-10 py-8 pt-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Cart</span>
          </motion.button>

          {/* Page heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading uppercase mb-10"
          >
            Checkout
          </motion.h1>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-0 mb-12"
          >
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${i <= stepIndex
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-muted text-muted-foreground'
                    }`}
                >
                  {i < stepIndex ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    s.icon
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 transition-all duration-500 ${i < stepIndex ? 'bg-primary' : 'bg-border'
                      }`}
                  />
                )}
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ─── Left: Form Steps ─── */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 min-h-[480px] overflow-hidden relative">
                <AnimatePresence mode="wait" custom={direction}>
                  {/* ─── STEP 1: DETAILS ─── */}
                  {step === 'details' && (
                    <motion.div
                      key="details"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <h2 className="font-heading text-xl uppercase mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Your Details
                      </h2>

                      <div className="space-y-5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              type="text"
                              name="fullName"
                              value={form.fullName}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.fullName ? 'border-destructive' : 'border-border'
                                } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm`}
                            />
                          </div>
                          {errors.fullName && (
                            <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
                          )}
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.email ? 'border-destructive' : 'border-border'
                                  } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm`}
                              />
                            </div>
                            {errors.email && (
                              <p className="text-destructive text-xs mt-1">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="10-digit number"
                                maxLength={10}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.phone ? 'border-destructive' : 'border-border'
                                  } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm`}
                              />
                            </div>
                            {errors.phone && (
                              <p className="text-destructive text-xs mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                            Delivery Address
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                            <textarea
                              name="address"
                              value={form.address}
                              onChange={handleChange}
                              rows={2}
                              placeholder="House no, Street, Landmark"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.address ? 'border-destructive' : 'border-border'
                                } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none`}
                            />
                          </div>
                          {errors.address && (
                            <p className="text-destructive text-xs mt-1">{errors.address}</p>
                          )}
                        </div>

                        {/* State, City, Pincode */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                          <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                              State
                            </label>
                            <div className="relative">
                              <select
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className={`w-full appearance-none px-4 py-3 rounded-xl bg-muted/50 border ${errors.state ? 'border-destructive' : 'border-border'
                                  } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm pr-10`}
                              >
                                <option value="">Select State</option>
                                {statesList.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                            {errors.state && (
                              <p className="text-destructive text-xs mt-1">{errors.state}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                              City
                            </label>
                            <div className="relative">
                              <select
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                disabled={!form.state}
                                className={`w-full appearance-none px-4 py-3 rounded-xl bg-muted/50 border ${errors.city ? 'border-destructive' : 'border-border'
                                  } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm pr-10 disabled:opacity-50 disabled:cursor-not-allowed`}
                              >
                                <option value="">{form.state ? 'Select City' : 'Select state first'}</option>
                                {citiesList.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                            {errors.city && (
                              <p className="text-destructive text-xs mt-1">{errors.city}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                              Pincode
                            </label>
                            <input
                              type="text"
                              name="pincode"
                              value={form.pincode}
                              onChange={handleChange}
                              placeholder="6-digit"
                              maxLength={6}
                              className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${errors.pincode ? 'border-destructive' : 'border-border'
                                } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm`}
                            />
                            {errors.pincode && (
                              <p className="text-destructive text-xs mt-1">{errors.pincode}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Next button */}
                      <div className="flex justify-end mt-8">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={goToVerify}
                          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm cta-glow hover:brightness-110 transition-all"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── STEP 2: VERIFICATION (Mobile OTP Only) ─── */}
                  {step === 'verify' && (
                    <motion.div
                      key="verify"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <h2 className="font-heading text-xl uppercase mb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Verify Your Identity
                      </h2>
                      <p className="text-muted-foreground text-sm mb-8 break-words">
                        We'll send a verification code to{' '}
                        <strong className="break-words">{form.email}</strong> to confirm your order.
                      </p>

                      <div className="space-y-8">
                        {/* Phone Verification */}
                        <div className="p-5 rounded-xl bg-muted/30 border border-border space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${phoneVerified
                                  ? 'bg-green-500/20 text-green-500'
                                  : 'bg-primary/10 text-primary'
                                  }`}
                              >
                                {phoneVerified ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  <Phone className="w-5 h-5" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Email Verification</p>
                                <p className="text-xs text-muted-foreground break-words">{form.email}</p>
                              </div>
                            </div>
                            {phoneVerified && (
                              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                                Verified ✓
                              </span>
                            )}
                          </div>

                          {!phoneVerified && (
                            <>
                              {!phoneOTPSent ? (
                                <motion.button
                                  whileTap={{ scale: 0.97 }}
                                  onClick={sendPhoneOTP}
                                  disabled={sendingPhoneOTP}
                                  className="w-full py-3 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                  {sendingPhoneOTP ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      Sending OTP...
                                    </>
                                  ) : (
                                    'Send OTP to Email'
                                  )}
                                </motion.button>
                              ) : (
                                <div className="space-y-3">
                                  <input
                                    type="text"
                                    value={phoneOTPInput}
                                    onChange={(e) => {
                                      setPhoneOTPInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                                      setPhoneOTPError('');
                                    }}
                                    placeholder="Enter 4-digit OTP"
                                    maxLength={6}
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-center tracking-[0.3em] font-mono"
                                  />
                                  {phoneOTPError && (
                                    <p className="text-destructive text-xs">{phoneOTPError}</p>
                                  )}
                                  <p className="text-xs text-muted-foreground">
                                    {phoneCountdown > 0 ? (
                                      <>Resend OTP in {phoneCountdown}s</>
                                    ) : (
                                      <button
                                        onClick={sendPhoneOTP}
                                        className="text-primary hover:underline"
                                      >
                                        Resend OTP
                                      </button>
                                    )}
                                  </p>
                                  <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={verifyPhoneOTP}
                                    disabled={phoneOTPInput.length < 4}
                                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 hover:brightness-110 transition-all"
                                  >
                                    Verify
                                  </motion.button>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {/* Email info (for invoice, no OTP) */}
                        <div className="p-5 rounded-xl bg-muted/30 border border-border">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/20 text-green-500">
                              <Phone className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Phone for Delivery</p>
                              <p className="text-xs text-muted-foreground">+91 {form.phone}</p>
                            </div>
                            <span className="ml-auto text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                              Saved ✓
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Your phone number will be used for delivery coordination and order updates.
                          </p>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex justify-between mt-8">
                        <button
                          onClick={() => goStep('details')}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => goStep('review')}
                          disabled={!phoneVerified}
                          className="flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs sm:text-sm cta-glow hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                          Review & Pay
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── STEP 3: REVIEW & PAY ─── */}
                  {step === 'review' && (
                    <motion.div
                      key="review"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <h2 className="font-heading text-xl uppercase mb-6 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Review Your Order
                      </h2>

                      {/* Delivery Info */}
                      <div className="p-5 rounded-xl bg-muted/30 border border-border space-y-3 mb-6">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                          Delivery To
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name:</span>{' '}
                            <span className="font-medium">{form.fullName}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Email:</span>{' '}
                            <span className="font-medium">{form.email}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Phone:</span>{' '}
                            <span className="font-medium">+91 {form.phone}</span>
                            <CheckCircle2 className="inline w-3.5 h-3.5 text-green-500 ml-1" />
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-muted-foreground">Address:</span>{' '}
                            <span className="font-medium">
                              {form.address}, {form.city}, {form.state} - {form.pincode}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="space-y-3 mb-6">
                        {items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-4 p-3 rounded-xl bg-muted/20"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-14 h-14 object-contain rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity} × ₹{item.product.price}
                              </p>
                            </div>
                            <p className="text-sm font-bold">
                              ₹{item.quantity * item.product.price}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Coupon Code Input */}
                      <div className="p-5 rounded-xl bg-muted/30 border border-border space-y-3 mb-6">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-primary flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Apply Coupon
                        </h3>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value.toUpperCase());
                              setCouponError('');
                            }}
                            placeholder="Enter coupon code"
                            disabled={couponApplied || validatingCoupon}
                            className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                              couponError ? 'border-destructive' : couponApplied ? 'border-green-500' : 'border-border'
                            } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm uppercase tracking-wider font-mono ${
                              couponApplied ? 'opacity-60' : ''
                            }`}
                          />
                          {couponApplied ? (
                            <button
                              onClick={() => {
                                setCouponApplied(false);
                                setCouponCode('');
                                setCouponError('');
                                setCouponDiscount(0);
                                setCouponMessage('');
                              }}
                              className="w-full py-3 rounded-xl bg-destructive/10 text-destructive font-semibold text-sm hover:bg-destructive/20 transition-all"
                            >
                              Remove
                            </button>
                          ) : (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              disabled={validatingCoupon}
                              onClick={async () => {
                                if (!couponCode.trim()) {
                                  setCouponError('Enter a coupon code');
                                  return;
                                }
                                setValidatingCoupon(true);
                                setCouponError('');
                                try {
                                  const res = await fetch(
                                    `${API_BASE}/coupons/validate?code=${encodeURIComponent(couponCode)}&amount=${totalPrice()}`
                                  );
                                  const data = await res.json();
                                  if (res.ok && data.valid) {
                                    setCouponApplied(true);
                                    setCouponDiscount(data.discount);
                                    setCouponMessage(data.message);
                                  } else {
                                    setCouponError(data.message || 'Invalid coupon');
                                  }
                                } catch {
                                  setCouponError('Failed to validate coupon');
                                } finally {
                                  setValidatingCoupon(false);
                                }
                              }}
                              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                              {validatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                              Apply
                            </motion.button>
                          )}
                        </div>
                        {couponError && (
                          <p className="text-destructive text-xs">{couponError}</p>
                        )}
                        {couponApplied && (
                          <p className="text-green-500 text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {couponMessage} — you save ₹{couponDiscount}
                          </p>
                        )}
                      </div>

                      {/* Total */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>
                        {couponApplied && couponDiscount > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-500 flex items-center gap-1">
                              <Tag className="w-3.5 h-3.5" /> Coupon ({couponCode})
                            </span>
                            <span className="text-green-500 font-medium">-₹{couponDiscount}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Truck className="w-3.5 h-3.5" /> Shipping
                          </span>
                          {shippingCharge === 0 ? (
                            <span className="text-green-500 font-medium">Free</span>
                          ) : (
                            <span>₹{shippingCharge}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-border">
                          <span className="font-heading text-lg uppercase">Total</span>
                          <span className="text-2xl font-bold text-primary">₹{Math.max(0, subtotal - couponDiscount + shippingCharge)}</span>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between">
                        <button
                          onClick={() => goStep('verify')}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={handlePayment}
                          disabled={paying}
                          className="flex items-center gap-2 px-5 py-2.5 sm:px-10 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs sm:text-sm cta-glow hover:brightness-110 transition-all disabled:opacity-60 animate-pulse-glow"
                        >
                          {paying ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4" />
                              Pay ₹{Math.max(0, subtotal - couponDiscount + shippingCharge)}
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ─── Right: Order Summary Sidebar ─── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-6 sticky top-24"
              >
                <h3 className="font-heading text-lg uppercase mb-5 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  Order Summary
                </h3>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain rounded-lg bg-muted/30"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold">₹{item.quantity * item.product.price}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    {shippingCharge === 0 ? (
                      <span className="text-green-500 font-medium">Free</span>
                    ) : (
                      <span>₹{shippingCharge}</span>
                    )}
                  </div>
                  {shippingCharge === 0 && (
                    <div className="text-xs text-green-500/80 flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Free shipping on orders ≥ ₹{SHIPPING_THRESHOLD}
                    </div>
                  )}
                  {couponApplied && couponDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-500">Coupon</span>
                      <span className="text-green-500 font-medium">-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-heading text-base uppercase">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ₹{Math.max(0, subtotal - couponDiscount + shippingCharge)}
                    </span>
                  </div>
                </div>
                {/* Trust badges */}
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Secure checkout with Razorpay</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Package className="w-3.5 h-3.5" />
                    <span>Delivered in 3-5 business days</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
