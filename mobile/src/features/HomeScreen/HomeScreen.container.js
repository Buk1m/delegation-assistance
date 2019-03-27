import React, { Component } from "react";
import { connect } from "react-redux";

import HomeScreen from "./HomeScreen.component";

class HomeScreenContainer extends Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    return <HomeScreen navigate={this.props.navigation} />;
  }
}

export default connect(
  null,
  null
)(HomeScreenContainer);
