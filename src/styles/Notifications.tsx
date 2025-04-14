// src/styles/Notifications.ts
import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

export default (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 12,
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 12,
    },
    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
    },
    activeFilterButton: {
      backgroundColor: theme.colors.primary,
    },
    filterItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    severityDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 6,
    },
    filterButtonText: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
    activeFilterButtonText: {
      color: theme.colors.oppositeText,
      fontWeight: "600",
    },
    notificationCard: {
      marginBottom: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      elevation: 2,
    },
    unreadNotification: {
      borderWidth: 2,
      borderColor: theme.colors.accent,
    },
    severityImportant: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.error,
    },
    severityWarning: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.warning,
    },
    severityGeneral: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    severityDefault: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.placeholder,
    },
    notificationTitle: {
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 4,
    },
    notificationDescription: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 8,
    },
    notificationMeta: {
      fontSize: theme.fonts.light.fontSize,
      color: theme.colors.placeholder,
      marginBottom: 8,
    },
    deleteButton: {
      alignSelf: "flex-end",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.error,
    },
    deleteButtonText: {
      fontSize: theme.fonts.light.fontSize,
      color: theme.colors.oppositeText,
    },
    noNotifications: {
      textAlign: "center",
      marginTop: 40,
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.placeholder,
    },
  });
