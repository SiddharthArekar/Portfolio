/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Slate 900
        secondary: "#334155", // Slate 700
        accent: "#38bdf8", // Sky 400
        "tech-blue": "#0ea5e9", // Sky 500
      },
      fontFamily: {
        fontFamily: {
          sans: ['Outfit', 'sans-serif'],
          signature: ['Dancing Script', 'cursive'],
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'spin-slow': 'spin 15s linear infinite',
        'reverse-spin': 'spin 15s linear infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
