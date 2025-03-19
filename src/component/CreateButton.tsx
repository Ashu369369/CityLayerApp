// filepath: d:\college\capstone\frontend\CityLayerApp\src\components\CreateButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParams';

type CreateButtonNavigationProp = StackNavigationProp<RootStackParamList, 'CreateNew'>;

interface CreateButtonProps {
  type: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ type }) => {
  const navigation = useNavigation<CreateButtonNavigationProp>();

  const handlePress = () => {
    navigation.navigate('CreateNew', { type });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Create New</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateButton;