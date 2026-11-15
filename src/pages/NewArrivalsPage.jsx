import React from 'react';
import { Sparkles, ShoppingBag, Heart, Wand2, Clock, Flame } from 'lucide-react';
import KeychainVisual from '../components/KeychainVisual';
import { PRODUCTS } from '../data/products';

export default function NewArrivalsPage({ navigate, addToCart }) {
  // Products that are new or featured fresh
  const newProducts = PRODUCTS.filter((p) => p.isNew || p.badge.includes('New') || p.badge.includes('Seasonal') || p.badge.includes('Stress'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-lavender-100/90 via-brand-pink-100/80 to-brand-mint-100/70 rounded-5xl p-8 sm:p-14 text-center border-2 border-white shadow-cute relative overflow-hidden">
        <div className="absolute top-6 left-8 text-3xl animate-bounce">🪄</div>
        <div className="absolute bottom-6 right-10 text-3xl animate-wiggle">🌸</div>

        <div className="inline-flex items-center gap-2 bg-white/90 border border-brand-lavender-200 px-4 py-1.5 rounded-full shadow-sm text-xs font-extrabold text-brand-lavender-600 mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>SPRING 2026 DROP • LIMITED BATCHES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#3D2C2E]">
          Fresh New Arrivals ✨
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2 font-medium">
          The latest batch straight from our design studio! From stress-relieving daisy spinners to celestial magnetic couple charms.
        </p>
      </div>

      {/* Grid of New Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-4xl border border-brand-pink-100 p-5 shadow-sm hover:shadow-cute-hover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image box */}
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
                  color={product.colors[0]?.hex || '#DDD6FE'}
                  hardware="rose-heart"
                  finish="glitter"
                  className="w-44 h-52"
                  sparkles={false}
                />
              </div>
            </div>

            {/* Details */}
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

              {/* Price & Cart button */}
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
                      className="p-2 rounded-2xl bg-brand-pink-50 text-brand-pink-600 hover:bg-brand-pink-100 transition-colors"
                      title="Customize this base"
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
    </div>
  );
}
