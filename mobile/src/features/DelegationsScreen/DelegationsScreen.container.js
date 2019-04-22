import React, { Component } from "react";
import { connect } from "react-redux";
import { func, bool, array } from "prop-types";

import {
  fetchMyDelegations,
  setDelegations,
  setTempDelegations,
  setDatesAreValid,
  setIsSortFilterPanelCollapsed
} from "../../actions/delegations.actions";
import {
  getDelegations,
  getTempDelegations,
  getDatesAreValid,
  getIsSortFilterPanelCollapsed
} from "../../selectors/delegations.selectors";
import DelegationsScreen from "./DelegationsScreen.component";

const sorters = {
  DateFrom: function(a, b) {
    return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
  },
  DateTo: function(a, b) {
    return a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0;
  },
  Country: function(a, b) {
    return a.country < b.country ? -1 : a.country > b.country ? 1 : 0;
  },
  City: function(a, b) {
    return a.destinationLocation < b.destinationLocation
      ? -1
      : a.destinationLocation > b.destinationLocation
      ? 1
      : 0;
  },
  Status: function(a, b) {
    return a.status < b.status ? -1 : a.status > b.status ? 1 : 0;
  }
};

class DelegationsScreenContainer extends Component {
  static propTypes = {
    fetchMyDelegations: func,
    setDatesAreValid: func,
    setTempDelegations: func,
    setIsSortFilterPanelCollapsed: func,
    delegations: array,
    tempDelegations: array,
    datesAreValid: bool,
    isSortFilterPanelCollapsed: bool
  };

  static navigationOptions = {
    title: "Delegations"
  };

  componentDidMount() {
    this.props.fetchMyDelegations();
  }

  filter = values => {
    const { startDate, endDate, delegationStatus } = values;

    if (this._datesAreValid(startDate, endDate)) {
      this.props.setDatesAreValid(true);
      const startDateTime = this._getTime(startDate);
      const endDateTime = this._getTime(endDate);
      const status = delegationStatus === undefined ? "" : delegationStatus;

      const filteredDelegations = this.props.delegations.filter(d => {
        return (
          this._getTime(d.startDate) >= startDateTime &&
          this._getTime(d.endDate) <= endDateTime &&
          d.status.includes(status)
        );
      });
      this.props.setTempDelegations(filteredDelegations);
    } else {
      this.props.setDatesAreValid(false);
    }
  };

  sortItems = values => {
    const { sortBy } = values;
    const delegations = [...this.props.tempDelegations];
    const sortedDelegations = delegations.sort(sorters[sortBy]);

    this.props.setTempDelegations(sortedDelegations);
  };

  changeIsSortFilterPanelCollapsed = () => {
    this.props.setIsSortFilterPanelCollapsed(
      !this.props.isSortFilterPanelCollapsed
    );
  };

  _getTime = date => {
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    return dateOnly.getTime();
  };

  _datesAreValid = (startDate, endDate) => {
    return startDate < endDate;
  };

  render() {
    return (
      <DelegationsScreen
        delegations={this.props.tempDelegations}
        datesAreValid={this.props.datesAreValid}
        isSortFilterPanelCollapsed={this.props.isSortFilterPanelCollapsed}
        changeIsSortFilterPanelCollapsed={this.changeIsSortFilterPanelCollapsed}
        filter={this.filter}
        sortItems={this.sortItems}
        navigate={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    delegations: getDelegations(state),
    tempDelegations: getTempDelegations(state),
    datesAreValid: getDatesAreValid(state),
    isSortFilterPanelCollapsed: getIsSortFilterPanelCollapsed(state)
  };
};

const mapDispatchToProps = {
  fetchMyDelegations,
  setDelegations,
  setTempDelegations,
  setDatesAreValid,
  setIsSortFilterPanelCollapsed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsScreenContainer);
