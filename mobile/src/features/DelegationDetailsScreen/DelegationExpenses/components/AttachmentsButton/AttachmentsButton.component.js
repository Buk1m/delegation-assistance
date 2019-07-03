import React from "react";
import { View, TouchableOpacity } from "react-native";
import { bool, func, object } from "prop-types";

import PlatformIcon from "../../../../../components/PlatformIcon/PlatformIcon.component";

import styles from "./AttachmentsButton.module.scss";
import colors from "../../../../../assets/styles/_colorPalette.scss";

const getButtonStyle = disabled => {
  return disabled ? styles.disabledButton : styles.enabledButton;
};

const getIconStyle = isCollapsed => {
  return isCollapsed ? styles.collapsed : null;
};

const pinIconSize = 26;

const AttachmentsButton = props => {
  const { style, disabled, isCollapsed, action } = props;
  return (
    <View style={style}>
      <TouchableOpacity onPress={action} disabled={disabled} style={getButtonStyle(disabled)}>
        <PlatformIcon
          name="attach"
          size={pinIconSize}
          style={getIconStyle(isCollapsed)}
          color={colors.primaryTextColor}
        />
      </TouchableOpacity>
    </View>
  );
};

AttachmentsButton.propTypes = {
  action: func,
  disabled: bool,
  isCollapsed: bool,
  style: object
};

export default AttachmentsButton;
