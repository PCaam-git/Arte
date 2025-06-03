module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/src/test/unit/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js']
};