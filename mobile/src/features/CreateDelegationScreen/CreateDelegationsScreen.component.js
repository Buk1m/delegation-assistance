import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import { reduxForm, reset, Field } from "redux-form";
import { func } from "prop-types";

import styles from "../../assets/styles/styles.scss";
import { validateRequired } from "../../shared/Validators/Validators";
import DatePickerRenderer from "../../components/DatePicker/DatePickerRenderer.component";
import FieldRenderer from "../../components/FieldRenderer/FieldRenderer.component";
import startDateEarlierThanEndDate from "../../shared/Validators/startDateEarlierThenEndDate";

const CreateDelegationsScreen = props => {
  const { handleSubmit } = props;
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

          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.button}> Create </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

CreateDelegationsScreen.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "create-delegation",
  ...startDateEarlierThanEndDate,
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("create-delegation"));
  }
})(CreateDelegationsScreen);
