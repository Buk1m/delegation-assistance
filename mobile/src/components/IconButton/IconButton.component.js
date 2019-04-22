import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "expo";
import { string, object, func } from "prop-types";

const IconButton = props => {
  const { style, onPress, iconName, iconStyle } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon.Ionicons name={iconName} style={iconStyle} />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  style: object,
  onPress: func,
  iconName: string,
  iconStyle: object
};

export default IconButton;
