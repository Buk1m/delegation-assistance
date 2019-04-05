import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number,object } from "prop-types";

import AddExpensePage from "./AddExpensePage.component";
import { addExpense } from "../../actions/expense.actions";

class AddExpensePageContainer extends Component {
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
    let formData = new FormData();
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
      <AddExpensePage
        setFiles={this.setFiles}
        files={this.state.files}
        onSubmit={this.handleAddExpense}
      />
    );
  }
}

const mapDispatchToProps = {
  addExpense
};

export default connect(
  null,
  mapDispatchToProps
)(AddExpensePageContainer);
