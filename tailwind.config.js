/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './components/**/*.{ts,tsx}', './screens/**/*.{ts,tsx}', './navigation/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#3B2BC2',
        background: '#0A0A0F',
        accent: '#5B4EE8',
        gray: '#A0A0B0',
        danger: '#E8453C',
        surface: '#15151C',
        surfaceBg: 'rgba(255,255,255,0.04)',
        surfaceBorder: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        heading: ['AoboshiOne_400Regular'],
      },
    },
  },
  plugins: [],
};
