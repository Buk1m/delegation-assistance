import React, { Component } from "react";
import { connect } from "react-redux";
import { string, object, func, bool } from "prop-types";
import { toast } from "react-toastify";

import DelegationDetailsPage from "./DelegationDetailsPage.component";
import { getActivities, getActivitiesFetching } from "../../selectors/delegationChecklist.selectors";
import { fetchChecklist } from "../../actions/delegationChecklist.action";
import { deleteDelegation } from "../../actions/delegations.actions";
import { confirmationModal } from "../../helpers/confirmationModal";

class DelegationDetailsPageContainer extends Component {
  static propTypes = {
    delegationId: string,
    deleteDelegation: func,
    fetchingActivities: bool,
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
  }

  _redirectToDelegationsPage = () => this.props.history.push("/delegations");

  handleDelete = () => {
    const action = () => this.props.deleteDelegation(this.delegationId).then(this._redirectToDelegationsPage());
    toast.info("TODO: IDEMIA2019-23 Jako pracownik mogę usunąć moje delegacje - brakuje backendu");
    confirmationModal("Delete delegation", "This delegation will be deleted permanently.", action);
  };

  handleSend = () => {
    const action = () =>
      toast.info("TODO: IDEMIA2019-25 Jako pracownik mogę wysłać delegację do Travel Managera w celu akceptacji");
    confirmationModal("Send delegatiion", "This delegation will be sent to travel manager.", action);
  };

  render() {
    return !this.invalidDelegationId ? (
      <DelegationDetailsPage
        delegationId={this.delegationId}
        fetchingActivities={this.props.fetchingActivities}
        onDelete={this.handleDelete}
        onSend={this.handleSend}
      />
    ) : null;
  }
}

const mapStateToProps = state => ({
  tasks: getActivities(state),
  fetchingActivities: getActivitiesFetching(state)
});

const mapDispatchToProps = {
  fetchChecklist,
  deleteDelegation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationDetailsPageContainer);
