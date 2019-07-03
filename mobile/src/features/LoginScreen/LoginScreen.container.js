import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { loginUser } from "../../actions/user.actions";
import { bool, string, func } from "prop-types";
import { getLoggedStatus, getToken } from "../../selectors/user.selectors";
import LoginScreen from "./LoginScreen.component";

class LoginScreenContainer extends PureComponent {
  static propTypes = {
    loggedStatus: bool,
    loginUser: func,
    myToken: string
  };

  state = {
    loginError: ""
  };

  componentDidMount = () => {
    if (this.props.loggedStatus && this.props.myToken) {
      this.props.navigation.navigate("Main");
    }
  };

  handleSubmit = values => {
    return this.props
      .loginUser(values.login, values.password)
      .then(() => {
        this.props.navigation.navigate("Main");
      })
      .catch(() => {
        this.setState({ loginError: "Invalid Username or Password" });
        console.log(this.state.loginError);
      });
  };

  render() {
    return <LoginScreen onSubmit={this.handleSubmit} loginError={this.state.loginError} />;
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    myToken: getToken(state)
  };
};

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenContainer);
