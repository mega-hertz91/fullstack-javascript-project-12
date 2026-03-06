// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/jsx-one-expression-per-line': [
        'error',
        { allow: 'single-child' },
      ],
      '@stylistic/arrow-parens': [
        'error',
        'as-needed',
        { requireForBlockBody: true },
      ],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': [
        'error',
        2,
        {
          VariableDeclarator: 1, // фиксированный отступ в 1 уровень
          SwitchCase: 1,
          MemberExpression: 1, // фиксирует цепочки методов .then().catch()
          ArrayExpression: 1,
          ObjectExpression: 1,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
