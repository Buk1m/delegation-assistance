import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, string, func } from "prop-types";

import Header from "./Header.component";
import { getLoggedStatus, getFullName } from "../../../../selectors/user.selectors";
import { logoutUser } from "../../../../actions/user.actions";

class HeaderContainer extends Component {
  static propTypes = {
    loggedStatus: bool,
    fullname: string,
    logoutUser: func,
    toggleSidebar: func
  };

  _handleLogoutUser = () => {
    this.props.logoutUser();
    window.location.href = "/login";
  };

  render() {
    return (
      <Header
        loggedStatus={this.props.loggedStatus}
        toggleSidebar={this.props.toggleSidebar}
        fullname={this.props.fullname}
        logout={this._handleLogoutUser}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    fullname: getFullName(state)
  };
};

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
