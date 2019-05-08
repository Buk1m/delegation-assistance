import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";

import Header from "./Header.component";
import { logoutUser, changeRole } from "../../../../actions/user.actions";
import { getLoggedStatus, getFullName, getRoleActive, getRoles } from "../../../../selectors/user.selectors";

export class HeaderContainer extends Component {
  static propTypes = {
    loggedStatus: bool,
    logoutUser: func,
    changeRole: func,
    fullname: string,
    roles: array,
    roleActive: string
  };

  _handleLogout = () => {
    this.props.logoutUser();
  };

  _changeRole = role => {
    this.props.changeRole(role);
  };

  render() {
    return (
      <Header
        loggedStatus={this.props.loggedStatus}
        fullname={this.props.fullname}
        logout={this._handleLogout}
        roles={this.props.roles}
        roleActive={this.props.roleActive}
        changeRole={this._changeRole}
      />
    );
  }
}

const mapStateToProps = state => ({
  loggedStatus: getLoggedStatus(state),
  fullname: getFullName(state),
  roleActive: getRoleActive(state),
  roles: getRoles(state)
});

const mapDispatchToProps = {
  logoutUser,
  changeRole
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
