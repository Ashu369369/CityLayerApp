import { StyleSheet, Platform } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    // Main wrapper with sufficient padding and a clean, neutral background.
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Light grey for default, or altered by high contrast.
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    // Scroll container with added bottom padding for fixed buttons.
    scrollContent: {
      paddingBottom: 120,
    },
    // Card style with a subtle border, flatter design, and mild shadow.
    card: {
      backgroundColor: theme.colors.surface, // Use surface for a clean, consistent card look.
      borderRadius: 10,
      marginBottom: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    // Row layout for the profile header.
    profileHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    // Container for the avatar, with consistent margin.
    avatarContainer: {
      marginRight: 20,
    },
    // Avatar styling using the primary token.
    avatar: {
      backgroundColor: theme.colors.primary,
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarLabel: {
      fontSize: theme.fonts.xlarge.fontSize,
      color: theme.colors.white,
      fontWeight: "bold",
    },
    // Container for user details.
    userInfo: {
      flex: 1,
    },
    name: {
      fontSize: theme.fonts.large.fontSize,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 4,
    },
    username: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.placeholder,
      marginBottom: 2,
    },
    email: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 2,
    },
    dob: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 10,
    },
    role: {
      fontSize: theme.fonts.medium.fontSize,
      color: theme.colors.success,
      fontWeight: "500",
      textAlign: "center",
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.grey,
      borderRadius: 4,
      alignSelf: "flex-start",
    },
    // Section for settings (font size selector and high contrast toggle).
    settingsContainer: {
      marginTop: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: theme.colors.placeholder,
    },
    label: {
      fontSize: theme.fonts.medium.fontSize,
      color: theme.colors.text,
      fontWeight: "600",
      marginBottom: 8,
    },
    pickerContainer: {
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      overflow: "hidden",
      marginBottom: 20,
    },
    picker: {
      backgroundColor: theme.colors.white,
      ...Platform.select({
        ios: {
          height: 180,
          marginTop: -40,
        },
        android: {
          height: 50,
        },
      }),
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    // Fixed bottom bar with clear separation and flat design.
    fixedBottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.placeholder,
      paddingVertical: 12,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    iconBtn: {
      margin: 5,
    },
  });

export default useStyles;
