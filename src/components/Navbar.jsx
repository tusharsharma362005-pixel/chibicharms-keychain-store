import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Wand2, Shield } from 'lucide-react';

export default function Navbar({
  currentPage,
  navigate,
  cartCount = 0,
  openSearchModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    window.location.hash = href;
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

        {/* Right Actions: Search, Wishlist, Cart */}
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
