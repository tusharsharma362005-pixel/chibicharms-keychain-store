import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import KeychainVisual from './KeychainVisual';

export default function SearchModal({ isOpen, onClose, navigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  const handleSelectProduct = (productId) => {
    navigate('product', { productId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-4xl border border-brand-pink-100 shadow-2xl max-w-2xl w-full p-6 space-y-4">
        {/* Search Input Bar */}
        <div className="flex items-center justify-between border-b border-brand-pink-100 pb-4 gap-3">
          <Search className="w-5 h-5 text-brand-pink-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keychains (e.g. boba, bear, avocado, floral, motel)..."
            className="flex-1 text-sm sm:text-base font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results title */}
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {searchTerm.trim() ? `Search Results (${results.length})` : 'Popular Searches 🔥'}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              No keychains matched "{searchTerm}". Try searching for 'cat', 'bear', 'star', or 'resin'!
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-brand-pink-50/70 border border-transparent hover:border-brand-pink-200 transition-all cursor-pointer group"
              >
                <div className="w-14 h-16 bg-brand-pink-50/50 rounded-xl flex items-center justify-center p-1 shrink-0">
                  <KeychainVisual
                    type={product.imageType || 'cloud'}
                    color={product.colors[0]?.hex || '#FFCAD4'}
                    hardware="gold-star"
                    className="w-12 h-14"
                    sparkles={false}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-gray-800 group-hover:text-brand-pink-600 truncate">
                      {product.name}
                    </span>
                    <span className="text-[10px] bg-brand-pink-100 text-brand-pink-600 font-bold px-2 py-0.5 rounded-full shrink-0">
                      {product.categoryName}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{product.tagline}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-extrabold text-sm text-[#3D2C2E] block">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-yellow-500 font-bold">★ {product.rating}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA to Shop */}
        <div className="pt-2 border-t border-brand-pink-100 flex items-center justify-between text-xs text-gray-500">
          <span>Press ESC to close</span>
          <button
            onClick={() => {
              navigate('shop', { initialQuery: searchTerm });
              onClose();
            }}
            className="text-brand-pink-600 font-bold hover:underline flex items-center gap-1"
          >
            <span>View all in shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
