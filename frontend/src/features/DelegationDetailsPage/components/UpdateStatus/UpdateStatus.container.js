import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { func, number, object, string } from "prop-types";
import { withRouter } from "react-router-dom";

import UpdateStatus from "./UpdateStatus.component";
import { updateDelegationStatus } from "../../../../actions/delegations.actions";
import { confirmationModal } from "../../../../helpers/confirmationModal";
import { getDelegation } from "../../../../selectors/delegations.selectors";
import { delegationStatuses } from "../../../../config";
import { getAvailableOptions } from "../../../../ui-restrictions/delegation.restriction";
import { getRoleActive } from "../../../../selectors/user.selectors";

export class UpdateStatusContainer extends PureComponent {
  static propTypes = {
    delegation: object,
    delegationId: number,
    roleActive: string,
    updateDelegationStatus: func,
    version: number
  };

  handleUpdateStatus = newStatus => {
    const version = this.props.version || this.props.delegation.version;
    const action = () => this.props.updateDelegationStatus(this.props.delegationId, newStatus, version);
    confirmationModal(
      "Change status",
      `This delegation will change status to "${delegationStatuses[newStatus]}"`,
      action
    );
  };

  render() {
    return (
      <UpdateStatus
        handleUpdateStatus={this.handleUpdateStatus}
        availableOptions={getAvailableOptions(this.props.delegation.status, this.props.roleActive)}
      />
    );
  }
}

const mapStateToProps = state => ({
  delegation: getDelegation(state),
  roleActive: getRoleActive(state)
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
