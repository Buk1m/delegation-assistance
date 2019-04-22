import React, { Component } from "react";
import { connect } from "react-redux";
import { func, string, array } from "prop-types";

import { fetchDelegationChecklist } from "../../actions/delegationChecklist.actions";
import {
  getDelegationChecklistName,
  getTasks
} from "../../selectors/delegationChecklist.selectors";
import DelegationChecklistScreen from "./DelegationChecklistScreen.component";

class DelegationChecklistScreenContainer extends Component {
  static propTypes = {
    fetchDelegationChecklist: func,
    checklistName: string,
    tasks: array
  };

  static navigationOptions = {
    title: "Checklist"
  };

  componentDidMount = () => {
    const delegationId = this.props.navigation.getParam("delegationId");
    this.props.fetchDelegationChecklist(delegationId);
  };

  // eslint-disable-next-line no-unused-vars
  changeCheckboxState = id => {
    //TODO: handle checkbox state change if necessary
  };

  render() {
    return (
      <DelegationChecklistScreen
        title={this.props.checklistName}
        changeCheckboxState={this.changeCheckboxState}
        checklist={this.props.tasks}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    checklistName: getDelegationChecklistName(state),
    tasks: getTasks(state)
  };
};

const mapDispatchToProps = {
  fetchDelegationChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationChecklistScreenContainer);
