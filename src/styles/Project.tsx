import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    cardWrapper: {
      marginBottom: 16,
    },
    projectCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      elevation: 3,
      padding: 16,
    },
    title: {
      fontSize: theme.fonts.large.fontSize,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 8,
      lineHeight: 22,
    },
    detailsContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    detail: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginVertical: 4,
    },
    detailLabel: {
      fontWeight: "bold",
      color: theme.colors.text,
    },
    divider: {
      marginVertical: 16,
      backgroundColor: theme.colors.placeholder,
      height: 1,
    },
    subTitle: {
      fontSize: theme.fonts.medium.fontSize,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 12,
    },
    updateCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    updateDescription: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
      marginBottom: 8,
      lineHeight: 20,
    },
    updateLocation: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.placeholder,
      marginBottom: 8,
    },
    mediaContainer: {
      marginBottom: 8,
    },
    filePreview: {
      width: 200,
      height: 200,
      backgroundColor: theme.colors.grey,
      marginBottom: 8,
    },
    filePreviewPdf: {
      width: "100%",
      height: 200,
      backgroundColor: theme.colors.grey,
      marginBottom: 8,
    },
    filePreviewMedia: {
      width: "100%",
      height: 200,
      backgroundColor: theme.colors.grey,
      marginBottom: 8,
    },
    unknownFileContainer: {
      padding: 10,
      backgroundColor: theme.colors.placeholder,
      borderRadius: 4,
      marginBottom: 8,
    },
    unknownFileText: {
      color: theme.colors.text,
      fontSize: theme.fonts.regular.fontSize,
    },
    updateFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    updateBy: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
    updateDate: {
      fontSize: theme.fonts.light.fontSize,
      color: theme.colors.placeholder,
    },
    errorText: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.error || "red",
      textAlign: "center",
      marginTop: 16,
    },
  });

export default useStyles;
