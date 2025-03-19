import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ErrorBox from "../component/ErrorBox";
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
      title: "Department Title",
      id: 1,
      description: "Department Description",
      imageUrl: "https://example.com/image.jpg",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <Text style={styles.welcomeMessage}>Welcome to the CityLayerApp!</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToSearch}>
        <Text style={styles.buttonText}>Go to Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  welcomeMessage: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
