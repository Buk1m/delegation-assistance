import React, { Component } from "react";
import { connect } from "react-redux";

import ProfilePage from "./ProfilePage.component";

class ProfilePageContainer extends Component {
  render() {
    return <ProfilePage />;
  }
}

export default connect(
  null,
  null
)(ProfilePageContainer);
