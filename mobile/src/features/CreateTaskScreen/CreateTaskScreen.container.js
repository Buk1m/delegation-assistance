import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import CreateTaskScreen from "./CreateTaskScreen.component";
import { addTask } from "../../actions/checklists.actions";

class CreateTaskScreenContainer extends Component {
  static navigationOptions = {
    title: "Create task"
  };

  static propTypes = {
    addTask: func
  };

  _handleSubmit = values => {
    this.props
      .addTask(values.name, values.description)
      .then(() => this.props.navigation.navigate("Checklist"));
  };

  render() {
    return <CreateTaskScreen onSubmit={this._handleSubmit} />;
  }
}

const mapDispatchToProps = {
  addTask
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTaskScreenContainer);
