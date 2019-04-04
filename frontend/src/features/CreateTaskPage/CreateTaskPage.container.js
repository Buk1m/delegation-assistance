import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import CreateTaskPage from "./CreateTaskPage.component";
import { addTask } from "../../actions/checklists.actions";

class CreateTaskPageContainer extends Component {
  static propTypes = {
    addTask: func
  };

  _handleSubmit = values => {
    this.props.addTask(values.name, values.description).then(() => (window.location.href = "/checklist"));
  };

  render() {
    return <CreateTaskPage onSubmit={this._handleSubmit} />;
  }
}

const mapDispatchToProps = {
  addTask
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTaskPageContainer);
