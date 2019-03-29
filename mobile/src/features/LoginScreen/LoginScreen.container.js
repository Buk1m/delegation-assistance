import React, { Component } from "react";
import { connect } from "react-redux";

import { loginUser } from "../../actions/user.actions";
import { getLoggedStatus, getToken } from "../../selectors/user.selectors";
import LoginScreen from "./LoginScreen.component";

class LoginScreenContainer extends Component {
  static navigatonOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      errors: ""
    };
  }

  componentDidMount = () => {
    if (this.props.loggedStatus && this.props.myToken) {
      this.props.navigation.navigate("Main");
    }
    this.setState(() => {
      return {
        errors: ""
      };
    });
  };

  handleSubmit = values => {
    this.setState({ errors: "Loading..." });
    this.props
      .loginUser(values.login, values.password)
      .then(response => {
        if (response.status === 200) {
          this.props.navigation.navigate("Main");
        }
      })
      .catch(err => {
        this.setState({ errors: "Invalid Username or Password" });
      });
  };

  render() {
    return <LoginScreen onSubmit={this.handleSubmit} errors={this.state.errors} />;
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
