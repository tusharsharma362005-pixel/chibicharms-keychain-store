import React, { useState } from 'react';
import { Sparkles, Heart, Package, ShieldCheck, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ navigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-brand-pink-50/70 to-brand-lavender-50/80 border-t border-brand-pink-100 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-lavender-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Value Perks / Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-brand-pink-200/60 text-center">
          <div className="bg-white/80 p-5 rounded-3xl shadow-sm border border-brand-pink-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-pink-100 text-brand-pink-500 flex items-center justify-center mb-3 text-xl">
              💖
            </div>
            <h4 className="font-heading font-bold text-gray-800 text-sm">Handcrafted With Love</h4>
            <p className="text-xs text-gray-500 mt-1">Each charm polished & assembled by hand</p>
          </div>

          <div className="bg-white/80 p-5 rounded-3xl shadow-sm border border-brand-pink-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-lavender-100 text-brand-lavender-500 flex items-center justify-center mb-3 text-xl">
              🌿
            </div>
            <h4 className="font-heading font-bold text-gray-800 text-sm">Eco-Friendly Acrylic</h4>
            <p className="text-xs text-gray-500 mt-1">100% recycled crystal clear cast resin</p>
          </div>

          <div className="bg-white/80 p-5 rounded-3xl shadow-sm border border-brand-pink-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow-100 text-yellow-600 flex items-center justify-center mb-3 text-xl">
              📦
            </div>
            <h4 className="font-heading font-bold text-gray-800 text-sm">Cute Freebies Inside</h4>
            <p className="text-xs text-gray-500 mt-1">Stickers & candy in every pink mailer</p>
          </div>

          <div className="bg-white/80 p-5 rounded-3xl shadow-sm border border-brand-pink-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-mint-100 text-brand-mint-400 flex items-center justify-center mb-3 text-xl">
              ✨
            </div>
            <h4 className="font-heading font-bold text-gray-800 text-sm">Happiness Guarantee</h4>
            <p className="text-xs text-gray-500 mt-1">Love your keychain or we replace it free</p>
          </div>
        </div>

        {/* Footer Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🎀</span>
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-brand-pink-500 to-purple-500 bg-clip-text text-transparent">
                ChibiCharms
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pr-6">
              Small joys to carry everywhere. We make adorable acrylic, resin, and personalized keychains designed to make your daily bag, keys, and backpack feel uniquely yours.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-pink-600 block mb-2">
                Join our Kawaii Club for 15% off ✨
              </span>
              {subscribed ? (
                <div className="bg-white p-3.5 rounded-2xl border border-brand-pink-300 text-xs text-brand-pink-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Yay! You're in! Use secret code <strong>SWEET15</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your cute email..."
                    required
                    className="flex-1 bg-white border border-brand-pink-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
                  />
                  <button
                    type="submit"
                    className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-cute flex items-center gap-1.5 transition-all"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-heading font-bold text-gray-800 text-sm">Shop Charms</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => navigate('shop')} className="hover:text-brand-pink-500 transition-colors">
                  All Collections
                </button>
              </li>
              <li>
                <button onClick={() => navigate('customize')} className="hover:text-brand-pink-500 font-bold text-brand-pink-600 transition-colors">
                  Custom Studio ✨
                </button>
              </li>
              <li>
                <button onClick={() => navigate('new-arrivals')} className="hover:text-brand-pink-500 transition-colors">
                  New Drops
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'cute-characters' })} className="hover:text-brand-pink-500 transition-colors">
                  Cute Characters
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'couple-friendship' })} className="hover:text-brand-pink-500 transition-colors">
                  Couple & Besties
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-heading font-bold text-gray-800 text-sm">Help & Care</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-brand-pink-500 transition-colors">
                  About Our Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('admin')} className="text-brand-pink-600 font-bold hover:text-brand-pink-700 transition-colors flex items-center gap-1">
                  <span>Orders Database (Admin) 🔐</span>
                </button>
              </li>
              <li>
                <span className="hover:text-brand-pink-500 transition-colors cursor-pointer">
                  Shipping & Tracking
                </span>
              </li>
              <li>
                <span className="hover:text-brand-pink-500 transition-colors cursor-pointer">
                  Keychain Care Guide
                </span>
              </li>
              <li>
                <span className="hover:text-brand-pink-500 transition-colors cursor-pointer">
                  Bulk & Party Favors
                </span>
              </li>
              <li>
                <span className="hover:text-brand-pink-500 transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* Adorable Community & Socials */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-heading font-bold text-gray-800 text-sm">Follow the Cuties</h5>
            <p className="text-xs text-gray-500">
              Tag <span className="font-bold text-brand-pink-500">#ChibiCharms</span> on Instagram & TikTok to be featured on our front page!
            </p>
            <div className="flex gap-2.5 pt-1">
              <a href="#instagram" className="w-10 h-10 rounded-2xl bg-white border border-brand-pink-200 flex items-center justify-center text-lg hover:scale-110 hover:border-brand-pink-400 transition-transform shadow-sm">
                📷
              </a>
              <a href="#tiktok" className="w-10 h-10 rounded-2xl bg-white border border-brand-pink-200 flex items-center justify-center text-lg hover:scale-110 hover:border-brand-pink-400 transition-transform shadow-sm">
                🎵
              </a>
              <a href="#pinterest" className="w-10 h-10 rounded-2xl bg-white border border-brand-pink-200 flex items-center justify-center text-lg hover:scale-110 hover:border-brand-pink-400 transition-transform shadow-sm">
                📌
              </a>
              <a href="#youtube" className="w-10 h-10 rounded-2xl bg-white border border-brand-pink-200 flex items-center justify-center text-lg hover:scale-110 hover:border-brand-pink-400 transition-transform shadow-sm">
                ▶️
              </a>
            </div>
            <div className="bg-white/80 p-3 rounded-2xl border border-brand-pink-100 text-[11px] text-gray-500 flex items-center gap-2 mt-4">
              <Sparkles className="w-4 h-4 text-brand-pink-500 shrink-0" />
              <span>Over 25,000+ happy keychains delivered worldwide with 5-star ratings!</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-brand-pink-200/50 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 ChibiCharms Studio. All rights reserved. Crafted with ✨ & love.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
