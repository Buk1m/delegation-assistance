import React, { Component } from "react";
import { connect } from "react-redux";
import { number, object, func } from "prop-types";

import DelegationViewPage from "./DelegationViewPage.component";
import { getDelegation } from "../../selectors/delegations.selectors";
import { fetchDelegation } from "../../actions/delegations.actions";

class DelegationViewPageContainer extends Component {
  static propTypes = {
    match: object,
    delegationId: number,
    fetchDelegation: func,
    delegation: object
  };

  constructor(props) {
    super(props);

    this.delegationId = this.props.match.params.delegationId;
  }

  componentDidMount = () => {
    this.props.fetchDelegation(this.delegationId);
  };

  render() {
    return (
      <DelegationViewPage
        destinationLocation={
          this.props.delegation ? this.props.delegation.destinationLocation : ""
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  delegation: getDelegation(state)
});

const mapDispatchToProps = {
  fetchDelegation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationViewPageContainer);
