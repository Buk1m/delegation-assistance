import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object } from "prop-types";
import { withRouter } from "react-router-dom";

import DelegationCreatePage from "./DelegationCreatePage.component";
import { addNewDelegation } from "../../actions/delegations.actions";
import { fetchCountries } from "../../actions/countries.actions";
import { formatToISO } from "../../helpers/formatters";
import { getCountriesTypeahead, getCountriesFetching } from "../../selectors/countries.selectors";
import handleFormErrors from "../../helpers/handlers/errorHandler";

class DelegationCreatePageContainer extends Component {
  static propTypes = {
    addNewDelegation: func,
    countries: array,
    countriesFetching: bool,
    fetchCountries: func,
    history: object
  };

  _redirectToDelegationsPage = () => this.props.history.push("/delegations/my");

  handleCreateDelegation = values => {
    const delegation = {
      meals: {},
      ...values,
      destinationCountryId: values.destinationCountryId.value,
      startDate: formatToISO(values.startDate),
      endDate: formatToISO(values.endDate)
    };

    if (values.diet) {
      delegation.diet = { perDiem: values.diet.perDiem, currency: values.diet.currency.value };
    }

    return this.props
      .addNewDelegation(delegation)
      .then(() => {
        this._redirectToDelegationsPage();
      })
      .catch(err => {
        handleFormErrors(err);
      });
  };

  render() {
    return (
      <DelegationCreatePage
        countries={this.props.countries}
        countriesFetching={this.props.countriesFetching}
        onSelectOpen={this.props.fetchCountries}
        onSubmit={this.handleCreateDelegation}
      />
    );
  }
}

const mapStateToProps = state => ({
  countries: getCountriesTypeahead(state),
  countriesFetching: getCountriesFetching(state)
});

const mapDispatchToProps = {
  addNewDelegation,
  fetchCountries
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DelegationCreatePageContainer)
);
