import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import CreateDelegationPage from "./CreateDelegationPage.component";
import { addNewDelegation } from "../../actions/delegations.actions";
import { codes } from "iso-country-codes";

class CreateDelegationPageContainer extends Component {
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
    this.props
      .addNewDelegation(delegation)
      .then(response => {
        if (response.status === 201) window.location.href = "/delegations";
      })
      .catch(err => {
        //TODO: handle response error with modal
        window.alert(err);
        this.setState({ errors: "Error while adding new delegaion." });
      });
  };

  render() {
    return (
      <CreateDelegationPage
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
)(CreateDelegationPageContainer);