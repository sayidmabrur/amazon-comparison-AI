// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        subtext: 'var(--subtext)',
        card: 'var(--card)',
        border: 'var(--border)',
      },
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // other plugins...
  ],
}
