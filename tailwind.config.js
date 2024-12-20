/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        seascape: '#4bbcdf',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        '2xl-mobile': '1.5rem',
        '3xl-mobile': '1.875rem',
        '4xl-mobile': '2.25rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            '--tw-prose-bold': 'white',
            a: {
              color: theme('colors.white'),
              fontWeight: `bold`,
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            p: {
              color: theme('colors.gray.100'),
              fontSize: theme('fontSize.lg'),
              lineHeight: `2`,
            },
            pre: {
              border: '2px solid #fbb6ce',
            },
            maxWidth: '100ch',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
