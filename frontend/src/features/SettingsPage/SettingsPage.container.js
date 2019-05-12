import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";

import SettingsPage from "./SettingsPage.component";
import { getTheme } from "../../selectors/theme.selectors";
import { changeTheme } from "../../actions/theme.actions";

class SettingsPageContainer extends Component {
  static propTypes = {
    changeTheme: func,
    initialValues: object
  };

  _handleSubmit = values => {
    if (values.theme) {
      this.props.changeTheme(values.theme);
    }
  };

  render() {
    return <SettingsPage onSubmit={this._handleSubmit} initialValues={this.props.initialValues} />;
  }
}

const mapStateToProps = state => ({
  initialValues: {
    theme: getTheme(state)
  }
});

const mapDispatchToProps = {
  changeTheme
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPageContainer);
