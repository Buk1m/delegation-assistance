import React, { Component } from "react";
import { connect } from "react-redux";

import ExpensesScreen from "./ExpensesScreen.component";

class ExpensesScreenContainer extends Component {
  static navigationOptions = {
    title: "Expenses"
  };

  render() {
    return <ExpensesScreen />;
  }
}

export default connect(
  null,
  null
)(ExpensesScreenContainer);
