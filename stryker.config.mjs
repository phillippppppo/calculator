// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please see the guide for more information: https://stryker-mutator.io/docs/stryker-js/guides/react",
  testRunner: "jest",
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "off",
  jest: {
    projectType: "create-react-app",
  },
  tempDirName: "stryker-tmp"
};
export default config;
