import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDelegationChecklist } from "../../actions/delegationChecklist.actions";
import {
  getDelegationChecklistName,
  getTasks
} from "../../selectors/delegationChecklist.selectors";
import DelegationChecklistScreen from "./DelegationChecklistScreen.component";

class DelegationChecklistScreenContainer extends Component {
  static navigationOptions = {
    title: "Checklist"
  };

  componentDidMount = () => {
    const delegationId = this.props.navigation.getParam("delegationId");
    this.props.fetchDelegationChecklist(delegationId);
  };

  changeCheckboxState = id => {
    //TODO: handle checkbox state change if necessary
  };

  _addKeysToItems = items => {
    //TODO: replace index with taskId when requirements will change
    return items.map((item, index) => {
      return Object.assign(item, { key: `${index}` });
    });
  };

  render() {
    return (
      <DelegationChecklistScreen
        title={this.props.checklistName}
        changeCheckboxState={this.changeCheckboxState}
        checklist={this._addKeysToItems(this.props.tasks)}
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
