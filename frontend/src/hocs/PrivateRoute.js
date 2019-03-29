import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { bool } from "prop-types";

import { getLoggedStatus } from "../selectors/user.selectors";

class PrivateRoute extends Component {
  static propTypes = {
    loggedStatus: bool
  };

  render() {
    return this.props.loggedStatus === true ? <Route {...this.props} /> : <Redirect to={"/login"} />;
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
