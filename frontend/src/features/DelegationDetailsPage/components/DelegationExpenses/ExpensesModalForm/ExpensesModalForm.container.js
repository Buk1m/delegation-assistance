import React, { Component } from "react";
import { connect } from "react-redux";
import { number, func } from "prop-types";

import ExpensesModalForm from "./ExpensesModalForm.component";
import { addExpense } from "../../../../../actions/expenses.actions";

export class ExpensesModalFormContainer extends Component {
  static propTypes = {
    addExpense: func,
    delegationId: number
  };

  _handleSubmit = values => this.props.addExpense(this.props.delegationId, values);

  render() {
    return <ExpensesModalForm onSubmit={this._handleSubmit} />;
  }
}

const mapDispatchToProps = {
  addExpense
};

export default connect(
  null,
  mapDispatchToProps
)(ExpensesModalFormContainer);
