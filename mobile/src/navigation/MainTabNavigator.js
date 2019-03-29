import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon/TabBarIcon.component";
import HomeScreen from "../features/HomeScreen";
import ProfileScreen from "../features/ProfileScreen";
import DelegationsScreen from "../features/DelegationsScreen";
import CreateDelegationScreen from "../features/CreateDelegationScreen";
import ExpensesScreen from "../features/ExpensesScreen";

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

const ExpensesStack = createStackNavigator({
  Home: ExpensesScreen
});
ExpensesStack.navigationOptions = {
  tabBarLabel: "Expenses",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === "ios" ? `ios-card` : "md-card"} />
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
  ExpensesStack,
  ProfileStack
});
