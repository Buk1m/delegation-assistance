import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, number } from "prop-types";

import { fetchDelegationChecklist } from "../../../actions/delegationChecklist.actions";
import { getActivities, getActivitiesFetching } from "../../../selectors/delegationChecklist.selectors";
import DelegationChecklist from "./DelegationChecklist.component";

class DelegationChecklistContainer extends Component {
  static propTypes = {
    activities: array,
    delegationId: number,
    fetchDelegationChecklist: func,
    fetching: bool
  };

  // eslint-disable-next-line no-unused-vars
  changeCheckboxState = id => {
    //TODO: handle checkbox state change -> https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-18
  };

  componentDidMount = () => {
    this.props.fetchDelegationChecklist(this.props.delegationId);
  };

  render() {
    return (
      <DelegationChecklist
        activities={this.props.activities}
        changeCheckboxState={this.changeCheckboxState}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: getActivities(state),
    fetching: getActivitiesFetching(state)
  };
};

const mapDispatchToProps = {
  fetchDelegationChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationChecklistContainer);
