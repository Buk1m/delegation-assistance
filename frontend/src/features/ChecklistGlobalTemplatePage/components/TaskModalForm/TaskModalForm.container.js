import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";

import TaskModalForm from "./TaskModalForm.component";
import { addTask, editTask } from "../../../../actions/checklistTemplate.action";

export class TaskModalFormContainer extends Component {
  static propTypes = {
    addTask: func,
    editTask: func,
    initialValues: object
  };

  _handleSubmit = values => {
    if (values.priority) {
      this.props.editTask(values);
    } else {
      this.props.addTask(values);
    }
  };

  render() {
    return <TaskModalForm onSubmit={this._handleSubmit} initialValues={this.props.initialValues} />;
  }
}

const mapDispatchToProps = {
  addTask,
  editTask
};

export default connect(
  null,
  mapDispatchToProps
)(TaskModalFormContainer);
