import React, { Component } from "react";
import { connect } from "react-redux";
import { func,array } from "prop-types";

import ExpensesSettingsPage from "./ExpensesSettingsPage.component";
import { getExchangeRates } from "../../selectors/expenses.selectors";
import { fetchExchangeRates } from "../../actions/expenses.actions";

class ExpensesSettingsPageContainer extends Component {
  fetchExchangeRates = () => {
    this.props.fetchExchangeRates();
  }

  componentDidMount = () => {
    this.props.fetchExchangeRates();
  };

  render() {
    return (
      <ExpensesSettingsPage fetchRates={this.fetchExchangeRates}
          exchangeRates={this.props.exchangeRates}
          test="Czy dziala przekazywanie przez propsy? Powinno" />
    );
  }
}

const mapStateToProps = state => {
  return {
    exchangeRates: getExchangeRates(state)
  };
};

const mapDispatchToProps = {
  fetchExchangeRates: func,
  exchangeRates: array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesSettingsPageContainer);
