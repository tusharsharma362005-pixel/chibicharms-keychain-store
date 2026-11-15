import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Wand2
} from 'lucide-react';
import KeychainVisual from '../components/KeychainVisual';

export default function CartPage({
  cartItems,
  updateQuantity,
  removeFromCart,
  navigate,
  openCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 35.00;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0.00 : 4.99;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const freeShippingDifference = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'CUTE10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else if (code === 'SWEET15') {
      setDiscountPercent(15);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code! Try "CUTE10" for 10% off');
      setPromoApplied(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-brand-pink-100 flex items-center justify-center text-4xl shadow-inner animate-bounce">
          🛍️
        </div>
        <h2 className="text-3xl font-extrabold font-heading text-[#3D2C2E]">Your Cart is Empty</h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Looks like you haven't picked any cute charms yet! Explore our ready-made collection or design your own customized keychain in our studio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('shop')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-pink-500 text-white font-bold text-sm shadow-cute hover:bg-brand-pink-600 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Ready-Made</span>
          </button>
          <button
            onClick={() => navigate('customize')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border-2 border-brand-pink-300 text-brand-pink-600 font-bold text-sm hover:bg-brand-pink-50 transition-all flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            <span>Customize a Keychain ✨</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Free Shipping Meter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E]">
            Your Cute Cart 🛒
          </h1>
          <button
            onClick={() => navigate('shop')}
            className="text-xs sm:text-sm font-bold text-brand-pink-600 hover:text-brand-pink-700 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-white p-4 rounded-3xl border border-brand-pink-100 shadow-sm">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
            <span className="flex items-center gap-1.5 text-gray-700">
              <Truck className="w-4 h-4 text-brand-pink-500" />
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <span className="text-emerald-600">Yay! You unlocked FREE tracked shipping! 🎁</span>
              ) : (
                <span>Add <strong>${freeShippingDifference.toFixed(2)}</strong> more for <strong>FREE shipping</strong>!</span>
              )}
            </span>
            <span className="text-brand-pink-600">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-pink-400 to-brand-peach-400 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List of Items */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId || item.id}
              className="bg-white rounded-4xl border border-brand-pink-100 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-center sm:items-start justify-between"
            >
              {/* Thumbnail */}
              <div className="w-28 h-32 bg-brand-pink-50/50 rounded-2xl flex items-center justify-center p-2 shrink-0 border border-brand-pink-100">
                <KeychainVisual
                  type={item.imageType || 'cloud'}
                  color={item.selectedOptions?.colorHex || item.customDetails?.colorHex || item.colors?.[0]?.hex || '#FFCAD4'}
                  hardware={item.selectedOptions?.hardware || item.customDetails?.hardware || 'gold-star'}
                  finish={item.customDetails?.finish || 'glitter'}
                  text={item.customDetails?.text || ''}
                  charms={item.customDetails?.charms || []}
                  sparkles={false}
                  className="w-24 h-28"
                />
              </div>

              {/* Info details */}
              <div className="flex-1 space-y-1.5 text-center sm:text-left w-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-gray-800">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeFromCart(item.cartItemId || item.id)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Tags / Custom Specifications */}
                {item.isCustom ? (
                  <div className="bg-brand-pink-50/70 p-3 rounded-2xl border border-brand-pink-100 text-xs space-y-1 text-gray-600">
                    <div className="flex items-center gap-1 font-bold text-brand-pink-600">
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>Custom Built Keychain Specifications:</span>
                    </div>
                    <p>• <strong>Base:</strong> {item.customDetails?.shapeName} ({item.customDetails?.colorName})</p>
                    <p>• <strong>Finish:</strong> {item.customDetails?.finishName}</p>
                    {item.customDetails?.text && (
                      <p>• <strong>Engraved Text:</strong> "{item.customDetails.text}"</p>
                    )}
                    <p>• <strong>Hardware:</strong> {item.customDetails?.hardwareName}</p>
                    {item.customDetails?.charms?.length > 0 && (
                      <p>• <strong>Charms:</strong> {item.customDetails.charms.join(', ')}</p>
                    )}
                    {item.customDetails?.giftBox && (
                      <p>• <strong>Gift Box:</strong> Included (+ $3.00)</p>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 space-y-0.5">
                    {item.selectedOptions?.color && (
                      <p>Color: <span className="font-bold text-gray-700">{item.selectedOptions.color}</span></p>
                    )}
                    {item.selectedOptions?.hardware && (
                      <p>Clasp: <span className="font-bold text-gray-700 capitalize">{item.selectedOptions.hardware.replace('-', ' ')}</span></p>
                    )}
                  </div>
                )}

                {/* Price & Quantity Controls */}
                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white text-gray-700 font-bold flex items-center justify-center hover:bg-brand-pink-50 shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white text-gray-700 font-bold flex items-center justify-center hover:bg-brand-pink-50 shadow-sm"
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <span className="text-base sm:text-lg font-extrabold text-[#3D2C2E]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[11px] text-gray-400 block text-right">
                        ${item.price.toFixed(2)} ea
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm space-y-6">
          <h3 className="font-heading font-bold text-lg text-gray-800">Order Summary</h3>

          {/* Promo code form */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-xs font-bold text-gray-600 block">Promo or Gift Code:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. CUTE10"
                className="flex-1 bg-brand-pink-50/50 border border-brand-pink-200 rounded-2xl px-3 py-2 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
              />
              <button
                type="submit"
                className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-sm transition-colors"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <span className="text-xs text-emerald-600 font-bold block">
                ✓ Code applied! {discountPercent}% discount activated!
              </span>
            )}
            {promoError && (
              <span className="text-xs text-red-500 font-medium block">
                {promoError}
              </span>
            )}
          </form>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-3 border-t border-brand-pink-100 text-xs sm:text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount ({discountPercent}%):</span>
                <span>- ${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Tracked Shipping:</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-brand-pink-100 flex justify-between items-baseline">
              <span className="font-heading font-bold text-base text-gray-800">Total Price:</span>
              <span className="text-2xl font-extrabold text-[#3D2C2E] font-heading">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={openCheckout}
            className="w-full py-4 rounded-full bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 hover:from-brand-pink-600 hover:to-brand-pink-700 text-white font-extrabold text-base shadow-cute hover:shadow-cute-hover hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Trust Guarantees */}
          <div className="space-y-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Safe 256-Bit SSL Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-pink-500 shrink-0" />
              <span>Free Mystery Kawaii Sticker Sheet in Every Order</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
