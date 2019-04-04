import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import ChecklistsPage from "./ChecklistsPage.component";
import { getTasks } from "../../selectors/checklists.selectors";
import { deleteTask, fetchTasks, saveTasks } from "../../actions/checklists.actions";
import { isUserTravelmanager } from "../../selectors/user.selectors";

class ChecklistsPageContainer extends Component {
  static propTypes = {
    tasks: array,
    fetchTasks: func,
    saveTasks: func,
    deleteTask: func,
    isUserTravelmanager: bool
  };

  componentDidMount = () => {
    this.props.fetchTasks();
  };

  _handleSubmit = values => {
    this.props.saveTasks(values);
  };

  _handleDelete = values => {
    if (values) {
      values.tasks.forEach(task => {
        this.props.deleteTask(task);
      });
    }
  };

  render() {
    return (
      <ChecklistsPage
        tasks={this.props.tasks}
        onSubmit={this._handleSubmit}
        handleDelete={this._handleDelete}
        isUserTravelmanager={this.props.isUserTravelmanager}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: getTasks(state),
    isUserTravelmanager: isUserTravelmanager(state)
  };
};

const mapDispatchToProps = { deleteTask, fetchTasks, saveTasks };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsPageContainer);
