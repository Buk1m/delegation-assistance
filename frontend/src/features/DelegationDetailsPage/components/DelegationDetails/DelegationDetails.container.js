import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, object } from "prop-types";
import { withRouter } from "react-router-dom";

import { getFormatedDelegation, getDelegationFetching } from "../../../../selectors/delegations.selectors";
import DelegationDetails from "./DelegationDetails.component";

class DelegationDetailsContainer extends Component {
  static propTypes = {
    canEditDelegation: bool,
    delegation: object,
    fetching: bool,
    history: object
  };

  state = {
    editingMealLabel: undefined
  };

  changeEditingMeal = label => {
    this.setState({ editingMealLabel: label });
  };
  _redirectToDelegationsPage = () => this.props.history.push("/delegations");

  render() {
    return (
      <DelegationDetails
        delegation={this.props.delegation}
        initialValues={this.props.delegation}
        fetching={this.props.fetching}
        changeEditingMeal={this.changeEditingMeal}
        editingMealLabel={this.state.editingMealLabel}
        canEditDelegation={this.props.canEditDelegation}
      />
    );
  }
}

const mapStateToProps = state => ({
  delegation: getFormatedDelegation(state),
  fetching: getDelegationFetching(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(DelegationDetailsContainer)
);
