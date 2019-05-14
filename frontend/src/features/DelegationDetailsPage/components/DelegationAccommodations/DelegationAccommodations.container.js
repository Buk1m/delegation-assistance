import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";

import DelegationAccommodations from "./DelegationAccommodations.component";
import { fetchAccommodations, sortAccommodationsByCheckInDate } from "../../../../actions/accommodations.actions";
import {
  getAccommodations,
  getAccommodationsFetching,
  getAccommodationsAdding,
  getAccommodationsSortOrder
} from "../../../../selectors/accommodations.selectors";

class DelegationAccommodationsContainer extends Component {
  static propTypes = {
    accommodations: array,
    addingAccommodation: bool,
    delegationId: string,
    fetchAccommodations: func,
    fetching: bool,
    sortAccommodationsByCheckInDate: func,
    sortOrder: string
  };

  _handleSortChange = () => {
    const order = this.props.sortOrder === "asc" ? "desc" : "asc";
    this.props.sortAccommodationsByCheckInDate(order);
  };

  componentDidMount = () => {
    this.props.fetchAccommodations(this.props.delegationId);
  };

  render() {
    return (
      <DelegationAccommodations
        accommodations={this.props.accommodations}
        addingAccommodation={this.props.addingAccommodation}
        delegationId={this.props.delegationId}
        fetching={this.props.fetching}
        handleSortChange={this._handleSortChange}
        sortOrder={this.props.sortOrder}
      />
    );
  }
}

const mapStateToProps = state => ({
  accommodations: getAccommodations(state),
  addingAccommodation: getAccommodationsAdding(state),
  fetching: getAccommodationsFetching(state),
  sortOrder: getAccommodationsSortOrder(state)
});

const mapDispatchToProps = {
  fetchAccommodations,
  sortAccommodationsByCheckInDate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationAccommodationsContainer);
