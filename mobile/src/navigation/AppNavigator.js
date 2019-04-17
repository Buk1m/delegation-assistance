import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import LoginScreen from "../features/LoginScreen/";
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
