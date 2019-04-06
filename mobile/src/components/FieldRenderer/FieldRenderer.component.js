import { Text, TextInput, View } from "react-native";
import React from "react";

import styles from "./FieldRenderer.module.scss";

const FieldRenderer = ({
  label,
  placeholder,
  isSecure,
  multiline = false,
  numberOfLines = 1,
  meta: { touched, error },
  input: { onChange, ...restInput }
}) => {
  const inputStyles = multiline ? styles.textarea : styles.input;
  return (
    <View>
      <View>
        <TextInput
          {...restInput}
          style={inputStyles}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onChangeText={onChange}
          placeholder={placeholder}
          autoCapitalize="none"
          secureTextEntry={isSecure}
        />
      </View>
      {touched && (error && <Text style={styles.validationField}>{error}</Text>)}
    </View>
  );
};

export default FieldRenderer;
