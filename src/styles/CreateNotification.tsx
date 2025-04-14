import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

export default (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    label: {
      marginBottom: 6,
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "600",
      color: theme.colors.text,
    },
    input: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
      //   borderWidth: 1,
      borderColor: theme.colors.placeholder,
      borderRadius: 8,
      paddingHorizontal: 12,
      //   paddingVertical: -4,
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      height: 50,
    },
    dropdownContainer: {
      display: "flex",
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 20,
    },
    menuButton: {
      color: theme.colors.background === "#000000" ? "white" : "white",
      //   flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      borderRadius: 8,
      height: 40,
      //   paddingVertical: 8,
      //   paddingHorizontal: 12,
      //   backgroundColor: theme.colors.surface,
      //   justifyContent: "center",
    },
    createButton: {
      marginTop: 24,
      //   alignSelf: "flex-end",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
    },
    createButtonText: {
      color: theme.colors.oppositeText,
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "600",
      textAlign: "center",
    },
  });
