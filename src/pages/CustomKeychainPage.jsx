import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  RotateCw,
  ShoppingBag,
  Check,
  Palette,
  Type,
  Layers,
  Link as LinkIcon,
  Smile,
  Gift,
  HelpCircle
} from 'lucide-react';
import KeychainVisual from '../components/KeychainVisual';
import { saveCustomKeychain } from '../services/api';

export default function CustomKeychainPage({ navigate, addToCart }) {
  // Customization State
  const [shape, setShape] = useState('cloud');
  const [color, setColor] = useState({ name: 'Sakura Blush Pink', hex: '#FFCAD4' });
  const [finish, setFinish] = useState('glitter');
  const [text, setText] = useState('CUTIE ✨');
  const [font, setFont] = useState('bubble');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [hardware, setHardware] = useState('gold-star');
  const [selectedCharms, setSelectedCharms] = useState(['strawberry', 'star']);
  const [includeGiftBox, setIncludeGiftBox] = useState(false);
  const [sparklesActive, setSparklesActive] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Shape options
  const SHAPES = [
    { id: 'cloud', name: 'Fluffy Cloud', icon: '☁️', desc: 'Soft pillowy edges with smiling face' },
    { id: 'bear', name: 'Mochi Bear', icon: '🧸', desc: 'Cute round teddy bear ears' },
    { id: 'cat', name: 'Kitten Ears', icon: '🐱', desc: 'Perky cat ears with whiskers' },
    { id: 'heart', name: 'Kawaii Heart', icon: '💖', desc: 'Plump rounded heart silhouette' },
    { id: 'motel-tag', name: 'Retro Motel Tag', icon: '🏷️', desc: 'Vintage diamond hotel shape' },
    { id: 'star', name: 'Cosmic Star', icon: '⭐', desc: 'Chubby celestial star with cheeks' },
    { id: 'daisy', name: 'Daisy Blossom', icon: '🌼', desc: 'Sunny multi-petal flower disc' },
    { id: 'tamagotchi', name: 'Pixel Pet Console', icon: '👾', desc: 'Retro 90s handheld egg' },
    { id: 'bubble-letter', name: 'Bubble Monogram', icon: '🔤', desc: 'Chunky 3D balloon letter' },
  ];

  // Pastel Color Palette
  const COLORS = [
    { name: 'Sakura Pink', hex: '#FFCAD4' },
    { name: 'Lavender Dream', hex: '#DDD6FE' },
    { name: 'Matcha Cream', hex: '#CCFBF1' },
    { name: 'Buttercup Yellow', hex: '#FEF08A' },
    { name: 'Sky Baby Blue', hex: '#BAE6FD' },
    { name: 'Peach Bellini', hex: '#FFEDD5' },
    { name: 'Bubblegum Rose', hex: '#F472B6' },
    { name: 'Milky Pearl', hex: '#F8FAFC' },
  ];

  // Finishes
  const FINISHES = [
    { id: 'glitter', name: 'Glitter Resin Shimmer', price: 1.50, desc: 'Floating micro-glitter & holographic stars' },
    { id: 'holographic', name: 'Holographic Iridescent', price: 2.00, desc: 'Prismatic aurora color shift' },
    { id: 'solid', name: 'Smooth Pastel Enamel', price: 0.00, desc: 'Clean velvety pastel finish' },
  ];

  // Hardware Clasps
  const HARDWARE_OPTIONS = [
    { id: 'gold-star', name: '18k Gold Star Clasp', price: 0.00, icon: '⭐' },
    { id: 'rose-heart', name: 'Rose Gold Heart Clasp', price: 0.50, icon: '💖' },
    { id: 'silver-swivel', name: 'Silver Swivel Hook', price: 0.00, icon: '📎' },
    { id: 'pastel-pearl', name: 'Beaded Pearl Wristlet', price: 2.50, icon: '📿' },
  ];

  // Decorative Charms
  const CHARM_OPTIONS = [
    { id: 'strawberry', name: 'Strawberry', emoji: '🍓', price: 1.50 },
    { id: 'boba', name: 'Milk Tea Boba', emoji: '🧋', price: 1.50 },
    { id: 'daisy', name: 'Tiny Daisy', emoji: '🌼', price: 1.50 },
    { id: 'gummy-bear', name: 'Gummy Bear', emoji: '🧸', price: 1.50 },
    { id: 'star', name: 'Sparkle Star', emoji: '⭐', price: 1.50 },
    { id: 'bow', name: 'Satin Ribbon Bow', emoji: '🎀', price: 1.50 },
    { id: 'bell', name: 'Jingle Bell', emoji: '🔔', price: 1.50 },
    { id: 'pom-pom', name: 'Mini Pom Pom', emoji: '🌸', price: 1.50 },
  ];

  // Font choices
  const FONTS = [
    { id: 'bubble', name: 'Chunky Bubble' },
    { id: 'script', name: 'Cursive Love' },
    { id: 'clean', name: 'Modern Sans' },
  ];

  // Text Color choices
  const TEXT_COLORS = [
    { name: 'White Infill', hex: '#FFFFFF' },
    { name: 'Deep Cocoa', hex: '#3D2C2E' },
    { name: 'Gold Foil', hex: '#F59E0B' },
    { name: 'Hot Pink', hex: '#E11D48' },
  ];

  // Dynamic Price Calculation
  const BASE_PRICE = 14.99;
  const finishPrice = FINISHES.find((f) => f.id === finish)?.price || 0;
  const hardwarePrice = HARDWARE_OPTIONS.find((h) => h.id === hardware)?.price || 0;
  const charmsPrice = selectedCharms.length * 1.50;
  const giftBoxPrice = includeGiftBox ? 3.00 : 0;
  const totalPrice = BASE_PRICE + finishPrice + hardwarePrice + charmsPrice + giftBoxPrice;

  const toggleCharm = (charmId) => {
    if (selectedCharms.includes(charmId)) {
      setSelectedCharms(selectedCharms.filter((c) => c !== charmId));
    } else {
      if (selectedCharms.length >= 3) {
        alert('You can select up to 3 cute mini-charms per keychain!');
        return;
      }
      setSelectedCharms([...selectedCharms, charmId]);
    }
  };

  const handleCreateKeychain = async () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${SHAPES.find((s) => s.id === shape)?.name || 'Keychain'}`,
      isCustom: true,
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      badge: 'Custom Made ✨',
      customDetails: {
        shape,
        shapeName: SHAPES.find((s) => s.id === shape)?.name,
        colorName: color.name,
        colorHex: color.hex,
        finishName: FINISHES.find((f) => f.id === finish)?.name,
        hardwareName: HARDWARE_OPTIONS.find((h) => h.id === hardware)?.name,
        hardware,
        finish,
        text,
        font,
        textColor,
        charms: selectedCharms,
        giftBox: includeGiftBox,
      },
      imageType: shape,
      colors: [color],
      tagline: `Engraved with "${text || 'No text'}" on ${color.name} with ${HARDWARE_OPTIONS.find((h) => h.id === hardware)?.name}`,
    };

    // Save to SQLite backend custom_keychains table
    saveCustomKeychain({
      id: customItem.id,
      shape,
      shapeName: SHAPES.find((s) => s.id === shape)?.name,
      colorName: color.name,
      colorHex: color.hex,
      finish,
      finishName: FINISHES.find((f) => f.id === finish)?.name,
      text,
      font,
      textColor,
      hardware,
      hardwareName: HARDWARE_OPTIONS.find((h) => h.id === hardware)?.name,
      charms: selectedCharms,
      giftBox: includeGiftBox,
      totalPrice
    }).catch((err) => console.warn('Could not persist custom design to DB immediately:', err));

    addToCart(customItem);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      navigate('cart');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-600 bg-brand-pink-100 px-3.5 py-1 rounded-full inline-block">
          CUSTOM KEYCHAIN STUDIO 🎨
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#3D2C2E]">
          Create Your Dream Keychain ✨
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Mix & match shapes, colors, glitter finishes, custom text, and cute dangling charms with a live interactive preview!
        </p>
      </div>

      {/* Main Studio Grid: Left Studio Canvas & Right Customization Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: LIVE STICKY PREVIEW CANVAS */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="bg-gradient-to-tr from-brand-pink-50/80 via-white to-brand-lavender-50/80 rounded-5xl border-2 border-white p-6 sm:p-8 shadow-cute flex flex-col items-center relative overflow-hidden">
            {/* Top Preview Controls */}
            <div className="w-full flex items-center justify-between mb-4 z-10">
              <span className="text-xs font-extrabold text-brand-pink-600 bg-white/90 px-3 py-1 rounded-full shadow-sm border border-brand-pink-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                <span>Live Interactive Preview</span>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  title="Flip keychain view"
                  className="p-2 rounded-full bg-white hover:bg-brand-pink-50 text-gray-600 hover:text-brand-pink-600 shadow-sm border border-brand-pink-100 transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSparklesActive(!sparklesActive)}
                  title="Toggle sparkles"
                  className={`p-2 rounded-full shadow-sm border border-brand-pink-100 transition-colors ${
                    sparklesActive ? 'bg-brand-pink-100 text-brand-pink-600' : 'bg-white text-gray-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Keychain Renderer */}
            <div className="w-full py-4 flex items-center justify-center min-h-[340px]">
              <KeychainVisual
                type={shape}
                color={color.hex}
                hardware={hardware}
                finish={finish}
                text={text}
                font={font}
                textColor={textColor}
                charms={selectedCharms}
                sparkles={sparklesActive}
                isFlipped={isFlipped}
                className="w-64 h-80 sm:w-72 sm:h-96"
              />
            </div>

            {/* Live Spec Summary Card */}
            <div className="w-full mt-4 bg-white/90 backdrop-blur-sm p-4 rounded-3xl border border-brand-pink-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span>Selected Base:</span>
                <span className="text-brand-pink-600 capitalize">{shape.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Color & Finish:</span>
                <span className="font-medium">{color.name} ({FINISHES.find(f => f.id === finish)?.name})</span>
              </div>
              {text && (
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Custom Inscription:</span>
                  <span className="font-bold text-gray-800">"{text}"</span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Hardware Clasp:</span>
                <span className="font-medium">{HARDWARE_OPTIONS.find(h => h.id === hardware)?.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Mini Charms ({selectedCharms.length}/3):</span>
                <span className="font-medium">
                  {selectedCharms.length === 0 ? 'None selected' : selectedCharms.map(c => CHARM_OPTIONS.find(ch => ch.id === c)?.emoji).join(' ')}
                </span>
              </div>

              {/* Price Breakdown in Preview */}
              <div className="pt-3 border-t border-brand-pink-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-400 font-bold uppercase block">Live Estimated Price</span>
                  <span className="text-2xl font-extrabold text-[#3D2C2E] font-heading">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCreateKeychain}
                  className={`px-6 py-3 rounded-full text-white font-bold text-sm shadow-cute flex items-center gap-2 transition-all ${
                    createdSuccess
                      ? 'bg-emerald-500 scale-105'
                      : 'bg-brand-pink-500 hover:bg-brand-pink-600 hover:scale-105 active:scale-95'
                  }`}
                >
                  {createdSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Create My Keychain ✨</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STEP-BY-STEP CUSTOMIZATION CONTROLS */}
        <div className="lg:col-span-7 space-y-8">
          {/* STEP 1: CHOOSE SHAPE */}
          <div className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-pink-500 text-white font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-heading font-bold text-lg text-gray-800">Choose Keychain Shape & Base</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SHAPES.map((s) => {
                const isSelected = shape === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`p-3.5 rounded-3xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-pink-50 border-brand-pink-500 shadow-sm ring-2 ring-brand-pink-200'
                        : 'bg-white hover:bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">{s.name}</span>
                      <span className="text-[10px] text-gray-400 line-clamp-1">{s.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECT COLOR */}
          <div className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-pink-500 text-white font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-heading font-bold text-lg text-gray-800">Select Pastel Color</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COLORS.map((c) => {
                const isSelected = color.hex === c.hex;
                return (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c)}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-brand-pink-500 bg-brand-pink-50/50 ring-2 ring-brand-pink-200 shadow-sm'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/10 shrink-0 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs font-bold text-gray-700 truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: BASE MATERIAL / FINISH */}
          <div className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-pink-500 text-white font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-heading font-bold text-lg text-gray-800">Select Finish & Texture</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FINISHES.map((f) => {
                const isSelected = finish === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`p-4 rounded-3xl border text-left transition-all ${
                      isSelected
                        ? 'bg-brand-pink-50 border-brand-pink-500 ring-2 ring-brand-pink-200'
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-800">{f.name}</span>
                      <span className="text-[11px] font-bold text-brand-pink-600">
                        {f.price > 0 ? `+$${f.price.toFixed(2)}` : 'Included'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-tight">{f.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: ADD NAME / INITIALS / TEXT */}
          <div className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brand-pink-500 text-white font-bold text-xs flex items-center justify-center">4</span>
                <h3 className="font-heading font-bold text-lg text-gray-800">Add Name, Initials, or Text</h3>
              </div>
              <span className="text-xs text-gray-400">{text.length}/12 chars</span>
            </div>

            {/* Input field */}
            <div className="relative">
              <input
                type="text"
                maxLength={12}
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                placeholder="YOUR NAME / INITIALS"
                className="w-full bg-brand-pink-50/50 border-2 border-brand-pink-200 rounded-2xl px-4 py-3 text-base font-bold text-gray-800 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-pink-400 placeholder:text-gray-300"
              />
              {text && (
                <button
                  onClick={() => setText('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Font Style & Text Color Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1.5">Font Style:</label>
                <div className="flex gap-2">
                  {FONTS.map((fo) => (
                    <button
                      key={fo.id}
                      onClick={() => setFont(fo.id)}
                      className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        font === fo.id
                          ? 'bg-brand-pink-100 border-brand-pink-400 text-brand-pink-600'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      {fo.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1.5">Text Engraving Color:</label>
                <div className="flex gap-2">
                  {TEXT_COLORS.map((tc) => (
                    <button
                      key={tc.hex}
                      onClick={() => setTextColor(tc.hex)}
                      className={`flex-1 py-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                        textColor === tc.hex
                          ? 'ring-2 ring-brand-pink-400 border-transparent shadow-sm'
                          : 'border-gray-200'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: tc.hex }} />
                      <span className="text-[10px] font-bold text-gray-700">{tc.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 5: HARDWARE CLASP */}
          <div className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-pink-500 text-white font-bold text-xs flex items-center justify-center">5</span>
              <h3 className="font-heading font-bold text-lg text-gray-800">Choose Hardware Clasp</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {HARDWARE_OPTIONS.map((hw) => {
                const isSelected = hardware === hw.id;
                return (
                  <button
                    key={hw.id}
                    onClick={() => setHardware(hw.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-brand-pink-50 border-brand-pink-500 ring-2 ring-brand-pink-200'
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{hw.icon}</span>
                    <span className="text-xs font-bold text-gray-800 block line-clamp-1">{hw.name}</span>
                    <span className="text-[10px] text-brand-pink-500 font-bold block mt-0.5">
                      {hw.price > 0 ? `+$${hw.price.toFixed(2)}` : 'Free'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 6: DECORATIVE MINI CHARMS */}
          <div className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brand-pink-500 text-white font-bold text-xs flex items-center justify-center">6</span>
                <h3 className="font-heading font-bold text-lg text-gray-800">Add Dangling Charms (Max 3)</h3>
              </div>
              <span className="text-xs text-brand-pink-600 font-bold">+$1.50 each</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CHARM_OPTIONS.map((ch) => {
                const isSelected = selectedCharms.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => toggleCharm(ch.id)}
                    className={`p-3 rounded-2xl border text-center transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-brand-pink-100 border-brand-pink-400 text-brand-pink-700 shadow-sm'
                        : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{ch.emoji}</span>
                    <div className="text-left">
                      <span className="text-xs font-bold block">{ch.name}</span>
                      <span className="text-[10px] text-gray-400">{isSelected ? 'Selected ✓' : '+ $1.50'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 7: CUTE GIFT BOX PACKAGING ADD-ON */}
          <div className="bg-white p-6 rounded-4xl border border-brand-pink-100 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink-100 text-brand-pink-500 flex items-center justify-center text-2xl">
                🎁
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-gray-800">Pastel Gift Box & Handwritten Card</h4>
                <p className="text-xs text-gray-500">Includes cute pink satin ribbon, crinkle paper, and personalized message card</p>
              </div>
            </div>

            <button
              onClick={() => setIncludeGiftBox(!includeGiftBox)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border whitespace-nowrap ${
                includeGiftBox
                  ? 'bg-brand-pink-500 text-white border-brand-pink-500 shadow-sm'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {includeGiftBox ? 'Added (+ $3.00)' : 'Add for $3.00'}
            </button>
          </div>

          {/* FINAL CTA BUTTON */}
          <div className="bg-gradient-to-r from-brand-pink-50 via-brand-lavender-50 to-brand-peach-50 p-6 rounded-4xl border border-brand-pink-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 font-bold block">Ready to assemble?</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#3D2C2E] font-heading">${totalPrice.toFixed(2)}</span>
                <span className="text-xs text-emerald-600 font-bold">In Stock & Handcrafted in 24h</span>
              </div>
            </div>

            <button
              onClick={handleCreateKeychain}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-white font-extrabold text-base shadow-cute hover:shadow-cute-hover flex items-center justify-center gap-2.5 transition-all ${
                createdSuccess
                  ? 'bg-emerald-500 scale-105'
                  : 'bg-brand-pink-500 hover:bg-brand-pink-600 hover:scale-105 active:scale-95'
              }`}
            >
              {createdSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Your Keychain is in the Cart!</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 animate-wiggle" />
                  <span>Create My Keychain ✨</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
