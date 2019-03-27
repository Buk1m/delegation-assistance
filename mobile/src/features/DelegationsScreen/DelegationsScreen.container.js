import React, { Component } from "react";
import { connect } from "react-redux";

import DelegationsScreen from "./DelegationsScreen.component";

class DelegationsScreenContainer extends Component {
  static navigationOptions = {
    title: "Delegations"
  };

  render() {
    return <DelegationsScreen navigate={this.props.navigation} />;
  }
}

export default connect(
  null,
  null
)(DelegationsScreenContainer);
