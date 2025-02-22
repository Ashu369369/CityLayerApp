import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const departments = [
  { id: "1", name: "Utility Department" },
  { id: "2", name: "Finance Department" },
  // Add more departments as needed
];

const DepartmentScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Departments</Text>
      <FlatList
        data={departments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
  },
});

export default DepartmentScreen;
