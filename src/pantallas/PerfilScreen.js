import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importar imagen local desde assets
import perfilImg from "../../assets/perfil.png";

export default function PerfilScreen() {
  const [userData, setUserData] = useState(null);
  const [bpmMin, setBpmMin] = useState("");
  const [bpmMax, setBpmMax] = useState("");
  const [maxTimeLying, setMaxTimeLying] = useState("");

  // Cargar datos del usuario desde AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          Alert.alert("Error", "No se encontraron datos del usuario.");
        }

        // Cargar datos adicionales (BPM y tiempo máximo acostado)
        const storedBpmMin = await AsyncStorage.getItem("bpmMin");
        const storedBpmMax = await AsyncStorage.getItem("bpmMax");
        const storedMaxTimeLying = await AsyncStorage.getItem("maxTimeLying");

        if (storedBpmMin) setBpmMin(storedBpmMin);
        if (storedBpmMax) setBpmMax(storedBpmMax);
        if (storedMaxTimeLying) setMaxTimeLying(storedMaxTimeLying);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos del usuario.");
      }
    };

    loadUserData();
  }, []);

  // Guardar datos adicionales en AsyncStorage
  const handleSaveAdditionalData = async () => {
    try {
      await AsyncStorage.setItem("bpmMin", bpmMin);
      await AsyncStorage.setItem("bpmMax", bpmMax);
      await AsyncStorage.setItem("maxTimeLying", maxTimeLying);
      Alert.alert(
        "Éxito",
        "Los datos adicionales se han guardado correctamente."
      );
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los datos adicionales.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
      <Image source={perfilImg} style={styles.profileImage} />

      {/* Información del usuario */}
      {userData ? (
        <>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>

          {/* Sección de información personal */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Información Personal</Text>
            <Text>Subscripción: {userData.subscripcion}</Text>
            <Text>Rol: {userData.role}</Text>
            <Text>Estado: {userData.status}</Text>
            <Text>Bpm minimo: {storedBpmMin}</Text>
            <Text>Bpm máximo: {storedBpmMax}</Text>
            <Text>Tiempo máximo acostado: {storedMaxTimeLying}</Text>
          </View>
        </>
      ) : (
        <Text>Cargando datos del usuario...</Text>
      )}

      {/* Formulario para guardar datos adicionales */}
      <View style={styles.additionalDataBox}>
        <Text style={styles.infoTitle}>Datos Adicionales</Text>
        <TextInput
          style={styles.input}
          placeholder="BPM Mínimo"
          keyboardType="numeric"
          value={bpmMin}
          onChangeText={setBpmMin}
        />
        <TextInput
          style={styles.input}
          placeholder="BPM Máximo"
          keyboardType="numeric"
          value={bpmMax}
          onChangeText={setBpmMax}
        />
        <TextInput
          style={styles.input}
          placeholder="Tiempo máximo acostado (minutos)"
          keyboardType="numeric"
          value={maxTimeLying}
          onChangeText={setMaxTimeLying}
        />
        <Button title="Guardar Datos" onPress={handleSaveAdditionalData} />
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
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001f54",
    marginBottom: 10,
  },
  additionalDataBox: {
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
