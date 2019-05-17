import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string, number } from "prop-types";

import DelegationFlights from "./DelegationFlights.component";
import {
  getFlights,
  getFlightsFetching,
  getFlightsSortOrder,
  getFlightsAdding
} from "../../../../selectors/flights.selectors";
import { fetchFlights, sortFlightsByDepartureDate } from "../../../../actions/flights.actions";

class DelegationFlightsContainer extends Component {
  static propTypes = {
    addingFlight: bool,
    delegationId: number,
    fetchFlights: func,
    fetching: bool,
    flights: array,
    sortFlightsByDepartureDate: func,
    sortOrder: string
  };

  _handleSortChange = () => {
    const order = this.props.sortOrder === "asc" ? "desc" : "asc";
    this.props.sortFlightsByDepartureDate(order);
  };

  componentDidMount = () => {
    this.props.fetchFlights(this.props.delegationId);
  };

  render() {
    return (
      <DelegationFlights
        addingFlight={this.props.addingFlight}
        delegationId={this.props.delegationId}
        fetching={this.props.fetching}
        flights={this.props.flights}
        handleSortChange={this._handleSortChange}
        sortOrder={this.props.sortOrder}
      />
    );
  }
}

const mapStateToProps = state => ({
  addingFlight: getFlightsAdding(state),
  fetching: getFlightsFetching(state),
  flights: getFlights(state),
  sortOrder: getFlightsSortOrder(state)
});

const mapDispatchToProps = {
  fetchFlights,
  sortFlightsByDepartureDate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationFlightsContainer);
