import React, { Component } from "react";
import { connect } from "react-redux";

import DelegationsScreen from "./DelegationsScreen.component";

class DelegationsScreenContainer extends Component {
  static navigationOptions = {
    title: "Delegations"
  };

  render() {
    // TODO: replace 0 with delegationId when delegation screen PR will be approved and merged
    return (
      <DelegationsScreen navigate={this.props.navigation} delegationId={0} />
    );
  }
}

export default connect(
  null,
  null
)(DelegationsScreenContainer);
