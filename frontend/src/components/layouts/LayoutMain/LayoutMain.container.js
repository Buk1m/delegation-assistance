import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, object, oneOfType, string } from "prop-types";

import LayoutMain from "./LayoutMain.component";

export class LayoutMainContainer extends Component {
  static propTypes = {
    buttons: oneOfType([array, object]),
    buttonsHide: bool,
    children: object.isRequired,
    fullContent: bool,
    hideTitle: bool,
    title: string
  };

  componentDidMount() {
    document.title = this.props.title ? this.props.title + " | Delegation Assistant" : "Delegation Assistant";
  }

  render() {
    return (
      <LayoutMain
        title={this.props.title}
        hideTitle={this.props.hideTitle}
        buttonsHide={this.props.buttonsHide}
        buttons={this.props.buttons}
        fullContent={this.props.fullContent}
      >
        {this.props.children}
      </LayoutMain>
    );
  }
}

export default connect(
  null,
  null
)(LayoutMainContainer);
