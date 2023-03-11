module.exports = {
  'setupFiles': ['dotenv/config'],
  'roots': [
    '<rootDir>/src'
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  'preset': 'ts-jest',
  'testEnvironment': 'node',
  'clearMocks': true,
  'coverageThreshold': {
    'global': {
      'branches': 30,
      'functions': 60,
      'lines': 60,
      'statements': 70,
    },
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    'interfaces',
  ]
};
