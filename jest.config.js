// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // clearMocks: true,
  // resetMocks: false,
  // restoreMocks: false,

  // collectCoverageFrom: null,

  coverageDirectory: "tests/unit/coverage",

  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  errorOnDeprecated: false,

  // forceCoverageMatch: [],

  // globals: {},

  // moduleDirectories: [
  //   "node_modules"
  // ],

  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  // moduleNameMapper: {},

  // snapshotSerializers: ["jest-serializer-vue"],

  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/demo/',
    '<rootDir>/docs/'
  ],
  transform: {
    // "^.+\\.vue$": "vue-jest",
    // ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
    // 	"jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },

  // timers: "fake",

  verbose: true,
};
