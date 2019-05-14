const base = "http://localhost:" + (process.env.PORT || "3000");
const geckodriver = require("geckodriver");
exports.config = {
  path: "/",
  port: 4444,
  runner: "local",
  //plugin to intercept http requests - next level!
  services: ["intercept"],

  specs: ["../frontend/__e2e__/specs/**/*.spec.js"],
  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 1,

  capabilities: [
    {
      maxInstances: 1,
      browserName: "firefox"
      // Uncomment to run tests withiout opening browser window
      // "moz:firefoxOptions": {
      //   args: ["-headless"]
      // }
    }
  ],

  logLevel: "error", // Level of logging verbosity: silent | verbose | command | data | result | error

  // If you only want to run your tests until a specific amount of tests have failed use bail (default is 0 - don't bail, run all tests).
  bail: 0,

  baseUrl: base,
  waitforTimeout: 10000,

  connectionRetryTimeout: 90000,

  connectionRetryCount: 3,

  framework: "mocha",

  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
    compilers: ["js:@babel/register"]
  },

  onPrepare: function() {
    let args = [
      // optional arguments
    ];
    geckodriver.start(args);
  },

  before: function() {
    require("@babel/register");
    let chai = require("chai");
    global.expect = chai.expect;
    chai.Should();
  },

  onComplete: function() {
    geckodriver.stop();
  }
};
