import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Wand2, Shield, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AVATAR_EMOJIS = {
  'boba-bear': '🐻',
  'sakura-bunny': '🐰',
  'neko-star': '🐱',
  'strawberry-panda': '🍓',
  'avocado': '🥑',
  'cloud': '☁️',
  'magical-star': '✨',
};

export default function Navbar({
  currentPage,
  navigate,
  cartCount = 0,
  openSearchModal,
  showToast
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '#/' },
    { id: 'shop', label: 'Shop Keychains', href: '#/shop' },
    { id: 'customize', label: 'Customize Yours ✨', href: '#/customize', highlight: true },
    { id: 'new-arrivals', label: 'New Arrivals', href: '#/new-arrivals', badge: 'New' },
    { id: 'about', label: 'About Us', href: '#/about' },
    { id: 'admin', label: 'Orders (Admin)', href: '#/admin', isAdmin: true },
  ];

  const handleNavClick = (pageId, href) => {
    navigate(pageId);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    window.location.hash = href;
  };

  const handleLogout = async () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    await logout();
    if (showToast) {
      showToast('You have been logged out. See you soon! 🌸✨');
    }
    navigate('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-pink-100 transition-all">
      {/* Top Cute Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-pink-400 via-brand-lavender-400 to-brand-peach-400 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Free adorable gift packaging & mystery stickers on orders over <strong>$35</strong>! Use code <span className="bg-white/25 px-2 py-0.5 rounded-full font-bold">CUTE10</span> for 10% off ✨</span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home', '#/')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-pink-400 to-brand-lavender-300 flex items-center justify-center shadow-cute group-hover:scale-105 transition-transform duration-300 text-2xl">
            ✨
          </div>
          <div>
            <span className="font-heading text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-pink-500 via-purple-500 to-brand-peach-400 bg-clip-text text-transparent group-hover:opacity-90">
              ChibiCharms
            </span>
            <span className="block text-[11px] font-medium text-pink-400 tracking-wider -mt-1 font-quicksand">
              KAWAII KEYCHAIN STUDIO 🎀
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.href);
                }}
                className={`relative px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-brand-pink-100 text-brand-pink-600 shadow-sm'
                    : 'text-[#4A3B32] hover:text-brand-pink-500 hover:bg-brand-pink-50/60'
                } ${item.highlight ? 'bg-gradient-to-r from-brand-pink-100 to-brand-lavender-100 border border-brand-pink-200 text-brand-pink-600 hover:shadow-cute font-bold' : ''} ${item.isAdmin ? 'border border-gray-200 text-gray-500 hover:text-gray-800' : ''}`}
              >
                {item.highlight && <Wand2 className="w-3.5 h-3.5 text-brand-pink-500 animate-wiggle" />}
                {item.isAdmin && <Shield className="w-3.5 h-3.5 text-brand-lavender-500" />}
                {item.label}
                {item.badge && (
                  <span className="text-[10px] bg-brand-pink-500 text-white font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Search, Wishlist, Cart, Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={openSearchModal}
            className="p-2.5 rounded-full text-[#4A3B32] hover:text-brand-pink-500 hover:bg-brand-pink-50 transition-colors focus:outline-none"
            aria-label="Search Keychains"
            title="Search Keychains"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Button */}
          <button
            onClick={() => handleNavClick('cart', '#/cart')}
            className="relative flex items-center gap-2 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white font-bold text-sm px-4 py-2.5 rounded-full shadow-cute hover:shadow-cute-hover hover:scale-105 transition-all focus:outline-none"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-white text-brand-pink-600 rounded-full text-xs font-bold flex items-center justify-center shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth: User Profile / Logout or Login Button (Desktop) */}
          <div className="hidden md:block relative" ref={menuRef}>
            {isAuthenticated && user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-brand-pink-50/80 hover:bg-brand-pink-100 border border-brand-pink-200 transition-all text-xs font-bold text-[#4A3B32] shadow-sm focus:outline-none"
                  aria-expanded={userMenuOpen}
                >
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm shadow-inner border border-brand-pink-100">
                    {AVATAR_EMOJIS[user.avatar] || '💖'}
                  </span>
                  <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/98 backdrop-blur-md rounded-3xl border border-brand-pink-200 shadow-cute p-4 z-50 animate-fade-in">
                    <div className="flex items-center gap-3 pb-3 mb-3 border-b border-brand-pink-100">
                      <div className="w-10 h-10 rounded-2xl bg-brand-pink-50 border border-brand-pink-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                        {AVATAR_EMOJIS[user.avatar] || '💖'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-gray-800 truncate">{user.name}</div>
                        <div className="text-[11px] text-gray-400 truncate">{user.email}</div>
                      </div>
                    </div>

                    <div className="mb-3 px-2 py-1.5 bg-gradient-to-r from-brand-pink-50 to-brand-lavender-50 rounded-xl border border-brand-pink-100 text-[11px] font-bold text-brand-pink-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>VIP Keychain Collector</span>
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => handleNavClick('admin', '#/admin')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-brand-pink-50 flex items-center gap-2 transition-all"
                      >
                        <Shield className="w-3.5 h-3.5 text-brand-lavender-500" />
                        <span>Admin Orders Dashboard</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-all mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleNavClick('login', '#/login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#4A3B32] hover:text-brand-pink-600 hover:bg-brand-pink-50 border border-transparent hover:border-brand-pink-200 transition-all"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('signup', '#/signup')}
                  className="hidden lg:flex items-center gap-1 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold text-brand-pink-600 bg-brand-pink-50 hover:bg-brand-pink-100 border border-brand-pink-200 transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl text-[#4A3B32] hover:bg-brand-pink-50 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-brand-pink-100 px-6 py-5 shadow-xl animate-fade-in">
          {/* Mobile User Header or Login Banner */}
          {isAuthenticated && user ? (
            <div className="mb-4 pb-4 border-b border-brand-pink-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-brand-pink-100 border border-brand-pink-300 flex items-center justify-center text-2xl shadow-sm">
                    {AVATAR_EMOJIS[user.avatar] || '💖'}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="text-[10px] bg-brand-pink-100 text-brand-pink-600 font-bold px-2 py-0.5 rounded-full border border-brand-pink-200">
                  VIP 🎀
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="mb-4 pb-4 border-b border-brand-pink-100 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('login', '#/login')}
                className="py-2.5 px-4 rounded-2xl bg-brand-pink-50 text-brand-pink-600 hover:bg-brand-pink-100 border border-brand-pink-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <User className="w-4 h-4" />
                <span>Log In</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('signup', '#/signup')}
                className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sign Up Free</span>
              </button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.href);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                  currentPage === item.id
                    ? 'bg-brand-pink-100 text-brand-pink-600'
                    : 'text-[#4A3B32] hover:bg-brand-pink-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.highlight && <Wand2 className="w-4 h-4 text-brand-pink-500" />}
                  {item.isAdmin && <Shield className="w-4 h-4 text-brand-lavender-500" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-brand-pink-500 text-white font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
