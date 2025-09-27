import js from '@eslint/js';
import react from 'eslint-plugin-react';
 import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
 
export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        document: true,
        window: true,
        JSX: true,
        HTMLInputElement: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-used-vars': ['error', {  argsIgnorePattern: "^_" }],
      'no-unused-vars': 'off',
      semi: 'off',
      quotes: 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
 
 