import React, { Component } from "react";
import { connect } from "react-redux";

import HomeScreen from "./HomeScreen.component";

class HomeScreenContainer extends Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    return <HomeScreen />;
  }
}

export default connect(
  null,
  null
)(HomeScreenContainer);
