import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";

import DelegationsPage from "./DelegationsPage.component";
import { isUserEmployee, getRoleActive } from "../../selectors/user.selectors";
import { fetchMyDelegations, fetchDelegations, setWaitingStatus } from "../../actions/delegations.actions";
import {
  getDelegations,
  getRejectedDelegations,
  getWaitingDelegations,
  getDelegationFetching
} from "../../selectors/delegations.selectors";
import waitingStatusPerRole from "../../config/dashboard";

class DelegationsPageContainer extends Component {
  static propTypes = {
    activeRole: string,
    delegations: array,
    fetchDelegations: func,
    fetchMyDelegations: func,
    fetching: bool,
    isEmployee: bool,
    rejectedDelegations: array,
    setWaitingStatus: func,
    waitingDelegations: array
  };

  state = { title: "" };

  componentDidMount() {
    const waitingStatus = waitingStatusPerRole.find(item => item.roles.includes(this.props.activeRole));
    this.setState({ title: waitingStatus.title });
    this.props.setWaitingStatus(waitingStatus.status);

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
        title={this.state.title}
      />
    );
  }
}

const mapStateToProps = state => ({
  isEmployee: isUserEmployee(state),
  activeRole: getRoleActive(state),
  fetching: getDelegationFetching(state),
  delegations: getDelegations(state),
  rejectedDelegations: getRejectedDelegations(state),
  waitingDelegations: getWaitingDelegations(state)
});

const mapDispatchToProps = {
  fetchDelegations,
  fetchMyDelegations,
  setWaitingStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsPageContainer);
