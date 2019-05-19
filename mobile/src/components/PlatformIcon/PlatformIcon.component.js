import React from "react";
import { Platform } from "react-native";
import { Icon } from "expo";
import { string, number, object } from "prop-types";

import colors from "../../assets/styles/_colorPalette";

const isAndroid = Platform.OS === "android";

const PlatformIcon = props => {
  const { name, size, style, color } = props;
  const prefix = isAndroid ? "md" : "ios";

  return <Icon.Ionicons name={`${prefix}-${name}`} size={size} style={style} color={color} />;
};

PlatformIcon.propTypes = {
  color: string,
  name: string,
  size: number,
  style: object
};

PlatformIcon.defaultProps = {
  size: 24,
  color: colors.primaryTextColor
};

export default PlatformIcon;
