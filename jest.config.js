module.exports = {
  coverageThreshold: {
    coverageDirectory: 'coverage',
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  moduleNameMapper: {
    '^.+\\.(ttf|eot|woff|woff2)$': '<rootDir>/test/lib/mock-file.ts',
  },
  snapshotSerializers: ['jest-emotion'],
};
