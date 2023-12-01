// jest.config.js
module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
};
