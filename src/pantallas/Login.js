import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [codigo, setCodigo] = useState("");
  const navigation = useNavigation(); // Hook para navegar entre pantallas

  const handleLogin = () => {
    if (codigo === "A1B2") {
      navigation.replace("Home"); // Redirige a la pantalla Home
    } else {
      Alert.alert("Error", "Código incorrecto");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Image source={require("../../assets/favicon.png")} style={{ width: 80, height: 80, marginBottom: 20 }} resizeMode="contain" />
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Ingrese su Código</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, width: "80%", marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 }}
        placeholder="Código"
        value={codigo}
        onChangeText={(text) => setCodigo(text.toUpperCase())} // Convierte el texto a mayúsculas
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}
