import React from "react";
import { Text, View } from "react-native";

import Button from "../../components/Button/Button.component";
import { func } from "prop-types";
import styles from "./ProfileScreen.module.scss";

const ProfileScreen = props => {
  const { logoutUser } = props;
  return (
    <View>
      <Text>Profile Screen</Text>
      <View style={styles["logout-btn"]}>
        <Button onPress={() => logoutUser()} title="Logout" />
      </View>
    </View>
  );
};

ProfileScreen.propTypes = {
  logoutUser: func
};

export default ProfileScreen;
