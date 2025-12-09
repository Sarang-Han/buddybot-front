/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'ewha-green': '#00462A',
        'ewha-green-sub': '#006655',
        'bg-cream': '#fffdf1',
        'bg-gray': '#b9b9b9',
        'accent-yellow-green': '#bbc924',
        'accent-blue': '#45a2bc',
        'accent-mint': '#36ae92',
        'accent-coral': '#f27367',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
