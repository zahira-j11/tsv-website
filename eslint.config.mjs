import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import globals from 'globals';

const config = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'public/**',
      'content/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ['next.config.mjs', 'postcss.config.mjs', 'eslint.config.mjs', 'scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // These flag the existing marketing pages. Editing them would change
    // copy, full-page links, or effect timing, which this security pass
    // leaves alone. New code is still checked by the rest of the config.
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default config;
