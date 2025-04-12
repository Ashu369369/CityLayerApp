import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TextInput, Button, Text, Card, IconButton } from "react-native-paper";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../api/postApi"; // For program posts
import { createProjectUpdate } from "../api/projectUpdatesApi"; // For project updates
import { RootStackParamList } from "../navigation/RootStackParams";
import { useSelector } from "react-redux";

type CreatePostRouteParam = RouteProp<RootStackParamList, "CreatePost">;

const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation();
  const userId = useSelector((state: any) => state.id);
  const route = useRoute<CreatePostRouteParam>();
  const { id, type } = route.params; // `type` can be "program" or "project"

  // State for post fields
  const [entityId, setEntityId] = useState<number | null>(id || null);
  const [leaderId, setLeaderId] = useState<number | null>(null);
  const [textContent, setTextContent] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [location, setLocation] = useState("");
  const [mediaFiles, setMediaFiles] = useState<{ type: string; url: string }[]>([]);
  const [mediaType, setMediaType] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleAddMedia = () => {
    if (mediaType && mediaUrl) {
      setMediaFiles([...mediaFiles, { type: mediaType, url: mediaUrl }]);
      setMediaType("");
      setMediaUrl("");
    } else {
      Alert.alert("Error", "Please provide both media type and URL.");
    }
  };

  const handlePickMedia = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Media library permission is required to pick media.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const pickedMedia = result.assets[0];
        const type = pickedMedia.type === "video" ? "video" : "image";
        setMediaFiles([...mediaFiles, { type, url: pickedMedia.uri }]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick media.");
      console.error(error);
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to get the current location.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      // Reverse geocode to get the location name
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const { city, region, country } = reverseGeocode[0];
        const locationName = `${city || "Unknown City"}, ${region || "Unknown Region"}, ${country || "Unknown Country"}`;
        setLocation(locationName);
        setLoadingLocation(false);
      } else {
        Alert.alert("Error", "Unable to fetch location name.");
        setLoadingLocation(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get the current location.");
      console.error(error);
      setLoadingLocation(false);
    }
  };

  const handleSubmit = () => {
    if (!entityId || !leaderId || !textContent || !location) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (type === "program") {
      // Create a program post
      const newProgramPost = {
        programId: entityId,
        leaderId,
        textContent,
        location,
        mediaFiles,
        createdBy: userId, // Replace with the current user's ID
      };

      const createdPost = createPost(newProgramPost);
      Alert.alert("Success", "Program post created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
      console.log("Created Program Post:", createdPost);
    } else if (type === "project") {
      // Create a project update
      const newProjectUpdate = {
        id: entityId,
        description: textContent,
        dateAndTime: new Date().toISOString(),
        projectId: entityId!,
        createdBy: userId, 
        mediaFiles: mediaFiles.map((media) => media.url), 
        location,
      };

      createProjectUpdate(newProjectUpdate);
      Alert.alert("Success", "Project update created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
      console.log("Created Project Update:", newProjectUpdate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Create a New {type === "program" ? "Program" : "Project"} Post
          </Text>
          <TextInput
            label={`${type === "program" ? "Program" : "Project"} ID`}
            value={entityId ? entityId.toString() : ""}
            onChangeText={(value) => setEntityId(Number(value))}
            mode="outlined"
            keyboardType="numeric"
            disabled
            style={styles.input}
          />

          <TextInput
            label="Leader ID"
            value={leaderId ? leaderId.toString() : ""}
            onChangeText={(value) => setLeaderId(Number(value))}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Text Content"
            value={textContent}
            onChangeText={setTextContent}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />

          <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            mode="outlined"
            style={styles.input}
          />
          {loadingLocation ? (
            <Text>Getting Current location...</Text>
          ) : (
            <Button mode="contained" onPress={handleGetCurrentLocation}>
              Get Current Location
            </Button>
          )}

          <Text variant="titleMedium" style={styles.mediaTitle}>
            Add Media
          </Text>
          <TextInput
            label="Media Type (e.g., image, video)"
            value={mediaType}
            onChangeText={setMediaType}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Media URL"
            value={mediaUrl}
            onChangeText={setMediaUrl}
            mode="outlined"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAddMedia} style={styles.addMediaButton}>
            Add Media by URL
          </Button>
          <Button mode="contained" onPress={handlePickMedia} style={styles.addMediaButton}>
            Pick Media from Device
          </Button>

          {mediaFiles.length > 0 && (
            <View style={styles.mediaList}>
              <Text variant="titleMedium" style={styles.mediaTitle}>
                Media Files:
              </Text>
              {mediaFiles.map((media, index) => (
                <View key={index} style={styles.mediaItem}>
                  <Text>{media.type}: {media.url}</Text>
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() =>
                      setMediaFiles(mediaFiles.filter((_, i) => i !== index))
                    }
                  />
                </View>
              ))}
            </View>
          )}

          <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
            Create Post
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  card: {
    margin: 10,
    padding: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  textArea: {
    marginBottom: 15,
    height: 100,
  },
  mediaTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  addMediaButton: {
    marginBottom: 20,
  },
  mediaList: {
    marginBottom: 20,
  },
  mediaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default CreatePostScreen;