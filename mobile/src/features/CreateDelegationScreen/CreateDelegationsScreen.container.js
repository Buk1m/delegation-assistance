import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewDelegation } from "../../actions/delegations.actions";
import { array, bool, func } from "prop-types";

import { fetchCountries } from "../../actions/countries.actions";
import { getCountriesTypeahead, getCountriesFetching } from "../../selectors/countries.selectors";
import CreateDelegationsScreen from "./CreateDelegationsScreen.component";

class CreateDelegationsScreenContainer extends Component {
  static propTypes = {
    addNewDelegation: func,
    countries: array,
    countriesFetching: bool,
    fetchCountries: func
  };

  static navigationOptions = {
    title: "Create Delegation"
  };

  componentDidMount() {
    this.props.fetchCountries();
  }

  handleSubmit = values => {
    return this.props.addNewDelegation(values).then(() => {
      this.props.navigation.goBack();
    });
  };

  render() {
    return (
      <CreateDelegationsScreen
        onSubmit={this.handleSubmit}
        countries={this.props.countries}
        countriesFetching={this.props.countriesFetching}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDelegationsScreenContainer);
