import Page from "./page";

class LoginPage extends Page {
  get username() {
    return $("input[name='login']");
  }
  get password() {
    return $("input[name='password']");
  }
  get submitBtn() {
    return $("form button[type='submit']");
  }
  get status() {
    return $("form > span");
  }
  get loginRequired() {
    return $("span*=required");
  }
  get passwordRequired() {
    return $("span*=required");
  }

  get requiredErrors() {
    return $$("span*=required");
  }

  open() {
    super.open("login");
  }

  submit() {
    this.submitBtn.click();
  }
}

export default new LoginPage();
