/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f3a8a', // deep blue
          soft: '#e0e7ff'
        },
        priority: {
          high: '#ef4444',
          medium: '#facc15',
          low: '#22c55e'
        }
      }
    }
  },
  plugins: []
};

