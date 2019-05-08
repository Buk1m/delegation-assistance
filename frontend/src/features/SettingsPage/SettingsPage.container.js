import React, { Component } from "react";
import { connect } from "react-redux";

import SettingsPage from "./SettingsPage.component";

class SettingsPageContainer extends Component {
  render() {
    return <SettingsPage />;
  }
}

export default connect(
  null,
  null
)(SettingsPageContainer);
