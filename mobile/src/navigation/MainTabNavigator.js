import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon/TabBarIcon.component";
import HomeScreen from "../features/HomeScreen";
import ProfileScreen from "../features/ProfileScreen";
import DelegationsScreen from "../features/DelegationsScreen";
import CreateDelegationScreen from "../features/CreateDelegationScreen";
import ChecklistScreen from "../features/ChecklistScreen";
import CreateTaskScreen from "../features/CreateTaskScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === "ios" ? `ios-home` : "md-home"} />
};

const DelegationsStack = createStackNavigator({
  Home: DelegationsScreen,
  CreateDelegation: CreateDelegationScreen
});
DelegationsStack.navigationOptions = {
  tabBarLabel: "Delegations",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? `ios-briefcase` : "md-briefcase"} />
  )
};

const ChecklistStack = createStackNavigator({
  Checklist: ChecklistScreen,
  CreateTask: CreateTaskScreen
});
ChecklistStack.navigationOptions = {
  tabBarLabel: "Checklist",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? `ios-checkbox-outline` : "md-checkbox-outline"} />
  )
};

const ProfileStack = createStackNavigator({
  Home: ProfileScreen
});
ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? `ios-person` : "md-person"} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  DelegationsStack,
  ChecklistStack,
  ProfileStack
});
