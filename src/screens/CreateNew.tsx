import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Route, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
type CreateNewScreenRouteProp = RouteProp<RootStackParamList, "CreateNew">; // Define the route prop type for CreateNew screen
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { createDepartment } from "../api/deptApi";
import Constants from "expo-constants";

const CreateNewScreen: React.FC = (params) => {
  const route = useRoute<CreateNewScreenRouteProp>(); // Access route params
  const { type, id } = route.params; // Destructure type and id from route params
  // const type = route.type; // Get the type from route params
  // const [type, setType] = useState("Department");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [repeat, setRepeat] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [customStatus, setCustomStatus] = useState("");
  const [budget, setBudget] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [workforce, setWorkforce] = useState("");
  const [timeline, setTimeline] = useState("");
  const [createdat, setCreatedat] = useState("");
  const [createdby, setCreatedby] = useState("");
  const loggedInUser = useSelector((state: RootState) => state.user);
  const navigation = useNavigation(); // Access navigation prop

  const GRAPHQL_ENDPOINT = `http://${Constants.expoConfig?.extra?.config}:4000/graphql`;

  const handleSubmit = async () => {
    setLoading(true); // Show loading indicator
    try {
      if (type === "Department") {
        if (!title || !description) {
          Alert.alert(
            "Error",
            "Please fill out all department fields with valid image URL"
          );
          return;
        }
        const query = `
          mutation($title: String!, $description: String!, $imageUrl: String!) {
            createDepartment(title: $title, description: $description, imageUrl: $imageUrl) {
              departmentid title
            }
          }
        `;
        const variables = { title, description, imageUrl };
        const response = await fetch(GRAPHQL_ENDPOINT!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables }),
        });
        const json = await response.json();
        if (json.errors) throw new Error(json.errors[0].message);
        Alert.alert("Success", `Department created successfully!`);
        navigation.dispatch({
          type: "NAVIGATE",
          payload: { name: "Departments", params: { refresh: true } },
        });
      } else if (type === "Project") {
        // Add the new project to the hardcoded array
        const newProject = {
          id: Math.random(), // Generate a unique ID
          title,
          description,
          startDate,
          dueDate,
          status: status === "Custom" ? customStatus : status,
          createdAt: createdat || new Date().toISOString(),
        };

        console.log("New Project:", newProject);
        Alert.alert("Success", "Project created successfully!");
      } else if (type === "Program") {
        // Add the new program to the hardcoded array
        const newProgram = {
          id: Math.random(), // Generate a unique ID
          title,
          description,
          startDate,
          duration,
          repeat,
          createdAt: createdat || new Date().toISOString(),
        };

        console.log("New Program:", newProgram);
        Alert.alert("Success", "Program created successfully!");
      }
    } catch (error) {
      console.error("Error creating item:", error);
      Alert.alert("Error", `Failed to create ${type}. Please try again.`);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // function setCreatedby(arg0: string): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New {type}</Text>
      {type === "Department" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </>
      )}
      {type === "Announcement" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Message Title"
            value={messageTitle}
            onChangeText={setMessageTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Message Body"
            value={messageBody}
            onChangeText={setMessageBody}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Created By (optional)"
            value={String(loggedInUser.username)}
            onChangeText={setCreatedby}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Created At (optional, YYYY-MM-DD)"
            value={createdat}
            onChangeText={setCreatedat}
          />
        </>
      )}

      {type === "Project" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Due Date (YYYY-MM-DD)"
            value={dueDate}
            onChangeText={setDueDate}
          />
          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}
            style={styles.picker}
          >
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Ongoing" value="Ongoing" />
            <Picker.Item label="Done" value="Done" />
            <Picker.Item label="Custom" value="Custom" />
          </Picker>
          {status === "Custom" && (
            <TextInput
              style={styles.input}
              placeholder="Enter Custom Status"
              value={customStatus}
              onChangeText={setCustomStatus}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Created At (optional, YYYY-MM-DD)"
            value={createdat}
            onChangeText={setCreatedat}
          />
        </>
      )}

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#007BFF"
          style={{ marginBottom: 20 }}
        />
      )}
      {/* Submit Button */}
      <Button
        title={`Create ${type}`}
        onPress={handleSubmit}
        disabled={loading}
      />
    </ScrollView>
  );
};

export default CreateNewScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  picker: {
    marginBottom: 20,
    height: Platform.OS === "ios" ? 200 : 50, // iOS picker height
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
    color: "#555",
  },
});
