import React, { Component } from "react";
import { connect } from "react-redux";
import ChecklistsPage from "./ChecklistsPage.component";

class ChecklistsPageContainer extends Component {
  render() {
    return <ChecklistsPage />;
  }
}

export default connect(
  null,
  null
)(ChecklistsPageContainer);
