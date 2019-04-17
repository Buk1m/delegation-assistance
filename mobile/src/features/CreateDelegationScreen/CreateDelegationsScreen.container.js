import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewDelegation } from "../../actions/delegations.actions";
import { func } from "prop-types";

import CreateDelegationsScreen from "./CreateDelegationsScreen.component";

class CreateDelegationsScreenContainer extends Component {
  static propTypes = {
    addNewDelegation: func
  };

  static navigationOptions = {
    title: "Create Delegation"
  };

  handleSubmit = values => {
    this.props.addNewDelegation(values);
  };

  render() {
    return <CreateDelegationsScreen onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  addNewDelegation
};

export default connect(
  null,
  mapDispatchToProps
)(CreateDelegationsScreenContainer);
