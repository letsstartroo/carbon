import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CameraScreen from "../screens/CameraScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen
  },
  {
    mode: "modal"
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  headerTitle: "oi",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export default HomeStack;
