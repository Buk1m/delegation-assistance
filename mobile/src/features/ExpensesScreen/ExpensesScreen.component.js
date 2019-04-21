import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from "react-native";
import { reduxForm, reset, Field } from "redux-form";
import { func } from "prop-types";

import styles from "../../assets/styles/styles.scss";
import FieldRenderer from "../../components/FieldRenderer/FieldRenderer.component";
import { validateRequired } from "../../validators/Validators";
import DatePickerRenderer from "../../components/DatePicker/DatePickerRenderer.component";
import FileListComponent from "./components/FileList.component";
import PaymentType from "./components/PaymentType.component";

const ExpensesScreen = props => {
  const {
    handleSubmit,
    attachments,
    choosePayType,
    getFile,
    getImageFromCamera,
    getImageFromCameraRoll,
    deleteFile,
    payType
  } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enable>
          <Text style={styles.subtitle}> Expense Name </Text>
          <Field
            name="expenseName"
            placeholder="Expense Name"
            component={FieldRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />

          <Text style={styles.subtitle}> Expense Value </Text>
          <Field
            name="expenseValue"
            placeholder="Expense Value"
            component={FieldRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />

          <Text style={styles.subtitle}> Expense Currency </Text>
          <Field
            name="expenseCurrency"
            placeholder="Expense Currency"
            component={FieldRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />

          <Text style={styles.subtitle}> Payment Type </Text>
          <Field
            name="payType"
            placeholder="Payment Type"
            component={PaymentType}
            payType={payType}
            choosePayType={choosePayType}
            isSecure={false}
          />

          <Text style={styles.subtitle}> Expanse Date </Text>
          <Field
            name="expenseDate"
            component={DatePickerRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />

          <Text style={styles.subtitle}> Add file from: </Text>
          <Field
            name="attachments"
            placeholder="Attachments"
            component={FileListComponent}
            getImageFromCameraRoll={getImageFromCameraRoll}
            getImageFromCamera={getImageFromCamera}
            getFile={getFile}
            deleteFile={deleteFile}
            attachments={attachments}
            isSecure={false}
          />

          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.button}> Create </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

ExpensesScreen.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "create-expense",
  //...isFileAttached,
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("create-expense"));
  }
})(ExpensesScreen);
