/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['var(--font-mulish)', 'sans-serif'],
        volkhov: ['var(--font-volkhov)', 'serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        nicomoji: ['"Nico Moji"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

