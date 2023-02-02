import React from "react";

// Stack Navigator
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import { SignIn } from "../screen/SignIn";

// Create Stack Navigator
const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
