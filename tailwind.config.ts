import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // The Social Vision site palette: light surfaces, black ink, vivid purple, soft mint.
        canvas: '#FAFAFA',
        backdrop: '#F4F0FF',
        surface: '#FFFFFF',
        'surface-soft': '#F7F7F7',
        ink: {
          DEFAULT: '#141414',
          muted: '#69636F',
          subtle: '#A19AA8',
        },
        line: '#E8E2F0',
        'line-subtle': '#F1EDF6',
        accent: {
          DEFAULT: '#5C00FF',
          deep: '#3B00A8',
          soft: '#7C35FF',
          softer: '#DCCCFF',
          bg: '#F0E8FF',
        },
        mint: '#D9F2E9',
        blush: '#FFF0F6',
        brand: {
          purple:   '#7C01FF',
          lavender: '#A200FF',
          vivid:    '#5B01FF',
          dark:     '#21005D',
          oatmilk:  '#FDFCFF',
        },
        highlight: {
          yellow:    '#FFED00',
          yellowGrn: '#CDFF00',
          green:     '#08F683',
          cyan:      '#00F0FF',
          magenta:   '#FF00C8',
          pink:      '#FF4D8D',
        },
        status: {
          'live-bg': '#D9F2E9',
          'live-text': '#1A674E',
          'pending-bg': '#F0E8FF',
          'pending-text': '#3B00A8',
          'tentative-bg': '#F7F7F7',
          'tentative-text': '#514A5C',
          'declined-bg': '#F7EAEA',
          'declined-text': '#8B1E1E',
          'yellow-bg': '#FEFCE8',
          'yellow-text': '#854D0E',
          'amber-bg': '#FEF3C7',
          'amber-text': '#92400E',
          'yellow-border': '#FDE68A',
          'amber-border': '#FCD34D',
          'deadline-bg': '#FFF0F6',
          'deadline-border': '#F2B8D1',
          'deadline-text': '#8A2456',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '10px',
        xl: '14px',
      },
    },
  },
  plugins: [],
};

export default config;
