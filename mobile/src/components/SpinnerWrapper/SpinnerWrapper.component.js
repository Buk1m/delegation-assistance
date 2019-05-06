import React from "react";
import { View, Text } from "react-native";
import { bool, object, string } from "prop-types";

import Spinner from "../Spinner/Spinner.component";
import styles from "./SpinnerWrapper.module.scss";

const SpinnerWrapper = props => {
  const { children, containerStyle, message = "", size = "large", spin = true } = props;
  return spin ? (
    <View style={[styles.container, containerStyle]}>
      <Spinner size={size} />
      <Text style={styles["loading-msg"]}>{message}</Text>
    </View>
  ) : (
    <View>{children}</View>
  );
};

SpinnerWrapper.propTypes = {
  children: object,
  containerStyle: object,
  message: string,
  size: string,
  spin: bool
};

export default SpinnerWrapper;
