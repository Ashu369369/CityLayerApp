// filepath: d:\college\capstone\frontend\CityLayerApp\src\screens\CreateNewScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParams';

type CreateNewScreenRouteProp = RouteProp<RootStackParamList, 'CreateNew'>;

const CreateNewScreen: React.FC = () => {
  const route = useRoute<CreateNewScreenRouteProp>();
  const { type, id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New {type} {id? `of ${id}`:null}</Text>
      {/* Add your form or create functionality here */}
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
});

export default CreateNewScreen;