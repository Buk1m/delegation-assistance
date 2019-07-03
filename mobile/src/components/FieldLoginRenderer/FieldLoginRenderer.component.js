import React from "react";
import { View } from "react-native";
import { object, string } from "prop-types";
import { TextInput, HelperText } from "react-native-paper";

import styles from "./FieldLoginRenderer.module.scss";

const FieldLoginRenderer = ({ placeholder, meta: { touched, error }, input: { onChange, restInput }, rest }) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        {...restInput}
        label={placeholder}
        mode="outlined"
        onChangeText={onChange}
        error={touched && error}
      />
      <HelperText type="error" visible={touched && error}>
        {error}
      </HelperText>
    </View>
  );
};
FieldLoginRenderer.propTypes = {
  input: object,
  label: string,
  meta: object,
  placeholder: string
};

export default FieldLoginRenderer;
