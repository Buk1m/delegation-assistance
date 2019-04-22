import React from "react";
import { Text, View } from "react-native";
import { Icon } from "expo";
import { string } from "prop-types";

import styles from "./ErrorMessageStyles.scss";

const ErrorMessage = props => {
  return (
    <View style={styles.error}>
      <Icon.Ionicons
        name="md-warning"
        style={[styles.errorColor, styles.errorIcon]}
      />
      <Text style={[styles.errorColor, styles.errorText]}>{props.message}</Text>
    </View>
  );
};

ErrorMessage.propTypes = {
  message: string
};

export default ErrorMessage;
