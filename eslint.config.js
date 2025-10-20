import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // añadimos los globales de Node y Jest para que no marque 'no-undef'
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // que solo avise si hay variables sin usar
      'no-unused-vars': 'warn',
      // mantener por seguridad
      'no-undef': 'error',
      'semi': ['error', 'always'],
      // aceptamos comillas simples (y solo warn)
      'quotes': ['warn', 'single', { 'avoidEscape': true }],
    },
  },
];