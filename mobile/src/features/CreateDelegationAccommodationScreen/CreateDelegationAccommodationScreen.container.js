import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import { addNewDelegationAccommodation } from "../../actions/delegationAccommodations.actions";
import CreateDelegationAccommodationScreen from "./CreateDelegationAccommodationScreen.component";

class CreateDelegationAccommodationContainer extends Component {
  static propTypes = {
    addNewDelegationAccommodation: func
  };

  static navigationOptions = {
    title: "Create New Accommodation"
  };

  handleSubmit = values => {
    const delegationId = this.props.navigation.getParam("delegationId");
    return this.props.addNewDelegationAccommodation(delegationId, values).then(() => {
      this.props.navigation.goBack();
    });
  };

  render() {
    return <CreateDelegationAccommodationScreen onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  addNewDelegationAccommodation
};

export default connect(
  null,
  mapDispatchToProps
)(CreateDelegationAccommodationContainer);
