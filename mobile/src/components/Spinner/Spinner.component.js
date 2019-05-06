import React from "react";
import { ActivityIndicator } from "react-native";
import { bool, string } from "prop-types";

import colors from "../../assets/styles/_colorPalette";

const Spinner = props => {
  const { color = colors.secondary, spin = true, size = "large" } = props;
  return spin ? <ActivityIndicator size={size} color={color} /> : null;
};

Spinner.propTypes = {
  color: string,
  size: string,
  spin: bool
};

export default Spinner;
