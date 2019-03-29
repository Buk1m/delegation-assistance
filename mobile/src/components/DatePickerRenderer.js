import { Text, View } from "react-native";
import styles from "../assets/styles/styles";
import React from "react";
import DatePicker from "react-native-datepicker";
import StyleDatePicker from "../assets/styles/styleDatePicker";

const renderDateTimePicker = ({ meta: { touched, error }, input: { onChange, value } }) => {
  return (
    <View>
      <DatePicker
        date={!value ? new Date() : new Date(value)}
        onDateChange={onChange}
        style={styles.datePicker}
        customStyles={
          value
            ? {
                ...StyleDatePicker,
                dateText: {
                  color: "#000000"
                }
              }
            : {
                ...StyleDatePicker,
                dateText: {
                  color: "#bdbdbd"
                }
              }
        }
      />
      {touched && (error && <Text style={styles.validationField}>{error}</Text>)}
    </View>
  );
};

export default renderDateTimePicker;
