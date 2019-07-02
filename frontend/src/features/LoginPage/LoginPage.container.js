import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, string, object, func } from "prop-types";
import { withRouter } from "react-router-dom";

import { loginUser } from "../../actions/user.actions";
import { getLoggedStatus, getToken } from "../../selectors/user.selectors";
import LoginPage from "./LoginPage.component";
import { toast } from "react-toastify";

class LoginPageContainer extends Component {
  static propTypes = {
    history: object,
    loggedStatus: bool,
    loginUser: func,
    token: string
  };

  constructor() {
    super();
    this.state = {
      errors: ""
    };
  }

  componentDidMount() {
    this.setState({
      errors: ""
    });
  }

  _redirectToDelegationsPage = () => this.props.history.push("/");

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
        if (!err.response) {
          this.setState({ errors: "Cannot reach server." });
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          this.setState({ errors: "Invalid Username or Password" });
        }
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
