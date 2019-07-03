import React, { Component } from "react";
import { number, object } from "prop-types";

import DelegationExpense from "../DelegationExpense/DelegationExpense.component";

export default class DelegationExpenseContainer extends Component {
  static propTypes = {
    delegationId: number,
    expense: object
  };

  constructor(props) {
    super(props);
    this.state = { isAttachmentsButtonCollapsed: false };
  }

  action = () => {
    this.setState({
      isAttachmentsButtonCollapsed: !this.state.isAttachmentsButtonCollapsed
    });
  };

  render() {
    return (
      <DelegationExpense
        navigate={this.props.navigate}
        expense={this.props.expense}
        delegationId={this.props.delegationId}
        isCollapsed={this.state.isAttachmentsButtonCollapsed}
        action={this.action}
      />
    );
  }
}
