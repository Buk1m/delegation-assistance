import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func } from "prop-types";

import DelegationsMyPage from "./DelegationsMyPage.component";
import { getDelegations } from "../../selectors/delegations.selectors";
import { fetchMyDelegations } from "../../actions/delegations.actions";
import { delegationsMyColumns } from "../../config/tableColumns";

class DelegationsMyPageContainer extends Component {
  static propTypes = {
    fetchMyDelegations: func,
    delegations: array
  };

  componentDidMount() {
    this.props.fetchMyDelegations();
  }

  render() {
    return <DelegationsMyPage delegations={this.props.delegations} columns={delegationsMyColumns} />;
  }
}

const mapStateToProps = state => ({
  delegations: getDelegations(state)
});

const mapDispatchToProps = {
  fetchMyDelegations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsMyPageContainer);
