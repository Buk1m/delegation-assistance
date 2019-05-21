import React from "react";
import { Platform } from "react-native";
import { Icon } from "expo";
import { array, func, string, number, object, oneOfType } from "prop-types";

import colors from "../../assets/styles/_colorPalette";

const isAndroid = Platform.OS === "android";

const PlatformIcon = props => {
  const { name, onPress, size, style, color } = props;
  const prefix = isAndroid ? "md" : "ios";

  return <Icon.Ionicons name={`${prefix}-${name}`} size={size} style={style} color={color} onPress={onPress} />;
};

PlatformIcon.propTypes = {
  color: string,
  name: string,
  onPress: func,
  size: number,
  style: oneOfType([object, array])
};

PlatformIcon.defaultProps = {
  size: 24,
  color: colors.primaryTextColor
};

export default PlatformIcon;
