import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, object, number } from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";

import {
  getDelegationChecklist,
  getDelegationChecklistFetching,
  getDelegationChecklistUpdating
} from "../../selectors/delegationChecklist.selectors.js";
import { fetchDelegationChecklist, updateDelegationChecklist } from "../../actions/delegationChecklist.action";
import ActivitiesList from "./ActivitiesList.component.js";

export class ActivitiesListContainer extends Component {
  static propTypes = {
    delegationChecklist: object,
    delegationId: number,
    fetchDelegationChecklist: func,
    fetching: bool,
    updateDelegationChecklist: func,
    updating: bool
  };

  state = {
    delegationChecklist: {
      activities: []
    }
  };

  componentDidMount() {
    this.props.fetchDelegationChecklist(this.props.delegationId).then(() => {
      this.setState({ delegationChecklist: this.props.delegationChecklist });
    });
  }

  _debouceUpdateChecklist = debounce(
    activities =>
      this.props
        .updateDelegationChecklist(this.props.delegationId, activities)
        .finally(() => this.setState({ delegationChecklist: this.props.delegationChecklist })),
    800
  );

  _handleCheck = activitiy => {
    const activitiesCopy = cloneDeep(this.state.delegationChecklist.activities);
    activitiesCopy.find(ac => ac.id === activitiy.id).isDone = !activitiy.isDone;
    const checklistCopy = { activities: activitiesCopy, version: this.state.delegationChecklist.version };
    this.setState({ delegationChecklist: checklistCopy }, () =>
      this._debouceUpdateChecklist(this.state.delegationChecklist)
    );
  };

  render() {
    return (
      <ActivitiesList
        activities={this.state.delegationChecklist.activities}
        handleCheck={this._handleCheck}
        loading={this.props.fetching}
        updating={this.props.updating}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    delegationChecklist: getDelegationChecklist(state),
    fetching: getDelegationChecklistFetching(state),
    updating: getDelegationChecklistUpdating(state)
  };
};

const mapDispatchToProps = {
  fetchDelegationChecklist,
  updateDelegationChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesListContainer);
