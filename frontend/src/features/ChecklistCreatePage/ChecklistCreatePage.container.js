import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { arrayPush } from "redux-form";
import { withRouter } from "react-router-dom";

import ChecklistCreatePage from "./ChecklistCreatePage.component";
import { addChecklist } from "../../actions/checklists.actions";

class ChecklistCreatePageContainer extends Component {
  constructor(props) {
    super(props);

    this.initialTasks = {
      tasks: [
        {
          task: "",
          description: ""
        }
      ]
    };
  }

  static propTypes = {
    addTask: func,
    addChecklist: func,
    history: object
  };

  _handleSubmit = values => {
    return this.props.addChecklist(values.tasks).then(() => {
      this._redirectToChecklistsPage();
    });
  };

  _handleAddTask = () => {
    this.props.addTask("createChecklist", "tasks", { task: "", description: "" });
  };

  _redirectToChecklistsPage = () => this.props.history.push("/checklist");

  render() {
    return (
      <ChecklistCreatePage
        onSubmit={this._handleSubmit}
        initialValues={this.initialTasks}
        handleAddTask={this._handleAddTask}
      />
    );
  }
}

const mapDispatchToProps = {
  addTask: arrayPush,
  addChecklist: addChecklist
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ChecklistCreatePageContainer)
);
