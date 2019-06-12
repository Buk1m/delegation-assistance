import React, { Component } from "react";
import { connect } from "react-redux";
import { toNumber } from "lodash";
import { object, func, number } from "prop-types";
import { toast } from "react-toastify";

import DelegationDetailsPage from "./DelegationDetailsPage.component";
import { deleteDelegation, updateDelegationStatus } from "../../actions/delegations.actions";
import { confirmationModal } from "../../helpers/confirmationModal";
import { getDelegation } from "../../selectors/delegations.selectors";
import { delegationStatusCodes } from "../../config";

class DelegationDetailsPageContainer extends Component {
  static propTypes = {
    delegation: object,
    delegationId: number,
    deleteDelegation: func,
    history: object,
    match: object,
    updateDelegationStatus: func
  };

  constructor(props) {
    super(props);
    this.delegationId = this.props.match.params.delegationId;

    if (isNaN(parseInt(this.delegationId))) {
      toast.error(`Invalid delegation id: "${this.delegationId}"`);
      this.invalidDelegationId = true;

      this._redirectToDelegationsPage();
    }
    this.delegationId = toNumber(this.delegationId);
  }

  _redirectToDelegationsPage = () => this.props.history.push("/delegations/my");

  _handleDelete = () => {
    const action = () => this.props.deleteDelegation(this.delegationId).then(this._redirectToDelegationsPage());
    toast.info("TODO: IDEMIA2019-23 Jako pracownik mogę usunąć moje delegacje - brakuje backendu");
    confirmationModal("Delete delegation", "This delegation will be deleted permanently.", action);
  };

  _handleSendToManager = () => {
    const action = () =>
      this.props
        .updateDelegationStatus(this.delegationId, delegationStatusCodes.PREPARED, this.props.delegation.version)
        .then(() => {
          this._redirectToDelegationsPage();
        });
    confirmationModal("Send delegatiion", "This delegation will be sent to travel manager.", action);
  };

  render() {
    return !this.invalidDelegationId ? (
      <DelegationDetailsPage
        delegationId={this.delegationId}
        handleDelete={this._handleDelete}
        handleSendToManager={this._handleSendToManager}
        status={this.props.delegation.status}
      />
    ) : null;
  }
}

const mapStateToProps = state => ({
  delegation: getDelegation(state)
});

const mapDispatchToProps = {
  deleteDelegation,
  updateDelegationStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationDetailsPageContainer);
