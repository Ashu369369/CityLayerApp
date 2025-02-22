
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SignupPage from "./screens/Signup";
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import { RootStackParamList } from "./navigation/RootStackParams";
import { Provider } from "react-redux";
import store from "./state/store";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
