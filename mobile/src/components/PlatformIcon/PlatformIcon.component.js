import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { array, func, string, number, object, oneOfType } from "prop-types";
import { isAndroid } from "../../helpers/platform";

import colors from "../../assets/styles/_colorPalette";

const PlatformIcon = props => {
  const { name, onPress, size, style, color } = props;
  const prefix = isAndroid ? "md" : "ios";

  return <Ionicons name={`${prefix}-${name}`} size={size} style={style} color={color} onPress={onPress} />;
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
