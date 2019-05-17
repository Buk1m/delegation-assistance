import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { withRouter } from "react-router-dom";

import DelegationCreatePage from "./DelegationCreatePage.component";
import { addNewDelegation } from "../../actions/delegations.actions";
import { codes } from "iso-country-codes";

class DelegationCreatePageContainer extends Component {
  static propTypes = {
    addNewDelegation: func,
    history: object
  };

  countriesISOCodes = codes.map(code => {
    return { label: code.name, value: code.alpha3 };
  });

  _redirectToDelegationsPage = () => this.props.history.push("/delegations/my");

  handleCreateDelegation = values => {
    const delegation = {
      ...values,
      destinationCountry: values.destinationCountry.value,
      startDate: values.startDate.toISOString().split(".")[0],
      endDate: values.endDate.toISOString().split(".")[0],
      diet: { perDiem: values.diet.perDiem, currency: values.diet.currency.value }
    };

    return this.props.addNewDelegation(delegation).then(() => {
      this._redirectToDelegationsPage();
    });
  };

  render() {
    return <DelegationCreatePage onSubmit={this.handleCreateDelegation} countriesISOCodes={this.countriesISOCodes} />;
  }
}

const mapDispatchToProps = {
  addNewDelegation
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(DelegationCreatePageContainer)
);
