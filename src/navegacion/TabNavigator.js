import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Para íconos
import HomeScreen from "../pantallas/HomeScreen";
import AlertasScreen from "../pantallas/AlertasScreen";
import DispositivosScreen from "../pantallas/DispositivosScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Alertas") {
            iconName = "notifications";
          } else if (route.name === "Dispositivos") {
            iconName = "hardware-chip";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Oculta el encabezado superior
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alertas" component={AlertasScreen} />
      <Tab.Screen name="Dispositivos" component={DispositivosScreen} />
    </Tab.Navigator>
  );
}

