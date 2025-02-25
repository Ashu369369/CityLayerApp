import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SignupPage from "./screens/Signup";
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import { RootStackParamList } from "./navigation/RootStackParams";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./state/store";
import MainNavBar from "./component/mainNavBar";
import LoginPage from "./screens/Login";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const AppContent: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.user.id) !== null && useSelector((state: RootState) => state.user.id) !== "null";

  return (
    <NavigationContainer>
      {loggedIn ? (
        <MainNavBar />
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignupPage} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
