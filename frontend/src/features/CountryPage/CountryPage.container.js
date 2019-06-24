import React, { Component } from "react";
import { connect } from "react-redux";
import { array, string, bool, object, func } from "prop-types";

import CountryPage from "./CountryPage.component";
import { fetchCountry } from "../../actions/country.actions";
import {
  getCountryFetching,
  getCountryName,
  getCountryNativeName,
  getCountryRegion,
  getCountryCapital,
  getCountryCallingCodes,
  getCountryCurrencies,
  getCountryTimezones,
  getCountryFlag
} from "../../selectors/country.selectors";
export class CountryPageContainer extends Component {
  static propTypes = {
    callingCodes: array,
    capital: string,
    currencies: array,
    fetchCountry: func,
    fetching: bool,
    flag: string,
    match: object,
    name: string,
    nativeName: string,
    region: string,
    timezones: array
  };

  constructor(props) {
    super(props);

    this.countryCode = this.props.match.params.countryCode.toUpperCase();
  }

  componentDidMount = () => {
    this.props.fetchCountry(this.countryCode);
  };

  render() {
    return (
      <CountryPage
        image={this.props.flag}
        fetching={this.props.fetching}
        name={this.props.name}
        nativeName={this.props.nativeName}
        region={this.props.region}
        capital={this.props.capital}
        callingCodes={this.props.callingCodes}
        currencies={this.props.currencies}
        timezones={this.props.timezones}
      />
    );
  }
}

const mapStateToProps = state => ({
  fetching: getCountryFetching(state),
  name: getCountryName(state),
  nativeName: getCountryNativeName(state),
  region: getCountryRegion(state),
  capital: getCountryCapital(state),
  callingCodes: getCountryCallingCodes(state),
  currencies: getCountryCurrencies(state),
  timezones: getCountryTimezones(state),
  flag: getCountryFlag(state)
});

const mapDispatchToProps = {
  fetchCountry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryPageContainer);
