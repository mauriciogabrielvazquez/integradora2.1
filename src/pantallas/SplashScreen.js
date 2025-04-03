import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        navigation.replace("Home"); // Redirige a Home si hay sesión
      } else {
        navigation.replace("Login"); // Redirige a Login si no hay sesión
      }
    };

    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
