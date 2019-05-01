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

  _redirectToDelegationsPage = () => this.props.history.push("/delegations");

  handleCreateDelegation = values => {
    const delegation = {
      ...values,
      destinationCountryISO3: values.destinationCountryISO3.value,
      startDate: values.startDate.toISOString().split(".")[0],
      endDate: values.endDate.toISOString().split(".")[0]
    };
    return this.props.addNewDelegation(delegation).then(response => {
      if (response.status === 201) {
        this._redirectToDelegationsPage();
      }
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
