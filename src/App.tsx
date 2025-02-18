<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignupPage from './screens/Signup';
>>>>>>> e666f54f8e71e03be58d3d47b6fb73a97d697eee

export default function App() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text>Open up App.tsx to start working on your app!</Text>
      <ActivityIndicator />
=======
      <SignupPage/>
>>>>>>> e666f54f8e71e03be58d3d47b6fb73a97d697eee
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
=======
    width:'100%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
>>>>>>> e666f54f8e71e03be58d3d47b6fb73a97d697eee
  },
});
