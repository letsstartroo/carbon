import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import OcorrenciaScreen from "../screens/OcorrenciaScreen";
import CriarOcorrenciaScreen from "../screens/CriarOcorrenciaScreen";
import HistoricoScreen from "../screens/HistoricoScreen";
import SettingsScreen from "../screens/SettingsScreen";

const HomeStack = createStackNavigator(
  {
    Home: OcorrenciaScreen,
    CriarOcorrencia: CriarOcorrenciaScreen
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Ocorrencia",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-create` : "md-create"}
    />
  )
};

const LinksStack = createStackNavigator({
  Links: HistoricoScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Histórico",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-time" : "md-time"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Configurações",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-cog" : "md-cog"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});
