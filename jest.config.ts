import type { Config } from "jest";

const e2e: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFiles: ["dotenv/config"],
  globals: {
    "ts-jest": { tsconfig: "tsconfig.test.json" },
  },
  displayName: "e2e",
  testMatch: ["<rootDir>/tests/e2e/**/*.(spec|test).(j|t)s"],
  coverageDirectory: "<rootDir>/coverage/e2e/",
};

const unit: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFiles: ["dotenv/config"],
  globals: {
    "ts-jest": { tsconfig: "tsconfig.test.json" },
  },
  displayName: "unit",
  testMatch: ["<rootDir>/tests/unit/**/*.(spec|test).(j|t)s"],
  coverageDirectory: "<rootDir>/coverage/unit/",
};

const config: Config = {
  projects: [unit, e2e],
};
export default config;
