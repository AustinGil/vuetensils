global.beforeEach(() => {
});

global.afterEach(() => {
  jest.resetModules();
});

// Jest's setTimeout defaults to 5 seconds.
// Bump the timeout to 60 seconds.
jest.setTimeout(60 * 1000);
