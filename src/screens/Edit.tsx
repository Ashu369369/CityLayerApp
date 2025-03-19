// filepath: d:\college\capstone\frontend\CityLayerApp\src\screens\EditScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParams';

type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;

const EditScreen: React.FC = () => {
  const route = useRoute<EditScreenRouteProp>();
  const { type, id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit {type}</Text>
      <Text style={styles.detail}>ID: {id}</Text>
      {/* Add your form or edit functionality here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default EditScreen;