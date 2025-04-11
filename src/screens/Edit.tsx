import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { RootStackParamList } from '../navigation/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { getDepartment, updateDepartment } from '../api/deptApi';
import Constants from "expo-constants";
import { useTheme } from 'react-native-paper';
import { DynamicTheme } from '../theme/theme';

type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;

type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Edit'>;

const EditScreen: React.FC = () => {
  
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const route = useRoute<EditScreenRouteProp>();
  const navigation = useNavigation<EditScreenNavigationProp>();

  const { type, id } = route.params;

  const [departmentid] = useState(id); // Not editable
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageurl, setImageurl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDepartmentData = async () => {
    try {
      let response = await getDepartment(departmentid.toString());
      console.log("response", response);
      const data =  response.data?.getDepartment;

      setTitle(data?.title ?? '');
      setDescription(data?.description ?? '');
      setImageurl(data?.imageUrl ?? null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load department data.');
    }
  };

  useEffect(() => {
    fetchDepartmentData();
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageurl(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let response = await updateDepartment(departmentid, {
        title, description, imageUrl: imageurl ?? undefined,
      });

      // Check if the response contains an error
      if (response.errors || !response.data) {
        throw new Error('Failed to update department');
      }
      Alert.alert('Success', 'Department updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error('❌ Error updating department:', error);
      Alert.alert('Error', 'Failed to update department.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit {type}</Text>

      <Text style={styles.label}>Department ID (not editable)</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={departmentid.toString()}
        editable={false}
      />

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Pick an Image</Text>
      </TouchableOpacity>

      {imageurl && <Image source={{ uri: imageurl }} style={styles.image} />}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Submitting...' : 'Submit Changes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  disabledInput: {
    backgroundColor: '#f2f2f2',
    color: '#999',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    backgroundColor: '#81d5a6', // Sea Green
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: '#81d5a6', // Sea Green
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditScreen;