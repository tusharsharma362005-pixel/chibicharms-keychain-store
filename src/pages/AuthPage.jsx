import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Gift,
  KeyRound,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

const AVATAR_OPTIONS = [
  { id: 'boba-bear', emoji: '🐻', label: 'Boba Bear', bg: 'bg-amber-100 border-amber-300' },
  { id: 'sakura-bunny', emoji: '🐰', label: 'Sakura Bunny', bg: 'bg-pink-100 border-pink-300' },
  { id: 'neko-star', emoji: '🐱', label: 'Neko Star', bg: 'bg-purple-100 border-purple-300' },
  { id: 'strawberry-panda', emoji: '🍓', label: 'Berry Panda', bg: 'bg-rose-100 border-rose-300' },
  { id: 'avocado', emoji: '🥑', label: 'Avocado', bg: 'bg-emerald-100 border-emerald-300' },
  { id: 'cloud', emoji: '☁️', label: 'Dream Cloud', bg: 'bg-sky-100 border-sky-300' },
];

export default function AuthPage({ navigate, initialMode = 'login', showToast }) {
  const { login, register, isAuthenticated, user } = useAuth();
  const [mode, setMode] = useState(initialMode === 'signup' ? 'signup' : 'login');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('boba-bear');

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sync mode if initialMode prop changes
  useEffect(() => {
    setMode(initialMode === 'signup' ? 'signup' : 'login');
    setError('');
  }, [initialMode]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F43F7E', '#A78BFA', '#FEF08A', '#5EEAD4', '#FDA4AF']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
    window.location.hash = `#/${newMode}`;
  };

  // Demo Quick-Login
  const handleQuickDemoLogin = async () => {
    setError('');
    setEmail('chibi@example.com');
    setPassword('cute1234');
    setIsSubmitting(true);
    try {
      const res = await login('chibi@example.com', 'cute1234');
      triggerConfetti();
      if (showToast) showToast(`Welcome back, ${res.user.name}! 🌸✨`);
      setTimeout(() => navigate('home'), 500);
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your lovely name! 🎀');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please double check! 🔒');
        return;
      }
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address! 💌');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long! 🔑');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        triggerConfetti();
        if (showToast) showToast(`Yay! Welcome back, ${res.user.name}! 💖`);
        setTimeout(() => navigate('home'), 500);
      } else {
        const res = await register({
          name,
          email,
          password,
          avatar: selectedAvatar
        });
        triggerConfetti();
        if (showToast) showToast(`Account created! Welcome to ChibiCharms, ${res.user.name}! 🌸✨`);
        setTimeout(() => navigate('home'), 500);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already authenticated and visits login page, show friendly signed-in card
  if (isAuthenticated && user) {
    const userAvatarObj = AVATAR_OPTIONS.find((a) => a.id === user.avatar) || AVATAR_OPTIONS[0];

    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-pastel-grid">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-4xl border border-brand-pink-200 p-8 shadow-cute text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-brand-pink-100 to-brand-lavender-100 flex items-center justify-center text-4xl mb-4 shadow-sm border border-brand-pink-200">
            {userAvatarObj.emoji}
          </div>
          <h2 className="text-2xl font-bold font-heading text-gray-800 mb-2">
            You're already logged in! ✨
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Logged in as <strong className="text-brand-pink-600">{user.name}</strong> ({user.email})
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink-50 text-brand-pink-600 border border-brand-pink-200 rounded-full text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> VIP Keychain Member
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('shop')}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white font-bold shadow-cute hover:shadow-cute-hover hover:scale-102 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" /> Continue Shopping
            </button>
            <button
              onClick={() => navigate('customize')}
              className="w-full py-3 rounded-full bg-brand-lavender-50 border border-brand-lavender-200 text-brand-lavender-600 font-bold hover:bg-brand-lavender-100 transition-all flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" /> Open Keychain Studio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-pastel-grid flex items-center justify-center relative overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-pink-200/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-brand-lavender-200/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-brand-yellow-200/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Kawaii Promo Panel (Visible on lg screens) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full bg-gradient-to-br from-brand-pink-100/90 via-brand-lavender-100/80 to-brand-peach-100/90 border border-brand-pink-200/80 rounded-5xl p-8 shadow-cute relative overflow-hidden">
          {/* Acrylic glossy highlight */}
          <div className="acrylic-gloss absolute inset-0 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-pink-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-pink-600 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Chibi Club Perks 🎀
            </div>

            <h2 className="font-heading text-3xl font-extrabold text-[#3F3034] leading-tight mb-4">
              Unlock Your <span className="bg-gradient-to-r from-brand-pink-500 to-purple-600 bg-clip-text text-transparent">Kawaii World</span>
            </h2>

            <p className="text-sm text-[#4A3B32]/80 leading-relaxed mb-6 font-medium">
              Join over 15,000+ keychain lovers to save your custom acrylic designs, earn sparkle points, and get exclusive first dibs on limited drops!
            </p>

            {/* Kawaii Features List */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-white/60 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-brand-pink-500 text-white flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div className="text-xs font-bold text-gray-700">
                  Save unlimited custom acrylic shaker designs
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-white/60 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-brand-lavender-400 text-white flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-700">
                  Free mystery charms & stickers with every order
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-white/60 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-brand-peach-400 text-white flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="text-xs font-bold text-gray-700">
                  Fast 1-click checkout with SQLite cloud sync
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Mascot Card */}
          <div className="mt-8 pt-6 border-t border-brand-pink-200/60 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-cute flex items-center justify-center text-2xl border border-brand-pink-100 animate-wiggle">
              🌸
            </div>
            <div>
              <div className="text-xs font-bold text-[#3F3034]">Mochi Boba Bear says:</div>
              <div className="text-[11px] text-brand-pink-600 font-medium italic">"Logging in keeps your keychain recipes safe!"</div>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Container */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-5xl border border-brand-pink-200 p-6 sm:p-10 shadow-cute relative">
          {/* Mode Switcher Tabs */}
          <div className="flex bg-brand-pink-50/80 p-1.5 rounded-full border border-brand-pink-200 mb-8 max-w-sm mx-auto shadow-inner">
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-white text-brand-pink-600 shadow-cute scale-102'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('signup')}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white shadow-cute scale-102'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Create Account
            </button>
          </div>

          {/* Title and Subtitle */}
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3F3034]">
              {mode === 'login' ? 'Welcome Back, Cutie! 🌸' : 'Join the Chibi Family! ✨'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              {mode === 'login'
                ? 'Sign in to access your keychain orders and designs'
                : 'Create an account to start crafting personalized charms'}
            </p>
          </div>

          {/* Quick Demo Login Pill (only on login mode) */}
          {mode === 'login' && (
            <div className="mb-6 p-3 rounded-2xl bg-gradient-to-r from-brand-pink-50 via-brand-lavender-50 to-brand-peach-50 border border-brand-pink-200 flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4A3B32]">
                <span className="text-base">⚡</span>
                <span>Want to test quickly?</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={isSubmitting}
                className="px-3.5 py-1.5 rounded-full bg-white text-brand-pink-600 hover:bg-brand-pink-500 hover:text-white border border-brand-pink-300 text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Try Demo Account
              </button>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2.5 text-xs sm:text-sm font-semibold animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-pink-500" />
                  Your Lovely Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Emily Watson or SakuraChan"
                  className="w-full px-4 py-3 rounded-2xl border border-brand-pink-200 focus:outline-none focus:ring-2 focus:ring-brand-pink-400 bg-white text-gray-800 placeholder-gray-400 text-sm font-medium transition-all"
                />
              </div>
            )}

            {/* Avatar Selector (Sign Up Only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-pink-500" />
                    Choose Your Kawaii Avatar
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">Click to pick</span>
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((av) => {
                    const isSelected = selectedAvatar === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setSelectedAvatar(av.id)}
                        title={av.label}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xl transition-all border ${
                          isSelected
                            ? 'bg-brand-pink-100 border-brand-pink-500 scale-110 shadow-cute ring-2 ring-brand-pink-400'
                            : 'bg-gray-50 border-gray-200 hover:bg-brand-pink-50 hover:border-brand-pink-300'
                        }`}
                      >
                        <span>{av.emoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-pink-500" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@kawaii.com"
                className="w-full px-4 py-3 rounded-2xl border border-brand-pink-200 focus:outline-none focus:ring-2 focus:ring-brand-pink-400 bg-white text-gray-800 placeholder-gray-400 text-sm font-medium transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-pink-500" />
                  Password
                </span>
                <span className="text-[11px] text-gray-400 font-medium">min. 6 characters</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-2xl border border-brand-pink-200 focus:outline-none focus:ring-2 focus:ring-brand-pink-400 bg-white text-gray-800 placeholder-gray-400 text-sm font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-pink-500 p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-pink-500" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl border border-brand-pink-200 focus:outline-none focus:ring-2 focus:ring-brand-pink-400 bg-white text-gray-800 placeholder-gray-400 text-sm font-medium transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-pink-500 p-1"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-pink-500 focus:ring-brand-pink-400 border-gray-300"
                />
                <span>Remember me</span>
              </label>

              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => {
                    if (showToast) showToast('Password reset link simulated! 💌 Check your inbox.');
                  }}
                  className="text-brand-pink-600 hover:underline font-bold"
                >
                  Forgot password?
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-brand-pink-500 via-pink-500 to-brand-pink-600 text-white font-extrabold text-sm sm:text-base shadow-cute hover:shadow-cute-hover hover:scale-101 active:scale-99 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>{mode === 'login' ? 'Signing In...' : 'Creating Magic...'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to ChibiCharms' : 'Create My Free Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Login and Signup */}
          <div className="mt-6 pt-5 border-t border-brand-pink-100 text-center text-xs sm:text-sm text-gray-600 font-medium">
            {mode === 'login' ? (
              <p>
                Don't have an adorable account yet?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signup')}
                  className="text-brand-pink-600 font-extrabold hover:underline inline-flex items-center gap-1"
                >
                  Sign up free ✨
                </button>
              </p>
            ) : (
              <p>
                Already part of the Chibi squad?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="text-brand-pink-600 font-extrabold hover:underline inline-flex items-center gap-1"
                >
                  Log in here 🌸
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
