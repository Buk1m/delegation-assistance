import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewExpense } from "../../actions/expenses.actions";
import { func } from "prop-types";
import { ImagePicker } from "expo";
import { DocumentPicker } from "expo";

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

  getFile = async () => {
    const capturedFile = await DocumentPicker.getDocumentAsync({
      type: "application/*",
      copyToCacheDirectory: true
    });

    if (!capturedFile.cancelled && capturedFile.type !== "cancel") {
      this.addFileToList(capturedFile, capturedFile.name);
    }
  };

  getImageFromCamera = async () => {
    const { Permissions } = Expo;
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL); //Required on IOS

    if (cameraPermission.status === "granted" && cameraRollPermission.status === "granted") {
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1, // Value {0..1}, 1 is maximum - without compression
        mediaTypes: "Images"
      });

      if (!capturedImage.cancelled) {
        const fileName = capturedImage.uri.split("/").pop();
        this.addFileToList(capturedImage, fileName);
      }
    }
  };

  getImageFromCameraRoll = async () => {
    const { Permissions } = Expo;
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL); //Required on IOS

    if (cameraPermission.status === "granted" && cameraRollPermission.status === "granted") {
      const capturedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1, // Value {0..1}, 1 is maximum - without compression
        mediaTypes: "Images"
      });

      if (!capturedImage.cancelled) {
        const fileName = capturedImage.uri.split("/").pop();
        this.addFileToList(capturedImage, fileName);
      }
    }
  };

  handleSubmit = values => {
    const attachments = this.state.attachments.map(value => {
      return { uri: value.file.uri, type: value.file.type, name: value.file.uri.split('/').pop() };
    });

    const payType = this.state.payType;
    const delegationId = this.state.delegationId;

    this.props.addNewExpense(values, { attachments }, payType, delegationId).then(s => console.log(s)).catch(e => console.log(e));
  };

  addFileToList = (file, fileName) => {
    this.setState({
      fileId: this.state.fileId + 1
    });
    const fileObject = {
      id: this.state.fileId,
      fileName: fileName,
      file: file
    };
    this.setState({
      attachments: [...this.state.attachments, fileObject]
    });
  };

  choosePayType = type => {
    this.setState({
      payType: type
    });
  };

  deleteFile = (index,) => {
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
