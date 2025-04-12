import { StyleSheet, Platform } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      // Use the theme's background color (set to a light tone in default mode,
      // and dark in high contrast, as defined in your dynamic theme)
      backgroundColor: theme.colors.background,
    },
    title: {
      // Use a large font size from the dynamic theme
      fontSize: theme.fonts.large.fontSize,
      marginBottom: 20,
      fontWeight: "bold",
      textAlign: "center",
      // Use primary color for headings to add vibrancy
      color: theme.colors.primary,
    },
    dropdownPicker: {
      // fixed height
      height: Platform.OS === "ios" ? 180 : 50,
      // fixed width to force the native dropdown icon
      width: 150,
      backgroundColor: theme.colors.grey, // Use white token for input backgrounds
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      // Android-specific: ensure it shows the dropdown arrow
      //   color: theme.colors.oppositeText,
    },

    picker: {
      //   height: 30,
      marginBottom: 20,
      height: Platform.OS === "ios" ? 200 : 50,
      backgroundColor: theme.colors.grey, // Use white token for input backgrounds
      borderRadius: 8,
      color: theme.colors.text,
      //   borderWidth: 1,
      //   borderColor: theme.colors.placeholder,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.button,
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      backgroundColor: theme.colors.grey,
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    label: {
      marginBottom: 5,
      fontWeight: "600",
      // Use the text color from the theme
      color: theme.colors.text,
      fontSize: theme.fonts.medium.fontSize,
    },
    placeholderTextColor: {
      color: theme.colors.placeholder,
    },
    // Inside your existing useStyles(theme: DynamicTheme) => StyleSheet.create({ ... })
    submitButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
    },
    submitButtonText: {
      color: theme.colors.white,
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "600",
    },
  });

export default useStyles;
