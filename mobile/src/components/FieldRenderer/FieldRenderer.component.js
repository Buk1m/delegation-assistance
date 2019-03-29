import { Text, TextInput, View } from "react-native";
import React from "react";

import styles from "./FieldRenderer.module.scss";

const FieldRenderer = ({
  label,
  placeholder,
  isSecure,
  meta: { touched, error },
  input: { onChange, ...restInput }
}) => {
  return (
    <View>
      <View>
        <TextInput
          {...restInput}
          style={styles.input}
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
