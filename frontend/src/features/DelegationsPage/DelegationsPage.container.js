import React, { Component } from "react";
import { connect } from "react-redux";

import DelegationsPage from "./DelegationsPage.component";

class DelegationsPageContainer extends Component {
  render() {
    return <DelegationsPage />;
  }
}

export default connect(
  null,
  null
)(DelegationsPageContainer);
