/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: {
            50: '#fff1f6',
            100: '#ffe4ee',
            200: '#fecddf',
            300: '#fda4c4',
            400: '#fb70a0',
            500: '#f43f7b',
            600: '#e11d62',
          },
          lavender: {
            50: '#f7f5ff',
            100: '#efeaff',
            200: '#dfd8ff',
            300: '#c5b5fe',
            400: '#a78bfa',
            500: '#8b5cf6',
          },
          mint: {
            50: '#f0fdf9',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
          },
          peach: {
            50: '#fff7f2',
            100: '#ffede2',
            200: '#fedbc8',
            300: '#fdbda0',
            400: '#fa926a',
          },
          yellow: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
          },
          sky: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
          },
          cocoa: {
            700: '#4a3b32',
            800: '#382a22',
            900: '#281d17',
          }
        }
      },
      fontFamily: {
        bubble: ['Fredoka', 'Quicksand', 'sans-serif'],
        quicksand: ['Quicksand', 'Nunito', 'sans-serif'],
        body: ['Quicksand', 'Nunito', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'cute': '0 8px 25px -4px rgba(244, 63, 123, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'cute-hover': '0 15px 35px -5px rgba(244, 63, 123, 0.22), 0 6px 12px -2px rgba(0, 0, 0, 0.05)',
        'soft-purple': '0 10px 30px -5px rgba(167, 139, 250, 0.2)',
        'soft-yellow': '0 10px 30px -5px rgba(253, 224, 71, 0.25)',
        'inner-glow': 'inset 0 2px 8px 0 rgba(255, 255, 255, 0.6)',
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-medium': 'float 3.5s ease-in-out infinite',
        'float-reverse': 'floatReverse 4.5s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-1.5deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
