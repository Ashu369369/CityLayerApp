import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./state/store";
import MainNavBar from "./component/mainNavBar";
import LoginPage from "./screens/Login";
import SignupPage from "./screens/Signup";
import { KeyboardAvoidingView, Platform } from "react-native";
// import Project from "./screens/Project";

export default function App() {
  // const fontSize = useSelector((state: RootState) => state.preferences.fontSize);
  // const highContrast = useSelector((state: RootState) => state.preferences.highContrast);


  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </Provider>
  );
}

const AppContent: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.user.id) != null;
  //for theme
  const fontSize = useSelector((state: RootState) => state.preferences.fontSize);
  const highContrast = useSelector((state: RootState) => state.preferences.highContrast);
  const theme = getDynamicTheme(fontSize, highContrast); // Generate the dynamic theme

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // tweak this offset depending on your header/nav
      >
        <PaperProvider theme={theme}>
          {loggedIn ? <MainNavBar /> : <AuthNavigator />}
          <StatusBar style="auto" />
        </PaperProvider>
      </KeyboardAvoidingView>
    </>
  );
};

import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import theme from "./theme/theme";
import getDynamicTheme from "./theme/theme";
const AuthStack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginPage} />
    <AuthStack.Screen name="Signup" component={SignupPage} />
  </AuthStack.Navigator>
);
