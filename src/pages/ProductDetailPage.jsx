import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Wand2,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Share2,
  Gift,
  ArrowLeft
} from 'lucide-react';
import KeychainVisual from '../components/KeychainVisual';
import { PRODUCTS } from '../data/products';
import { fetchProductById } from '../services/api';

export default function ProductDetailPage({
  productId,
  navigate,
  addToCart
}) {
  const initialProduct = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    let isMounted = true;
    if (productId) {
      fetchProductById(productId)
        .then((data) => {
          if (isMounted && data && data.name) {
            setProduct(data);
            if (data.colors && data.colors.length > 0) {
              setSelectedColor(data.colors[0]);
            }
          }
        })
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [productId]);

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : { name: 'Pastel', hex: '#FFCAD4' }
  );
  const [selectedHardware, setSelectedHardware] = useState('gold-star');
  const [quantity, setQuantity] = useState(1);
  const [isSparkleOn, setIsSparkleOn] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [addedNotice, setAddedNotice] = useState(false);

  // Recommendations (different products from same or other categories)
  const recommendations = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      hardware: selectedHardware
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <button onClick={() => navigate('home')} className="hover:text-brand-pink-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate('shop')} className="hover:text-brand-pink-600 transition-colors">
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => navigate('shop', { category: product.category })}
          className="hover:text-brand-pink-600 transition-colors"
        >
          {product.categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-bold truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Main Product Showcase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Large Product Imagery & Interactive Viewer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square bg-gradient-to-tr from-brand-pink-50 via-white to-brand-lavender-50 rounded-5xl border-2 border-white shadow-cute flex items-center justify-center p-8 overflow-hidden">
            {/* Badge */}
            <span className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-xs font-extrabold text-brand-pink-600 px-3.5 py-1.5 rounded-full shadow-sm border border-brand-pink-100 z-10">
              {product.badge}
            </span>

            {/* Sparkle Toggle */}
            <button
              onClick={() => setIsSparkleOn(!isSparkleOn)}
              title="Toggle Sparkles"
              className={`absolute top-6 right-6 p-2.5 rounded-full shadow-sm border border-brand-pink-100 z-10 transition-colors ${
                isSparkleOn ? 'bg-brand-pink-100 text-brand-pink-600' : 'bg-white text-gray-400'
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Large Interactive Visual */}
            <KeychainVisual
              type={product.imageType || 'cloud'}
              color={selectedColor.hex}
              hardware={selectedHardware}
              finish={product.id.includes('resin') ? 'glitter' : 'glitter'}
              text={product.id.includes('motel') ? 'LUCKY 77' : ''}
              charms={product.id.includes('bear') ? ['strawberry', 'star'] : []}
              sparkles={isSparkleOn}
              className="w-72 h-96 sm:w-80 sm:h-[420px]"
            />
          </div>

          {/* Mini Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white p-3 rounded-2xl border border-brand-pink-100 text-[11px] text-gray-600 flex flex-col items-center">
              <Truck className="w-4 h-4 text-brand-pink-500 mb-1" />
              <span className="font-bold">Fast Tracked Ship</span>
              <span>Dispatches in 24h</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-brand-pink-100 text-[11px] text-gray-600 flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-brand-lavender-500 mb-1" />
              <span className="font-bold">30-Day Happiness</span>
              <span>Free returns/swap</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-brand-pink-100 text-[11px] text-gray-600 flex flex-col items-center">
              <Gift className="w-4 h-4 text-brand-peach-500 mb-1" />
              <span className="font-bold">Gift Ready</span>
              <span>Includes stickers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-400 text-sm">
                {'★'.repeat(5)}
              </div>
              <span className="text-sm font-bold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewsCount} verified reviews)</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-2">
                In Stock & Ready
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E]">
              {product.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2 font-medium">
              {product.tagline}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-3 p-4 bg-brand-pink-50/60 rounded-3xl border border-brand-pink-100">
            <span className="text-3xl font-extrabold text-[#3D2C2E] font-heading">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-base text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-extrabold text-brand-pink-600 bg-brand-pink-100 px-2.5 py-0.5 rounded-full">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                <span>Color Option: <span className="text-brand-pink-600">{selectedColor.name}</span></span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-brand-pink-100 border-brand-pink-400 text-brand-pink-700 shadow-sm ring-2 ring-brand-pink-200'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-black/15 shadow-inner" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Clasp Style Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 block">
              Hardware Attachment:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'gold-star', name: 'Gold Star Clasp ⭐' },
                { id: 'rose-heart', name: 'Rose Heart Clasp 💖' },
                { id: 'silver-swivel', name: 'Silver Swivel 📎' }
              ].map((hw) => (
                <button
                  key={hw.id}
                  onClick={() => setSelectedHardware(hw.id)}
                  className={`p-2.5 rounded-2xl text-xs font-bold border transition-all text-center ${
                    selectedHardware === hw.id
                      ? 'bg-brand-pink-100 border-brand-pink-400 text-brand-pink-700 ring-2 ring-brand-pink-200'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {hw.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white text-gray-700 font-bold flex items-center justify-center hover:bg-brand-pink-50 transition-colors shadow-sm"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white text-gray-700 font-bold flex items-center justify-center hover:bg-brand-pink-50 transition-colors shadow-sm"
                >
                  +
                </button>
              </div>

              {/* Main Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-full text-white font-extrabold text-sm sm:text-base shadow-cute flex items-center justify-center gap-2.5 transition-all ${
                  addedNotice
                    ? 'bg-emerald-500 scale-105'
                    : 'bg-brand-pink-500 hover:bg-brand-pink-600 hover:scale-105 active:scale-95'
                }`}
              >
                {addedNotice ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Added {quantity} to Cart! ✨</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Optional Customize Button */}
            {product.customizable && (
              <button
                onClick={() => navigate('customize', { baseProduct: product.id })}
                className="w-full py-3 px-4 rounded-full bg-white hover:bg-brand-pink-50 border-2 border-brand-pink-300 text-brand-pink-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Wand2 className="w-4 h-4 text-brand-pink-500" />
                <span>Want your name or custom charms on this? Open Custom Studio ✨</span>
              </button>
            )}
          </div>

          {/* Details Accordion / Tabs */}
          <div className="pt-4 border-t border-brand-pink-100">
            <div className="flex border-b border-gray-200 gap-6 text-sm">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2.5 font-bold transition-all relative ${
                  activeTab === 'description'
                    ? 'text-brand-pink-600 border-b-2 border-brand-pink-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 font-bold transition-all relative ${
                  activeTab === 'specs'
                    ? 'text-brand-pink-600 border-b-2 border-brand-pink-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Materials & Size
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2.5 font-bold transition-all relative ${
                  activeTab === 'shipping'
                    ? 'text-brand-pink-600 border-b-2 border-brand-pink-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Shipping & Care
              </button>
            </div>

            <div className="py-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'specs' && (
                <ul className="space-y-2">
                  <li><strong>Materials:</strong> {product.materials}</li>
                  <li><strong>Dimensions:</strong> {product.dimensions}</li>
                  <li><strong>Finish:</strong> Scratch-resistant high-gloss UV resin</li>
                  <li><strong>Hardware:</strong> Tarnish-resistant electroplated brass</li>
                </ul>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p>📦 <strong>Processing time:</strong> Ships in 1-2 business days in protective bubble wrap & cute pink mailer.</p>
                  <p>🚚 <strong>Delivery:</strong> 3-5 business days USA, 7-12 business days Worldwide.</p>
                  <p>🧼 <strong>Care:</strong> Wipe gently with soft microfiber cloth. Avoid prolonged submergence in salt water.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="pt-10 border-t border-brand-pink-100 space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-800">
          You Might Also Adore 💖
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => {
                navigate('product', { productId: rec.id });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-3xl p-4 border border-brand-pink-100 shadow-sm hover:shadow-cute cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="aspect-square bg-brand-pink-50/50 rounded-2xl p-2 flex items-center justify-center">
                <KeychainVisual
                  type={rec.imageType || 'cloud'}
                  color={rec.colors[0]?.hex || '#FFCAD4'}
                  hardware="gold-star"
                  className="w-36 h-44"
                  sparkles={false}
                />
              </div>
              <h4 className="font-heading font-bold text-sm text-gray-800 mt-3 truncate">{rec.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-extrabold text-brand-pink-600">${rec.price.toFixed(2)}</span>
                <span className="text-xs text-yellow-500 font-bold">★ {rec.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
