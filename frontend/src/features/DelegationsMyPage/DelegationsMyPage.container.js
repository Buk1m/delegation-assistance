import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import DelegationsMyPage from "./DelegationsMyPage.component";
import { getDelegations, getDelegationFetching } from "../../selectors/delegations.selectors";
import { fetchMyDelegations } from "../../actions/delegations.actions";
import { delegationsMyColumns } from "../../config/tableColumns";

class DelegationsMyPageContainer extends Component {
  static propTypes = {
    delegations: array,
    fetchMyDelegations: func,
    fetching: bool
  };

  componentDidMount() {
    this.props.fetchMyDelegations();
  }

  render() {
    return (
      <DelegationsMyPage
        delegations={this.props.delegations}
        columns={delegationsMyColumns}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  delegations: getDelegations(state),
  fetching: getDelegationFetching(state)
});

const mapDispatchToProps = {
  fetchMyDelegations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsMyPageContainer);
