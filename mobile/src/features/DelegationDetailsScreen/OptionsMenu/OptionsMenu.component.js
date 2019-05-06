import React from "react";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "expo";
import { TouchableOpacity, View } from "react-native";

import styles from "../DelegationDetailsScreen.module";

const OptionsMenu = props => {
  const { navigation } = props;
  return (
    <View style={styles.options}>
      <Menu
        ref={navigation.getParam("setMenuRef")}
        button={
          <TouchableOpacity onPress={navigation.getParam("showMenu")}>
            <Icon.SimpleLineIcons size={28} color={styles.primary} name={`options-vertical`} />
          </TouchableOpacity>
        }
      >
        <MenuItem onPress={navigation.getParam("handleSend")}>Send to Travel Manager</MenuItem>
        <MenuDivider />
        <MenuItem onPress={navigation.getParam("handleEdit")}>Edit delegation</MenuItem>
        <MenuDivider />
        <MenuItem onPress={navigation.getParam("handleDelete")}>Delete delegation</MenuItem>
      </Menu>
    </View>
  );
};

export default OptionsMenu;
