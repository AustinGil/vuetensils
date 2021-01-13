module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/tests/unit/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue-tjw'],
  testMatch: ['**/tests/unit/**/*.test.js'],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.vue$': '<rootDir>/node_modules/vue-jest'
  }
};
