/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#14102B',
        surface: '#221C4A',
        line: '#2B2557',
        accent: '#8F8BFF',
        'accent-2': '#7CF5D0',
        'accent-3': '#FF8FB8',
        text: '#E9E7FF',
        'text-muted': '#8F8BFF',
        'on-accent': '#14102B',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
