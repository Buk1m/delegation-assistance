import React, { Component } from "react";
import { connect } from "react-redux";
import { toNumber } from "lodash";
import { func, number, object, string } from "prop-types";
import { toast } from "react-toastify";

import DelegationDetailsPage from "./DelegationDetailsPage.component";
import { deleteDelegation, fetchDelegation, updateDelegationStatus } from "../../actions/delegations.actions";
import { confirmationModal } from "../../helpers/confirmationModal";
import { getDelegation } from "../../selectors/delegations.selectors";
import { getRoleActive } from "../../selectors/user.selectors";
import { canEditDelegation } from "../../ui-restrictions/delegation.restriction";

class DelegationDetailsPageContainer extends Component {
  static propTypes = {
    delegation: object,
    delegationId: number,
    deleteDelegation: func,
    fetchDelegation: func,
    history: object,
    match: object,
    roleActive: string
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

  componentDidMount = () => {
    this.props.fetchDelegation(this.delegationId).catch(error => {
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
    });
  };

  _redirectToDelegationsPage = () => this.props.history.push("/delegations/my");

  _handleDelete = () => {
    const action = () => this.props.deleteDelegation(this.delegationId).then(this._redirectToDelegationsPage());
    toast.info("TODO: IDEMIA2019-23 Jako pracownik mogę usunąć moje delegacje - brakuje backendu");
    confirmationModal("Delete delegation", "This delegation will be deleted permanently.", action);
  };

  render() {
    return !this.invalidDelegationId ? (
      <DelegationDetailsPage
        delegationId={this.delegationId}
        delegation={this.delegation}
        handleDelete={this._handleDelete}
        canEditDelegation={canEditDelegation(this.props.delegation.status, this.props.roleActive)}
      />
    ) : null;
  }
}

const mapStateToProps = state => ({
  roleActive: getRoleActive(state),
  delegation: getDelegation(state)
});

const mapDispatchToProps = {
  deleteDelegation,
  fetchDelegation,
  updateDelegationStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationDetailsPageContainer);
