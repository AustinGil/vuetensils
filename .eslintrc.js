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
    'markdown',
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
    'comma-dangle': ['error', 'only-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'jsdoc/check-tag-names': [
      'error',
      {
        'definedTags': [
          'model',
          'slot'
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
    'vue/require-prop-types': ['error'],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        'components': ['Label'],
        'required': {
          'some': ['nesting', 'id']
        },
        'allowChildren': false
      }
    ]
  },
  settings: {
    jsdoc: {
      tagNamePreference: {
        property: 'prop',
        returns: 'return'
      }
    }
  },
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown'
    },
    {
      files: ['**/*.vue live'],
      processor: 'vue/.vue',
      rules: {
        'no-unused-vars':  [
          'error',
          {
            'args': 'none'
          }
        ],
        // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/29
        'vuejs-accessibility/accessible-emoji': ['off']
      }
    }
  ]
};
