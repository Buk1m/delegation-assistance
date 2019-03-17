import React, { Component } from "react";
import { connect } from "react-redux";

import ExpensesPage from "./ExpensesPage.component";

class ExpensesPageContainer extends Component {
  render() {
    return <ExpensesPage />;
  }
}

export default connect(
  null,
  null
)(ExpensesPageContainer);
