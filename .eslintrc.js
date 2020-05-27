module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    jsdom: true,
    Promise: true
  },
  plugins: ["jest", "vue"],
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:jest/recommended",
    "plugin:vuejs-accessibility/recommended",
  ],
  rules: {
    "comma-dangle": [
      "error",
      {
        "arrays": "only-multiline",
        "objects": "only-multiline",
        "imports": "never",
        "exports": "never",
        "functions": "never",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "quotes": ["error", "double"],
    "semi": ["error", "never"],
    "vue/html-self-closing": [
      "error",
      {
        "html": {
          "void": "always",
          "normal": "always",
          "component": "always"
        },
        "svg": "always",
        "math": "always"
      }
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        "singleline": 3,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
      }
    ],
    "vue/require-prop-types": ["error"]
  }
}
