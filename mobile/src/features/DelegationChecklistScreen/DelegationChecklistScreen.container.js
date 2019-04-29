import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, array } from "prop-types";

import { fetchDelegationChecklist } from "../../actions/delegationChecklist.actions";
import {
  getDelegationId,
  getActivities
} from "../../selectors/delegationChecklist.selectors";
import DelegationChecklistScreen from "./DelegationChecklistScreen.component";

class DelegationChecklistScreenContainer extends Component {
  static propTypes = {
    fetchDelegationChecklist: func,
    delegationId: number,
    activities: array
  };

  static navigationOptions = {
    title: "Delegation Checklist"
  };

  componentDidMount = () => {
    const delegationId = this.props.navigation.getParam("delegationId");
    this.props.fetchDelegationChecklist(delegationId);
  };

  // eslint-disable-next-line no-unused-vars
  changeCheckboxState = id => {
    //TODO: handle checkbox state change -> https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-18
  };

  render() {
    return (
      <DelegationChecklistScreen
        delegationId={this.props.delegationId}
        changeCheckboxState={this.changeCheckboxState}
        activities={this.props.activities}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    delegationId: getDelegationId(state),
    activities: getActivities(state)
  };
};

const mapDispatchToProps = {
  fetchDelegationChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationChecklistScreenContainer);
