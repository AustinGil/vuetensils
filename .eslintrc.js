// http://eslint.org/docs/user-guide/configuring
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  // extends: "eslint:recommended",
  extends: ["plugin:prettier/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  globals: {
    process: false
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"]
  }
}
