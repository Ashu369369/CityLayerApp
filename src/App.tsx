import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./state/store";
import MainNavBar from "./component/mainNavBar";
import LoginPage from "./screens/Login";
import SignupPage from "./screens/Signup";
// import Project from "./screens/Project";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

const AppContent: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.user.id) != null;

  return (
    <>
      {loggedIn ? <MainNavBar /> : <AuthNavigator />}
      <StatusBar style="auto" />
    </>
  );
};

import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import theme from "./theme/theme";
const AuthStack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginPage} />
    <AuthStack.Screen name="Signup" component={SignupPage} />
  </AuthStack.Navigator>
);
