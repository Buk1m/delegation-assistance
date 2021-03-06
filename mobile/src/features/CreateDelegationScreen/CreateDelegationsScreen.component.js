import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import { reduxForm, reset, Field } from "redux-form";
import { array, bool, func } from "prop-types";

import Button from "../../components/Button/Button.component";
import {
  validateRequired,
  validateNumber,
  validateCurrency,
  validateDiemExists,
  validateCurrencyExists,
  startDateEarlierThanEndDate
} from "../../validators/Validators";
import DatePickerRenderer from "../../components/DatePicker/DatePickerRenderer.component";
import FieldRenderer from "../../components/FieldRenderer/FieldRenderer.component";
import Currencies from "../../components/Currencies/Currencies";
import LabeledPicker from "../../components/LabeledPicker/LabeledPicker.component";

import localstyles from "./CreateDelegationButtonStyles.module";
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
  const { handleSubmit, submitting, countries } = props;
  const currencies = addKeysToItems(currenciesTags);
  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enable>
          <Text style={styles.subtitle}> Destination Country </Text>
          <Field
            name="destinationCountryId"
            placeholder="Destination Country"
            component={LabeledPicker}
            data={addKeysToItems(countries)}
            style={{
              containerStyle: localstyles.pickerContainer,
              pickerStyle: localstyles.countryLabeledPicker,
              titleStyle: localstyles.pickerTitle,
              textStyle: localstyles.pickerText,
              validationFieldStyle: localstyles.pickerValidationField
            }}
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
                validate={[validateNumber, validateCurrency, validateDiemExists]}
                style={{ inputStyle: { width: 50 } }}
                data={currencies}
                isSecure={false}
              />
            </View>
            <View>
              <Text style={styles.subtitle}> Currency</Text>
              <Field
                name="diet.currency"
                placeholder="Select"
                component={LabeledPicker}
                validate={validateCurrencyExists}
                data={currencies}
                isSecure={false}
                style={{
                  containerStyle: localstyles.pickerContainer,
                  viewStyle: localstyles.halfField,
                  pickerStyle: localstyles.labeledPicker,
                  titleStyle: localstyles.pickerTitle,
                  textStyle: localstyles.pickerText,
                  validationFieldStyle: localstyles.pickerValidationField
                }}
              />
            </View>
          </View>

          <View style={localstyles.meals}>
            <View>
              <Text style={localstyles.subtitle}> Breakfasts</Text>
              <Field
                name="meals.breakfasts"
                placeholder="0"
                component={FieldRenderer}
                validate={[validateNumber]}
                style={{ inputStyle: localstyles.meal }}
                isSecure={false}
              />
            </View>
            <View>
              <Text style={localstyles.subtitle}> Lunches</Text>
              <Field
                name="meals.lunches"
                placeholder="0"
                component={FieldRenderer}
                validate={[validateNumber]}
                style={{ inputStyle: localstyles.meal }}
                isSecure={false}
              />
            </View>
            <View>
              <Text style={localstyles.subtitle}> Dinners</Text>
              <Field
                name="meals.dinners"
                placeholder="0"
                component={FieldRenderer}
                validate={[validateNumber]}
                style={{ inputStyle: localstyles.meal }}
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
  countries: array,
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
