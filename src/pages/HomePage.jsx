import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Wand2, Star, Heart, ShoppingBag, CheckCircle, ShieldCheck, Gift } from 'lucide-react';
import KeychainVisual from '../components/KeychainVisual';
import { PRODUCTS as FALLBACK_PRODUCTS, CATEGORIES, REVIEWS } from '../data/products';
import { fetchProducts } from '../services/api';

export default function HomePage({ navigate, addToCart }) {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((data) => {
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('API error, using fallback catalog on homepage:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const bestSellers = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew || p.badge?.includes('New')).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-16 sm:py-20 overflow-hidden">
        {/* Soft pastel ambient background blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-pink-200/40 via-brand-lavender-200/40 to-brand-peach-200/30 rounded-5xl blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Cute top pill badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 border border-brand-pink-200 px-4 py-2 rounded-full shadow-cute text-xs sm:text-sm font-bold text-brand-pink-600 animate-pulse-subtle">
                <span className="text-base">🎀</span>
                <span>The Internet's Cutest Custom Keychain Studio</span>
                <span className="text-yellow-400">✨</span>
              </div>

              {/* Exact required headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-[#3D2C2E] leading-tight tracking-tight">
                Carry a Little Piece of You <span className="inline-block animate-wiggle">✨</span>
              </h1>

              {/* Exact required tagline */}
              <p className="text-lg sm:text-2xl text-gray-600 font-semibold max-w-2xl mx-auto lg:mx-0">
                Pick your favorite or create your own!
              </p>

              <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Adorable ready-made character charms, liquid shaker keychains, and a real-time custom builder so you can carry your pet, nickname, or favorite aesthetic wherever you go.
              </p>

              {/* Two Prominent Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={() => navigate('shop')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 hover:from-brand-pink-600 hover:to-brand-pink-700 text-white font-bold text-base shadow-cute hover:shadow-cute-hover hover:scale-105 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Shop Keychains</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => navigate('customize')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-brand-pink-50/70 border-2 border-brand-pink-300 text-brand-pink-600 font-bold text-base shadow-cute hover:shadow-cute-hover hover:scale-105 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Wand2 className="w-5 h-5 text-brand-pink-500 transition-transform group-hover:rotate-12" />
                  <span>Customize Yours</span>
                  <span className="text-xs bg-brand-pink-100 text-brand-pink-600 px-2 py-0.5 rounded-full font-bold">Studio</span>
                </button>
              </div>

              {/* Happy customer social proof */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-sm shadow-sm">🌸</div>
                  <div className="w-9 h-9 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-sm shadow-sm">🧸</div>
                  <div className="w-9 h-9 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center text-sm shadow-sm">⭐</div>
                  <div className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-sm shadow-sm">🥑</div>
                </div>
                <div className="text-left text-xs">
                  <div className="flex items-center text-yellow-400 font-bold">
                    {'★'.repeat(5)} <span className="text-gray-700 ml-1 font-extrabold text-sm">4.9 / 5</span>
                  </div>
                  <p className="text-gray-500 font-medium">Loved by 25,000+ keychain collectors</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Floating Showcase Keychains */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Playful layered card backdrop */}
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-brand-pink-100/80 via-white to-brand-lavender-100/90 rounded-5xl border-2 border-white shadow-cute-hover p-6 flex items-center justify-center overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow-100 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-pink-100 rounded-full blur-2xl" />

                {/* Main Hero Keychain: Boba Bear with floating animation */}
                <div className="relative z-10 flex flex-col items-center animate-float-slow">
                  <KeychainVisual
                    type="boba-bear"
                    color="#FFCAD4"
                    hardware="gold-star"
                    finish="glitter"
                    charms={['strawberry', 'star']}
                    sparkles={true}
                    className="w-56 h-72 sm:w-64 sm:h-80"
                  />
                  <div className="mt-2 bg-white/95 px-5 py-2.5 rounded-2xl shadow-md border border-brand-pink-100 text-center backdrop-blur-md">
                    <span className="text-xs font-bold text-gray-800 block">Mochi Boba Bear Liquid Shaker</span>
                    <span className="text-[11px] text-brand-pink-500 font-semibold">✨ Interactive liquid & glitter float</span>
                  </div>
                </div>

                {/* Secondary Mini Floating Keychain (top left) */}
                <div className="absolute top-4 left-4 z-20 animate-float-medium hidden sm:block">
                  <div className="bg-white/90 p-2 rounded-2xl shadow-cute border border-brand-lavender-200">
                    <KeychainVisual
                      type="tamagotchi"
                      color="#C4B5FD"
                      hardware="rose-heart"
                      sparkles={false}
                      className="w-20 h-28"
                    />
                  </div>
                </div>

                {/* Secondary Mini Floating Keychain (bottom right) */}
                <div className="absolute bottom-4 right-4 z-20 animate-float-reverse hidden sm:block">
                  <div className="bg-white/90 p-2 rounded-2xl shadow-cute border border-brand-yellow-200">
                    <KeychainVisual
                      type="motel-tag"
                      color="#FEF08A"
                      text="LUCKY 77"
                      textColor="#78350F"
                      hardware="silver-swivel"
                      sparkles={false}
                      className="w-20 h-28"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CUTE CATEGORIES CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-500 bg-brand-pink-100 px-3 py-1 rounded-full">
            EXPLORE THE CHARMS 🌸
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E]">
            Shop by Cute Category
          </h2>
          <p className="text-sm text-gray-500">Pick a vibe that matches your bag, keys, or aesthetic!</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('shop', { category: cat.id })}
              className="group p-4 bg-white hover:bg-brand-pink-50/60 rounded-3xl border border-brand-pink-100 hover:border-brand-pink-300 shadow-sm hover:shadow-cute hover:-translate-y-1.5 transition-all text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-pink-100 to-brand-lavender-100 group-hover:scale-110 flex items-center justify-center text-2xl transition-transform shadow-inner">
                {cat.id === 'all' && '✨'}
                {cat.id === 'cute-characters' && '🧸'}
                {cat.id === 'initial-name' && '🔤'}
                {cat.id === 'anime-inspired' && '🪄'}
                {cat.id === 'animals' && '🐾'}
                {cat.id === 'flowers' && '🌸'}
                {cat.id === 'couple-friendship' && '💖'}
                {cat.id === 'personalized' && '🎨'}
              </div>
              <span className="text-xs font-bold text-gray-700 group-hover:text-brand-pink-600 line-clamp-1">
                {cat.name.replace(/[^a-zA-Z &]/g, '')}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-500 bg-brand-pink-100 px-3 py-1 rounded-full">
              COLLECTOR FAVORITES 🔥
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E] mt-2">
              Best Sellers
            </h2>
            <p className="text-sm text-gray-500">Our most adored keychains that sell out fastest!</p>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="text-sm font-bold text-brand-pink-600 hover:text-brand-pink-700 flex items-center gap-1 group"
          >
            <span>View All Keychains</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-4xl border border-brand-pink-100 p-5 shadow-sm hover:shadow-cute-hover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Top Image Box */}
              <div
                onClick={() => navigate('product', { productId: product.id })}
                className="relative cursor-pointer aspect-square bg-gradient-to-b from-brand-pink-50/50 via-white to-brand-lavender-50/50 rounded-3xl p-4 flex items-center justify-center overflow-hidden border border-brand-pink-50"
              >
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[11px] font-extrabold text-brand-pink-600 px-2.5 py-1 rounded-full shadow-sm border border-brand-pink-100 z-10">
                  {product.badge}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-400 hover:text-brand-pink-500 hover:bg-white flex items-center justify-center shadow-sm z-10 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>

                <div className="group-hover:scale-110 transition-transform duration-300">
                  <KeychainVisual
                    type={product.imageType || 'cloud'}
                    color={product.colors && product.colors[0]?.hex ? product.colors[0].hex : '#FFCAD4'}
                    hardware="gold-star"
                    finish="glitter"
                    text={product.id.includes('motel') ? 'LUCKY' : ''}
                    charms={product.id.includes('bear') ? ['strawberry'] : []}
                    className="w-44 h-52"
                    sparkles={false}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold mb-1">
                    <span>★ {product.rating}</span>
                    <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                  </div>
                  <h3
                    onClick={() => navigate('product', { productId: product.id })}
                    className="font-heading font-bold text-gray-800 text-lg hover:text-brand-pink-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.tagline}</p>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-4 pt-3 border-t border-brand-pink-100/60 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-lg font-extrabold text-[#3D2C2E]">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1.5 font-medium">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {product.customizable && (
                      <button
                        onClick={() => navigate('customize', { baseProduct: product.id })}
                        title="Customize this design"
                        className="p-2.5 rounded-2xl bg-brand-pink-50 hover:bg-brand-pink-100 text-brand-pink-600 transition-colors"
                      >
                        <Wand2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3.5 py-2 rounded-2xl bg-brand-pink-500 hover:bg-brand-pink-600 text-white font-bold text-xs shadow-cute flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE CUSTOM KEYCHAIN SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-5xl bg-gradient-to-r from-brand-pink-100 via-brand-lavender-100 to-brand-peach-100 border-2 border-white p-8 sm:p-14 shadow-cute-hover overflow-hidden">
          <div className="absolute top-6 right-10 text-3xl animate-bounce">✨</div>
          <div className="absolute bottom-6 left-12 text-3xl animate-wiggle">🎨</div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-pink-600 bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm">
                <Wand2 className="w-3.5 h-3.5" />
                <span>Custom Keychain Studio</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#3D2C2E] leading-tight">
                Design Your Dream Keychain in 60 Seconds ✨
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-medium max-w-xl">
                Choose your shape, pick pastel colors, engrave your name or secret phrase, and add adorable dangling charms like strawberries, boba, and golden stars. Saved directly in our SQLite studio database!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/80 p-3 rounded-2xl text-xs font-bold text-gray-700 flex items-center gap-2">
                  <span>🧸</span> 8+ Cute Silhouettes
                </div>
                <div className="bg-white/80 p-3 rounded-2xl text-xs font-bold text-gray-700 flex items-center gap-2">
                  <span>🔤</span> Name & Monogram
                </div>
                <div className="bg-white/80 p-3 rounded-2xl text-xs font-bold text-gray-700 flex items-center gap-2">
                  <span>🍓</span> Dangling Mini-Charms
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('customize')}
                  className="px-8 py-4 rounded-full bg-brand-pink-500 hover:bg-brand-pink-600 text-white font-bold text-base shadow-cute hover:scale-105 transition-all inline-flex items-center gap-3"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Open Customizer Studio ✨</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Live Interactive Sample Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/95 backdrop-blur-md rounded-4xl p-6 shadow-cute border border-brand-pink-100 flex flex-col items-center max-w-sm w-full">
                <span className="text-[11px] font-bold text-brand-pink-500 uppercase tracking-widest bg-brand-pink-50 px-3 py-1 rounded-full mb-3">
                  Live Custom Preview
                </span>
                <KeychainVisual
                  type="cloud"
                  color="#FFCAD4"
                  hardware="rose-heart"
                  finish="glitter"
                  text="MIA ✨"
                  charms={['strawberry', 'star']}
                  sparkles={true}
                  className="w-52 h-64"
                />
                <div className="w-full mt-4 bg-brand-pink-50/70 p-3 rounded-2xl text-center">
                  <span className="text-xs text-gray-600 font-semibold block">Cloud Base • Sakura Pink • Rose Heart Clasp</span>
                  <span className="text-sm font-extrabold text-brand-pink-600 mt-1 block">Starting at $14.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-lavender-500 bg-brand-lavender-100 px-3 py-1 rounded-full">
              JUST DROPPED 🪄
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E] mt-2">
              New Arrivals
            </h2>
            <p className="text-sm text-gray-500">Fresh designs crafted for this season!</p>
          </div>
          <button
            onClick={() => navigate('new-arrivals')}
            className="text-sm font-bold text-brand-pink-600 hover:text-brand-pink-700 flex items-center gap-1 group"
          >
            <span>Explore All New Drops</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-4xl border border-brand-pink-100 p-5 shadow-sm hover:shadow-cute-hover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div
                onClick={() => navigate('product', { productId: product.id })}
                className="relative cursor-pointer aspect-square bg-gradient-to-b from-brand-lavender-50/40 via-white to-brand-pink-50/40 rounded-3xl p-4 flex items-center justify-center overflow-hidden border border-brand-pink-50"
              >
                <span className="absolute top-3 left-3 bg-brand-lavender-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm z-10">
                  {product.badge}
                </span>

                <div className="group-hover:scale-110 transition-transform duration-300">
                  <KeychainVisual
                    type={product.imageType || 'cloud'}
                    color={product.colors && product.colors[0]?.hex ? product.colors[0].hex : '#DDD6FE'}
                    hardware="rose-heart"
                    finish="glitter"
                    className="w-44 h-52"
                    sparkles={false}
                  />
                </div>
              </div>

              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold mb-1">
                    <span>★ {product.rating}</span>
                    <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                  </div>
                  <h3
                    onClick={() => navigate('product', { productId: product.id })}
                    className="font-heading font-bold text-gray-800 text-lg hover:text-brand-pink-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-pink-100/60 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-lg font-extrabold text-[#3D2C2E]">${product.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-3.5 py-2 rounded-2xl bg-brand-lavender-500 hover:bg-brand-lavender-600 text-white font-bold text-xs shadow-soft-purple flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. REAL CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-500 bg-brand-pink-100 px-3 py-1 rounded-full">
            REAL KEYCHAIN LOVERS 💌
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E]">
            Over 25,000+ Happy Charms Delivered
          </h2>
          <p className="text-sm text-gray-500">Read what our community has to say about their cute unboxings!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm flex flex-col justify-between hover:shadow-cute transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand-pink-100 flex items-center justify-center text-sm">
                      {review.avatar}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-gray-800">{review.author}</h4>
                      <span className="text-[10px] text-gray-400">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 text-xs">
                    {'★'.repeat(review.rating)}
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-pink-100/60 flex items-center justify-between text-[11px]">
                <span className="font-bold text-brand-pink-500 truncate max-w-[150px]">{review.productName}</span>
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
