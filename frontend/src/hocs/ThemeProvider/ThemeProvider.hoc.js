import React, { Component, Fragment } from "react";
import { object, string } from "prop-types";
import { connect } from "react-redux";

import { getTheme } from "../../selectors/theme.selectors";

class ThemeProvider extends Component {
  static propTypes = {
    themeName: string,
    children: object
  };

  componentDidMount() {
    this.updateCSSVariables();
  }

  componentDidUpdate(prevProps) {
    if (this.props.themeName !== prevProps.themeName) {
      this.updateCSSVariables();
    }
  }

  updateCSSVariables() {
    document.body.dataset.theme = this.props.themeName.toLowerCase();
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    themeName: getTheme(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(ThemeProvider);
