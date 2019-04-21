import { Text, View } from "react-native";
import React from "react";

import styles from "./DatePickerRenderer.module.scss";
import DatePicker from "react-native-datepicker";

const renderDateTimePicker = ({
  meta: { touched, error },
  input: { onChange, value }
}) => {
  return (
    <View>
      <DatePicker
        date={!value ? new Date() : new Date(value)}
        onDateChange={onChange}
        style={styles["date-picker"]}
        customStyles={value ? { ...styles.active } : { ...styles.inactive }}
      />
      {touched &&
        (error && <Text style={styles["validation-field"]}>{error}</Text>)}
    </View>
  );
};

export default renderDateTimePicker;
