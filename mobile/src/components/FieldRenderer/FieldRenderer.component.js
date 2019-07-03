import { Text, TextInput, View } from "react-native";
import React from "react";
import { bool, string, number, object } from "prop-types";

import styles from "./FieldRenderer.module.scss";

const FieldRenderer = ({
  placeholder,
  placeholderTextColor,
  isSecure,
  multiline = false,
  numberOfLines = 1,
  meta: { touched, error },
  input: { onChange, restInput },
  style: { inputStyle, validationFieldStyle = styles.validationField } = {}
}) => {
  const inputStyles = multiline ? styles.textarea : styles.input;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          {...restInput}
          style={[inputStyles, inputStyle]}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          secureTextEntry={isSecure}
        />
      </View>
      {touched && (error && <Text style={validationFieldStyle}>{error}</Text>)}
    </View>
  );
};

FieldRenderer.propTypes = {
  input: object,
  isSecure: bool,
  meta: object,
  multiline: bool,
  numberOfLines: number,
  placeholder: string,
  placeholderTextColor: string,
  style: object
};

export default FieldRenderer;
