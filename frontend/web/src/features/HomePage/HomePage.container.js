import React, { Component } from "react";
import { connect } from "react-redux";

import HomePage from "./HomePage.component";

class HomePageContainer extends Component {
  render() {
    return <HomePage />;
  }
}

export default connect(
  null,
  null
)(HomePageContainer);
