import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, string, object, func } from "prop-types";

import { loginUser } from "../../actions/user.actions";
import { getLoggedStatus, getToken } from "../../selectors/user.selectors";
import LoginPage from "./LoginPage.component";

class LoginPageContainer extends Component {
  static propTypes = {
    navigation: object,
    loginUser: func,
    loggedStatus: bool,
    token: string
  };

  constructor() {
    super();
    this.state = {
      errors: ""
    };
  }

  static navigatonOptions = {
    header: null
  };

  componentDidMount() {
    this.setState(() => {
      return {
        errors: ""
      };
    });
  }

  handleSubmit = values => {
    this.setState({ errors: "" });
    return this.props
      .loginUser(values.login, values.password)
      .then(response => {
        if (this.props.loggedStatus && this.props.token) {
          window.location.href = "/delegations";
        }
      })
      .catch(err => {
        this.setState({ errors: "Invalid Username or Password" });
      });
  };

  render() {
    return <LoginPage onSubmit={this.handleSubmit} errors={this.state.errors} />;
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    token: getToken(state)
  };
};

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
