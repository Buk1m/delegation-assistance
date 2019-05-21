import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import { reduxForm, reset, Field } from "redux-form";
import { bool, func } from "prop-types";

import { validateRequired, validateNumber, validateCurrency } from "../../validators/Validators";
import startDateEarlierThanEndDate from "../../validators/startDateEarlierThenEndDate";
import Button from "../../components/Button/Button.component";
import DatePickerRenderer from "../../components/DatePicker/DatePickerRenderer.component";
import FieldRenderer from "../../components/FieldRenderer/FieldRenderer.component";
import Currencies from "../../components/Currencies/Currencies";
import LabeledPicker from "../../components/LabeledPicker/LabeledPicker.component";

import styles from "../../assets/styles/styles.scss";

const currenciesTags = Currencies.map(currency => {
  return { label: currency, value: currency };
});

const addKeysToItems = items => {
  return items.map((item, index) => {
    return Object.assign(item, { key: `${index}` });
  });
};

const CreateDelegationsScreen = props => {
  const { handleSubmit, submitting } = props;
  const currencies = addKeysToItems(currenciesTags);
  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enable>
          <Text style={styles.subtitle}> Destination Country </Text>
          <Field
            name="destinationCountryISO3"
            placeholder="Destination Country"
            component={FieldRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />
          <Text style={styles.subtitle}> Destination Location </Text>
          <Field
            name="destinationLocation"
            placeholder="Destination Location"
            component={FieldRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />
          <Text style={styles.subtitle}> Delegation Objective</Text>
          <Field
            name="delegationObjective"
            placeholder="Delegation Objective"
            component={FieldRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />
          <Text style={styles.subtitle}> Start Date </Text>
          <Field name="startDate" component={DatePickerRenderer} validate={[validateRequired]} isSecure={false} />
          <Text style={styles.subtitle}> End Date </Text>
          <Field name="endDate" component={DatePickerRenderer} validate={[validateRequired]} isSecure={false} />

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View>
              <Text style={styles.subtitle}> Diem</Text>
              <Field
                name="diet.perDiem"
                placeholder="0.00"
                component={FieldRenderer}
                style={{ inputStyle: { width: 50 } }}
                data={currencies}
                validate={[validateNumber, validateCurrency]}
                isSecure={false}
              />
            </View>
            <View>
              <Text style={styles.subtitle}> Currency</Text>
              <Field
                name="diet.currency"
                placeholder="Select"
                component={LabeledPicker}
                data={currencies}
                isSecure={false}
              />
            </View>
          </View>

          <Text style={styles.subtitle}> Advance Payment</Text>
          <Field
            name="advancePayment"
            placeholder="0.00"
            component={FieldRenderer}
            validate={[validateNumber, validateCurrency]}
            isSecure={false}
          />

          <Button style={styles.button} onPress={handleSubmit} submitting={submitting} title="Create" />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

CreateDelegationsScreen.propTypes = {
  handleSubmit: func,
  submitting: bool
};

export default reduxForm({
  form: "create-delegation",
  ...startDateEarlierThanEndDate,
  dateNames: ["startDate", "endDate"],
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("create-delegation"));
  }
})(CreateDelegationsScreen);
