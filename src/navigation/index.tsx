import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "../screens/settings";
import { HomeScreen } from "../screens/home";
import { BottomNavigation, Text } from "react-native-paper";
import React from "react";

const Tab = createBottomTabNavigator();

const AlbumsRoute = () => <Text>Albums</Text>;

export const MyTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "addRecord",
      title: "calendar-today",
      focusedIcon: "calendar-today",
    },

    {
      key: "setting",
      title: "Settings",
      focusedIcon: "account-settings",
      unfocusedIcon: "account-settings-outline",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    addRecord: AlbumsRoute,
    setting: SettingsScreen,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
