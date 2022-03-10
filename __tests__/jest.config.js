const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/',
  ],
  testRegex: '__tests__/.*\\.test\\.tsx?$',
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(
  customJestConfig
);
