import path from 'node:path'
import { fileURLToPath } from 'node:url'
import stylistic from '@stylistic/eslint-plugin'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import functional from 'eslint-plugin-functional'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(['node_modules', 'dist', 'build']),
  ...compat.extends(
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      functional,
      '@stylistic': stylistic,
    },
    extends: [reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'react/prop-types': 0,
      'no-console': 0,
      'react/react-in-jsx-scope': 0,
      'functional/no-conditional-statements': 0,
      'functional/no-expression-statements': 0,
      'functional/immutable-data': 0,
      'functional/functional-parameters': 0,
      'functional/no-try-statements': 0,
      'functional/no-throw-statements': 0,
      'functional/no-return-void': 0,
      'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
      'react/function-component-definition': [
        2,
        { namedComponents: 'arrow-function' },
      ],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
    },
  },
])
