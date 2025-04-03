import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

// Importar imagen local desde assets
import perfilImg from "../../assets/perfil.png";

// Componente reutilizable para las tarjetas de información
const InfoCard = ({ title, value, emoji }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.content}>
      <Text style={styles.value}>{value}</Text>
      <Image
        source={{ uri: `https://emojicdn.elk.sh/${emoji}` }}
        style={styles.icon}
      />
    </View>
    <Text style={styles.subtitle}>Último registro</Text>
  </View>
);

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState(""); // Estado para el nombre del usuario
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar el nombre del usuario desde AsyncStorage
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData"); // Obtener datos del usuario
        if (storedData) {
          const parsedData = JSON.parse(storedData); // Parsear JSON
          setUserName(parsedData.name); // Actualizar estado con el nombre
        } else {
          Alert.alert("Error", "No se encontraron los datos del usuario.");
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "Ocurrió un error al cargar el nombre del usuario."
        );
      }
    };

    loadUserName();
  }, []);

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mappa-backend.onrender.com/sensores/temperatura/sensor123"
        );
        const data = await response.json();

        // Extraer los últimos 5 datos de temperatura y humedad
        const temperatures = data.slice(-10).map((item) => item.temperature);
        const humidities = data.slice(-10).map((item) => item.humedad);

        setTemperatureData(temperatures);
        setHumidityData(humidities);
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", "No se pudieron obtener los datos del servidor.");
        setLoading(false);
      }
    };
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);

    fetchData();
  }, []);

  // Definir mensaje de saludo según la hora
  const hour = new Date().getHours();
  let greeting = "¡Hola!";

  if (hour < 12) {
    greeting = `¡Buenos días, ${
      userName || "Usuario"
    }! Qué gusto verte, qué bueno que sigas vivo. ☀️`;
  } else if (hour < 18) {
    greeting = `¡Buenas tardes, ${
      userName || "Usuario"
    }! Espero que tu día vaya bien. 🌤️`;
  } else {
    greeting = `¡Buenas noches, ${
      userName || "Usuario"
    }! Descansa bien y recarga energías. 🌙`;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Imagen de perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <Image source={perfilImg} style={styles.profileImage} />
      </TouchableOpacity>

      {/* Mensaje de saludo */}
      <Text style={styles.greeting}>{greeting}</Text>

      {/* Tarjetas de información */}
      <InfoCard
        title="Temperatura"
        value={`${temperatureData[temperatureData.length - 1] || "--"}° C`}
        emoji="🔥"
      />
      <InfoCard
        title="Humedad"
        value={`${humidityData[humidityData.length - 1] || "--"}%`}
        emoji="💧"
      />

      {/* Gráfica de temperatura */}
      {!loading && temperatureData.length > 0 && (
        <View>
          <Text style={styles.chartTitle}>Temperatura (Últimos registros)</Text>
          <LineChart
            data={{
              labels: ["1", "2", "3", "4", "5"],
              datasets: [{ data: temperatureData }],
            }}
            width={Dimensions.get("window").width - 40} // Ancho de la gráfica
            height={220}
            yAxisSuffix="°C"
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={styles.chart}
          />
        </View>
      )}

      {/* Gráfica de humedad */}
      {!loading && humidityData.length > 0 && (
        <View>
          <Text style={styles.chartTitle}>Humedad (Últimos registros)</Text>
          <LineChart
            data={{
              labels: ["1", "2", "3", "4", "5"],
              datasets: [{ data: humidityData }],
            }}
            width={Dimensions.get("window").width - 40} // Ancho de la gráfica
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: "#0000ff",
              backgroundGradientFrom: "#4facfe",
              backgroundGradientTo: "#00f2fe",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#00f2fe",
              },
            }}
            style={styles.chart}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8ecff",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#007AFF",
    marginBottom: 10,
    alignSelf: "center",
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
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001f54",
    textAlign: "center",
    marginVertical: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: "center",
  },
});
