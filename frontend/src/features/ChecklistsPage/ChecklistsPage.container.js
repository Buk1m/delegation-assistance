import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import ChecklistsPage from "./ChecklistsPage.component";
import { fetchCountries } from "../../actions/countries.actions";
import { getCountries, getCountriesFetching } from "../../selectors/countries.selectors";

export class ChecklistsPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: []
    };
  }

  static propTypes = {
    countries: array,
    fetchCountries: func,
    fetching: bool
  };

  componentDidMount() {
    this.props.fetchCountries().then(() =>
      this.setState({
        countries: this._sortCountriesByName(this.props.countries)
      })
    );
  }

  _sortCountriesByName = countries =>
    countries.sort((a, b) => (a.countryName > b.countryName) - (a.countryName < b.countryName));

  _handleSubmit = values => this._handleSearch(values.search);

  _handleSearch = value => {
    if (value) {
      const updatedList = this.props.countries.filter(
        country => country.countryName.toLowerCase().search(value.toLowerCase()) !== -1
      );
      this.setState({ countries: updatedList });
    } else {
      this.setState({ countries: this.props.countries });
    }
  };

  render() {
    return (
      <ChecklistsPage
        countries={this.state.countries}
        countriesLength={this.state.countries.length}
        onSubmit={this._handleSubmit}
        handleSearch={this._handleSearch}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  countries: getCountries(state),
  fetching: getCountriesFetching(state)
});

const mapDispatchToProps = {
  fetchCountries
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsPageContainer);
