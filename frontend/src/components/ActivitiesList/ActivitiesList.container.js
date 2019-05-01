import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, string, array } from "prop-types";

import { getActivities, getActivitiesFetching } from "../../selectors/delegationChecklist.selectors.js";
import { fetchChecklist } from "../../actions/delegationChecklist.action";
import ActivitiesList from "./ActivitiesList.component.js";

export class ActivitiesListContainer extends Component {
  static propTypes = {
    delegationId: string,
    activities: array,
    fetching: bool,
    fetchChecklist: func,
  };

  componentDidMount() {
    this.props.fetchChecklist(this.props.delegationId);
  }

  handleCheck = () => {
    // TODO: add proper handling with backend comunication
    // IDEMIA2019-18 Jako pracownik mogę oznaczyć zadania z checklisty
  };

  render() {
    return (
      <ActivitiesList activities={this.props.activities} handleCheck={this.handleCheck} loading={this.props.fetching} />
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
  fetchChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesListContainer);
