const base = "http://localhost:" + (process.env.PORT || "3000");
const chromedriver = require("chromedriver");
exports.config = {
  path: "/",
  port: 9515,
  runner: "local",
  //plugin to intercept http requests - next level!
  services: ["intercept"],

  specs: ["../frontend/__e2e__/specs/**/*.spec.js"],

  suites: {
    delegation: [
      "../frontend/__e2e__/specs/DelegationAccommodations.spec.js",
      "../frontend/__e2e__/specs/DelegationFlights.spec.js"
      // "../frontend/__e2e__/specs/DelegationDetails.spec.js",
      // "../frontend/__e2e__/specs/CreateDelegation.spec.js"
    ],
    login: ["../frontend/__e2e__/specs/Login.spec.js"]
  },

  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 10,

  capabilities: [
    {
      maxInstances: 3,
      browserName: "chrome"
      // Uncomment to run tests withiout opening browser window
      // "goog:chromeOptions": {
      //   args: ["--headless", "--disable-gpu"]
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
    let returnPromise = true;
    chromedriver.start(args, returnPromise).then(() => {
      console.log("chromedriver is ready");
    });
  },

  before: function() {
    require("@babel/register");
    let chai = require("chai");
    global.expect = chai.expect;
    chai.Should();
  },

  onComplete: function() {
    chromedriver.stop();
  }
};
