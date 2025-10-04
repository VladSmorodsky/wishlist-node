import type { Config } from 'jest';

const e2e: Config = {
  displayName: "e2e",
  preset: 'ts-jest',
  rootDir: ".",
  testMatch: ["<rootDir>/tests/e2e/**/*.(spec|test).(j|t)s"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  setupFiles: ['dotenv/config'],
  coverageDirectory: '<rootDir>/coverage/e2e/'
}

const unit: Config = {
  displayName: "unit",
  preset: 'ts-jest',
  rootDir: ".",
  testMatch: ["<rootDir>/tests/unit/**/*.(spec|test).(j|t)s"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  setupFiles: ['dotenv/config'],
  coverageDirectory: '<rootDir>/coverage/unit/'
}

const config: Config = { projects: [unit, e2e] };
export default config;