import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintPluginNext from '@next/eslint-plugin-next'
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import path from 'node:path'
import url from 'node:url'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  eslintPluginPerfectionist.configs['recommended-natural'],
  eslintPluginPrettierRecommended,
  eslintPluginReact.configs.flat.recommended,
  ...new FlatCompat({
    baseDirectory: path.dirname(url.fileURLToPath(import.meta.url))
  }).extends('eslint-config-standard'),
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': fixupPluginRules(eslintPluginNext),
      'react-hooks': fixupPluginRules(eslintPluginReactHooks)
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'perfectionist/sort-imports': ['error', { newlinesBetween: 'never' }],
      'prettier/prettier': ['error', { arrowParens: 'avoid', endOfLine: 'lf', printWidth: 160, semi: false, singleQuote: true, trailingComma: 'none' }],
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      ...eslintPluginNext.configs.recommended.rules,
      '@next/next/no-img-element': 'off',
      ...eslintPluginReactHooks.configs.recommended.rules
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    ignores: ['.cache', '.next', 'node_modules', 'public', 'static']
  }
]
