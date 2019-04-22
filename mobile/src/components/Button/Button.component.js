import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { object, string, func } from "prop-types";

import styles from "./ButtonStyles.scss";

const Button = props => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: object,
  onPress: func,
  title: string
};

export default Button;
