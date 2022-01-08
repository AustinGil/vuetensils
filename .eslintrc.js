module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    // extras
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    // "ecmaVersion": 6,
    sourceType: 'module',
  },
  globals: {
    jsdom: true,
    Promise: true,
  },
  ignorePatterns: ['dist/**/*', 'types/**/*', '**/TestAll.vue'],
  plugins: [
    '@typescript-eslint',
    'jsdoc',
    // "jest",
    'vue',
    'vuejs-accessibility',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsdoc/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:vue/recommended',
    'plugin:vuejs-accessibility/recommended',
    'plugin:prettier/recommended',
  ],

  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'no-console': 'off',
    'prefer-const': 'error',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],

    'import/extensions': ['error', 'always'],
    'import/no-unresolved': 'off',
    'import/order': 'error',

    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['model', 'slot'],
      },
    ],
    'jsdoc/no-undefined-types': [
      'error',
      {
        definedTypes: [
          'Record',
          'Pick',
          'T',
          'CytoProject',
          'CytoUser',
          'Job',
          'Assay',
          'NodeListOf',
        ],
      },
    ],
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/valid-types': 'off',

    // 'vue/require-prop-types': ['error']
    'vue/max-attributes-per-line': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: [],
      },
    ],
    'vue/custom-event-name-casing': 'off',
    'vue/no-template-shadow': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
        },
      },
    ],

    'vuejs-accessibility/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
  // overrides: [
  //   {
  //     files: ['**/*.md'],
  //     processor: 'markdown/markdown',
  //   },
  //   {
  //     files: ['**/*.vue live'],
  //     processor: 'vue/.vue',
  //     rules: {
  //       'no-unused-vars': [
  //         'error',
  //         {
  //           args: 'none',
  //         },
  //       ],
  //     },
  //   },
  // ],
};
