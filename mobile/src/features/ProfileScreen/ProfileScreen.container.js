import React, { Component } from "react";
import { connect } from "react-redux";

import ProfileScreen from "./ProfileScreen.component";
import { logoutUser } from "../../actions/user.actions";
import { func } from "prop-types";

class ProfileScreenContainer extends Component {
  static propTypes = {
    logoutUser: func
  };

  static navigationOptions = {
    title: "Profile"
  };

  _handleLogoutUser = () => {
    this.props.logoutUser();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return <ProfileScreen logoutUser={this._handleLogoutUser} />;
  }
}

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  null,
  mapDispatchToProps
)(ProfileScreenContainer);
