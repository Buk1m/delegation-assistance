import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon/TabBarIcon.component";
import HomeScreen from "../features/HomeScreen";
import ProfileScreen from "../features/ProfileScreen";
import DelegationsScreen from "../features/DelegationsScreen";
import CreateDelegationScreen from "../features/CreateDelegationScreen";
import ExpensesScreen from "../features/ExpensesScreen";
import DelegationDetailsScreen from "../features/DelegationDetailsScreen";
import CreateDelegationFlightScreen from "../features/CreateDelegationFlightScreen";
import CreateDelegationAccommodationScreen from "../features/CreateDelegationAccommodationScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />
};

const DelegationsStack = createStackNavigator({
  Home: DelegationsScreen,
  CreateDelegation: CreateDelegationScreen,
  DelegationDetails: DelegationDetailsScreen,
  CreateExpense: ExpensesScreen,
  CreateDelegationFlight: CreateDelegationFlightScreen,
  CreateDelegationAccommodation: CreateDelegationAccommodationScreen
});
DelegationsStack.navigationOptions = {
  tabBarLabel: "Delegations",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="briefcase" />
};

const ProfileStack = createStackNavigator({
  Home: ProfileScreen
});
ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="person" />
};

export default createBottomTabNavigator({
  HomeStack,
  DelegationsStack,
  ProfileStack
});
