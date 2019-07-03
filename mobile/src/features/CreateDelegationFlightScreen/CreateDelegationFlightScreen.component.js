import React from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { reduxForm } from "redux-form";
import { bool, func } from "prop-types";

import startDateEarlierThanEndDate from "../../validators/startDateEarlierThenEndDate";
import Button from "../../components/Button/Button.component";
import TextField from "../../components/renderers/FieldRenderers/RenderTextField.renderer";
import DatePickerField from "../../components/renderers/FieldRenderers/RenderDatePickerField.renderer";

import styles from "./CreateDelegationFlightScreen.module.scss";

const CreateDelegationFlightScreen = props => {
  const { handleSubmit, submitting } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView enable>
          <TextField title="Flight From" iconName="jet" fieldName="departurePlace" placeholder="Flight From" />
          <TextField
            title="Flight To"
            iconName="jet"
            iconStyle={styles.flightFromIcon}
            fieldName="arrivalPlace"
            placeholder="Flight To"
          />
          <DatePickerField
            title="Departure Date"
            iconName="calendar"
            fieldName="departureDate"
            placeholder="Departure Date"
          />
          <DatePickerField
            title="Arrival Date"
            iconName="calendar"
            fieldName="arrivalDate"
            placeholder="Arrival Date"
          />

          <Button style={styles.button} onPress={handleSubmit} submitting={submitting} title="Save" />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

CreateDelegationFlightScreen.propTypes = {
  handleSubmit: func,
  submitting: bool
};

export default reduxForm({
  form: "create-delegation-flight",
  dateNames: ["departureDate", "arrivalDate"],
  ...startDateEarlierThanEndDate
})(CreateDelegationFlightScreen);
