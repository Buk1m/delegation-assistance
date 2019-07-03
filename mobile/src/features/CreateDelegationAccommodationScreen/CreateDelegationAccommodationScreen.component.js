import React from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { reduxForm } from "redux-form";
import { bool, func } from "prop-types";

import startDateEarlierThanEndDate from "../../validators/startDateEarlierThenEndDate";
import Button from "../../components/Button/Button.component";
import TextField from "../../components/renderers/FieldRenderers/RenderTextField.renderer";
import DatePickerField from "../../components/renderers/FieldRenderers/RenderDatePickerField.renderer";

import styles from "./CreateDelegationAccommodationScreen.module.scss";

const CreateDelegationAccommodationScreen = props => {
  const { handleSubmit, submitting } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView enable>
          <TextField title="Hotel Name" iconName="bed" fieldName="hotelName" placeholder="Hotel Name" />
          <DatePickerField
            title="Check In Date"
            iconName="calendar"
            fieldName="checkInDate"
            placeholder="Check In Date"
          />
          <DatePickerField
            title="Check Out Date"
            iconName="calendar"
            fieldName="checkOutDate"
            placeholder="Check Out Date"
          />

          <Button style={styles.button} onPress={handleSubmit} submitting={submitting} title="Save" />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

CreateDelegationAccommodationScreen.propTypes = {
  handleSubmit: func,
  submitting: bool
};

export default reduxForm({
  form: "create-delegation-accommodation",
  dateNames: ["checkInDate", "checkOutDate"],
  ...startDateEarlierThanEndDate
})(CreateDelegationAccommodationScreen);
