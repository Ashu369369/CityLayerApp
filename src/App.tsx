import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './state/store';
import SignupPage from './screens/Signup';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SignupPage />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
