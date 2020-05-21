module.exports = {
  root: true,
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  env: {
    "browser": true,
    "node": true
  },
  globals: {
    "jsdom": true,
    "Promise": true
  },
  plugins: [
    "jest",
    "vue"
  ],
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:jest/recommended",
    "plugin:vue-a11y/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
