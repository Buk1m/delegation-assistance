import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "expo";
import { Platform } from "react-native";
import { array, func } from "prop-types";

import { deleteTask, fetchTasks, saveTasks } from "../../actions/checklists.actions";
import { getTasks } from "../../selectors/checklists.selectors";
import ChecklistScreen from "./ChecklistScreen.component";

class ChecklistScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Checklist",
      headerRight: (
        <Icon.Ionicons
          name={Platform.OS === "ios" ? `ios-add` : "md-add"}
          size={24}
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("CreateTask")}
        />
      )
    };
  };

  static propTypes = {
    deleteTask: func,
    fetchTasks: func,
    saveTasks: func,
    tasks: array
  };

  componentDidMount = () => {
    this.props.fetchTasks();
  };

  _handleSubmit = values => {
    this.props.saveTasks(values);
  };

  _handleDelete = values => {
    if (values.tasks) {
      values.tasks.forEach((task, index) => {
        if (task) {
          this.props.deleteTask(this.props.tasks[index].id);
        }
      });
    }
  };

  render() {
    return <ChecklistScreen tasks={this.props.tasks} onSubmit={this._handleSubmit} handleDelete={this._handleDelete} />;
  }
}

const mapStateToProps = state => {
  return {
    tasks: getTasks(state)
  };
};

const mapDispatchToProps = { deleteTask, fetchTasks, saveTasks };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistScreenContainer);
