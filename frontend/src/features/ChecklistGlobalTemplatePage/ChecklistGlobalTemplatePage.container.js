import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import ChecklistGlobalTemplatePage from "./ChecklistGlobalTemplatePage.component";
import { getGlobalTemplate, getGlobalTemplateFetching } from "../../selectors/checklistTemplate.selectors";
import {
  fetchGlobalTemplate,
  saveGlobalTemplate,
  reorderGlobalTemplate,
  addTask,
  deleteTask
} from "../../actions/checklistTemplate.action";

export class ChecklistGlobalTemplatePageContainer extends Component {
  static propTypes = {
    fetchGlobalTemplate: func,
    reorderGlobalTemplate: func,
    saveGlobalTemplate: func,
    isFetching: bool,
    deleteTask: func,
    globalTemplate: array
  };

  state = {
    isInEditMode: false,
    itemForModal: null
  };

  componentDidMount = () => {
    this.props.fetchGlobalTemplate();
  };

  _changeMode = () => {
    if (this.state.isInEditMode) {
      this.setState({ isInEditMode: false });
      this.props.saveGlobalTemplate(this.props.globalTemplate);
    } else {
      this.setState({ isInEditMode: true });
    }
  };

  _onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderGlobalTemplate({ oldIndex, newIndex });
  };

  _handleUpdateModal = index => {
    if (index < 0) {
      this.setState({
        itemForModal: null
      });
    } else {
      this.setState({
        itemForModal: this.props.globalTemplate[index]
      });
    }
  };

  _handleDeleteTask = index => {
    this.props.deleteTask(index);
  };

  render() {
    return (
      <ChecklistGlobalTemplatePage
        onSortEnd={this._onSortEnd}
        globalTemplateItems={this.props.globalTemplate}
        changeMode={this._changeMode}
        isInEditMode={this.state.isInEditMode}
        isFetching={this.props.isFetching}
        handleUpdateModal={this._handleUpdateModal}
        handleDeleteTask={this._handleDeleteTask}
        itemForModal={this.state.itemForModal}
      />
    );
  }
}

const mapStateToProps = state => ({
  globalTemplate: getGlobalTemplate(state),
  isFetching: getGlobalTemplateFetching(state)
});

const mapDispatchToProps = {
  fetchGlobalTemplate,
  saveGlobalTemplate,
  reorderGlobalTemplate,
  addTask,
  deleteTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistGlobalTemplatePageContainer);
