import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, number, object } from "prop-types";

import { fetchDelegation } from "../../../actions/delegations.actions";
import { getDelegationFetching, getFormatedDelegation } from "../../../selectors/delegations.selectors";
import DelegationDetails from "./DelegationDetails.component";

class DelegationDetailsContainer extends Component {
  static propTypes = {
    delegation: object,
    delegationId: number,
    fetchDelegation: func,
    fetching: bool
  };

  componentDidMount = () => {
    this.props.fetchDelegation(this.props.delegationId);
  };

  render() {
    return <DelegationDetails delegation={this.props.delegation} fetching={this.props.fetching} />;
  }
}

const mapStateToProps = state => {
  return {
    delegation: getFormatedDelegation(state),
    fetching: getDelegationFetching(state)
  };
};

const mapDispatchToProps = {
  fetchDelegation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationDetailsContainer);
