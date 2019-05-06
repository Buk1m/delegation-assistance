import React, { Fragment } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { object, string, func, number, bool } from "prop-types";

import Spinner from "../../components/Spinner/Spinner.component";

import styles from "./ButtonStyles.scss";

const Button = props => {
  const { disabled, icon, onPress, title, style, submitting, activeOpacity = 0.5 } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        activeOpacity={activeOpacity}
        disabled={disabled}
      >
        <View style={styles.content}>
          {submitting ? (
            <Spinner size="small" color="white" />
          ) : (
            <Fragment>
              <View style={icon && styles.icon}>{icon}</View>
              <Text style={styles.text}>{title}</Text>
            </Fragment>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  activeOpacity: number,
  disabled: bool,
  icon: object,
  onPress: func,
  style: object,
  submitting: bool,
  title: string
};

export default Button;
