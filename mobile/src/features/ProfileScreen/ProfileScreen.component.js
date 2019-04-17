import React from "react";
import { Text, View, Button } from "react-native";
import { func } from "prop-types";

const ProfileScreen = props => {
  const { logoutUser } = props;
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button onPress={() => logoutUser()} title="logout" />
    </View>
  );
};

ProfileScreen.propTypes = {
  logoutUser: func
};

export default ProfileScreen;
