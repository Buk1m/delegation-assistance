import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, object } from "prop-types";

import { getDelegationFetching, getFormatedDelegation } from "../../../selectors/delegations.selectors";
import DelegationDetails from "./DelegationDetails.component";

class DelegationDetailsContainer extends Component {
  static propTypes = {
    delegation: object,
    fetching: bool
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

export default connect(
  mapStateToProps,
  null
)(DelegationDetailsContainer);
