// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx"],

  // // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // // mock a proxy using static file assets
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },

  // Use this configuration option to add custom reporters to Jest

  // reporters: [
  //   [
  //     "jest-nyancat-reporter",
  //     {
  //       "suppressErrorReporter": false
  //     }
  //   ]
  // ],

  setupFilesAfterEnv: ["jest-enzyme"],

  // The test environment that will be used for testing
  testEnvironment: "enzyme",

  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    enzymeAdapter: "react16"
  },

  // A map from regular expressions to paths to transformers

  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }

};
