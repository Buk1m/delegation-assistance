import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, number } from "prop-types";

import DelegationExpenses from "./DelegationExpenses.component";
import { getExpenses, getExpensesFetching, getExpensesTotalSize } from "../../../../selectors/expenses.selectors";
import { addExpense, fetchExpenses } from "../../../../actions/expenses.actions";

class DelegationExpensesContainer extends Component {
  static propTypes = {
    canEditDelegation: bool,
    delegationId: number,
    expenses: array,
    fetchExpenses: func,
    fetching: bool,
    totalSize: number
  };

  state = {
    page: 1,
    sizePerPage: 10,
    sortOrder: "desc",
    sortField: "expenseDate"
  };

  componentDidMount() {
    this.props.fetchExpenses(this.props.delegationId, {});
  }

  _onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    switch (type) {
      case "sort":
      case "pagination":
        this.props
          .fetchExpenses(this.props.delegationId, {
            page: page,
            sizePerPage: sizePerPage,
            sortOrder: sortOrder,
            sortField: sortField
          })
          .then(() =>
            this.setState({
              page: page,
              sizePerPage: sizePerPage,
              sortOrder: sortOrder,
              sortField: sortField
            })
          );
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <DelegationExpenses
        expenses={this.props.expenses}
        delegationId={this.props.delegationId}
        fetching={this.props.fetching}
        onTableChange={this._onTableChange}
        totalSize={this.props.totalSize}
        page={this.state.page}
        sizePerPage={this.state.sizePerPage}
        sortOrder={this.state.sortOrder}
        sortField={this.state.sortField}
        canEditDelegation={this.props.canEditDelegation}
      />
    );
  }
}

const mapStateToProps = state => ({
  expenses: getExpenses(state),
  fetching: getExpensesFetching(state),
  totalSize: getExpensesTotalSize(state)
});

const mapDispatchToProps = {
  addExpense,
  fetchExpenses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationExpensesContainer);
