import React, { Component } from "react";
import { connect } from "react-redux";

import ProfileScreen from "./ProfileScreen.component";

class ProfileScreenContainer extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  render() {
    return <ProfileScreen />;
  }
}

export default connect(
  null,
  null
)(ProfileScreenContainer);
