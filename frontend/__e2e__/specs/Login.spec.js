import { expect } from "chai";
import LoginPage from "../pageobjects/login.page";
import { baseUrl, callTimeout } from "../constants";

describe("login form", () => {
  beforeEach(function() {
    LoginPage.open();
  });

  it("should deny access with wrong creds", () => {
    LoginPage.username.setValue("foo");
    LoginPage.password.setValue("bar");
    LoginPage.submit();

    browser.waitUntil(
      () => {
        return LoginPage.status.getText() === "Invalid Username or Password";
      },
      8000,
      "expected error message 'Invalid Username or Password' to show after unsuccesful authentication"
    );
  });

  it("should allow access with correct creds", () => {
    LoginPage.username.setValue("employee");
    LoginPage.password.setValue("pass1");
    LoginPage.submit();

    browser.waitUntil(
      () => {
        return browser.getUrl() === baseUrl + "/";
      },
      callTimeout,
      "expected to navigate to landing page"
    );
  });

  it("should render required message if login is empty on submit", () => {
    LoginPage.password.setValue("pass1");
    LoginPage.submit();

    expect(LoginPage.loginRequired.getText()).to.contain("This field is required.");
  });

  it("should render required message if password is empty on submit", () => {
    LoginPage.username.setValue("employee");
    LoginPage.submit();

    expect(LoginPage.passwordRequired.getText()).to.contain("This field is required.");
  });
});
