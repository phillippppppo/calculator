// jest.config.js
module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "IS_REACT_ACT_ENVIRONMENT": true,
  },
};
