import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { func } from "prop-types";
import ImagePicker from "react-native-image-picker";
import { DocumentPicker, DocumentPickerUtil } from "react-native-document-picker";

import { addNewExpense } from "../../actions/delegationExpenses.actions";
import ExpensesScreen from "./ExpensesScreen.component";

class ExpensesScreenContainer extends Component {
  static navigationOptions = {
    title: "Expenses"
  };

  static propTypes = {
    addNewExpense: func
  };

  state = {
    delegationId: this.props.navigation.getParam("delegationId"),
    attachments: [],
    payType: "CREDIT_CARD",
    fileId: 1
  };

  getFile = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, response) => {
        if (response) {
          this.addFileToList(response);
        } else if (error) {
          Alert.alert("Something went wrong while adding files");
        }
      } 
    );
  };

  getImageFromCamera = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        this.addFileToList(response);
      }
    });
  };

  getImageFromCameraRoll = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.addFileToList(response);
      }
    });
  };

  handleSubmit = values => {
    const attachments = this.state.attachments.map(value => {
      return { name: value.fileName, type: value.type, uri: value.uri };
    });

    const payType = this.state.payType;
    const delegationId = this.state.delegationId;

    this.props.addNewExpense(values, { attachments }, payType, delegationId).then(() => {
      this.props.navigation.goBack();
    });
  };

  addFileToList = file => {
    this.setState({
      fileId: this.state.fileId + 1
    });

    this.setState({
      attachments: [...this.state.attachments, file]
    });
  };

  choosePayType = type => {
    this.setState({
      payType: type
    });
  };

  deleteFile = index => {
    const files = Object.assign([], this.state.attachments);
    files.splice(index, 1);
    this.setState({ attachments: files });
  };

  render() {
    return (
      <ExpensesScreen
        onSubmit={this.handleSubmit}
        attachments={this.state.attachments}
        choosePayType={this.choosePayType}
        getFile={this.getFile}
        getImageFromCamera={this.getImageFromCamera}
        getImageFromCameraRoll={this.getImageFromCameraRoll}
        deleteFile={this.deleteFile}
        payType={this.state.payType}
      />
    );
  }
}

const mapDispatchToProps = {
  addNewExpense
};

export default connect(
  null,
  mapDispatchToProps
)(ExpensesScreenContainer);
