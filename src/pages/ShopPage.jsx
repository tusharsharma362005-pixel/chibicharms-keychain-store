import React, { useState, useEffect } from 'react';
import { Search, Filter, Wand2, ShoppingBag, Heart, SlidersHorizontal, Sparkles, Check, RefreshCw } from 'lucide-react';
import KeychainVisual from '../components/KeychainVisual';
import { CATEGORIES, PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { fetchProducts } from '../services/api';

export default function ShopPage({
  navigate,
  addToCart,
  initialCategory = 'all',
  searchQuery = ''
}) {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('featured');
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [addedNotice, setAddedNotice] = useState(null);

  // Fetch products from backend SQLite API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProducts({
      category: selectedCategory,
      search: searchTerm,
      sort: sortBy,
      customizable: customizableOnly
    })
      .then((data) => {
        if (isMounted && data && Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('Backend API unavailable, using cached catalog:', err);
        // Fallback filter locally
        let filtered = FALLBACK_PRODUCTS.filter((item) => {
          if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
          if (customizableOnly && !item.customizable) return false;
          if (searchTerm) {
            const q = searchTerm.toLowerCase();
            return (
              item.name.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q) ||
              item.categoryName.toLowerCase().includes(q)
            );
          }
          return true;
        });
        if (isMounted) setProducts(filtered);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchTerm, sortBy, customizableOnly]);

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    addToCart(product);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-pink-100/90 via-brand-lavender-100/80 to-brand-peach-100/80 rounded-4xl p-8 sm:p-12 text-center border-2 border-white shadow-cute relative overflow-hidden">
        <div className="absolute top-4 left-6 text-2xl animate-float-slow">🎀</div>
        <div className="absolute bottom-4 right-8 text-2xl animate-float-medium">✨</div>

        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-600 bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm inline-block mb-3">
          CATALOG & COLLECTIONS 🌸
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#3D2C2E]">
          Explore All Adorable Keychains
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2 font-medium">
          Handmade acrylic, shaker, floral, and customizable keychains crafted to bring everyday joy.
        </p>

        {/* Search Bar Input */}
        <div className="max-w-md mx-auto mt-6 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search characters, initials, cats, flowers..."
            className="w-full bg-white/95 border-2 border-brand-pink-200 rounded-full pl-12 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink-400 shadow-sm"
          />
          <Search className="w-5 h-5 text-brand-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-gray-400 hover:text-gray-600 absolute right-4 top-1/2 -translate-y-1/2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-brand-pink-500 text-white shadow-cute scale-105'
                  : 'bg-white hover:bg-brand-pink-50 border border-brand-pink-100 text-gray-700'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Filters & Sorting */}
      <div className="bg-white p-4 rounded-3xl border border-brand-pink-100 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        {/* Left: Quick Toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCustomizableOnly(!customizableOnly)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              customizableOnly
                ? 'bg-brand-pink-100 border-brand-pink-300 text-brand-pink-600'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-brand-pink-500" />
            <span>Customizable Only</span>
          </button>

          <span className="text-xs text-gray-500">
            Showing <strong>{products.length}</strong> cute items
          </span>
        </div>

        {/* Right: Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-semibold hidden sm:inline">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-brand-pink-50/60 border border-brand-pink-200 rounded-2xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-pink-300"
          >
            <option value="featured">Featured & Best</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="text-4xl animate-bounce mb-3">🌸</div>
          <p className="text-sm font-bold text-gray-600">Fetching cute keychains from SQLite database...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-4xl p-16 text-center border border-brand-pink-100 space-y-4">
          <div className="text-5xl">🐰</div>
          <h3 className="text-xl font-bold font-heading text-gray-800">No keychains matched your search</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Try checking for different keywords or reset your category filters to find the cutest charms.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setCustomizableOnly(false);
            }}
            className="px-6 py-2.5 rounded-full bg-brand-pink-500 text-white font-bold text-xs shadow-cute hover:bg-brand-pink-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isJustAdded = addedNotice === product.id;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-4xl border border-brand-pink-100 p-5 shadow-sm hover:shadow-cute-hover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image container */}
                <div
                  onClick={() => navigate('product', { productId: product.id })}
                  className="relative cursor-pointer aspect-square bg-gradient-to-b from-brand-pink-50/50 via-white to-brand-lavender-50/50 rounded-3xl p-4 flex items-center justify-center overflow-hidden border border-brand-pink-50"
                >
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[11px] font-extrabold text-brand-pink-600 px-2.5 py-1 rounded-full shadow-sm border border-brand-pink-100 z-10">
                    {product.badge}
                  </span>

                  {/* Wishlist toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-400 hover:text-brand-pink-500 hover:bg-white flex items-center justify-center shadow-sm z-10 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Keychain SVG visual */}
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <KeychainVisual
                      type={product.imageType || 'cloud'}
                      color={product.colors && product.colors[0]?.hex ? product.colors[0].hex : '#FFCAD4'}
                      hardware="gold-star"
                      finish="glitter"
                      className="w-44 h-52"
                      sparkles={false}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span className="text-yellow-500 font-bold">★ {product.rating} <span className="font-normal text-gray-400">({product.reviewsCount})</span></span>
                      <span className="text-[11px] font-medium">{product.categoryName}</span>
                    </div>

                    <h3
                      onClick={() => navigate('product', { productId: product.id })}
                      className="font-heading font-bold text-gray-800 text-lg hover:text-brand-pink-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.tagline}</p>
                  </div>

                  {/* Action Section */}
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
                          title="Customize this keychain"
                          className="px-2.5 py-2 rounded-2xl bg-brand-pink-50 hover:bg-brand-pink-100 text-brand-pink-600 font-bold text-xs flex items-center gap-1 transition-colors"
                        >
                          <Wand2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Customize</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`px-3.5 py-2 rounded-2xl text-white font-bold text-xs shadow-cute flex items-center gap-1.5 transition-all ${
                          isJustAdded
                            ? 'bg-emerald-500 scale-105'
                            : 'bg-brand-pink-500 hover:bg-brand-pink-600 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
