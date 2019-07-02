import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import ChecklistGlobalTemplatePage from "./ChecklistGlobalTemplatePage.component";
import { getGlobalTemplate, getGlobalTemplateFetching } from "../../selectors/checklistTemplate.selectors";
import {
  fetchGlobalTemplate,
  saveGlobalTemplate,
  reorderGlobalTemplate,
  restoreGlobalTemplate,
  addTask,
  deleteTask
} from "../../actions/checklistTemplate.action";
import { confirmationModal } from "../../helpers/confirmationModal";

export class ChecklistGlobalTemplatePageContainer extends Component {
  static propTypes = {
    deleteTask: func,
    fetchGlobalTemplate: func,
    globalTemplate: array,
    isFetching: bool,
    reorderGlobalTemplate: func,
    restoreGlobalTemplate: func,
    saveGlobalTemplate: func
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
      const action = () => {
        this.setState({ isInEditMode: false });
        this.props.saveGlobalTemplate(this.props.globalTemplate);
      };
      confirmationModal("Save changes", "Saving will override current template.", action);
    } else {
      this.setState({ isInEditMode: true });
    }
  };

  _cancelEdit = () => {
    const action = () => {
      this.setState({ isInEditMode: false });
      this.props.restoreGlobalTemplate();
    };
    confirmationModal("Cancel editing", "This will discard all changes.", action);
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
        cancelEdit={this._cancelEdit}
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
  restoreGlobalTemplate,
  addTask,
  deleteTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistGlobalTemplatePageContainer);
