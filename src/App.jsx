import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CustomKeychainPage from './pages/CustomKeychainPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import AboutUsPage from './pages/AboutUsPage';
import CartPage from './pages/CartPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import CheckoutModal from './components/CheckoutModal';
import SearchModal from './components/SearchModal';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';

export default function App() {
  // Routing State
  const [currentPage, setCurrentPage] = useState('home');
  const [routeParams, setRouteParams] = useState({});

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('chibicharms_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chibicharms_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  // Hash-based URL router to provide a genuine multi-page application experience
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = hash.split('/');

      if (!hash || hash === '') {
        setCurrentPage('home');
        setRouteParams({});
      } else if (parts[0] === 'shop') {
        setCurrentPage('shop');
        const searchParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const cat = searchParams.get('category');
        if (cat) setRouteParams({ category: cat });
      } else if (parts[0] === 'customize') {
        setCurrentPage('customize');
      } else if (parts[0] === 'product' && parts[1]) {
        setCurrentPage('product');
        setRouteParams({ productId: parts[1] });
      } else if (parts[0] === 'new-arrivals') {
        setCurrentPage('new-arrivals');
      } else if (parts[0] === 'about') {
        setCurrentPage('about');
      } else if (parts[0] === 'cart') {
        setCurrentPage('cart');
      } else if (parts[0] === 'admin') {
        setCurrentPage('admin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial call
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Custom Navigation Helper
  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setRouteParams(params);

    let targetHash = '#/';
    if (page === 'home') targetHash = '#/';
    else if (page === 'shop') {
      targetHash = params.category ? `#/shop?category=${params.category}` : '#/shop';
    } else if (page === 'customize') targetHash = '#/customize';
    else if (page === 'product' && params.productId) targetHash = `#/product/${params.productId}`;
    else if (page === 'new-arrivals') targetHash = '#/new-arrivals';
    else if (page === 'about') targetHash = '#/about';
    else if (page === 'cart') targetHash = '#/cart';
    else if (page === 'admin') targetHash = '#/admin';

    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCartItems((prevItems) => {
      const cartItemId = `${product.id}-${options.color || ''}-${options.hardware || ''}-${product.customDetails ? JSON.stringify(product.customDetails) : ''}`;
      const existing = prevItems.find((item) => item.cartItemId === cartItemId);

      if (existing) {
        return prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            cartItemId,
            quantity,
            selectedOptions: options
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to cart! 🛍️✨`);
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        cartCount={cartCount}
        openSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Main Page Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage navigate={navigate} addToCart={addToCart} />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            navigate={navigate}
            addToCart={addToCart}
            initialCategory={routeParams.category || 'all'}
            searchQuery={routeParams.initialQuery || ''}
          />
        )}

        {currentPage === 'customize' && (
          <CustomKeychainPage navigate={navigate} addToCart={addToCart} />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage
            productId={routeParams.productId}
            navigate={navigate}
            addToCart={addToCart}
          />
        )}

        {currentPage === 'new-arrivals' && (
          <NewArrivalsPage navigate={navigate} addToCart={addToCart} />
        )}

        {currentPage === 'about' && (
          <AboutUsPage navigate={navigate} />
        )}

        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            navigate={navigate}
            openCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {currentPage === 'admin' && (
          <AdminOrdersPage navigate={navigate} />
        )}
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        clearCart={clearCart}
        navigate={navigate}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        navigate={navigate}
      />

      {/* Floating Cute Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md border border-brand-pink-300 rounded-3xl p-4 shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-9 h-9 rounded-full bg-brand-pink-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-gray-800 pr-2">
            {toast}
          </div>
          <button
            onClick={() => navigate('cart')}
            className="text-xs font-extrabold text-brand-pink-600 hover:underline bg-brand-pink-50 px-3 py-1.5 rounded-full"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
