import React from "react";
import { View, Button, StyleSheet } from "react-native";

const LoginScreen = props => {
  const { navigate } = props;
  return (
    <View style={styles.container}>
      <Button title="Sign in to app" onPress={() => navigate.navigate("Main")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2"
  }
});

export default LoginScreen;
