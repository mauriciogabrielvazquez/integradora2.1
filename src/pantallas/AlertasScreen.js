import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const notifications = [
  { id: "1", type: "Ritmo cardíaco", value: "180 BPM", status: "Peligro", time: "14:30", date: "2025/03/10", color: "red" },
  { id: "2", type: "Ritmo cardíaco", value: "95 BPM", status: "Normal", time: "14:32", date: "2025/03/10", color: "green" },
  { id: "3", type: "Ritmo cardíaco", value: "110 BPM", status: "Preocupante", time: "14:35", date: "2025/03/10", color: "orange" },
  { id: "4", type: "Tiempo acostado", value: "12 HRS", status: "Peligro", time: "14:40", date: "2025/03/10", color: "red" },
  { id: "5", type: "Tiempo acostado", value: "6 HRS", status: "Normal", time: "14:50", date: "2025/03/10", color: "green" },
  { id: "6", type: "Tiempo acostado", value: "9 HRS", status: "Preocupante", time: "15:00", date: "2025/03/10", color: "orange" },
  { id: "7", type: "Temperatura de ambiente", value: "38°C", status: "Peligro", time: "15:10", date: "2025/03/10", color: "red" },
  { id: "8", type: "Temperatura de ambiente", value: "25°C", status: "Normal", time: "15:15", date: "2025/03/10", color: "green" },
  { id: "9", type: "Temperatura de ambiente", value: "32°C", status: "Preocupante", time: "15:20", date: "2025/03/10", color: "orange" },
  { id: "10", type: "Ventilador", value: "Se apagó", status: "Peligro", time: "15:25", date: "2025/03/10", color: "red" },
  { id: "11", type: "Ventilador", value: "Se encendió", status: "Normal", time: "15:30", date: "2025/03/10", color: "green" },
];

export default function AlertasScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={[styles.title, { color: item.color }]}>
              {item.type}: {item.value} ({item.status})
            </Text>
            <Text style={styles.date}>Hora: {item.time} - Fecha: {item.date}</Text>
            <View style={styles.divider} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 100,
  },
  notification: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 10,
  },
});
