import React from "react";
import { Text, View } from "react-native";
import { Icon } from "expo";
import DatePicker from "react-native-datepicker";
import { string, object } from "prop-types";

import styles from "./LabeledDatePicker.module.scss";

const LabeledDatePicker = ({ input: { onChange, value }, title, style }) => {
  return (
    <View style={style}>
      <View style={styles.title}>
        <Icon.Ionicons name="md-calendar" />
        <Text> {title} </Text>
      </View>

      <DatePicker
        date={!value ? new Date() : new Date(value)}
        showIcon={false}
        onDateChange={onChange}
        style={styles.datePickerButton}
        customStyles={{
          dateInput: styles.dateInput,
          dateText: styles.dateText,
          placeholderText: styles.placeholderText,
          datePicker: styles.datePicker
        }}
      />
    </View>
  );
};

LabeledDatePicker.propTypes = {
  input: object,
  title: string,
  style: object
};

export default LabeledDatePicker;
