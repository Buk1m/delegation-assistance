import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import DelegationsManagePage from "./DelegationsManagePage.component";
import { getDelegations, getDelegationFetching } from "../../selectors/delegations.selectors";
import { fetchDelegations } from "../../actions/delegations.actions";
import { delegationsManageColumns } from "../../config/tableColumns";

class DelegationsManagePageContainer extends Component {
  static propTypes = {
    delegations: array,
    fetchDelegations: func,
    fetching: bool
  };

  componentDidMount() {
    this.props.fetchDelegations();
  }

  render() {
    return (
      <DelegationsManagePage
        delegations={this.props.delegations}
        columns={delegationsManageColumns}
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
  fetchDelegations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsManagePageContainer);
