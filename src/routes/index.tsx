import React from "react";

// Navigation Container
import { NavigationContainer } from "@react-navigation/native";

// Routes
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

// Context
import { useAuth } from "../hooks/auth";

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
