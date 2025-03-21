import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// Importar imagen local desde assets
import perfilImg from "../../assets/perfil.png";

// Componente reutilizable para las tarjetas de información
const InfoCard = ({ title, value, emoji }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.content}>
      <Text style={styles.value}>{value}</Text>
      <Image source={{ uri: `https://emojicdn.elk.sh/${emoji}` }} style={styles.icon} />
    </View>
    <Text style={styles.subtitle}>Último registro</Text>
  </View>
);

export default function HomeScreen({ navigation }) {
  const userName = "Víctor";

  // Definir mensaje de saludo según la hora
  const hour = new Date().getHours();
  let greeting = "¡Hola!";

  if (hour < 12) {
    greeting = `¡Buenos días, ${userName}! Qué gusto verte, qué bueno que sigas vivo. ☀️`;
  } else if (hour < 18) {
    greeting = `¡Buenas tardes, ${userName}! Espero que tu día vaya bien. 🌤️`;
  } else {
    greeting = `¡Buenas noches, ${userName}! Descansa bien y recarga energías. 🌙`;
  }

  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <Image source={perfilImg} style={styles.profileImage} />
      </TouchableOpacity>

      {/* Mensaje de saludo */}
      <Text style={styles.greeting}>{greeting}</Text>

      {/* Tarjetas de información */}
      <InfoCard title="Temperatura" value="99° C" emoji="🔥" />
      <InfoCard title="Ritmo cardiaco" value="85 BPM" emoji="❤️" />
      <InfoCard title="Tiempo acostado" value="2:35 horas" emoji="😴" />
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#007AFF",
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001f54",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f1f1f1",
    width: "90%",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#001f54",
    marginBottom: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5733",
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
});

