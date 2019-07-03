import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import { reduxForm, reset, Field } from "redux-form";
import { array, func, string } from "prop-types";

import Button from "../../components/Button/Button.component";
import Currencies from "../../components/Currencies/Currencies";
import DatePickerRenderer from "../../components/DatePicker/DatePickerRenderer.component";
import FieldRenderer from "../../components/FieldRenderer/FieldRenderer.component";
import FileListComponent from "./components/FileList.component";
import LabeledPicker from "../../components/LabeledPicker/LabeledPicker.component";
import { validateRequired, validateNumber, validateCurrency } from "../../validators/Validators";
import PaymentType from "./components/PaymentType.component";

import localstyles from "./ExpensesScreen.module";
import styles from "../../assets/styles/styles.scss";

const currenciesTags = Currencies.map(currency => {
  return { label: currency, value: currency };
});

const addKeysToItems = items => {
  return items.map((item, index) => {
    return Object.assign(item, { key: `${index}` });
  });
};

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
  const currencies = addKeysToItems(currenciesTags);

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
          <View style={localstyles.container}>
            <View>
              <Text style={styles.subtitle}> Expense Value</Text>
              <Field
                name="expenseValue"
                placeholder="0.00"
                component={FieldRenderer}
                validate={[validateRequired, validateNumber, validateCurrency]}
                isSecure={false}
                data={currencies}
                style={{ inputStyle: { width: 50 } }}
              />
            </View>
            <View>
              <Text style={styles.subtitle}> Currency</Text>
              <Field
                name="expenseCurrency"
                placeholder="Select"
                component={LabeledPicker}
                validate={validateRequired}
                data={currencies}
                isSecure={false}
                style={{
                  containerStyle: localstyles.pickerContainer,
                  pickerStyle: localstyles.labeledPicker,
                  titleStyle: localstyles.pickerTitle,
                  textStyle: localstyles.pickerText,
                  validationFieldStyle: localstyles.pickerValidationField
                }}
              />
            </View>
          </View>
          <View style={localstyles.container}>
            <View>
              <Text style={styles.subtitle}> Exchange Rate</Text>
              <Field
                name="exchangeRate"
                placeholder="0.00"
                component={FieldRenderer}
                validate={[validateNumber, validateCurrency]}
                isSecure={false}
                data={currencies}
                style={{ inputStyle: { width: 50 } }}
              />
            </View>
            <View>
              <Text style={styles.subtitle}> Payment Type </Text>
              <Field
                name="payType"
                placeholder="Payment Type"
                component={PaymentType}
                payType={payType}
                choosePayType={choosePayType}
                isSecure={false}
              />
            </View>
          </View>

          <Text style={styles.subtitle}> Expense Date </Text>
          <Field name="expenseDate" component={DatePickerRenderer} validate={[validateRequired]} isSecure={false} />
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

          <Button style={styles.button} onPress={handleSubmit} title="Create" />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

ExpensesScreen.propTypes = {
  attachments: array,
  choosePayType: func,
  deleteFile: func,
  getFile: func,
  getImageFromCamera: func,
  getImageFromCameraRoll: func,
  handleSubmit: func,
  payType: string
};

export default reduxForm({
  form: "create-expense",
  //...isFileAttached,
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("create-expense"));
  }
})(ExpensesScreen);
