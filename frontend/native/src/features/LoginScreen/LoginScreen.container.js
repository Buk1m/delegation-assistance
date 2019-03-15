import React, { Component } from "react";
import { connect } from "react-redux";

import { loginUser } from "../../actions/user.actions";
import { getLoggedStatus } from "../../selectors/user.selectors";
import LoginScreen from "./LoginScreen.component";

class LoginScreenContainer extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {
    if (this.props.loggedStatus) {
      this.props.navigation.navigate("Main");
    }
  };

  render() {
    return <LoginScreen navigate={this.props.navigation} />;
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state)
  };
};

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenContainer);
