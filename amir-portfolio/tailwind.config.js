/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'Inter', 'sans-serif'],
      },
      colors: {
        'amir-bg': '#020617', // slate-950-ish
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 1px 1px, rgba(148, 163, 253, 0.18) 1px, transparent 0)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px 0 rgba(168, 85, 247, 0.5)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
