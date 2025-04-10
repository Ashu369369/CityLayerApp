// filepath: d:\college\capstone\frontend\CityLayerApp\src\screens\EditScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { RootStackParamList } from "../navigation/RootStackParams";

type EditScreenRouteProp = RouteProp<RootStackParamList, "Edit">;

const EditScreen: React.FC = () => {
  const route = useRoute<EditScreenRouteProp>();
  const { type, id } = route.params;

  const [departmentid] = useState(id.toString()); // Not editable
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media library is required!");
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

      const mutation = `
        mutation EditDepartment(
          $departmentid: ID!
          $title: String!
          $description: String!
          $imageurl: String!
        ) {
          editDepartment(
            departmentId: $departmentid
            title: $title
            description: $description
            imageUrl: $imageurl
          ) {
            departmentid
            title
            description
            imageUrl
          }
        }
      `;

      const variables = {
        departmentid,
        title,
        description,
        imageurl: imageurl || "https://via.placeholder.com/300",
      };

      const response = await axios.post("http://192.168.1.76:4000/graphql", {
        query: mutation,
        variables,
      });

      console.log("✅ Department updated:", response.data);
      Alert.alert("Success", "Department updated successfully!");
    } catch (error) {
      console.error("❌ Error updating department:", error);
      Alert.alert("Error", "Failed to update department.");
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
        value={departmentid}
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

      <Button
        title={loading ? "Submitting..." : "Submit Changes"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  disabledInput: {
    backgroundColor: "#f2f2f2",
    color: "#999",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  imagePicker: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
    marginTop: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 6,
  },
});

export default EditScreen;
