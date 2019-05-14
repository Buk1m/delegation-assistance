import { baseUrl, callTimeout } from "../constants";
export default class Page {
  constructor() {
    const _username = () => browser.$("input[name='login']");
    const _password = () => browser.$("input[name='password']");
    const _submitBtn = () => browser.$("form button[type='submit']");

    this.login = (username, password) => {
      this.open("login");
      _username().setValue(username);
      _password().setValue(password);
      _submitBtn().click();
      this._checkIfLoggedIn();
    };
  }

  get headerMenu() {
    return $("#usernavmenu");
  }

  get logoutButton() {
    return $("button#usernavmenu ~ div li:last-of-type");
  }

  open(path) {
    browser.url(path);
  }

  refresh() {
    browser.refresh();
  }

  loginAsEmployee() {
    this.login("employee", "pass1");
  }

  loginAsManager() {
    this.login("manager", "pass2");
  }

  loginAsApprover() {
    this.login("approver", "pass3");
  }

  loginAsAccountant() {
    this.login("accountant", "pass4");
  }

  logout() {
    this.headerMenu.click();
    this.logoutButton.click();
  }

  _checkIfLoggedIn() {
    browser.waitUntil(
      () => {
        return browser.getUrl() === baseUrl + "/";
      },
      callTimeout,
      "Login failed. Expected to navigate to landing page " + baseUrl + "/"
    );
  }

  _checkIfLoggedOut() {
    browser.waitUntil(
      () => {
        return browser.getUrl() === baseUrl + "/login";
      },
      callTimeout,
      "Logout failed. Expected to navigate to login page " + baseUrl + "/login"
    );
  }
}
