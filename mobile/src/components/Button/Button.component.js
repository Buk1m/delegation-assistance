import React, { Fragment } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { object, string, func, number, bool } from "prop-types";

import Spinner from "../../components/Spinner/Spinner.component";

import styles from "./Button.module.scss";
import colors from "../../assets/styles/_colorPalette.scss";

const Button = props => {
  const { disabled, icon, onPress, title, style, submitting, iconStyle = styles.icon, activeOpacity = 0.5 } = props;
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled}
    >
      {submitting ? (
        <Spinner size="small" color={colors.primaryTextColor} />
      ) : (
        <Fragment>
          <View style={icon && iconStyle}>{icon}</View>
          <Text style={styles.text}>{title}</Text>
        </Fragment>
      )}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  activeOpacity: number,
  disabled: bool,
  icon: object,
  iconStyle: object,
  onPress: func,
  style: object,
  submitting: bool,
  title: string
};

export default Button;
