import React, { Component } from "react";
import { func, object } from "prop-types";

import ChecklistItem from "./ChecklistItem.component";

export default class ChecklistItemContainer extends Component {
  static propTypes = {
    changeCheckboxState: func,
    data: object
  };

  onClick = () => {
    this.props.changeCheckboxState(this.props.data.id);
  };

  render() {
    return <ChecklistItem onClick={this.onClick} checkbox={this.props.data}/>;
  }
}