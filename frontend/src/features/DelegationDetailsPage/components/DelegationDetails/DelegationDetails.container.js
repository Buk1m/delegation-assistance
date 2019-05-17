import React, { Component } from "react";
import { connect } from "react-redux";
import { number, object, func, bool } from "prop-types";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import { getFormatedDelegation, getDelegationFetching } from "../../../../selectors/delegations.selectors";
import { fetchDelegation } from "../../../../actions/delegations.actions";
import DelegationDetails from "./DelegationDetails.component";

class DelegationDetailsContainer extends Component {
  static propTypes = {
    delegation: object,
    delegationId: number,
    fetchDelegation: func,
    fetching: bool,
    history: object
  };
  editMode = false;

  _redirectToDelegationsPage = () => this.props.history.push("/delegations");

  componentDidMount = () => {
    this.props.fetchDelegation(this.props.delegationId).then(
      () => {},
      error => {
        if (!error.response) {
          toast.error(error.message);
          return;
        }
        switch (error.response.status) {
          case 401:
            toast.error("Unauthorized.");
            break;
          case 404:
            toast.error(`Delegation with id "${this.delegationId}" not found.`);
            break;
          default:
            toast.error(`Unexpected error.`);
            break;
        }
        this._redirectToDelegationsPage();
      }
    );
  };

  render() {
    return (
      <DelegationDetails
        delegation={this.props.delegation}
        initialValues={this.props.delegation}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  delegation: getFormatedDelegation(state),
  fetching: getDelegationFetching(state)
});

const mapDispatchToProps = {
  fetchDelegation
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DelegationDetailsContainer)
);
