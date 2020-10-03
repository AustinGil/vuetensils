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
    Promise: true,
  },
  'ignorePatterns': ['dist/**/*', 'types/**/*'],
  plugins: ['jest', 'jsdoc', 'markdown', 'vue'],
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:vue/recommended',
    'plugin:jest/recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  rules: {
    'array-bracket-newline': ['error', { multiline: true }],
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': ['error', 'consistent'],
    'comma-spacing': [
      'error', {
        'before': false,
        'after': true
      }
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'computed-property-spacing': ['error', 'never'],
    'max-len': [
      'warn', {
        'code': 80,
        'ignoreComments': true
      }
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [
      'error', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: ['error', 'always'],
    'semi-spacing': ['error'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-multi-spaces': ['error'],
    'space-before-blocks': ['error'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error'],
    'no-whitespace-before-property': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'block-spacing': ['error'],
    'brace-style': 'error',
    'object-curly-newline': [
      'error', {
        'multiline': true,
        'consistent': true
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error'],

    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['model', 'slot'],
      },
    ],

    'vue/no-textarea-mustache': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/require-prop-types': ['error'],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],
  },
  settings: {
    jsdoc: {
      tagNamePreference: {
        property: 'prop',
        returns: 'return',
      },
    },
  },
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      files: ['**/*.vue live'],
      processor: 'vue/.vue',
      rules: {
        'no-unused-vars': [
          'error',
          {
            args: 'none',
          },
        ],
      },
    },
  ],
};
