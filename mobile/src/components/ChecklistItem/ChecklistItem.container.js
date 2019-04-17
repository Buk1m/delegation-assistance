import React, { Component } from "react";
import ChecklistItem from "./ChecklistItem.component";

export default class ChecklistItemContainer extends Component {
  onClick = () => {
    this.props.changeCheckboxState(this.props.data.id);
  };

  render() {
    return <ChecklistItem onClick={this.onClick} checkbox={this.props.data}/>;
  };
}