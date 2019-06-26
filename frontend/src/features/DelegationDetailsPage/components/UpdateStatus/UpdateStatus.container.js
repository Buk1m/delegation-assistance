import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object, number, string } from "prop-types";
import { withRouter } from "react-router-dom";

import UpdateStatus from "./UpdateStatus.component";
import { getRoleActive } from "../../../../selectors/user.selectors";
import { updateDelegationStatus } from "../../../../actions/delegations.actions";
import { confirmationModal } from "../../../../helpers/confirmationModal";
import { getDelegation } from "../../../../selectors/delegations.selectors";
import { updateStatusOptions } from "../../../../ui-restrictions/delegation.restriction";
import { delegationStatuses } from "../../../../config";

export class UpdateStatusContainer extends Component {
  static propTypes = {
    delegation: object,
    delegationId: number,
    history: object,
    roleActive: string,
    status: string,
    updateDelegationStatus: func,
    version: number
  };

  handleUpdateStatus = newStatus => {
    const version = this.props.version || this.props.delegation.version;
    const action = () =>
      this.props.updateDelegationStatus(this.props.delegationId, newStatus, version).then(() => {
        this._redirectToAllDelegations();
      });
    confirmationModal(
      "Change status",
      `This delegation will change status to "${delegationStatuses[newStatus]}"`,
      action
    );
  };

  _redirectToAllDelegations = () => this.props.history.push("/delegations/my");

  _getAvailableOptions = () => {
    const availableOptions = [];
    const status = this.props.status || this.props.delegation.status;
    updateStatusOptions.forEach(option => {
      if (option.roles.includes(this.props.roleActive) && option.status.includes(status)) {
        availableOptions.push(option);
      }
    });

    return availableOptions;
  };

  render() {
    return <UpdateStatus handleUpdateStatus={this.handleUpdateStatus} availableOptions={this._getAvailableOptions()} />;
  }
}

const mapStateToProps = state => ({
  roleActive: getRoleActive(state),
  delegation: getDelegation(state)
});

const mapDispatchToProps = {
  updateDelegationStatus
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateStatusContainer)
);
