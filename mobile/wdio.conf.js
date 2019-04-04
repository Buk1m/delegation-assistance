exports.config = {
  specs: ["./__tests__/e2e/specs/**/*spec.js"],
  exclude: [],
  maxInstances: 10,
  services: ["appium"],
  capabilities: [
    {
      maxInstances: 1,
      browserName: "",
      appiumVersion: "1.7.2",
      platformName: "Android",
      platformVersion: "8.0",
      deviceName: "Android GoogleAPI Emulator",
      app:
        "C:/Users/Bukim/source/repos/idemia19/mobile/android/app/build/outputs/apk/devKernel/debug/app-devKernel-debug.apk"
      // app: "android/app/build/outputs/apk/devKernel/delegationassistant.apk"
    }
  ],
  port: 4723,
  sync: true,
  logLevel: "debug",
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: "./errorShots/",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: "mocha"
};
