import React from "react";
import { View, Text } from "react-native";
import { Field } from "redux-form";
import { string, object } from "prop-types";

import { validateRequired } from "../../../validators/Validators";
import FieldRenderer from "../../FieldRenderer/FieldRenderer.component";
import PlatformIcon from "../../PlatformIcon/PlatformIcon.component";

import colors from "../../../assets/styles/_colorPalette.scss";
import styles from "./RenderField.module.scss";

const TextField = props => {
  const { title, iconName, iconStyle, fieldName, placeholder } = props;
  const fieldIconSize = 36;

  return (
    <View>
      <Text style={styles.subtitle}>{title}</Text>
      <View style={styles.inputSection}>
        <View style={[styles.iconPanel, iconStyle]}>
          <PlatformIcon name={iconName} size={fieldIconSize} color={colors.primaryTextColor} />
        </View>
        <Field
          name={fieldName}
          placeholder={placeholder}
          placeholderTextColor={colors.lightPurple}
          component={FieldRenderer}
          style={{ inputStyle: styles.textInput, validationFieldStyle: styles.validationField }}
          validate={[validateRequired]}
          isSecure={false}
        />
      </View>
    </View>
  );
};

TextField.propTypes = {
  fieldName: string,
  iconName: string,
  iconStyle: object,
  placeholder: string,
  title: string
};

export default TextField;
