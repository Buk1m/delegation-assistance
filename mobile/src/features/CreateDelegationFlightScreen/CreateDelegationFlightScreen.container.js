import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import { addNewDelegationFlight } from "../../actions/delegationFlight.actions";
import CreateDelegationFlightScreen from "./CreateDelegationFlightScreen.component";

class CreateDelegationFlightContainer extends Component {
  static propTypes = {
    addNewDelegationFlight: func
  };

  static navigationOptions = {
    title: "Create New Flight"
  };

  handleSubmit = values => {
    const delegationId = this.props.navigation.getParam("delegationId");
    return this.props.addNewDelegationFlight(delegationId, values).then(() => {
      this.props.navigation.navigate("Home");
    });
  };

  render() {
    return <CreateDelegationFlightScreen onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  addNewDelegationFlight
};

export default connect(
  null,
  mapDispatchToProps
)(CreateDelegationFlightContainer);
