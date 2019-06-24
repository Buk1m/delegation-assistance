import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import DelegationsPage from "./DelegationsPage.component";
import { isUserEmployee } from "../../selectors/user.selectors";
import { fetchMyDelegations, fetchDelegations } from "../../actions/delegations.actions";
import {
  getDelegations,
  getRejectedDelegations,
  getWaitingDelegations,
  getDelegationFetching
} from "../../selectors/delegations.selectors";

class DelegationsPageContainer extends Component {
  static propTypes = {
    delegations: array,
    fetchDelegations: func,
    fetchMyDelegations: func,
    fetching: bool,
    isEmployee: bool,
    rejectedDelegations: array,
    waitingDelegations: array
  };

  componentDidMount() {
    if (this.props.isEmployee) {
      this.props.fetchMyDelegations();
    } else {
      this.props.fetchDelegations();
    }
  }

  render() {
    return (
      <DelegationsPage
        isEmployee={this.props.isEmployee}
        fetching={this.props.fetching}
        delegations={this.props.delegations}
        rejectedDelegations={this.props.rejectedDelegations}
        waitingDelegations={this.props.waitingDelegations}
      />
    );
  }
}

const mapStateToProps = state => ({
  isEmployee: isUserEmployee(state),
  fetching: getDelegationFetching(state),
  delegations: getDelegations(state),
  rejectedDelegations: getRejectedDelegations(state),
  waitingDelegations: getWaitingDelegations(state)
});

const mapDispatchToProps = {
  fetchDelegations,
  fetchMyDelegations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsPageContainer);
