import React, { Component } from "react";
import { connect } from "react-redux";
import { number, func, string } from "prop-types";

import ExpensesModalForm from "./ExpensesModalForm.component";
import { addExpense } from "../../../../../actions/expenses.actions";

export class ExpensesModalFormContainer extends Component {
  static propTypes = {
    addExpense: func,
    delegationId: number,
    onTableChange: func,
    page: number,
    sizePerPage: number,
    sortField: string,
    sortOrder: string
  };

  _handleSubmit = values =>
    this.props.addExpense(this.props.delegationId, values).then(() =>
      this.props.onTableChange("sort", {
        page: this.props.page,
        sizePerPage: this.props.sizePerPage,
        sortOrder: this.props.sortOrder,
        sortField: this.props.sortField
      })
    );

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
