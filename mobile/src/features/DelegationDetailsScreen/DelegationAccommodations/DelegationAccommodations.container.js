import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { array, bool, func, number, object } from "prop-types";

import { getAccommodationsFetching, getAccommodations } from "../../../selectors/delegationAccommodations.selectors";
import { fetchDelegationAccommodations } from "../../../actions/delegationAccommodations.actions";
import DelegationAccommodations from "./DelegationAccommodations.component";

class DelegationAccommodationsContainer extends PureComponent {
  static propTypes = {
    accommodations: array,
    delegationId: number,
    fetchDelegationAccommodations: func,
    fetching: bool,
    navigate: object
  };

  componentDidMount() {
    this.props.fetchDelegationAccommodations(this.props.delegationId);
  }

  render() {
    return (
      <DelegationAccommodations
        accommodations={this.props.accommodations}
        delegationId={this.props.delegationId}
        fetching={this.props.fetching}
        navigate={this.props.navigate}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: getAccommodationsFetching(state),
    accommodations: getAccommodations(state)
  };
};

const mapDispatchToProps = {
  fetchDelegationAccommodations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationAccommodationsContainer);
