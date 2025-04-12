import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import getDynamicTheme, { DynamicTheme } from "../theme/theme";
import { RootState } from "../state/store";
import NetInfo from "@react-native-community/netinfo";

// Import any additional APIs or actions you need

interface EditDepartmentProps {
  // If you need route params, define them here (e.g. route: { params: { departmentId: number } })
}

const EditDepartment: React.FC<EditDepartmentProps> = ({}) => {
  const dispatch = useDispatch();

  // Pull user preferences from Redux
  const fontSize = useSelector(
    (state: RootState) => state.preferences.fontSize
  );
  const highContrast = useSelector(
    (state: RootState) => state.preferences.highContrast
  );

  // Create dynamic theme
  const theme: DynamicTheme = getDynamicTheme(fontSize, highContrast);
  const styles = useStyles(theme);

  // Local component state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Example: A handler for saving changes
  const handleSave = () => {
    console.log("Saving Department changes...", { title, description });
    // Possibly dispatch an update action or call an API here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Department</Text>

      <TextInput
        style={styles.input}
        placeholder="Department Title"
        placeholderTextColor={theme.colors.placeholder}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.multiLineInput]}
        placeholder="Department Description"
        placeholderTextColor={theme.colors.placeholder}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    card: {
      backgroundColor: theme.colors.surface, // different from background
      borderRadius: 12,
      elevation: 2,
      padding: 10,
    },
    header: {
      color: theme.colors.text,
      fontSize: theme.fonts.large.fontSize,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      backgroundColor: theme.colors.white,
      color: theme.colors.text,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      borderRadius: 8,
      padding: 10,
      fontSize: theme.fonts.regular.fontSize,
      marginBottom: 16,
    },
    multiLineInput: {
      height: 100,
      textAlignVertical: "top",
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    saveButtonText: {
      color: theme.colors.white,
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "bold",
    },
  });

export default EditDepartment;
