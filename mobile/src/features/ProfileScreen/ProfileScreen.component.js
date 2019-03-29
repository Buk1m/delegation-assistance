import React from "react";
import { Text, View, Button } from "react-native";

const ProfileScreen = props => {
  const { logoutUser } = props;
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button onPress={() => logoutUser()} title="logout" />
    </View>
  );
};

export default ProfileScreen;
