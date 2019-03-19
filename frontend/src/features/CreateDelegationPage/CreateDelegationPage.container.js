import React, { Component } from "react";
import { connect } from "react-redux";
import CreateDelegationPage from "./CreateDelegationPage.component";
import { addNewDelegation } from "../../actions/delegations.actions";
import { func } from "prop-types";

class CreateDelegationPageContainer extends Component {
  static propTypes = {
    addNewDelegation: func
  };

  handleCreateDelegation = values => {
    this.props.addNewDelegation(values);
  };

  render() {
    return <CreateDelegationPage onSubmit={this.handleCreateDelegation} />;
  }
}

const mapDispatchToProps = {
  addNewDelegation
};

export default connect(
  null,
  mapDispatchToProps
)(CreateDelegationPageContainer);
