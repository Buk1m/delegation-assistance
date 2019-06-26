import React, { Component } from "react";
import { connect } from "react-redux";
import { toNumber } from "lodash";
import { object, func, number } from "prop-types";
import { toast } from "react-toastify";

import DelegationDetailsPage from "./DelegationDetailsPage.component";
import { deleteDelegation, updateDelegationStatus } from "../../actions/delegations.actions";
import { confirmationModal } from "../../helpers/confirmationModal";

class DelegationDetailsPageContainer extends Component {
  static propTypes = {
    delegationId: number,
    deleteDelegation: func,
    history: object,
    match: object
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

  render() {
    return !this.invalidDelegationId ? (
      <DelegationDetailsPage delegationId={this.delegationId} handleDelete={this._handleDelete} />
    ) : null;
  }
}

const mapDispatchToProps = {
  deleteDelegation,
  updateDelegationStatus
};

export default connect(
  null,
  mapDispatchToProps
)(DelegationDetailsPageContainer);
