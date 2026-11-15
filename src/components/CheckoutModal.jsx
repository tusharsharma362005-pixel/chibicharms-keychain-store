import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, Sparkles, ArrowRight, Truck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { placeOrder } from '../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  clearCart,
  navigate
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: 'Emily Watson',
    email: 'emily.cute@example.com',
    address: '42 Blossom Sakura Lane',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    paymentMethod: 'card'
  });
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 35 ? 0 : 4.99;
  const total = subtotal + shipping;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#F43F7E', '#A78BFA', '#FEF08A', '#5EEAD4', '#FDA4AF']
      });
    } catch (e) {
      // fallback
    }
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsSubmitting(true);
      setSubmitError('');

      const generatedOrder = `CC-${Math.floor(100000 + Math.random() * 900000)}`;

      // Package complete order payload for backend API
      const orderPayload = {
        orderId: generatedOrder,
        customerName: formData.name,
        customerEmail: formData.email,
        customerAddress: formData.address,
        customerCity: formData.city,
        customerState: formData.state,
        customerZip: formData.zip,
        paymentMethod: formData.paymentMethod,
        subtotal: Number(subtotal.toFixed(2)),
        shipping: Number(shipping.toFixed(2)),
        discount: 0,
        totalPrice: Number(total.toFixed(2)),
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          isCustom: Boolean(item.isCustom),
          imageType: item.imageType || 'cloud',
          selectedOptions: item.selectedOptions || null,
          customDetails: item.customDetails || null
        }))
      };

      try {
        await placeOrder(orderPayload);
        setOrderNumber(generatedOrder);
        setStep(3);
        triggerConfetti();
        clearCart();
      } catch (err) {
        console.error('Failed to submit order to backend:', err);
        setSubmitError(err.message || 'Error communicating with database');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-5xl border border-brand-pink-100 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        {step !== 3 && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* STEP 1 & 2: FORM */}
        {step < 3 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">✨</span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-pink-600">
                  Secure Checkout ({step}/2)
                </span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-gray-800">
                {step === 1 ? 'Shipping Address' : 'Payment Details'}
              </h2>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* STEP 1: Shipping fields */}
            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Email Address (for order tracking)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Payment details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {['card', 'apple-pay', 'paypal'].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setFormData({ ...formData, paymentMethod: m })}
                      className={`p-3 rounded-2xl border text-xs font-bold capitalize transition-all ${
                        formData.paymentMethod === m
                          ? 'bg-brand-pink-50 border-brand-pink-500 text-brand-pink-700 ring-2 ring-brand-pink-200'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {m === 'card' && '💳 Card'}
                      {m === 'apple-pay' && '🍎 Apple Pay'}
                      {m === 'paypal' && '🅿️ PayPal'}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-600 block mb-1">Expiration</label>
                      <input
                        type="text"
                        required
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600 block mb-1">CVC Code</label>
                      <input
                        type="text"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-brand-pink-50/40 border border-brand-pink-200 rounded-2xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-brand-pink-50/60 p-3 rounded-2xl border border-brand-pink-100 flex items-center justify-between text-xs">
                  <span className="text-gray-600">Total Charged to Card:</span>
                  <span className="font-bold text-brand-pink-600 text-base">${total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {step === 2 && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-6 rounded-full bg-brand-pink-500 hover:bg-brand-pink-600 text-white font-bold text-sm shadow-cute flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {step === 1 ? (
                  <>
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : isSubmitting ? (
                  <span>Saving Order to Database... ✨</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${total.toFixed(2)} & Complete Order ✨</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: CELEBRATION & ORDER SUCCESS */}
        {step === 3 && (
          <div className="text-center py-6 space-y-5 animate-scale-up">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-brand-pink-400 to-brand-peach-400 text-white flex items-center justify-center text-4xl shadow-cute animate-bounce">
              🎉
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold text-brand-pink-600 uppercase tracking-widest bg-brand-pink-100 px-3 py-1 rounded-full">
                THANK YOU SO MUCH! 💖
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-gray-800">
                Your Charms are in Production!
              </h2>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Saved in SQLite database! Order confirmation sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-brand-pink-50/70 p-4 rounded-3xl border border-brand-pink-100 text-xs text-left space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-bold text-gray-800 font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping To:</span>
                <span className="font-bold text-gray-800">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-600">3-5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Database Status:</span>
                <span className="font-bold text-amber-600">In Production Queue</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  navigate('admin');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-lavender-500 hover:bg-brand-lavender-600 text-white font-bold text-xs shadow-sm transition-all"
              >
                View in Admin Orders 🔐
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('shop');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-pink-500 hover:bg-brand-pink-600 text-white font-bold text-xs shadow-cute transition-all"
              >
                Back to Shop ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
