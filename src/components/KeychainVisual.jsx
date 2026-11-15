import React from 'react';

export default function KeychainVisual({
  type = 'cloud',
  color = '#FFCAD4',
  secondaryColor = '#FFE5EC',
  finish = 'glitter',
  hardware = 'gold-star',
  text = '',
  font = 'bubble',
  textColor = '#FFFFFF',
  charms = [],
  sparkles = true,
  className = 'w-48 h-64',
  isFlipped = false,
  showClasp = true
}) {
  // Color mapping fallback
  const baseColor = color || '#FFCAD4';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Floating Sparkles decoration */}
      {sparkles && (
        <>
          <div className="absolute -top-2 -left-2 text-yellow-400 text-xl animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
          <div className="absolute top-1/4 -right-3 text-pink-400 text-lg animate-pulse" style={{ animationDuration: '2.5s' }}>💖</div>
          <div className="absolute -bottom-2 right-2 text-purple-400 text-xl animate-wiggle">⭐</div>
          <div className="absolute bottom-1/3 -left-3 text-yellow-300 text-sm animate-spin-slow">✦</div>
        </>
      )}

      {/* SVG Canvas for Clasp + Keychain Body */}
      <svg
        viewBox="0 0 240 320"
        className="w-full h-full drop-shadow-xl transition-transform duration-500 hover:scale-105"
        style={{ transform: isFlipped ? 'scaleX(-1)' : 'none' }}
      >
        <defs>
          {/* Hardware Gradients */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1BD" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="roseGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE4E6" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Holographic Iridescent Finish */}
          <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#FBCFE8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.8" />
          </linearGradient>

          {/* Acrylic Rim / Depth 3D Filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3F3034" floodOpacity="0.15" />
          </filter>
          
          <linearGradient id="acrylicRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* 1. CLASP & HARDWARE */}
        {showClasp && (
          <g id="hardware">
            {/* Clasp by Type */}
            {hardware === 'gold-star' && (
              <g transform="translate(120, 32)">
                {/* Star Clasp Loop */}
                <path
                  d="M0,-24 L7,-9 L23,-7 L11,5 L14,21 L0,12 L-14,21 L-11,5 L-23,-7 L-7,-9 Z"
                  fill="url(#goldGradient)"
                  stroke="#B45309"
                  strokeWidth="2"
                  filter="url(#softGlow)"
                />
                <circle cx="0" cy="0" r="4.5" fill="#FFFDF9" stroke="#B45309" strokeWidth="1.5" />
                {/* Jump rings connecting to charm */}
                <circle cx="0" cy="22" r="5" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
                <circle cx="0" cy="34" r="5" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
                <circle cx="0" cy="46" r="6" fill="none" stroke="url(#goldGradient)" strokeWidth="3.5" />
              </g>
            )}

            {hardware === 'rose-heart' && (
              <g transform="translate(120, 32)">
                <path
                  d="M0,18 C-20,2 -24,-18 0,-18 C24,-18 20,2 0,18 Z"
                  fill="url(#roseGoldGradient)"
                  stroke="#BE123C"
                  strokeWidth="2.5"
                  filter="url(#softGlow)"
                />
                <circle cx="0" cy="-4" r="5" fill="#FFFDF9" stroke="#BE123C" strokeWidth="1.5" />
                <circle cx="0" cy="24" r="5" fill="none" stroke="url(#roseGoldGradient)" strokeWidth="3" />
                <circle cx="0" cy="36" r="5" fill="none" stroke="url(#roseGoldGradient)" strokeWidth="3" />
                <circle cx="0" cy="48" r="6" fill="none" stroke="url(#roseGoldGradient)" strokeWidth="3.5" />
              </g>
            )}

            {hardware === 'silver-swivel' && (
              <g transform="translate(120, 34)">
                {/* Swivel trigger clip */}
                <rect x="-6" y="-24" width="12" height="24" rx="6" fill="url(#silverGradient)" stroke="#64748B" strokeWidth="2" />
                <circle cx="0" cy="-14" r="3.5" fill="#FFFDF9" />
                <rect x="-8" y="0" width="16" height="6" rx="3" fill="url(#silverGradient)" stroke="#64748B" strokeWidth="1.5" />
                <circle cx="0" cy="16" r="5" fill="none" stroke="url(#silverGradient)" strokeWidth="3" />
                <circle cx="0" cy="28" r="5" fill="none" stroke="url(#silverGradient)" strokeWidth="3" />
                <circle cx="0" cy="42" r="6" fill="none" stroke="url(#silverGradient)" strokeWidth="3.5" />
              </g>
            )}

            {hardware === 'pastel-pearl' && (
              <g transform="translate(120, 30)">
                {/* Pastel Pearl Strap */}
                <circle cx="-25" cy="-10" r="6" fill="#FDE047" stroke="#FEF08A" strokeWidth="1.5" />
                <circle cx="-15" cy="-20" r="6" fill="#F472B6" stroke="#FBCFE8" strokeWidth="1.5" />
                <circle cx="0" cy="-25" r="7" fill="#C084FC" stroke="#E9D5FF" strokeWidth="1.5" />
                <circle cx="15" cy="-20" r="6" fill="#67E8F9" stroke="#A5F3FC" strokeWidth="1.5" />
                <circle cx="25" cy="-10" r="6" fill="#86EFAC" stroke="#BBF7D0" strokeWidth="1.5" />
                <circle cx="0" cy="2" r="5" fill="url(#goldGradient)" stroke="#B45309" strokeWidth="2" />
                <circle cx="0" cy="18" r="5" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
                <circle cx="0" cy="34" r="5" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
                <circle cx="0" cy="48" r="6" fill="none" stroke="url(#goldGradient)" strokeWidth="3.5" />
              </g>
            )}
          </g>
        )}

        {/* 2. KEYCHAIN MAIN BODY (centered around y=190) */}
        <g id="charm-body" transform="translate(120, 190)" filter="url(#softGlow)">
          {/* Acrylic Hole Punch at top */}
          <circle cx="0" cy="-105" r="6" fill="#FFFFFF" opacity="0.9" />
          <circle cx="0" cy="-105" r="3.5" fill="#3D2C2E" opacity="0.2" />

          {/* SHAPE RENDERING */}
          {/* A. CLOUD */}
          {type === 'cloud' && (
            <g>
              {/* Outer acrylic border edge */}
              <path
                d="M-75,-15 C-75,-45 -45,-55 -30,-40 C-15,-65 30,-65 45,-40 C65,-50 85,-30 80,-5 C95,15 80,45 55,45 L-50,45 C-75,45 -85,15 -75,-15 Z"
                fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor}
                stroke="#FFFFFF"
                strokeWidth="4"
              />
              {/* Kawaii Face */}
              <circle cx="-25" cy="-2" r="4" fill="#3D2C2E" />
              <circle cx="25" cy="-2" r="4" fill="#3D2C2E" />
              <ellipse cx="-35" cy="5" rx="6" ry="4" fill="#FB7185" opacity="0.6" />
              <ellipse cx="35" cy="5" rx="6" ry="4" fill="#FB7185" opacity="0.6" />
              <path d="M-8,5 Q0,12 8,5" fill="none" stroke="#3D2C2E" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* B. BEAR */}
          {type === 'bear' && (
            <g>
              {/* Ears */}
              <circle cx="-50" cy="-60" r="22" fill={baseColor} stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="50" cy="-60" r="22" fill={baseColor} stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="-50" cy="-60" r="12" fill="#FFE4E6" />
              <circle cx="50" cy="-60" r="12" fill="#FFE4E6" />
              {/* Head */}
              <circle cx="0" cy="-10" r="68" fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor} stroke="#FFFFFF" strokeWidth="4" />
              {/* Snout */}
              <ellipse cx="0" cy="2" rx="26" ry="18" fill="#FFFDF9" />
              <ellipse cx="0" cy="-4" rx="7" ry="5" fill="#3D2C2E" />
              <path d="M-6,4 Q0,10 6,4" fill="none" stroke="#3D2C2E" strokeWidth="2" strokeLinecap="round" />
              {/* Eyes & Blushes */}
              <circle cx="-28" cy="-16" r="4.5" fill="#3D2C2E" />
              <circle cx="28" cy="-16" r="4.5" fill="#3D2C2E" />
              <circle cx="-26" cy="-18" r="1.5" fill="#FFFFFF" />
              <circle cx="30" cy="-18" r="1.5" fill="#FFFFFF" />
              <circle cx="-40" cy="-2" r="8" fill="#FB7185" opacity="0.5" />
              <circle cx="40" cy="-2" r="8" fill="#FB7185" opacity="0.5" />
            </g>
          )}

          {/* C. KITTEN / CAT */}
          {type === 'cat' && (
            <g>
              {/* Pointy Ears */}
              <polygon points="-60,-75 -25,-30 -65,-25" fill={baseColor} stroke="#FFFFFF" strokeWidth="3" />
              <polygon points="60,-75 25,-30 65,-25" fill={baseColor} stroke="#FFFFFF" strokeWidth="3" />
              <polygon points="-52,-65 -30,-35 -58,-32" fill="#FFE4E6" />
              <polygon points="52,-65 30,-35 58,-32" fill="#FFE4E6" />
              {/* Face */}
              <circle cx="0" cy="-10" r="65" fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor} stroke="#FFFFFF" strokeWidth="4" />
              {/* Eyes */}
              <ellipse cx="-26" cy="-15" rx="5" ry="6" fill="#3D2C2E" />
              <ellipse cx="26" cy="-15" rx="5" ry="6" fill="#3D2C2E" />
              <circle cx="-24" cy="-17" r="2" fill="#FFFFFF" />
              <circle cx="28" cy="-17" r="2" fill="#FFFFFF" />
              {/* Tiny triangle nose */}
              <polygon points="0,-3 -4,-8 4,-8" fill="#FB7185" />
              <path d="M-6,3 Q0,8 6,3" fill="none" stroke="#3D2C2E" strokeWidth="2" strokeLinecap="round" />
              {/* Whiskers */}
              <line x1="-38" y1="-5" x2="-62" y2="-10" stroke="#3D2C2E" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="-38" y1="2" x2="-62" y2="4" stroke="#3D2C2E" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="38" y1="-5" x2="62" y2="-10" stroke="#3D2C2E" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="38" y1="2" x2="62" y2="4" stroke="#3D2C2E" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="-35" cy="5" r="7" fill="#FB7185" opacity="0.45" />
              <circle cx="35" cy="5" r="7" fill="#FB7185" opacity="0.45" />
            </g>
          )}

          {/* D. HEART */}
          {type === 'heart' && (
            <g>
              <path
                d="M0,60 C-95,-5 -95,-80 0,-45 C95,-80 95,-5 0,60 Z"
                fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor}
                stroke="#FFFFFF"
                strokeWidth="4"
              />
              {/* Inner cute highlight */}
              <path
                d="M-15,-35 C-55,-60 -65,-25 -45,15"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
          )}

          {/* E. RETRO MOTEL TAG */}
          {type === 'motel-tag' && (
            <g>
              {/* Classic Elongated Diamond Motel Shape */}
              <polygon
                points="0,-100 55,-20 55,20 0,100 -55,20 -55,-20"
                fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor}
                stroke="#FFFFFF"
                strokeWidth="3.5"
              />
              {/* Inset Gold/White Border */}
              <polygon
                points="0,-90 47,-18 47,18 0,90 -47,18 -47,-18"
                fill="none"
                stroke={textColor === '#FFFFFF' ? '#FFFFFF' : '#F59E0B'}
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.8"
              />
              <circle cx="0" cy="-60" r="8" fill="none" stroke={textColor} strokeWidth="1.5" />
              <text x="0" y="-57" textAnchor="middle" fontSize="9" fontWeight="bold" fill={textColor}>KEY</text>
            </g>
          )}

          {/* F. STAR */}
          {type === 'star' && (
            <g>
              <path
                d="M0,-85 L22,-28 L82,-20 L38,22 L50,82 L0,52 L-50,82 L-38,22 L-82,-20 L-22,-28 Z"
                fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor}
                stroke="#FFFFFF"
                strokeWidth="4"
              />
              {/* Kawaii Face */}
              <circle cx="-16" cy="2" r="4" fill="#3D2C2E" />
              <circle cx="16" cy="2" r="4" fill="#3D2C2E" />
              <circle cx="-25" cy="8" r="6" fill="#FB7185" opacity="0.6" />
              <circle cx="25" cy="8" r="6" fill="#FB7185" opacity="0.6" />
              <path d="M-5,10 Q0,16 5,10" fill="none" stroke="#3D2C2E" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* G. DAISY FLOWER */}
          {type === 'daisy' && (
            <g>
              {/* Petals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy="-48"
                  rx="18"
                  ry="28"
                  fill="#FFFFFF"
                  stroke="#FDE047"
                  strokeWidth="1.5"
                  transform={`rotate(${angle})`}
                />
              ))}
              {/* Center disc */}
              <circle cx="0" cy="0" r="34" fill={baseColor} stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="-12" cy="-4" r="3.5" fill="#3D2C2E" />
              <circle cx="12" cy="-4" r="3.5" fill="#3D2C2E" />
              <ellipse cx="-18" cy="4" rx="5" ry="3" fill="#FB7185" opacity="0.6" />
              <ellipse cx="18" cy="4" rx="5" ry="3" fill="#FB7185" opacity="0.6" />
              <path d="M-4,4 Q0,10 4,4" fill="none" stroke="#3D2C2E" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* H. TAMAGOTCHI */}
          {type === 'tamagotchi' && (
            <g>
              {/* Egg casing */}
              <ellipse cx="0" cy="-5" rx="65" ry="78" fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor} stroke="#FFFFFF" strokeWidth="4" />
              {/* Pixel screen window */}
              <rect x="-42" y="-45" width="84" height="60" rx="12" fill="#E2F5E2" stroke="#4B5563" strokeWidth="2" />
              {/* Pixel critter & heart */}
              <rect x="-14" y="-22" width="28" height="24" rx="4" fill="#3D2C2E" />
              <rect x="-10" y="-18" width="6" height="4" fill="#E2F5E2" />
              <rect x="4" y="-18" width="6" height="4" fill="#E2F5E2" />
              <text x="22" y="-28" fontSize="14" fill="#EF4444">♥</text>
              {/* 3 Pastel Buttons */}
              <circle cx="-25" cy="36" r="8" fill="#F472B6" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="0" cy="42" r="8" fill="#FACC15" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="25" cy="36" r="8" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
          )}

          {/* I. BUBBLE INITIAL */}
          {type === 'bubble-letter' && (
            <g>
              <rect x="-55" y="-70" width="110" height="130" rx="40" fill={finish === 'holographic' ? 'url(#holoGradient)' : baseColor} stroke="#FFFFFF" strokeWidth="4" />
              <text
                x="0"
                y="20"
                textAnchor="middle"
                fontSize="76"
                fontWeight="900"
                fill="#FFFFFF"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {text ? text.charAt(0).toUpperCase() : 'C'}
              </text>
            </g>
          )}

          {/* SPECIAL CATALOG PRODUCTS */}
          {type === 'boba-bear' && (
            <g>
              <rect x="-45" y="-55" width="90" height="110" rx="28" fill="#FFFFFF" stroke={baseColor} strokeWidth="3" opacity="0.9" />
              {/* Liquid tea fill */}
              <rect x="-42" y="-10" width="84" height="62" rx="20" fill={baseColor} opacity="0.75" />
              {/* Boba pearls */}
              <circle cx="-22" cy="34" r="7" fill="#3D2C2E" />
              <circle cx="0" cy="36" r="7" fill="#3D2C2E" />
              <circle cx="22" cy="34" r="7" fill="#3D2C2E" />
              <circle cx="-12" cy="22" r="6" fill="#3D2C2E" />
              <circle cx="12" cy="22" r="6" fill="#3D2C2E" />
              {/* Cute Bear Ears on Cup Lid */}
              <circle cx="-32" cy="-62" r="14" fill={baseColor} />
              <circle cx="32" cy="-62" r="14" fill={baseColor} />
              {/* Straw */}
              <rect x="-6" y="-85" width="12" height="35" rx="4" fill="#F472B6" />
              {/* Face on cup */}
              <circle cx="-16" cy="-30" r="3.5" fill="#3D2C2E" />
              <circle cx="16" cy="-30" r="3.5" fill="#3D2C2E" />
              <circle cx="-24" cy="-22" r="5" fill="#FB7185" opacity="0.6" />
              <circle cx="24" cy="-22" r="5" fill="#FB7185" opacity="0.6" />
              <path d="M-4,-24 Q0,-18 4,-24" fill="none" stroke="#3D2C2E" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {type === 'corgi-butt' && (
            <g>
              {/* Round Peach Corgi */}
              <circle cx="0" cy="-5" r="65" fill="#FED7AA" stroke="#FFFFFF" strokeWidth="4" />
              {/* Peach crease */}
              <path d="M0,-70 Q0,-10 0,60" fill="none" stroke="#FB923C" strokeWidth="3" strokeLinecap="round" />
              {/* Little stubby tail */}
              <ellipse cx="0" cy="-20" rx="14" ry="10" fill="#FFF7ED" stroke="#FB923C" strokeWidth="1.5" />
              {/* Tiny paws */}
              <ellipse cx="-45" cy="40" rx="16" ry="12" fill="#FFF7ED" stroke="#FB923C" strokeWidth="1.5" />
              <ellipse cx="45" cy="40" rx="16" ry="12" fill="#FFF7ED" stroke="#FB923C" strokeWidth="1.5" />
              {/* Cheeks */}
              <circle cx="-32" cy="10" r="10" fill="#FB7185" opacity="0.4" />
              <circle cx="32" cy="10" r="10" fill="#FB7185" opacity="0.4" />
            </g>
          )}

          {type === 'couple-avocado' && (
            <g>
              {/* Left Avocado */}
              <path d="M-55,-60 C-35,-60 -25,-40 -20,-20 C-10,15 -18,45 -48,45 C-78,45 -85,15 -80,-20 Z" fill="#BBF7D0" stroke="#16A34A" strokeWidth="3" />
              <circle cx="-50" cy="12" r="14" fill="#B45309" stroke="#78350F" strokeWidth="2" />
              <circle cx="-54" cy="-10" r="3" fill="#3D2C2E" />
              <circle cx="-42" cy="-10" r="3" fill="#3D2C2E" />
              {/* Right Avocado (interlocking) */}
              <path d="M55,-60 C35,-60 25,-40 20,-20 C10,15 18,45 48,45 C78,45 85,15 80,-20 Z" fill="#BBF7D0" stroke="#16A34A" strokeWidth="3" />
              <circle cx="50" cy="12" r="15" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="42" cy="-10" r="3" fill="#3D2C2E" />
              <circle cx="54" cy="-10" r="3" fill="#3D2C2E" />
              {/* Magnetic spark in center */}
              <text x="0" y="10" textAnchor="middle" fontSize="16" fill="#F43F5E">💖</text>
            </g>
          )}

          {/* GLITTER RESIN FINISH LAYER */}
          {finish === 'glitter' && (
            <g opacity="0.8">
              <circle cx="-30" cy="-25" r="2.5" fill="#FFFFFF" />
              <circle cx="35" cy="-35" r="2" fill="#FFFFFF" />
              <circle cx="15" cy="20" r="2.5" fill="#FFFFFF" />
              <circle cx="-20" cy="30" r="1.8" fill="#FFFFFF" />
              <polygon points="10,-15 12,-10 17,-8 12,-6 10,-1 8,-6 3,-8 8,-10" fill="#FFFBEB" />
              <polygon points="-40,10 -38,14 -34,16 -38,18 -40,22 -42,18 -46,16 -42,14" fill="#FFFBEB" />
              <polygon points="38,20 40,23 44,24 40,25 38,28 36,25 32,24 36,23" fill="#FFFBEB" />
            </g>
          )}

          {/* ACRYLIC GLOSS HIGHLIGHT (Luxury glassy 3D look) */}
          <path
            d="M-50,-50 C-10,-65 40,-60 50,-40 C10,-40 -20,-30 -50,-50 Z"
            fill="#FFFFFF"
            opacity="0.55"
          />

          {/* CUSTOM ENGRAVED / PRINTED TEXT */}
          {text && type !== 'bubble-letter' && (
            <g transform="translate(0, 10)">
              <rect
                x={-(Math.max(text.length * 7.5, 30))}
                y="-15"
                width={Math.max(text.length * 15, 60)}
                height="30"
                rx="15"
                fill="#FFFFFF"
                opacity="0.85"
                stroke={baseColor}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontSize={text.length > 8 ? '13' : '16'}
                fontWeight="bold"
                fill={textColor === '#FFFFFF' ? '#3D2C2E' : textColor}
                style={{
                  fontFamily:
                    font === 'bubble'
                      ? 'Fredoka, sans-serif'
                      : font === 'script'
                      ? 'cursive, Quicksand'
                      : 'Quicksand, sans-serif'
                }}
              >
                {text}
              </text>
            </g>
          )}

          {/* DANGLING CHARM ACCENTS (e.g. Strawberry, Boba, Bell, Bow) */}
          {charms && charms.length > 0 && (
            <g transform="translate(50, 45)">
              {charms.map((c, idx) => (
                <g key={idx} transform={`translate(${idx * 16}, ${idx * 12})`}>
                  <line x1="0" y1="-15" x2="0" y2="0" stroke="url(#goldGradient)" strokeWidth="2" />
                  <circle cx="0" cy="10" r="11" fill="#FFFFFF" stroke="#FDE047" strokeWidth="1.5" filter="url(#softGlow)" />
                  <text x="0" y="14" textAnchor="middle" fontSize="12">
                    {c === 'strawberry' && '🍓'}
                    {c === 'boba' && '🧋'}
                    {c === 'daisy' && '🌼'}
                    {c === 'gummy-bear' && '🧸'}
                    {c === 'star' && '⭐'}
                    {c === 'bow' && '🎀'}
                    {c === 'bell' && '🔔'}
                    {c === 'pom-pom' && '🌸'}
                  </text>
                </g>
              ))}
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
