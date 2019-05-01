import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, string, object, func } from "prop-types";
import { withRouter } from "react-router-dom";

import { loginUser } from "../../actions/user.actions";
import { getLoggedStatus, getToken } from "../../selectors/user.selectors";
import LoginPage from "./LoginPage.component";
class LoginPageContainer extends Component {
  static propTypes = {
    navigation: object,
    loginUser: func,
    loggedStatus: bool,
    token: string,
    history: object
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

  _redirectToDelegationsPage = () => this.props.history.push("/delegations");

  handleSubmit = values => {
    this.setState({ errors: "" });
    return this.props
      .loginUser(values.login, values.password)
      .then(() => {
        if (this.props.loggedStatus && this.props.token) {
          this._redirectToDelegationsPage();
        }
      })
      .catch(err => {
        this.setState({ errors: "Invalid Username or Password" });
        console.log(err);
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPageContainer)
);
