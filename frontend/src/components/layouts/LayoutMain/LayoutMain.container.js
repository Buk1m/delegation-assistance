import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, object, oneOfType, string } from "prop-types";

import LayoutMain from "./LayoutMain.component";

export class LayoutMainContainer extends Component {
  static propTypes = {
    children: object.isRequired,
    hideTitle: bool,
    fullContent: bool,
    title: string,
    buttons: oneOfType([array, object])
  };

  componentDidMount() {
    document.title = this.props.title ? this.props.title + " | Delegation Assistant" : "Delegation Assistant";
  }

  render() {
    return (
      <LayoutMain
        title={this.props.title}
        hideTitle={this.props.hideTitle}
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
