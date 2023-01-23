/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'dark-blue-custom': '#0f0920',
        'white-text': '#f2f0ff',
        'bg-blue': '#221c3e',
        'dark-gray': '#3C384D',
        grey: '#f2f0ff',
        'input-blue': '#0368FF',
        'primary-blue': '#0368FF',
        'light-grey': '#B5B3BC',
        'primary-red': '#FF4445',
        'primary-orange': '#FF9533',
      },
      backgroundImage: {
        dot: "url('/src/assets/Ellipse 1.svg')",
      },
      backgroundSize: {
        '150%': '150%',
      },
      boxShadow: {
        '3xl': '2px 4px 12px rgba(0, 0, 0, 0.48);',
      },
      minWidth: {
        dialog: 'calc(100vw / 3)',
      },
      minHeight: {
        dialog: 'calc(100vh/4)',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        visibility: 'visibility opacity',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [require('@tailwindcss/forms')],
};
