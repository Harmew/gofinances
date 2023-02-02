import React from "react";

// Gesture Handler
import "react-native-gesture-handler";

// Intl for Android Compatibility
import "intl";
import "intl/locale-data/jsonp/pt-BR";

// Expo
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

// Styled Components
import { ThemeProvider } from "styled-components";

// Context
import { AuthProvider, useAuth } from "./src/hooks/auth";

// Fonts
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

// Roures
import { Routes } from "./src/routes";

// Theme
import theme from "./src/global/styles/theme";

export default function App() {
  // Fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  // Loading
  if (!fontsLoaded || userStorageLoading) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
