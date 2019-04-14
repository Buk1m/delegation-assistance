import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func } from "prop-types";

import DelegationsManagePage from "./DelegationsManagePage.component";
import { getDelegations } from "../../selectors/delegations.selectors";
import { fetchDelegations } from "../../actions/delegations.actions";
import { delegationsManageColumns } from "../../config/tableColumns";

class DelegationsManagePageContainer extends Component {
  static propTypes = {
    fetchDelegations: func,
    delegations: array
  };

  componentDidMount() {
    this.props.fetchDelegations();
  }

  render() {
    return <DelegationsManagePage delegations={this.props.delegations} columns={delegationsManageColumns} />;
  }
}

const mapStateToProps = state => ({
  delegations: getDelegations(state)
});

const mapDispatchToProps = {
  fetchDelegations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsManagePageContainer);
