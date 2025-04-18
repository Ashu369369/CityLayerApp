import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Chip, TextInput, Button, IconButton } from "react-native-paper"
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { createDepartment } from "../api/deptApi";
import { createProject, Project } from "../api/projectApi";
import { demoProjects } from "../demoData/projects";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { DynamicTheme } from "../theme/theme";
import { createProgram, Program } from "../api/programApi";
import programs from "../demoData/programs";
import { getProgramsByDepartmentId } from "../api/programApi";
import useStyles from "../styles/CreateNew";
import moment from "moment";
import { Announcement, createAnnouncement } from "../api/announcementsApi";
import { formatDate } from "../Tools/formatDate";
import saveOfflineData from "../Tools/offlineMode";

type CreateNewScreenRouteProp = RouteProp<RootStackParamList, "CreateNew">;

const CreateNewScreen: React.FC = (params) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<CreateNewScreenRouteProp>();

  const { type, id } = route.params;

  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const loggedInUser = useSelector((state: RootState) => state.user);
  const dateFormat = useSelector(
    (state: RootState) => state.preferences.dateFormat
  );

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
  const [workforce, setWorkforce] = useState<any>([]);
  const [newTeamMember, setNewTeamMember] = useState("");
  const [timeline, setTimeline] = useState("");
  const [createdby, setCreatedby] = useState("");
  const dynamicTheme = useTheme() as DynamicTheme; // Cast to DynamicTheme type
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showDuePicker, setShowDuePicker] = useState(false);
  
  const [customFields, setCustomFields] = useState<
    { name: string; value: string }[]
  >([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");


  const [tempStartDate, setTempStartDate] = useState(startDate ? moment(startDate, dateFormat).toDate() : new Date());
  const [tempDueDate, setTempDueDate] = useState(
    dueDate ? moment(dueDate, dateFormat).toDate() : new Date()
  );

  const onChangeStart = (event: any, selectedDate: any) => {
    if (Platform.OS === 'ios') {
      if (event.type === 'set' && selectedDate) {
        const prevDay = tempStartDate.getDate();
        const newDay = selectedDate.getDate();

        // Only update if day is actually changed (user finished date selection)
        if (prevDay !== newDay) {
          setStartDate(moment(selectedDate).format(dateFormat));
          setShowStartPicker(false); // close after full date is selected
        }

        setTempStartDate(selectedDate); // update temp either way
      } else {
        setShowStartPicker(false); // dismissed
      }
    } else {
      // Android behavior: pick and close immediately
      if (selectedDate) {
        const formatted = formatDate(selectedDate, dateFormat);
        setStartDate(formatted);
      }
      setShowStartPicker(false);
    }
  };

  // const onChangeStart = (_event: any, date?: Date) => {
  //   setShowStartPicker(false); // Always hide on selection (not just for iOS)
  //   if (date) {
  //     const formatted = formatDate(date, dateFormat);
  //     setStartDate(formatted); // Save the formatted string for display
  //   }
  // };

 const onChangeDue = (event: any, selectedDate: any) => {
  if (Platform.OS === 'ios') {
    if (event.type === 'set' && selectedDate) {
      const prevDay = tempDueDate.getDate();
      const newDay = selectedDate.getDate();

      if (prevDay !== newDay) {
        setDueDate(moment(selectedDate).format(dateFormat));
        setShowDuePicker(false);
      }

      setTempDueDate(selectedDate); // update temp either way
    } else {
      setShowDuePicker(false); // dismissed
    }
  } else {
    if (selectedDate) {
      const formatted = formatDate(selectedDate, dateFormat);
      setDueDate(formatted);
    }
    setShowDuePicker(false);
  }
};


  const handleSubmit = async () => {
    const netInfo = await NetInfo.fetch();
    setLoading(true); // Show loading indicator
    try {
      if (type === "Department") {
        if (!title || !description) {
          Alert.alert("Error", "Title and description are required.");
          return;
        }
        if (netInfo.isConnected) {
          try {
            const response = await createDepartment({
              title,
              description,
              imageUrl,
            });

            const createdDepartment = response?.data?.createDepartment;

            if (createdDepartment?.departmentid) {
              Alert.alert("Success", "Department created successfully!", [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Department", {
                      id: createdDepartment.departmentid,
                      title: createdDepartment.title,
                      description: createdDepartment.description,
                    });
                  },
                },
              ]);
              navigation.goBack();
            } else {
              Alert.alert("Error", "Something went wrong. Please try again.");
            }
          } catch (error: any) {
            console.error("Error creating department:", error);
            Alert.alert(
              "Error",
              error.message || "Failed to create department."
            );
          }
        } else {
          await saveOfflineData("create_departments", {
            title,
            description,
            imageUrl,
          });
          Alert.alert(
            "Offline",
            "No internet connection. Department saved offline and will sync later."
          );
          navigation.goBack();
        }
      } else if (type === "Project") {
        const missingFields = [];

        if (!title.trim()) missingFields.push("Title");
        if (!description.trim()) missingFields.push("Description");
        if (!startDate.trim()) missingFields.push("Start Date");
        if (!dueDate.trim()) missingFields.push("Due Date");
        if (!assignedTo.trim()) missingFields.push("Assigned To");
        if (!budget.trim()) missingFields.push("Budget");

        if (missingFields.length > 0) {
          Alert.alert(
            "Missing Fields",
            `Please fill in the following fields:\n${missingFields.join(", ")}`
          );
          return;
        }
        const newProject: Project = {
          projectid: demoProjects.length + 1, // Generate a unique ID
          title,
          description,
          startdate: startDate,
          duedate: dueDate,
          status: status === "Custom" ? customStatus : status,
          createdat: new Date().toISOString(),
          updatedat: new Date().toISOString(), // Add updatedat property
          assignedto: assignedTo ? parseInt(assignedTo, 10) : 0,
          budget: budget ? parseFloat(budget) : 0,
          workforce: { team: workforce }, // Provide default or actual value
          timeline: timeline || "N/A", // Provide default or actual value
          departmentid: id ?? 0, // Ensure departmentid is a number, default to 0 if undefined
          customFields: [], // Initialize customFields as an empty array
        };
        if (netInfo.isConnected) {
          try {
            createProject(newProject);
            Alert.alert("Success", "Project created successfully!");
            navigation.goBack();
          } catch (err) {
            Alert.alert("error", "Something went wrong");
          }
        } else {
          await saveOfflineData("create_projects", newProject);
          Alert.alert(
            "Offline",
            "No internet connection. Project saved offline and will sync later."
          );
          navigation.goBack();
        }
      } else if (type === "Program") {
        let repeatAfter: Program["repeatAfter"] = null;

        if (repeat === "Yes") {
          if (customStatus === "Custom") {
            repeatAfter = {
              type: "Custom",
              value: parseInt(timeline, 10) || 0,
            };
          } else if (customStatus === "day") {
            repeatAfter = {
              type: "day",
              day: parseInt(timeline, 10) || 0,
            };
          } else if (customStatus === "date") {
            repeatAfter = {
              type: "date",
              date: timeline,
            };
          }
        }
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
          repeatAfter,
          createdBy: createdby ? parseInt(createdby, 10) : 0, // Convert to number or provide default value
          createdAt: new Date().toISOString(),
          departmentId: id ?? 0, // Convert to number or provide default value
        };
        if (netInfo.isConnected) {
          try {
            createProgram(newProgram);

            getProgramsByDepartmentId(id ?? 0); // Fetch programs by department ID
            Alert.alert("Success", "Program created successfully!");
            navigation.goBack();
          } catch (error: any) {
            console.error("Error creating program:", error);
            Alert.alert("Error", error.message || "An error occurred.");
          }
        } else {
          await saveOfflineData("create_program", newProgram);
          Alert.alert(
            "Offline",
            "No internet connection. Program saved offline and will sync later."
          );
          navigation.goBack();
        }
      } else if (type === "Announcement") {
        if (!messageTitle || !messageBody) {
          Alert.alert("Error", "Message title and body are required.");
          return;
        }

        const newAnnouncement = {
          announcementId: Date.now(), // Generate a unique ID
          messageTitle: messageTitle,
          messageBody: messageBody,
          createdBy: loggedInUser.id,
          createdAt: new Date().toISOString(),
          departmentId: id ?? 0, // Ensure departmentId is a number, default to 0 if undefined
        };
        if (netInfo.isConnected) {
          try {
            await createAnnouncement(newAnnouncement as Announcement);
            Alert.alert("Success", "Announcement created successfully!");
            navigation.goBack(); // Navigate back to the previous screen
          } catch (error: any) {
            console.error("Error creating announcement:", error);
            Alert.alert("Error", error.message || "An error occurred.");
          }
        } else {
          await saveOfflineData("create_announcement", newAnnouncement);
          Alert.alert(
            "Offline",
            "No internet connection. Announcement saved offline and will sync later."
          );
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error("Error creating item:", error);
      Alert.alert("Error", `Failed to create ${type}. Please try again.`);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  // const highContrast = theme.colors.highContrast;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New {type}</Text>
      {type === "Department" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Title"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            // placeholderTextColor={highcon"#ffffff"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
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
            label="Message Title"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={messageTitle}
            onChangeText={setMessageTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            label="Message Body"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={messageBody}
            onChangeText={setMessageBody}
            multiline
          />
          <TextInput
            style={styles.input}
            label="Created By"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={String(loggedInUser.username)}
            editable={false}
            disabled
          />
        </>
      )}

      {type === "Project" && (
        <>
          <TextInput
            style={styles.input}
            mode="outlined"
            // style={styles.input}
            // label="Title"
            placeholder="Title"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            mode="outlined"
            // label="Description"
            placeholder="Description"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity onPress={() => setShowStartPicker(!showStartPicker)}>
            <View pointerEvents="none" style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-range" size={20} iconColor={theme.colors.backdrop} />
              <Text style={styles.input}>
                {startDate ? `Start Date ${startDate}` : `Start Date ${dateFormat}`}
              </Text>
            </View>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={
                startDate ? moment(startDate, dateFormat).toDate() : new Date()
              }
              mode="date"
              display="inline"
              onChange={onChangeStart}
            />
          )}
          {/* Due Date Field */}
          <TouchableOpacity onPress={() => setShowDuePicker(true)}>
            <View pointerEvents="none" style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-range" size={20} iconColor={theme.colors.backdrop} />
              <Text style={styles.input}>
                {dueDate ? `Due Date ${dueDate}` : `Due Date ${dateFormat}`}
              </Text>
            </View>
          </TouchableOpacity>
          {showDuePicker && (
            <DateTimePicker
              value={
                dueDate ? moment(dueDate, dateFormat).toDate() : new Date()
              }
              mode="date"
              display="inline"
              onChange={onChangeDue}
              minimumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}
            style={styles.picker}
          >
            <Picker.Item label="Active" value="Active" />
            <Picker.Item
              label="Pending"
              value="Pending"
              color={dynamicTheme.colors.text}
            />
            <Picker.Item
              label="Ongoing"
              value="Ongoing"
              color={dynamicTheme.colors.text}
            />
            <Picker.Item
              label="Done"
              value="Done"
              color={dynamicTheme.colors.text}
            />
            <Picker.Item
              label="Custom"
              value="Custom"
              color={dynamicTheme.colors.text}
            />
          </Picker>
          {status === "Custom" && (
            <TextInput
              style={styles.input}
              placeholder="Enter Custom Status"
              textColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              placeholderTextColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              value={customStatus}
              onChangeText={setCustomStatus}
            />
          )}
          <TextInput
            placeholder="Assigned To (ID)"
            style={styles.input}
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            mode="outlined"
            keyboardType="number-pad"
            value={assignedTo}
            onChangeText={setAssignedTo}
            // style={styles.input}
          />
          <TextInput
            placeholder="Budget"
            style={styles.input}
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            mode="outlined"
            keyboardType="number-pad"
            value={budget}
            onChangeText={setBudget}
            textContentType="none"
            // style={styles.input}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <TextInput
              placeholder="Workforce ID"
              style={styles.input}
              textColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              placeholderTextColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              keyboardType="number-pad"
              mode="outlined"
              value={newTeamMember}
              onChangeText={setNewTeamMember}
              // style={{
              //   flex: 1,
              //   marginRight: 10,
              //   height: 45,
              // }}
            />
            <Button
              mode="contained"
              onPress={() => {
                if (newTeamMember.trim()) {
                  setWorkforce([...workforce, newTeamMember.trim()]);
                  setNewTeamMember("");
                }
              }}
            >
              Add
            </Button>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
              Team Members:
            </Text>
            {workforce.map((member: string, index: number) => (
              <Chip
                key={index}
                onClose={() =>
                  setWorkforce(
                    workforce.filter((_: any, i: number) => i !== index)
                  )
                }
                // style={}
              >
                {member}
              </Chip>
            ))}
          </View>
          {/*} Just inside the Project section, after your existing fields:*/}
          {/* === Custom Fields Section === */}
          <Text style={styles.label}>Custom Fields</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            {/* <View style={{ flexDirection: "row", marginBottom: 8 }}> */}
            <TextInput
              // label="Field Name"
              style={styles.input}
              placeholder="Field Name"
              textColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              placeholderTextColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              value={newFieldName}
              onChangeText={setNewFieldName}
              // style={{ flex: 1, marginRight: 8 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Field Value"
              textColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              placeholderTextColor={
                dynamicTheme.colors.background === "#000000"
                  ? dynamicTheme.colors.text
                  : dynamicTheme.colors.placeholder
              }
              value={newFieldValue}
              onChangeText={setNewFieldValue}
            />
            <Button
              mode="contained"
              onPress={() => {
                if (newFieldName.trim()) {
                  setCustomFields([
                    ...customFields,
                    { name: newFieldName.trim(), value: newFieldValue },
                  ]);
                  setNewFieldName("");
                  setNewFieldValue("");
                }
              }}
            >
              Add
            </Button>
          </View>
          {/* Display existing custom fields as Chips */}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
          >
            {customFields.map((f, i) => (
              <Chip
                key={i}
                onClose={() =>
                  setCustomFields(customFields.filter((_, idx) => idx !== i))
                }
                style={{ margin: 4 }}
              >
                {f.name}: {f.value}
              </Chip>
            ))}
          </View>
        </>
      )}

      {type === "Program" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (in days)"
            textColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            placeholderTextColor={
              dynamicTheme.colors.background === "#000000"
                ? dynamicTheme.colors.text
                : dynamicTheme.colors.placeholder
            }
            value={duration}
            onChangeText={(value) => setDuration(value)}
            keyboardType="numeric"
          />

          <TouchableOpacity onPress={() => setShowStartPicker(true)}>

          <View pointerEvents="none" style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-range" size={20} iconColor={theme.colors.backdrop} />
              <Text style={styles.input}>
                {startDate ? `Start Date ${startDate}` : `Start Date ${dateFormat}`}
              </Text>
            </View>
          </TouchableOpacity>

          {showStartPicker && (
            <DateTimePicker
              value={
                startDate ? moment(startDate, dateFormat).toDate() : new Date()
              }
              mode="date"
              display="inline"
              onChange={onChangeStart}
            />
          )}

          {/* Due Date Field */}
          <TouchableOpacity onPress={() => setShowDuePicker(true)}>

          <View pointerEvents="none" style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-range" size={20} iconColor={theme.colors.backdrop} />
              <Text style={styles.input}>
                {dueDate ? `Due Date ${dueDate}` : `Start Date ${dateFormat}`}
              </Text>
            </View>
          </TouchableOpacity>

          {showDuePicker && (
            <DateTimePicker
              value={
                dueDate ? moment(dueDate, dateFormat).toDate() : new Date()
              }
              mode="date"
              display="inline"
              onChange={onChangeDue}
              minimumDate={new Date()}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={[styles.label, { flex: 1 }]}>Is Repeat:</Text>
            <Picker
              // mode="dropdown"
              selectedValue={repeat}
              // placeholderTextColor={
              //   dynamicTheme.colors.background === "#000000"
              //     ? dynamicTheme.colors.primary
              //     : dynamicTheme.colors.placeholder
              // }
              onValueChange={(value) => setRepeat(value)}
              style={styles.dropdownPicker}
            // dropdownIconColor={dynamicTheme.colors.accent} // for iOS
            >
              <Picker.Item
                label="No"
                value="No"
                color={dynamicTheme.colors.text}
              />
              <Picker.Item
                label="Yes"
                value="Yes"
                color={dynamicTheme.colors.text}
              />
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
                <Picker.Item
                  label="Weekly"
                  value="weekly"
                  color={dynamicTheme.colors.text}
                />
                <Picker.Item
                  label="Monthly"
                  value="monthly"
                  color={dynamicTheme.colors.text}
                />
                <Picker.Item
                  label="Yearly"
                  value="yearly"
                  color={dynamicTheme.colors.text}
                />
                <Picker.Item
                  label="Custom"
                  value="Custom"
                  color={dynamicTheme.colors.text}
                />
              </Picker>
              {customStatus === "Custom" && (
                <TextInput
                  style={styles.input}
                  placeholder="Custom Repeat Value (e.g., every X days)"
                  placeholderTextColor={dynamicTheme.colors.placeholder}
                  value={timeline}
                  onChangeText={setTimeline}
                  keyboardType="numeric"
                />
              )}
              {customStatus === "monthly" && (
                <TextInput
                  style={styles.input}
                  placeholder="Day of the Month (1-31)"
                  placeholderTextColor={dynamicTheme.colors.placeholder}
                  value={timeline}
                  onChangeText={setTimeline}
                  keyboardType="numeric"
                />
              )}
              {customStatus === "yearly" && (
                <TextInput
                  style={styles.input}
                  placeholder="Date (MM-DD)"
                  placeholderTextColor={dynamicTheme.colors.placeholder}
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

      <Button mode="contained" onPress={handleSubmit} disabled={loading}>
        {`Create ${type}`}
      </Button>
    </ScrollView>
  );
};

export default CreateNewScreen;
