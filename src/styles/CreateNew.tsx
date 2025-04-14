// filepath: src/styles/CreateNew.ts
import { StyleSheet, Platform } from "react-native";
import { DynamicTheme } from "../theme/theme";

export default (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.fonts.large.fontSize,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 24,
      color: theme.colors.primary,
    },
    input: {
      backgroundColor: theme.colors.surface,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      borderRadius: 8,
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    label: {
      marginBottom: 6,
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "600",
      color: theme.colors.text,
    },
    picker: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      marginBottom: 12,
      height: Platform.OS === "ios" ? 180 : 50,
      color: theme.colors.text,
    },
    dropdownPicker: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      marginBottom: 12,
      height: Platform.OS === "ios" ? 180 : 50,
      width: 150,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
    },
    submitButtonText: {
      color: theme.colors.oppositeText,
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "600",
    },
  });
