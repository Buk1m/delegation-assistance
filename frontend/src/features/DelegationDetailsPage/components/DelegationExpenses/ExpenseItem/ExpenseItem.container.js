import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func, number, object } from "prop-types";

import ExpenseItem from "./ExpenseItem.component";
import { downloadExpenseFile } from "../../../../../actions/expenses.actions";

export class ExpenseItemContainer extends Component {
  static propTypes = {
    data: object,
    delegationId: number,
    downloadExpenseFile: func,
    files: array
  };

  _handleDownloadExpenseFile = file => {
    this.props
      .downloadExpenseFile(this.props.delegationId, this.props.data.id, {
        fileId: file.id,
        fileName: file.filename
      })
      .then(response => {
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", file.filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  render() {
    return (
      <ExpenseItem
        files={this.props.data.files}
        value={this.props.data.expenseValue}
        currency={this.props.data.expenseCurrency}
        paymentType={this.props.data.paymentType}
        exchangeRate={this.props.data.exchangeRate}
        date={this.props.data.expenseDate}
        name={this.props.data.expenseName}
        handleDownloadExpenseFile={this._handleDownloadExpenseFile}
      />
    );
  }
}

const mapDispatchToProps = {
  downloadExpenseFile
};

export default connect(
  null,
  mapDispatchToProps
)(ExpenseItemContainer);
