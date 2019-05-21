import React from "react";
import { bool, string } from "prop-types";

import PlatformIcon from "../PlatformIcon/PlatformIcon.component";
import Colors from "../../constants/Colors";

const tabBarIconSize = 26;

const TabBarIcon = props => {
  const { name, focused } = props;

  return (
    <PlatformIcon
      name={name}
      size={tabBarIconSize}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

TabBarIcon.propTypes = {
  focused: bool,
  name: string
};

export default TabBarIcon;
