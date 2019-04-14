import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { bool, array } from "prop-types";

import { getLoggedStatus, getRoles } from "../selectors/user.selectors";

class PrivateRoute extends Component {
  static propTypes = {
    loggedStatus: bool,
    canAccess: array,
    roles: array
  };

  _redirectToHome = () => <Redirect to="/" />;

  _redirectToLogin = () => <Redirect to="/login" />;

  haveAccessToRoute = () => {
    let result = false;
    if (this.props.canAccess) {
      this.props.roles.forEach(element => {
        if (this.props.canAccess.includes(element)) {
          result = true;
        }
      });
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
    roles: getRoles(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
