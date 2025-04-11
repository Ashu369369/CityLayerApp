import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey,
    padding: 0,
  },
  notificationCard: {
    // marginBottom: 10,
    padding: 5,
    borderRadius: 0,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    borderWidth: 1, // Default thin border for all notifications
    borderLeftWidth: 10, // Thicker left border for severity
    backgroundColor: theme.colors.disabled, // Background color for unread notifications
    borderRightColor: theme.colors.disabled, // Default border color
    borderTopColor: theme.colors.disabled, // Default border color
    borderBottomColor: theme.colors.surface, // Default border color
  },
  unreadNotification: {
    backgroundColor: theme.colors.surface,
  },
  severityImportant: {
    borderLeftColor: theme.colors.error, // Red left border for important severity
  },
  severityWarning: {
    borderLeftColor: "#A88905", // Yellow left border for warning severity
  },
  severityGeneral: {
    borderLeftColor: theme.colors.primary, // Blue left border for general severity
  },
  severityDefault: {
    borderLeftColor: theme.colors.placeholder, // Grey left border for other cases
  },
  notificationTitle: {
    // fontSize: theme.fonts.medium.fontSize,
    fontWeight: "bold",
    color: theme.colors.backdrop,
    marginBottom: 5,
  },
  notificationDescription: {
    // fontSize: theme.fonts.regular.fontSize,
    color: theme.colors.text,
    marginBottom: 10,
  },
  notificationMeta: {
    // fontSize: theme.fonts.small.fontSize,
    color: theme.colors.placeholder,
  },
  noNotifications: {
    // fontSize: theme.fonts.medium.fontSize,
    color: theme.colors.text,
    textAlign: "center",
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 5,
    alignItems: "center",
    opacity: 0.5,
  },
  deleteButtonText: {
    color: "grey",
    fontWeight: "bold",
  },
});

export default useStyles;