import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 70,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
    },
    title: {
      fontSize: theme.fonts.large.fontSize,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: theme.colors.primary,
    },
    input: {
      backgroundColor: theme.colors.surface,
      marginBottom: 1,
      // outline/border
      //   borderWidth: 1,
      borderColor: theme.colors.placeholder,
    },
    errorText: {
      color: theme.colors.error,
      marginBottom: 8,
    },
    dateTimePortal: {
      backgroundColor: theme.colors.surface,
    },
    LoginText: {
      fontSize: theme.fonts.light.fontSize,
      textAlign: "right",
      color: theme.colors.link,
      marginBottom: 16,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: "center",
      marginTop: 12,
    },
    buttonText: {
      color: theme.colors.oppositeText,
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "600",
    },
  });

export default useStyles;
