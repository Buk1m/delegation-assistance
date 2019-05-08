import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { array, bool, string } from "prop-types";

import { getLoggedStatus, getRoleActive } from "../../selectors/user.selectors";

class PrivateRoute extends Component {
  static propTypes = {
    loggedStatus: bool,
    canAccess: array,
    roleActive: string
  };

  _redirectToHome = () => <Redirect to="/" />;

  _redirectToLogin = () => <Redirect to="/login" />;

  haveAccessToRoute = () => {
    let result = false;
    if (this.props.canAccess) {
      if (this.props.canAccess.includes(this.props.roleActive)) {
        result = true;
      }
    } else {
      result = true;
    }
    return result;
  };

  render() {
    return this.props.loggedStatus === true ? (
      this.haveAccessToRoute() ? (
        <Route {...this.props} />
      ) : (
        this._redirectToHome()
      )
    ) : (
      this._redirectToLogin()
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    roleActive: getRoleActive(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
