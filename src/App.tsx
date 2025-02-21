import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignupPage from "./screens/Signup";

export default function App() {
  return (
    <View style={styles.container}>
      <SignupPage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
});
