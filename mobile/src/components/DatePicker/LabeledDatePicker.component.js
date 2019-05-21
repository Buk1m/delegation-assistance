import React from "react";
import { Text, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { string, object, bool } from "prop-types";

import PlatformIcon from "../PlatformIcon/PlatformIcon.component";

import styles from "./LabeledDatePicker.module.scss";
import colors from "../../assets/styles/_colorPalette";

const datePickerIconSize = 18;

const LabeledDatePicker = ({
  meta: { touched, error },
  input: { onChange, value },
  title,
  shouldRenderLabel = true,
  placeholder = "Select Date",
  style: {
    containerStyle = null,
    datePickerButtonStyle = styles.datePickerButton,
    dateInputStyle = styles.dateInput,
    dateTextStyle = styles.dateText,
    placeholderTextStyle = styles.placeholderText,
    datePickerStyle = styles.datePicker,
    dateTouch = styles.dateTouch
  }
}) => {
  return (
    <View style={containerStyle}>
      {shouldRenderLabel ? (
        <View style={styles.title}>
          <PlatformIcon name="calendar" size={datePickerIconSize} color={colors.textColor} />
          <Text> {title} </Text>
        </View>
      ) : null}
      <DatePicker
        date={value ? new Date(value) : ""}
        showIcon={false}
        confirmBtnText="Save"
        cancelBtnText="Cancel"
        onDateChange={onChange}
        style={datePickerButtonStyle}
        placeholder={placeholder}
        customStyles={{
          dateInput: dateInputStyle,
          dateText: dateTextStyle,
          placeholderText: placeholderTextStyle,
          datePicker: datePickerStyle,
          datetouch: dateTouch
        }}
      />
      {touched &&
        (error && (
          <Text numberOfLines={2} style={styles.validationField}>
            {error}
          </Text>
        ))}
    </View>
  );
};

LabeledDatePicker.propTypes = {
  input: object,
  meta: object,
  placeholder: string,
  shouldRenderLabel: bool,
  style: object.isRequired,
  title: string
};

export default LabeledDatePicker;
