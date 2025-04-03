import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../pantallas/Login";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../pantallas/SplashScreen"; // 👈 Importar la pantalla de carga
import PerfilScreen from "../pantallas/PerfilScreen"; // 👈 Importar la pantalla de perfil

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Iniciar Sesión" }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Ocultar el encabezado
        />

        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{ title: "Perfil" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
