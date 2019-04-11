import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { getActivities, getDelegationId } from '../../selectors/delegationChecklist.selectors.js';
import { fetchChecklist } from '../../actions/delegationChecklist.action';
import DelegationChecklistPage from './DelegationChecklistPage.component';
import mockChecklist from '../../config/delegationChecklist.data';

class DelegationChecklistPageContainer extends Component {

  static propTypes = {
    fetchChecklist: func
  };

  constructor(props) {
    super(props);
    this.state = {
      delegationId: this.props.match.params.delegationId,
      activities: []
    };
  }

  componentDidMount() {
    const id = this.state.delegationId;
    if(id === ":delegationId"){
      this.setState({delegationId: "Select delegation from Delegations to show checklist."});
    } else {
      //this.props.fetchChecklist(this.props.match.params.delegationId); //TODO: Jak bedzie backend checklist dla delegacji to polaczyc sie i poprawnie wyswietlac dane
      this.setState({
        activities: mockChecklist
      });
    }
  }

  handleCheck = (event) => {
    const activities = [...this.state.activities];
    activities.filter(activity => activity.id === event.target.id).map(activity => {
      activity.isDone = event.target.checked;
      return null;
    });
    this.setState({activities: activities});
  };

  render() {
    return <DelegationChecklistPage activities={this.state.activities} delegationID={this.state.delegationId}
                                    handleCheck={this.handleCheck}/>;
  }
}

const mapStateToProps = state => {
  return {
    delegationId: getDelegationId(state),
    activities: getActivities(state)
  };
};

const mapDispatchToProps = {
  fetchChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationChecklistPageContainer);