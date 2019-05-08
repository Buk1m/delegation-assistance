import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, object } from "prop-types";

import DelegationAddExpensePage from "./DelegationAddExpensePage.component";
import { addExpense } from "../../actions/expense.actions";

class DelegationAddExpensePageContainer extends Component {
  static propTypes = {
    addExpense: func,
    match: object,
    delegationId: number
  };

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.delegationId = this.props.match.params.delegationId;
  }

  handleAddExpense = values => {
    const formData = new FormData();
    formData.append("expenseName", values.expenseName);
    formData.append("expenseValue", values.expenseValue);
    formData.append("expenseCurrency", values.expenseCurrency);
    formData.append("files", this.state.files);

    this.props.addExpense(values, this.delegationId);
  };

  setFiles = files => {
    this.setState({
      files: files
    });
  };

  render() {
    return (
      <DelegationAddExpensePage setFiles={this.setFiles} files={this.state.files} onSubmit={this.handleAddExpense} />
    );
  }
}

const mapDispatchToProps = {
  addExpense
};

export default connect(
  null,
  mapDispatchToProps
)(DelegationAddExpensePageContainer);
