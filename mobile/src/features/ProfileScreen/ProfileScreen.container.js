import React, { Component } from "react";
import { connect } from "react-redux";

import ProfileScreen from "./ProfileScreen.component";
import { logoutUser } from "../../actions/user.actions";

class ProfileScreenContainer extends Component {
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
