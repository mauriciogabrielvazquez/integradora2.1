import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DispositivosScreen() {
  const [ventiladorEncendido, setVentiladorEncendido] = useState(false);
  const [despertadorEncendido, setDespertadorEncendido] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Dispositivos</Text>

      {/* BOTÓN VENTILADOR */}
      <TouchableOpacity
        style={[styles.button, ventiladorEncendido ? styles.on : styles.off]}
        onPress={() => setVentiladorEncendido(!ventiladorEncendido)}
      >
        <Text style={styles.buttonText}>
          {ventiladorEncendido ? "Apagar Ventilador" : "Encender Ventilador"}
        </Text>
      </TouchableOpacity>

      {/* BOTÓN DESPERTADOR */}
      <TouchableOpacity
        style={[styles.button, despertadorEncendido ? styles.on : styles.off]}
        onPress={() => setDespertadorEncendido(!despertadorEncendido)}
      >
        <Text style={styles.buttonText}>
          {despertadorEncendido ? "Apagar Despertador" : "Encender Despertador"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: 200,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  on: {
    backgroundColor: "green",
  },
  off: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
