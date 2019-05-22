import { Text, View } from "react-native";
import React from "react";

import styles from "./DatePickerRenderer.module.scss";
import DatePicker from "react-native-datepicker";

const renderDateTimePicker = ({ meta: { touched, error }, input: { onChange, value } }) => {
  return (
    <View>
      <DatePicker
        date={!value ? new Date() : new Date(value)}
        onDateChange={onChange}
        customStyles={
          value
            ? {
                ...styles,
                dateText: {
                  color: styles.activeColor
                }
              }
            : {
                ...styles,
                dateText: {
                  color: styles.inactiveColor
                }
              }
        }
        confirmBtnText="Confirm" //required on ios
        cancelBtnText="Cancel" //required on ios
        style={{ marginLeft: 115 }}
      />
      {touched && (error && <Text style={styles["validation-field"]}>{error}</Text>)}
    </View>
  );
};

export default renderDateTimePicker;
