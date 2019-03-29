import React, { Component } from "react";
import { connect } from "react-redux";
import { string } from "prop-types";

import Sidebar from "./Sidebar.component";
import { sidebarNavigation } from "../../../../config/navigation";

class SidebarContainer extends Component {
  static propTypes = {
    className: string
  };

  render() {
    return <Sidebar className={this.props.className} navigationItems={sidebarNavigation} />;
  }
}

export default connect(
  null,
  null
)(SidebarContainer);
