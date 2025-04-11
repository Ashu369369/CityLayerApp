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
// type CreateNewScreenRouteProp = RouteProp<RootStackParamList, "CreateNew">; // Define the route prop type for CreateNew screen
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { createDepartment } from "../api/deptApi";
import Constants from "expo-constants";
import { createProject, getProjectsByDepartmentId } from "../api/projectApi";
import { demoProjects } from "../demoData/projects";
import { StackNavigationProp } from "@react-navigation/stack";
import { createProgram } from "../api/programApi";
import programs from "../demoData/programs";
import { getProgramsByDepartmentId } from "../api/programApi";
import { getDepartment } from "../api/deptApi";
import type { Department } from "../api/deptApi"; // Import the Department type

const CreateNewScreen: React.FC = (params) => {
  // const route = useRoute<CreateNewScreenRouteProp>(); // Access route params
  // const { type, id } = route.params; // Destructure type and id from route params
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Properly type the navigation prop

  type CreateNewScreenRouteProp = RouteProp<RootStackParamList, "CreateNew">;

  // type DepartmentScreenNavigationProp = StackNavigationProp<
  //   RootStackParamList,
  //   "Department"
  // >;

  const route = useRoute<CreateNewScreenRouteProp>();
  const { type, id } = route.params;

  // const GRAPHQL_ENDPOINT = `http://${Constants.expoConfig?.extra?.config}:4000/graphql`;

  const handleSubmit = async () => {
    setLoading(true); // Show loading indicator
    try {
      if (type === "Department") {
        if (!title || !description) {
          Alert.alert("Error", "Title and description are required.");
          return;
        }
        let response = await createDepartment({
          title,
          description,
          imageUrl,
        });
      } else if (type === "Project") {
        const newProject = {
          projectid: demoProjects.length + 1, // Generate a unique ID
          title,
          description,
          startdate: startDate,
          duedate: dueDate,
          status: status === "Custom" ? customStatus : status,
          createdat: createdat || new Date().toISOString(),
          updatedat: new Date().toISOString(), // Add updatedat property
          assignedto: assignedTo ? parseInt(assignedTo, 10) : 0, // Convert to number or provide default value
          budget: budget ? parseFloat(budget) : 0, // Convert to number or provide default value
          workforce: workforce || "0", // Provide default or actual value
          timeline: timeline || "N/A", // Provide default or actual value
          departmentid: id ?? 0, // Ensure departmentid is a number, default to 0 if undefined
        };
        createProject(newProject);
        // Removed incorrect fetch call as demoProjects is an array and not a valid argument for fetch
        getProjectsByDepartmentId(id ?? 0); // Fetch projects by department ID
        const departmentNavigation =
          navigation as unknown as StackNavigationProp<
            RootStackParamList,
            "Department"
          >;
        // Navigate back with required parameters

        Alert.alert("Success", "Project created successfully!");
      } else if (type === "Program") {
        // Add the new program to the hardcoded array
        const newProgram = {
          programid: programs.length + 1, // Generate a unique ID
          name: title,
          description,
          startDate: startDate,
          duration: duration ? parseInt(duration, 10) : 0, // Convert to number or provide default value
          endDate: dueDate || null, // Optional end date
          isRepeat: repeat === "Yes",
          repeatType: repeat === "Yes" ? customStatus : null,
          repeatAfter:
            repeat === "Yes" && customStatus === "Custom"
              ? { type: "Custom", value: parseInt(timeline, 10) || 0 }
              : null,
          createdBy: createdby ? parseInt(createdby, 10) : 0, // Convert to number or provide default value
          createdAt: createdat || new Date().toISOString(),
          departmentId: id ?? 0, // Convert to number or provide default value
        };
        try {
          createProgram(newProgram);

          getProgramsByDepartmentId(id ?? 0); // Fetch programs by department ID
          Alert.alert("Success", "Program created successfully!");

          const fetchDepartment = async () => {
            try {
              const response = await getDepartment((id ?? 0).toString());
              if (response.data) {
                const currentDepartment = response.data
                  .getDepartment as Department; // Cast to Department type
                navigation.navigate("Department", {
                  id: id ?? 0,
                  title: currentDepartment.title,
                  description: currentDepartment.description,
                });
              } else console.error("No data found in response.");
            } catch (error) {
              console.error("Error fetching current department:", error);
            }
          };

          fetchDepartment(); // Fetch department by ID

          // const currentDepartment = await getDepartment((id ?? 0).toString()); // Fetch department by ID
          // console.log(currentDepartment);
          // const department = currentDepartment.data;
          // console.log(department);

          // navigation.navigate("Department", {
          //   id: id ?? 0,
          //   title: department.title,
          //   description: department.description,
          //   imageUrl: department.imageUrl,
          // });

          // navigationToDepartment.navigate("Department", {
          //   id: id ?? 0,
          //   title: title || "Default Title",
          //   description: description || "Default Description",
          //   imageUrl: imageUrl ||x` "",
          // });
        } catch (error: any) {
          console.error("Error creating program:", error);
          Alert.alert("Error", error.message || "An error occurred.");
        }
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

      {type === "Program" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
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
            placeholder="Duration (in days)"
            value={duration}
            onChangeText={(value) => setDuration(value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="End Date (optional, YYYY-MM-DD)"
            value={dueDate}
            onChangeText={setDueDate}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={[styles.label, { flex: 1 }]}>Is Repeat:</Text>
            <Picker
              selectedValue={repeat}
              onValueChange={(value) => setRepeat(value)}
              style={[styles.picker, { flex: 2 }]}
            >
              <Picker.Item label="No" value="No" />
              <Picker.Item label="Yes" value="Yes" />
            </Picker>
          </View>
          {repeat === "Yes" && (
            <>
              <Text style={styles.label}>Repeat Type</Text>
              <Picker
                selectedValue={customStatus}
                onValueChange={(value) => setCustomStatus(value)}
                style={styles.picker}
              >
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
                <Picker.Item label="Yearly" value="yearly" />
                <Picker.Item label="Custom" value="Custom" />
              </Picker>
              {customStatus === "Custom" && (
                <TextInput
                  style={styles.input}
                  placeholder="Custom Repeat Value (e.g., every X days)"
                  value={timeline}
                  onChangeText={setTimeline}
                  keyboardType="numeric"
                />
              )}
              {customStatus === "monthly" && (
                <TextInput
                  style={styles.input}
                  placeholder="Day of the Month (1-31)"
                  value={timeline}
                  onChangeText={setTimeline}
                  keyboardType="numeric"
                />
              )}
              {customStatus === "yearly" && (
                <TextInput
                  style={styles.input}
                  placeholder="Date (MM-DD)"
                  value={timeline}
                  onChangeText={setTimeline}
                />
              )}
            </>
          )}
        </>
      )}

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
