import React from "react";
import { View, Text } from "react-native";
import { Field } from "redux-form";
import { string } from "prop-types";

import { validateRequired } from "../../../validators/Validators";
import LabeledDatePicker from "../../DatePicker/LabeledDatePicker.component";
import PlatformIcon from "../../PlatformIcon/PlatformIcon.component";

import colors from "../../../assets/styles/_colorPalette.scss";
import styles from "./RenderField.module.scss";

const DatePickerField = props => {
  const { title, iconName, fieldName, placeholder } = props;
  const fieldIconSize = 36;

  return (
    <View>
      <Text style={styles.subtitle}>{title}</Text>
      <View style={styles.inputSection}>
        <View style={styles.iconPanel}>
          <PlatformIcon name={iconName} size={fieldIconSize} color={colors.primaryTextColor} />
        </View>
        <Field
          name={fieldName}
          component={LabeledDatePicker}
          dateTextStyle={styles.dateText}
          placeholder={placeholder}
          style={{
            placeholderTextStyle: styles.placeholderText,
            dateTextStyle: styles.dateText,
            datePickerButtonStyle: styles.datePickerButton
          }}
          shouldRenderLabel={false}
          validate={[validateRequired]}
          isSecure={false}
        />
      </View>
    </View>
  );
};

DatePickerField.propTypes = {
  fieldName: string,
  iconName: string,
  placeholder: string,
  title: string
};

export default DatePickerField;
