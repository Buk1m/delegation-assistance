import React, { Component } from "react";
import { connect } from "react-redux";

import LoginPage from "./LoginPage.component";

class LoginPageContainer extends Component {
  render() {
    return <LoginPage />;
  }
}

export default connect(
  null,
  null
)(LoginPageContainer);
