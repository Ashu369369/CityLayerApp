import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    // Main container uses the dynamic background
    container: {
      minHeight: "100%",
      padding: 20,
      backgroundColor: theme.colors.background, // Background color (dark in high contrast, light in default)
    },
    // Utility row style
    flexRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    // Widget: Welcome Message container
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
    // Main header text
    header: {
      fontSize: theme.fonts.xlarge.fontSize,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.header, // Use header token for added emphasis
    },
    // Smaller welcome message text
    welcomeMessage: {
      fontSize: theme.fonts.regular.fontSize,
      marginBottom: 20,
      color: theme.colors.text,
    },
    // Dashboard box: use card token for a darker panel
    dashboardBox: {
      display: "flex",
      gap: 20,
      backgroundColor: theme.colors.card, // Card background (darker than container)
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
      tintColor: theme.colors.link,
    },
    // Dashboard explanation text
    dashboardText: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 5,
    },
    dashboardTextValue: {
      color: theme.colors.success, // use success token for numeric values
      fontWeight: "bold",
      marginBottom: 5,
    },
    // Customization box for widget editing
    customizationBox: {
      width: "100%",
      backgroundColor: theme.colors.footer, // Footer token to provide contrast for customization panel
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
    // Prominent dashboard count text
    dashboardCount: {
      fontSize: theme.fonts.xlarge.fontSize,
      fontWeight: "bold",
      color: theme.colors.accent,
      textAlign: "right",
    },
    dashboardDescription: {
      fontSize: theme.fonts.bodySmall?.fontSize || theme.fonts.regular.fontSize,
      width: "80%",
      color: theme.colors.text,
      marginBottom: 15,
      textAlign: "left",
    },
    // "View All" button styling, using button and buttonText tokens
    viewAllButton: {
      backgroundColor: theme.colors.button,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    viewAllButtonText: {
      color: theme.colors.buttonText,
      fontSize: theme.fonts.regular.fontSize,
      fontWeight: "bold",
    },
    // Row for status details (like counts)
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
      color: theme.colors.success,
    },
    // Generic card style for content panels
    card: {
      backgroundColor: theme.colors.card,
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
      color: theme.colors.text, // using warning token to indicate caution
      marginBottom: 5,
      //   fontWeight: "bold",
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
      //   backgroundColor: theme.colors.button,
    },
    editButtonText: {
      color: theme.colors.primary,
      fontSize: theme.fonts.regular.fontSize,
      fontWeight: "bold",
      marginLeft: 15,
      left: 8,
    },
    // Container for edit mode where widgets are toggled
    editModeContainer: {
      backgroundColor: theme.colors.footer,
      padding: 20,
      borderRadius: 8,
      //   marginRight: 0,
    },
    editModeTitle: {
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: 10,
    },
    // Widget toggle row in edit mode
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
    customizationLabel: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
  });

export default useStyles;
