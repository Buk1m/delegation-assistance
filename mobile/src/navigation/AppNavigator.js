import React from "react";
import { createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";

import LoginScreen from "../features/LoginScreen/";
import HomeScreen from "../features/HomeScreen/";
import MainTabNavigator from "./MainTabNavigator";

const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      Main: MainTabNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);
