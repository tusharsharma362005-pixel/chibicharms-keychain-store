import React, { useState } from 'react';
import { Sparkles, Heart, ShieldCheck, HelpCircle, ChevronDown, Wand2, Package, Award } from 'lucide-react';

export default function AboutUsPage({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How long does custom keychain production take?',
      a: 'We handcraft and assemble all custom keychains within 24 to 48 hours in our studio! Once assembled and quality-checked, orders ship via USPS tracked shipping (3-5 business days USA, 7-12 days international).'
    },
    {
      q: 'Can I engrave emojis or non-English characters?',
      a: 'Yes! Our laser engraving and infill machines support all standard keyboard symbols, kanji, hangul, accented letters, and cute characters like ★, ♥, ✨, 🌸.'
    },
    {
      q: 'Are the keychains scratch-proof and waterproof?',
      a: 'Yes! We use optical-grade cast acrylic with a dual UV-cured scratch-resistant topcoat. The art is sealed between two solid acrylic layers so the ink will never peel or scratch off even against metal house keys!'
    },
    {
      q: 'Do you offer bulk orders for birthdays, weddings, or brand merch?',
      a: 'Absolutely! We love crafting custom party favors and bridal party sets. For orders over 15 units, drop us a message for special bundle discounts and custom backing cards.'
    },
    {
      q: 'What is your Happiness Guarantee?',
      a: 'If your keychain arrives damaged, has a spelling error on our end, or does not meet your expectations, we will remake and send you a brand new one completely free of charge or issue a 100% refund.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-brand-pink-100 via-brand-peach-100 to-brand-lavender-100 rounded-5xl p-8 sm:p-16 text-center border-2 border-white shadow-cute relative overflow-hidden">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-600 bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm inline-block mb-3">
          OUR KAWAII STORY 🎀
        </span>
        <h1 className="text-3xl sm:text-6xl font-extrabold font-heading text-[#3D2C2E]">
          Making Daily Keys Feel Magical ✨
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
          ChibiCharms started in 2023 with a single cutting machine, bottles of sparkling resin, and a mission: to replace boring keys with tiny joyful talismans that carry a piece of your personality.
        </p>
      </div>

      {/* Story & Craftsmanship Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-500">
            CRAFTED WITH TENDER LOVE 🌸
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E]">
            Not Just Any Keychain, A Keepsake You'll Cherish
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Every day, the first thing you grab when leaving home and the last thing you hold when you return is your keys. We believe that small object should bring a smile to your face every single time.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Unlike cheap mass-produced trinkets that fade and scratch in two weeks, our keychains use <strong>3mm optical cast acrylic</strong> with sealed embedded artwork, 18k gold-tone electroplated clasps, and hand-poured epoxy domes that resist daily purse friction.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('customize')}
              className="px-6 py-3.5 rounded-full bg-brand-pink-500 hover:bg-brand-pink-600 text-white font-bold text-sm shadow-cute flex items-center gap-2 transition-all hover:scale-105"
            >
              <Wand2 className="w-4 h-4" />
              <span>Design Your Own Keepsake</span>
            </button>
          </div>
        </div>

        {/* Studio Perks Visual Card */}
        <div className="bg-white p-6 sm:p-8 rounded-5xl border border-brand-pink-100 shadow-cute space-y-4">
          <div className="flex items-center gap-3 border-b border-brand-pink-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-pink-100 text-brand-pink-500 flex items-center justify-center text-2xl">
              🎨
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-gray-800">100% Original Illustrations</h4>
              <p className="text-xs text-gray-500">Designed in-house by independent kawaii artists</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-brand-pink-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-lavender-100 text-brand-lavender-500 flex items-center justify-center text-2xl">
              ✨
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-gray-800">Double-Glazed Acrylic</h4>
              <p className="text-xs text-gray-500">Art is trapped between acrylic layers — never rubs off</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-brand-pink-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
              📦
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-gray-800">Eco-Friendly Pink Mailers</h4>
              <p className="text-xs text-gray-500">100% recyclable packaging with cute surprise stickers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-mint-100 text-brand-mint-500 flex items-center justify-center text-2xl">
              💖
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-gray-800">30-Day Happiness Guarantee</h4>
              <p className="text-xs text-gray-500">Free replacement or full refund if you're not in love</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink-600 bg-brand-pink-100 px-3 py-1 rounded-full">
            GOT QUESTIONS? 🤔
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#3D2C2E]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-brand-pink-100 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left font-heading font-bold text-sm sm:text-base text-gray-800 flex items-center justify-between gap-4 hover:bg-brand-pink-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-pink-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-brand-pink-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
