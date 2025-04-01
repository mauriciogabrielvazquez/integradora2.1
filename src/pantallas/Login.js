import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [codigo, setCodigo] = useState("");
  const navigation = useNavigation(); // Hook para navegar entre pantallas

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://mappa-backend.onrender.com/users/login/movil",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codeActivation: codigo }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();

      if (data.status === "active") {
        // Guardar los datos en AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        navigation.replace("Home"); // Redirige a la pantalla Home
      } else {
        Alert.alert("Error", "El usuario no está activo.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo iniciar sesión. Verifique el código o la conexión."
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        source={require("../../assets/favicon.png")}
        style={{ width: 80, height: 80, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Ingrese su Código</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "80%",
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
        placeholder="Código"
        value={codigo}
        onChangeText={(text) => setCodigo(text.toUpperCase())} // Convierte el texto a mayúsculas
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}
