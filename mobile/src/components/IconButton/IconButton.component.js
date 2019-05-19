import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "expo";
import { string, object, func } from "prop-types";
import PlatformIcon from "../PlatformIcon/PlatformIcon.component";

const getProperIcon = (iconName, iconStyle, iconPackName) => {
  switch (iconPackName.toLowerCase()) {
    case "ionicons":
      return <PlatformIcon name={iconName} style={iconStyle} />;
    case "materialcommunityicons":
      return <Icon.MaterialCommunityIcons name={iconName} style={iconStyle} />;
    default:
      return <PlatformIcon name="help" style={iconStyle} />;
  }
};

const IconButton = props => {
  const { style, onPress, iconName, iconStyle, iconPackName = "Ionicons" } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {getProperIcon(iconName, iconStyle, iconPackName)}
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  iconName: string,
  iconPackName: string,
  iconStyle: object,
  onPress: func,
  style: object
};

export default IconButton;
