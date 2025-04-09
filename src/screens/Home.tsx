import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const userToken = useSelector((state: RootState) => state.auth);

  console.log(userState);
  console.log(userToken);

  const navigateToSearch = () => {
    navigation.navigate("Department", {
      id: 1,
      title: "Department Title",
      description: "Department Description",
      imageUrl: "https://example.com/image.jpg",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>CityLayer Dashboard</Text>
      <Text style={styles.welcomeMessage}>Welcome, {userState.firstName} 👋</Text>

      {/* 🔷 Widget Section */}
      <View style={styles.widgetContainer}>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Active Sensors</Text>
          <Text style={styles.widgetValue}>128</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Incidents Today</Text>
          <Text style={styles.widgetValue}>5</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Traffic Index</Text>
          <Text style={styles.widgetValue}>High</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Energy Usage</Text>
          <Text style={styles.widgetValue}>1.2 MWh</Text>
        </View>
      </View>

      {/* 🔸 Hardcoded Realtime Dashboard */}
      <View style={styles.dashboardBox}>
        <Text style={styles.dashboardTitle}>Realtime Dashboard</Text>
        <Text style={styles.dashboardText}>🚨 Water Leak Detected at Zone 4</Text>
        <Text style={styles.dashboardText}>🌡 Temperature Sensor: 34.5°C</Text>
        <Text style={styles.dashboardText}>📶 Network Status: Stable</Text>
        <Text style={styles.dashboardText}>💧 Reservoir Level: 73%</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  welcomeMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  widgetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
    marginBottom: 20,
  },
  widget: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    width: "47%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  widgetTitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  widgetValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  dashboardBox: {
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  dashboardText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen; 