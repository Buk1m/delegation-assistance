import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { array, bool, func, number, object } from "prop-types";

import { getFlightsFetching, getFlights } from "../../../selectors/delegationFlights.selectors";
import { fetchDelegationFlights } from "../../../actions/delegationFlights.actions";
import DelegationFlights from "./DelegationFlights.component";

class DelegationFlightsContainer extends PureComponent {
  static propTypes = {
    delegationId: number,
    fetchDelegationFlights: func,
    fetching: bool,
    flights: array,
    navigate: object
  };

  componentDidMount() {
    this.props.fetchDelegationFlights(this.props.delegationId);
  }

  render() {
    return (
      <DelegationFlights
        delegationId={this.props.delegationId}
        flights={this.props.flights}
        fetching={this.props.fetching}
        navigate={this.props.navigate}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: getFlightsFetching(state),
    flights: getFlights(state)
  };
};

const mapDispatchToProps = {
  fetchDelegationFlights
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationFlightsContainer);
