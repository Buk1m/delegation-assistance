import React from "react";
import { Text, View } from "react-native";
import { string } from "prop-types";

import PlatformIcon from "../PlatformIcon/PlatformIcon.component";

import styles from "./ErrorMessage.module.scss";

const ErrorMessage = props => {
  return (
    <View style={styles.error}>
      <PlatformIcon name="warning" style={[styles.errorColor, styles.errorIcon]} />
      <Text style={[styles.errorColor, styles.errorText]}>{props.message}</Text>
    </View>
  );
};

ErrorMessage.propTypes = {
  message: string
};

export default ErrorMessage;
