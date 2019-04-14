import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import DelegationCreatePage from "./DelegationCreatePage.component";
import { addNewDelegation } from "../../actions/delegations.actions";
import { codes } from "iso-country-codes";

class DelegationCreatePageContainer extends Component {
  static propTypes = {
    addNewDelegation: func
  };

  countriesISOCodes = codes.map(code => {
    return { label: code.name, value: code.alpha3 };
  });

  handleCreateDelegation = values => {
    const delegation = {
      ...values,
      destinationCountryISO3: values.destinationCountryISO3.value,
      startDate: values.startDate.toISOString().split(".")[0],
      endDate: values.endDate.toISOString().split(".")[0]
    };
    return this.props
      .addNewDelegation(delegation)
      .then(() => (window.location.href = "/delegations/my"));
  };

  render() {
    return (
      <DelegationCreatePage
        onSubmit={this.handleCreateDelegation}
        countriesISOCodes={this.countriesISOCodes}
      />
    );
  }
}

const mapDispatchToProps = {
  addNewDelegation
};

export default connect(
  null,
  mapDispatchToProps
)(DelegationCreatePageContainer);
