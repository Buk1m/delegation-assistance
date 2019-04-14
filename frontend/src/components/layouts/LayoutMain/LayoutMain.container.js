import React, { Component } from "react";
import { connect } from "react-redux";
import { object, string, bool } from "prop-types";
import { debounce } from "lodash";

import LayoutMain from "./LayoutMain.component";

class LayoutMainContainer extends Component {
  static propTypes = {
    children: object.isRequired,
    title: string,
    hideSidebar: bool,
    addPadding: bool
  };

  constructor(props) {
    super(props);

    this.state = {
      mobileView: document.documentElement.clientWidth < 992 ? true : false,
      showSidebar: document.documentElement.clientWidth < 992 ? false : true
    };
  }

  _handleResize = debounce(() => {
    this._updateViewState();
  }, 50);

  _updateViewState() {
    if (!this.state.mobileView && document.documentElement.clientWidth < 992) {
      this.setState({
        mobileView: true,
        showSidebar: false
      });
    } else if (document.documentElement.clientWidth >= 992) {
      this.setState({
        mobileView: false,
        showSidebar: true
      });
    }
  }

  _toggleSideBar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  }

  componentDidMount() {
    document.title = this.props.title
      ? this.props.title + " | Delegation Assistant"
      : "Delegation Assistant";
    this._updateViewState();
    window.addEventListener("resize", this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize);
  }

  render() {
    return (
      <LayoutMain
        showSidebar={this.state.showSidebar}
        toggleSidebar={this._toggleSideBar.bind(this)}
        mobileView={this.state.mobileView}
        title={this.props.title}
        forceHideSidebar={this.props.hideSidebar}
        addPadding={this.props.addPadding}
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
