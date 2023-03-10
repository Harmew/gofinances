import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

// Screens
import { Dashboard } from "../screen/Dashboard";
import { Register } from "../screen/Register";
import { Resume } from "../screen/Resume";

// Stack Navigator
const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 88,
        },
      }}>
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialIcons
                name="format-list-bulleted"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialIcons name="attach-money" size={size} color={color} />
            );
          },
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <MaterialIcons name="pie-chart" size={size} color={color} />;
          },
        }}
      />
    </Navigator>
  );
}
