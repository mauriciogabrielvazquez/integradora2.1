import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Importar imagen local desde assets
import perfilImg from "../../assets/perfil.png";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
      <Image source={perfilImg} style={styles.profileImage} />

      {/* Información del usuario */}
      <Text style={styles.userName}>Víctor</Text>

      {/* Sección de información personal */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Información Personal</Text>
        <Text>Edad: 25 años</Text>
        <Text>País: México</Text>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8ecff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#007AFF",
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#001f54",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001f54",
    marginBottom: 10,
  },
});

