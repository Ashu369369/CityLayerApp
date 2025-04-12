import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    // Main container uses the dynamic background
    container: {
      //   flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    // A row layout utility
    flexRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    // Widget that shows a welcome message
    welcomeWidget: {
      backgroundColor: theme.colors.surface,
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    welcomeWidgetText: {
      color: theme.colors.text,
      fontSize: theme.fonts.regular.fontSize,
      fontWeight: "bold",
    },
    // The main header text of the dashboard
    header: {
      fontSize: theme.fonts.xlarge.fontSize,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.text,
    },
    // A smaller welcome message text
    welcomeMessage: {
      fontSize: theme.fonts.regular.fontSize,
      marginBottom: 20,
      color: theme.colors.text,
    },
    // A dashboard box with clear separation from the container
    dashboardBox: {
      backgroundColor: theme.colors.surface,
      padding: 20,
      paddingVertical: 30,
      borderRadius: 8,
      marginBottom: 20,
    },
    dashboardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    dashboardTitle: {
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    // Icon styling for edit actions
    editIcon: {
      width: 20,
      height: 20,
      tintColor: theme.colors.primary,
    },
    editIcontTwo: {
      width: 15,
      height: 15,
      tintColor: theme.colors.text,
    },
    // Dashboard text that explains details
    dashboardText: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 5,
    },
    dashboardTextValue: {
      color: theme.colors.primary,
      fontWeight: "bold",
      marginBottom: 5,
    },
    // Customization box for editing widgets – uses a neutral grey that works in both themes
    customizationBox: {
      width: "100%",
      backgroundColor: theme.colors.grey,
      padding: 15,
      borderRadius: 8,
      marginBottom: 20,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    customizationTitle: {
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: 10,
    },
    customizationItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    customizationLabel: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
    // Dashboard count is prominent
    dashboardCount: {
      fontSize: theme.fonts.xlarge.fontSize,
      fontWeight: "bold",
      color: theme.colors.primary,
      textAlign: "right",
    },
    dashboardDescription: {
      fontSize: theme.fonts.bodySmall.fontSize,
      width: "80%",
      color: theme.colors.text,
      marginBottom: 15,
      textAlign: "left",
    },
    // "View All" button with primary background and white text
    viewAllButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: "center",
    },
    viewAllButtonText: {
      color: theme.colors.white,
      fontSize: theme.fonts.regular.fontSize,
      fontWeight: "bold",
    },
    // Row for status details
    statusRow: {
      marginBottom: 15,
    },
    statusText: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 5,
    },
    statusValue: {
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    // Generic card style for containing content
    card: {
      backgroundColor: theme.colors.surface,
      marginBottom: 20,
      borderRadius: 10,
      padding: 10,
    },
    cardTitle: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    // Pollution widget specifics
    pollutionItem: {
      marginVertical: 8,
    },
    pollutionText: {
      color: theme.colors.text,
      marginBottom: 5,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
    },
    // List item text styles for widgets
    listTitle: {
      color: theme.colors.text,
    },
    listDescription: {
      color: theme.colors.placeholder,
    },
    scrollView: {
      maxHeight: 200,
    },
    // Edit button styling for dashboard header
    editButton: {
      flexDirection: "row",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      alignItems: "center",
      backgroundColor: theme.colors.primary,
    },
    editButtonText: {
      color: theme.colors.white,
      fontSize: theme.fonts.regular.fontSize,
      fontWeight: "bold",
    },
    // Container for edit mode where widgets can be toggled
    editModeContainer: {
      backgroundColor: theme.colors.grey,
      padding: 20,
      borderRadius: 8,
    },
    editModeTitle: {
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: 10,
    },
    // Styles for each widget toggle row in edit mode
    widgetToggle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    widgetLabel: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
  });

export default useStyles;
