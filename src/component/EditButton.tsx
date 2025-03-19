// filepath: d:\college\capstone\frontend\CityLayerApp\src\components\EditButton.tsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParams';

type EditButtonNavigationProp = StackNavigationProp<RootStackParamList, 'Edit'>;

interface EditButtonProps {
  type: string;
  id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ type, id }) => {
  const navigation = useNavigation<EditButtonNavigationProp>();

  const handlePress = () => {
    navigation.navigate('Edit', { type, id });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image source={require('../../assets/pencil.png')} style={styles.image} />
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
  image: {
    width: 10,
    height: 10,
    tintColor: '#fff',
  },
});

export default EditButton;