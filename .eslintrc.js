module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    jsdom: true,
    Promise: true
  },
  plugins: [
    'jest',
    'jsdoc',
    'vue'
  ],
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:vue/recommended',
    'plugin:jest/recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  rules: {
    'comma-dangle': ['error','only-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'jsdoc/check-tag-names': [
      'error',
      {
        'definedTags': [
          'model',
          'slot',
          'unknown'
        ]
      }
    ],
    'jsdoc/no-undefined-types': [
      'warn',
      {
        'definedTypes': [
          'unknown'
        ]
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'always',
          'normal': 'always',
          'component': 'always'
        },
        'svg': 'always',
        'math': 'always'
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 3,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'vue/require-prop-types': ['error']
  },
  settings: {
    jsdoc: {
      tagNamePreference: {
        property: 'prop',
        returns: 'return'
      }
    }
  }
};
