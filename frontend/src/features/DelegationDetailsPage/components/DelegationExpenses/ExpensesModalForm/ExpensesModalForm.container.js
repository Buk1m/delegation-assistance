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

  state = {
    files: []
  };

  _handleSubmit = values => {
    values.attachments = { ...this.state.files };
    return this.props.addExpense(this.props.delegationId, values);
  };

  _setFiles = files => {
    this.setState({
      files: files
    });
  };

  render() {
    return <ExpensesModalForm onSubmit={this._handleSubmit} setFiles={this._setFiles} files={this.state.files} />;
  }
}

const mapDispatchToProps = {
  addExpense
};

export default connect(
  null,
  mapDispatchToProps
)(ExpensesModalFormContainer);
