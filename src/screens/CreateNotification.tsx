import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Menu,
  Divider,
} from "react-native-paper";
import notifications from "../demoData/notifications";
import { DynamicTheme } from "../theme/theme";
import saveOfflineData from "../Tools/offlineMode";
import NetInfo from "@react-native-community/netinfo";
import useStyles from "../styles/CreateNotification";

const CreateNotificationScreen: React.FC = ({ navigation }: any) => {
  const dynamicTheme = useTheme() as DynamicTheme;
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("general");
  const [taggedFor, setTaggedFor] = useState(1); // Default to General
  const [departmentId, setDepartmentId] = useState(""); // Optional Department ID
  const [menuVisible, setMenuVisible] = useState(false); // For Tagged For dropdown
  const [severityMenuVisible, setSeverityMenuVisible] = useState(false); // For Severity dropdown

  const handleCreateNotification = async () => {
    const netInfo = await NetInfo.fetch();
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    // Validate Department ID (optional but must be a valid integer if provided)
    if (departmentId && isNaN(Number(departmentId))) {
      Alert.alert("Error", "Department ID must be a valid integer.");
      return;
    }

    const newNotification = {
      notificationId: notifications.length + 1, // Generate a new ID
      departmentId: departmentId ? parseInt(departmentId, 10) : 0, // Default to 0 if not provided
      roleId: taggedFor,
      title,
      description,
      severity,
      taggedFor,
      createdBy: 1, // Assuming the current user is creating the notification
      createdAt: new Date().toISOString(),
      readBy: [], // Initially no one has read the notification
    };
    if (netInfo.isConnected) {
      notifications.push(newNotification);
      Alert.alert("Success", "Notification created successfully!");
    } else {
      await saveOfflineData("create_notifications", newNotification);
      Alert.alert(
        "Offline",
        "No internet connection. Notification saved offline and will sync later."
      );
    }
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.label}>
        Title
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Enter notification title"
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
        style={styles.input}
      />

      <Text variant="titleMedium" style={styles.label}>
        Description
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Enter notification description"
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
        style={styles.input}
      />

      <Text variant="titleMedium" style={styles.label}>
        Department ID (Optional)
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Enter department ID (optional)"
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
        value={departmentId}
        onChangeText={setDepartmentId}
        keyboardType="numeric" // Allow only numeric input
        style={styles.input}
      />

      <View style={styles.dropdownContainer}>
        <Text variant="titleMedium" style={styles.label}>
          Severity
        </Text>
        <Menu
          // style={styles.dropdownPicker}
          visible={severityMenuVisible}
          onDismiss={() => setSeverityMenuVisible(false)} // Properly dismiss the menu
          anchor={
            <Button
              // style={styles.button}
              mode="outlined"
              onPress={() => setSeverityMenuVisible(true)} // Open the menu
              style={styles.menuButton}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Button>
          }
        >
          <Menu.Item
            // style={styles.dropdownPickerItem}
            onPress={() => {
              setSeverity("general");
              setSeverityMenuVisible(false); // Close the menu after selection
            }}
            title="General"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSeverity("important");
              setSeverityMenuVisible(false); // Close the menu after selection
            }}
            title="Important"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSeverity("warning");
              setSeverityMenuVisible(false); // Close the menu after selection
            }}
            title="Warning"
          />
        </Menu>
      </View>

      <View style={styles.dropdownContainer}>
        <Text variant="titleMedium" style={styles.label}>
          Tagged For
        </Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)} // Properly dismiss the menu
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)} // Open the menu
              style={styles.menuButton}
            >
              {taggedFor === 1
                ? "General"
                : taggedFor === 2
                ? "Department Admin"
                : "Admin"}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setTaggedFor(1);
              setMenuVisible(false); // Close the menu after selection
            }}
            title="General"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setTaggedFor(2);
              setMenuVisible(false); // Close the menu after selection
            }}
            title="Department Admin"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setTaggedFor(3);
              setMenuVisible(false); // Close the menu after selection
            }}
            title="Admin"
          />
        </Menu>
      </View>

      <Button
        mode="contained"
        onPress={handleCreateNotification}
        style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
      >
        Create Notification
      </Button>
    </View>
  );
};

export default CreateNotificationScreen;
